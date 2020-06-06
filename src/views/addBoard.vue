<template>
  <div class="accaunt">
    <center>
      <div class="info">
        <div class="icon icon-primary">
          <i class="material-icons">chrome_reader_mode</i>
        </div>
        <h4 class="info-title">{{ $t('message.addBoard.h') }}</h4>
        {{ $t('message.addBoard.title') }}
      </div>

      <form @submit.prevent="add">
        <div class="fields">
          <div
            class="input-group form-group label-floating"
            :class="{ 'has-danger': $v.board.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">link</i>
              </span>
            </div>
            <input
              v-model="board"
              @input="$v.board.$touch"
              type="text"
              class="form-control"
              :placeholder="$t('message.boards.placeholder1')"
            />
            <button v-if="$v.board.$error" class="form-control-feedback">
              <i class="material-icons">clear</i>
            </button>
            <small v-if="$v.board.$error" class="form-text text-muteds small-alert">
              {{ $t('message.addBoard.small') }}
            </small>
          </div>

          <div class="input-group form-group label-floating">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">insert_comment</i>
              </span>
            </div>
            <input
              v-model="name"
              type="text"
              class="form-control"
              :placeholder="$t('message.addBoard.placeholder2')"
            />
          </div>

          <div class="input-group form-group label-floating">
            <div class="input-group-prepend">
              <span class="input-group-text" style="align-items: flex-start; padding-top: 6px;">
                <i class="material-icons">notes</i>
              </span>
            </div>
            <textarea
              class="form-control"
              rows="4"
              v-model="desc"
              :placeholder="$t('message.addBoard.placeholder3')"
            />
          </div>

          <br />
        </div>
        <button :disabled="$v.$invalid || loading" type="submit" class="btn btn-primary btn-round">
          {{ $t('message.addBoard.button') }}
          <div v-if="loading" class="loadingio-spinner-rolling-dqk4877kj7o">
            <div class="ldio-2sjibqn51ln">
              <div></div>
            </div>
          </div>
        </button>
        <br />
        <a @click="$router.go(-1)">
          <button type="button" class="btn btn-secondary btn-round">
            {{ $t('message.back') }}
          </button>
        </a>
      </form>
    </center>
  </div>
</template>

<script>
/* eslint-disable comma-dangle */
import { required, url, minLength } from 'vuelidate/lib/validators/';
import * as fb from 'firebase';
import qs from 'qs';
import { eventEmitter } from '../main.js';
import { http } from '../http.js';

export default {
  data() {
    return {
      board: '',
      boardId: '',
      name: '',
      desc: '',
      loading: false,
      stage: ''
    };
  },
  validations: {
    board: {
      required,
      url,
      minLength: minLength(28),
      validID() {
        let res;
        const arr = this.board.split('/');
        if (arr.length > 3) {
          // eslint-disable-next-line prefer-destructuring
          this.boardId = arr[4];
          // eslint-disable-next-line no-unused-expressions
          this.boardId.length === 8 ? (res = true) : (res = false);
        } else {
          res = false;
        }
        return res;
      }
    }
  },
  methods: {
    add() {
      this.loading = true;
      this.uniqBoard(this.boardId)
        .then(() => {
          // проверим доступность доски
          http
            .get(`trello/boards/${this.boardId}/?cards=open&fields=all&card_customFieldItems=true`)
            .then(() => {
              // Добавим CustomFields
              this.addCustomField(this.boardId)
                .then(result => {
                  this.saveBoardToFB(result)
                    .then(() => {
                      this.board = '';
                      this.name = '';
                      this.desc = '';
                      this.loading = false;
                      this.$store.dispatch('getBoards');
                      eventEmitter.$emit('showMessage', this.$t('message.addBoard.modal1'));
                    })
                    .catch(e => {
                      console.log(e);
                    });
                })
                .catch(() => {
                  this.loading = false;
                  eventEmitter.$emit('showMessage', this.$t('message.addBoard.modal2'));
                });
            })
            .catch(() => {
              this.loading = false;
              eventEmitter.$emit('showMessage', this.$t('message.addBoard.modal3'));
            });
        })
        .catch(() => {
          this.loading = false;
          eventEmitter.$emit('showMessage', this.$t('message.addBoard.modal4'));
        });
    },
    uniqBoard(value) {
      // проверим доску на уникальность
      return new Promise((resolve, reject) => {
        fb.database()
          .ref('boards')
          .orderByChild('board')
          .equalTo(value)
          .once('value')
          .then(snapshot => {
            const val = snapshot.val();
            if (val) {
              reject();
            } else {
              resolve();
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    saveBoardToFB(customfield) {
      // добавляем доску
      return new Promise((resolve, reject) => {
        fb.database()
          .ref('boards/')
          .push({
            user_id: this.$store.state.user.uid,
            board: this.boardId,
            name: this.name,
            desc: this.desc,
            customfield
          })
          .then(() => {
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    addCustomField(value) {
      // Create a new Custom Field on a board
      return new Promise((resolve, reject) => {
        http.get(`trello/boards/${value}/??`).then(response => {
          // тут обработаем пустышки, конечно не самое лучшее место но всеже
          this.name = !this.name ? response.data.name : this.name;
          this.desc = !this.desc ? this.$t('message.addBoard.customDesc') : this.desc;
          //
          http
            .post(
              'trello/customFields/?',
              qs.stringify({
                idModel: response.data.id,
                modelType: 'board',
                name: 'Trello Up User',
                pos: 'bottom',
                type: 'list',
                display_cardFront: true
              }),
              {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              }
            )
            .then(response2 => {
              resolve(response2.data.id);
            })
            .catch(err => {
              eventEmitter.$emit('showMessage', this.$t('message.addBoard.modal5'));
              reject(err);
            });
        });
      });
    }
  }
};
</script>

<style scoped>
.input-group-text {
  color: #999;
}
.fields {
  margin-left: -50px;
  max-width: 100%;
}
.accaunt {
  padding-left: 75px;
  padding-right: 75px;
}
.form-control-feedback {
  margin-top: -28px;
}
.small-alert {
  padding-left: 55px;
  text-align: left;
}

@keyframes ldio-2sjibqn51ln {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.ldio-2sjibqn51ln div {
  position: absolute;
  width: 33px;
  height: 33px;
  border: 4px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
}
.ldio-2sjibqn51ln div {
  animation: ldio-2sjibqn51ln 1.4492753623188404s linear infinite;
  top: 20px;
  left: 20px;
}
.loadingio-spinner-rolling-dqk4877kj7o {
  width: 50px;
  height: 20px;
  display: inline-block;
  overflow: hidden;
  background: none;
  position: fixed;
  margin-left: 5px;
  margin-right: 5px;
}
.ldio-2sjibqn51ln {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.44);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-2sjibqn51ln div {
  box-sizing: content-box;
}
</style>
