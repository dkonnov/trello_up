<template>
  <div>
    <div v-if="showAlert" class="alert alert-info alert-dismissible fade show" role="alert">
      Пожалуйста, заполните ваши данные в разделе
      <router-link to="/accaunt">
        <u>Профиль</u>
      </router-link>
    </div>

    <center>
      <h2 class="title" style="color: #3c4858">
        Новая задача
      </h2>
    </center>

    <form @submit.prevent="sendTicket">
      <div class="form-group" :class="{ 'has-danger': $v.name.$error }">
        <label>Задача</label>
        <input type="text" v-model="name" id="name" @input="$v.name.$touch" class="form-control" />
        <small id="emailHelp" class="form-text text-muted" v-if="!$v.name.required"
          >Обязательное поле</small
        >
      </div>
      <div class="form-group">
        <label>Описание задачи</label>
        <textarea class="form-control" v-model="desc" rows="4" placeholder />
        <small id="emailHelp" class="form-text text-muted"
          >Максимально подробно опишите вашу заявку. Заявка должна содержать идентификационные
          номера, модели устройств или сущностей, текст возникшей ошибки. В случае возникновения
          проблемы опишите последовательность выполнения действий.</small
        >
      </div>

      <center>
        <button type="submit" class="btn btn-primary btn-round" :disabled="$v.$invalid">
          Подать заявку
        </button>
        <button type="button" class="btn btn-primary btn-link" @click="clearForm">
          Очистить
        </button>
        <br />
      </center>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { required } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import { eventEmitter } from '../main.js';

const key = 'd02290573e1e3121c00a8bcb3bd08a1f';
const token = '57b6866c777bc31f1f6ca58c1a9a540873221292bbb1cf7ccfdd027d08c54349';

export default {
  name: 'MainCard',
  data() {
    return {
      name: '',
      desc: '',
      selectedUser: ''
    };
  },
  validations: {
    name: {
      required
    }
  },
  computed: {
    ...mapState(['userData', 'user']),
    showAlert() {
      let res;
      if (!this.$store.state.user.displayName) {
        res = true;
      } else {
        res = false;
      }
      return res;
    },
    currentBoard() {
      return this.$store.state.boards.currentBoard.board;
    }
  },
  methods: {
    clearForm() {
      this.name = '';
      this.desc = '';
    },
    sendTicket() {
      // проверим наличие элемента Custom Filed для пользователя на текущей доске
      let cf, cf_id, res;
      if (!this.userData.cf) {
        cf = [];
      } else {
        cf = this.userData.cf;
      }
      let cb = this.currentBoard;
      res = cf.filter(function(b) {
        return b.board == cb;
      });

      if (res.length == 0) {
        // подготовим значение
        let option;
        if (this.user.displayName) {
          option =
            this.user.displayName +
            ' (' +
            this.userData.tel +
            ', ' +
            this.userData.place +
            ', ' +
            this.user.email +
            ')';
        } else {
          option = this.user.email;
        }
        // добавим в trello соответствующий costom field
        axios
          .post(
            'https://api.trello.com/1/customField/' +
              this.$store.state.customFieldsId +
              '/options' +
              '?key=' +
              key +
              '&token=' +
              token,
            {
              value: { text: option },
              pos: 'bottom'
            }
          )
          .then(response => {
            cf.push({
              board: this.currentBoard,
              board_cf: this.$store.state.customFieldsId,
              id: response.data.id
            });
            this.$store.commit('updateUserData', {
              cf: cf
            });
            cf_id = response.data.id;
          });
      } else {
        cf_id = res[0].id;
      }

      // получим ID первого листа
      axios
        .get(
          'https://api.trello.com/1/boards/' +
            this.$store.state.boards.currentBoard.board +
            '/lists?cards=open&card_fields=all&filter=open&fields=all&key=' +
            key +
            '&token=' +
            token
        )
        .then(response => {
          // публикуем новую карточку
          axios
            .post(
              'https://api.trello.com/1/cards?name=' +
                this.name +
                '&desc=' +
                this.desc +
                '&idList=' +
                response.data[0].id +
                '&keepFromSource=all&pos=top&key=' +
                key +
                '&token=' +
                token
            )
            .then(response => {
              // добавим пользователя, создавшего задачу
              axios
                .put(
                  'https://api.trello.com/1/card/' +
                    response.data.id +
                    '/customField/' +
                    this.$store.state.customFieldsId +
                    '/item?idValue=' +
                    cf_id +
                    '&key=' +
                    key +
                    '&token=' +
                    token
                )
                .then(() => {
                  this.$store.dispatch('getCards', this.$store.state.user);
                });

              // напишем сообщение об успешной публикации карточки
              eventEmitter.$emit(
                'showMessage',
                'Задача добавлена! В ближайшее время она будет распределена на специалиста. Ожидайте.'
              );
              this.$store.dispatch('getCards', this.$store.state.user);
              this.name = '';
              this.desc = '';
              //setTimeout(this.loadCards(), 2000);
            });
        });
    }
  }
};
</script>

<style lang="sass" scoped>
.alert.alert-info
  border-radius: 6px
</style>
