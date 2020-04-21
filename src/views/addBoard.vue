<template>
  <div class="accaunt">
    <center>
      <div class="info">
        <div class="icon icon-primary">
          <i class="material-icons">chrome_reader_mode</i>
        </div>
        <h4 class="info-title">
          Подключение доски
        </h4>
        Для подключения доски необходимо ввести ее <b>ID</b>, добавить на доску пользователя
        <b>@userup3</b>, а также улучшение <b>CustomFields</b>.
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
              placeholder="Ссылка на доску в Trello ..."
            />
            <button v-if="$v.board.$error" class="form-control-feedback">
              <i class="material-icons">clear</i>
            </button>
            <small v-if="$v.board.$error" class="form-text text-muteds small-alert"
              >Скопируйте ссылку на доску Trello в которой вы планируете принимать задачи. Например,
              https://trello.com/b/SJEN5ZMP/
            </small>
          </div>

          <div class="input-group form-group label-floating">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">insert_comment</i>
              </span>
            </div>
            <input v-model="name" type="text" class="form-control" placeholder="Название доски" />
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
              placeholder="Приветственное описание"
            />
          </div>

          <br />
        </div>
        <button :disabled="$v.$invalid || loading" type="submit" class="btn btn-primary btn-round">
          Проверить и подключить
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
import axios from 'axios';
import { required, url, minLength } from 'vuelidate/lib/validators/';
import * as fb from 'firebase';
import { eventEmitter } from '../main.js';

const key = 'd02290573e1e3121c00a8bcb3bd08a1f';
const token = '57b6866c777bc31f1f6ca58c1a9a540873221292bbb1cf7ccfdd027d08c54349';

export default {
  data() {
    return {
      board: '',
      boardId: '',
      name: '',
      desc: '',
      loading: false,
      stage: '',
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
          this.boardId = arr[4];
          arr[4].length === 8 ? (res = true) : (res = false);
        } else {
          res = false;
        }
        return res;
      },
    },
  },
  methods: {
    add() {
      this.loading = true;
      this.uniqBoard(this.boardId)
        .then(() => {
          // проверим доступность доски
          axios
            .get(
              `https://api.trello.com/1/boards/${this.boardId}/?cards=open&fields=all&card_customFieldItems=true&key=${key}&token=${token}`
            )
            .then(() => {
              // Добавим CustomFields
              this.addCustomField(this.boardId)
                .then((result) => {
                  this.saveBoardToFB(result)
                    .then(() => {
                      this.board = '';
                      this.name = '';
                      this.desc = '';
                      this.loading = false;
                      this.$store.dispatch('getBoards');
                      eventEmitter.$emit(
                        'showMessage',
                        'Все поучилось! Теперь можно пользоваться доской и добавлять задачи через Trello Up!'
                      );
                    })
                    .catch((err) => {
                      // alert(err);
                    });
                })
                .catch((error) => {
                  this.loading = false;
                  eventEmitter.$emit(
                    'showMessage',
                    `Мы пытаемся создать на вашей доске Custom Field, но что-то пошло не так. Возможные причины: элемент Custom Field уже существует и его надо удалить, либо дополнение Custom Field не подключено к доске. Ошибка: ${error}. `
                  );
                });
            })
            .catch(() => {
              this.loading = false;
              eventEmitter.$emit(
                'showMessage',
                'Данную доску невозможно добавить. Для добавления доски введите ссылку на доску, а также пригласите на доску пользователя @userup3.'
              );
            });
        })
        .catch(() => {
          this.loading = false;
          eventEmitter.$emit('showMessage', 'Данная доска уже подключена.');
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
          .then((snapshot) => {
            const val = snapshot.val();
            if (val) {
              reject(false);
            } else {
              resolve(true);
            }
          })
          .catch((err) => {
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
            customfield,
          })
          .then(() => {
            resolve();
          })
          .catch((err) => {
            console.log(`Ошибка ${err}`);
            reject(err);
          });
      });
    },
    addCustomField(value) {
      // Create a new Custom Field on a board
      return new Promise((resolve, reject) => {
        axios
          .get(`https://api.trello.com/1/boards/${value}/?key=${key}&token=${token}`)
          .then((response) => {
            // тут обработаем  пустышки, конечно не самое лучшее место но всеже
            console.log(response.data);
            this.name = !this.name ? response.data.name : this.name;
            this.desc = !this.desc
              ? 'Тут вы можете подать вопрос и мы обязательно Вам ответим!'
              : this.desc;
            //
            console.log(response.data);
            axios
              .post(`https://api.trello.com/1/customFields`, {
                idModel: response.data.id,
                modelType: 'board',
                name: 'Trello Up User',
                key,
                token,
                pos: 'bottom',
                type: 'list',
                display_cardFront: true,
              })
              .then((response) => {
                resolve(response.data.id);
              })
              .catch((err) => {
                eventEmitter.$emit(
                  'showMessage',
                  'Пожалуйста, подключите к доске улучшение Custom Fields и повторите попытку.'
                );
                reject(err);
              });
          });
      });
    },
  },
};
</script>

<style scoped>
.input-group-text {
  color: #999;
}
.fields {
  margin-left: -50px;
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
/* generated by https://loading.io/ */
</style>
