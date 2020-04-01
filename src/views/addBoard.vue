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
              <span class="input-group-text">
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
        </button>

        <br />
        <a @click="$router.go(-1)">
          <button type="button" class="btn btn-secondary btn-round">
            Назад
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
      loading: false
    };
  },
  validations: {
    board: {
      required,
      url,
      minLength: minLength(28),
      validID: function() {
        let res;
        let arr = this.board.split('/');
        if (arr.length > 3) {
          this.boardId = arr[4];
          arr[4].length === 8 ? (res = true) : (res = false);
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
      // проверим доступность доски
      axios
        .get(
          `https://api.trello.com/1/boards/${this.boardId}/?cards=open&fields=all&card_customFieldItems=true&key=${key}&token=${token}`
        )
        .then(() => {
          // Добавим CustomFields
          this.addCustomField(this.boardId)
            .then(result => {
              console.log('Начинаем создавать запись в БД');
              this.saveBoardToFB(result)
                .then(() => {
                  alert('ok');
                })
                .catch(err => {
                  alert(err);
                });
            })
            .catch(error => {
              eventEmitter.$emit(
                'showMessage',
                `Мы пытаемся создать на вашей доске Custom Field, но что-то поло не так. Возможные причины: элемент Custom Field уже существует и его надо удалить, либо дополнение Custom Field не подключено к доске. Ошибка: ${error}. `
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
    },
    uniqBoard(value) {
      // проверим доску на уникальность
      return new Promise((resolve, reject) => {
        fb.database()
          .ref('boards')
          .orderByChild('board')
          .equalTo(value)
          .on('child_added', snapshot => {
            const board = snapshot.val().board;
            if (!board) {
              resolve(true);
            } else {
              reject(false);
            }
          });
      });
    },
    saveBoardToFB(customfield) {
      // добавляем доску

      return new Promise((resolve, reject) => {
        console.log('Зашли в промис');
        fb.database()
          .ref('boards/')
          .push({
            user_id: this.$store.state.user.uid,
            board: this.board,
            name: this.name,
            desc: this.desc,
            customfield
          })
          .then(() => {
            console.log('резолв');
            resolve();
            // this.loading = false;
            // this.$store.dispatch('getBoards');
            // eventEmitter.$emit(
            //   'showMessage',
            //   'Все поучилось! Теперь можно пользоваться доской и добавлять задачи через Trello Up!'
            // );
          })
          .catch(err => {
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
          .then(response => {
            axios
              .post(`https://api.trello.com/1/customFields`, {
                idModel: response.data.id,
                modelType: 'board',
                name: 'Trello Up User',
                key,
                token,
                pos: 'bottom',
                type: 'list',
                display_cardFront: false
              })
              .then(response => {
                resolve(response.data.id);
              })
              .catch(err => {
                eventEmitter.$emit(
                  'showMessage',
                  'Пожалуйста, подключите к доске улучшение Custom Fields и повторите попытку.'
                );
                reject(err);
              });
          });
      });
    }
  }
};

// axios
//   .get(
//     `https://api.trello.com/1/boards/${this.board}/customFields?key=${key}&token=${token}`
//   )
//   .then(response => {
// if (response.data[0].id) {
// проверим наличие такой доски
// fsA5vKgk
// this.demo(this.board).then(response => {
//   if (response == 'catch') {
//     this.loading = false;
//     eventEmitter.$emit(
//       'showMessage',
//       'Данная доска уже подключена к Trello Up. Возможно она подключена не вами, а другим пользователем сервиса.'
//     );
//   } else {
//     // добавляем доску
//     fb.database()
//       .ref('boards/')
//       .push({
//         user_id: this.$store.state.user.uid,
//         board: this.board,
//         name: this.name,
//         desc: this.desc
//       })
//       .then(() => {
//         this.loading = false;
//         this.$store.dispatch('getBoards');
//         eventEmitter.$emit(
//           'showMessage',
//           'Все поучилось! Теперь можно пользоваться доской и добавлять задачи через Trello Up!'
//         );
//       });
//   }
// });
//  }
//  });
// .catch(() => {
//   this.loading = false;
//   // SJEN5ZMP
//   //this.add();
//   eventEmitter.$emit(
//     'showMessage',
//     "К доске удалось подключиться, но для работы необходимо улучшение Custom Fields. Добавьте его в Trello и создайте первый элемент c типом 'Выпадающий список'."
//   );
// });
</script>

<style lang="sass" scoped>
.input-group-text
  color: #999
.fields
  margin-left: -50px
.accaunt
  padding-left: 75px
  padding-right: 75px
.form-control-feedback
    margin-top: -28px
.small-alert
  padding-left: 55px
  text-align: left
</style>
