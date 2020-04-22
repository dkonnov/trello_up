<template>
  <div>
    <div v-if="showAlert" class="alert alert-info alert-dismissible fade show" role="alert">
      {{ $t('message.add.alertAddInfo') }}
      <router-link to="/accaunt">
        <u>{{ $t('message.accaut.main') }}</u>
      </router-link>
    </div>

    <center>
      <h2 class="title" style="color: #3c4858;">
        {{ $t('message.add.newTask') }}
      </h2>
    </center>

    <form @submit.prevent="sendTicket">
      <div class="form-group" :class="{ 'has-danger': $v.name.$error }">
        <label> {{ $t('message.add.topic') }}</label>
        <input type="text" v-model="name" id="name" @input="$v.name.$touch" class="form-control" />
        <small id="emailHelp" class="form-text text-muted" v-if="!$v.name.required">{{
          $t('message.requered')
        }}</small>
      </div>
      <div class="form-group">
        <label> {{ $t('message.add.desc') }}</label>
        <textarea class="form-control" v-model="desc" rows="4" placeholder />
        <small id="emailHelp" class="form-text text-muted"
          >{{ $t('message.add.desolation') }}
        </small>
      </div>

      <center>
        <button type="submit" class="btn btn-primary btn-round" :disabled="$v.$invalid">
          {{ $t('message.add.send') }}
        </button>
        <button type="button" class="btn btn-primary btn-link" @click="clearForm">
          {{ $t('message.clear') }}
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
      selectedUser: '',
      showAlert: false,
    };
  },
  validations: {
    name: {
      required,
    },
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
    },
    customfield() {
      return this.$store.state.boards.currentBoard.customfield;
    },
  },
  methods: {
    clearForm() {
      this.name = '';
      this.desc = '';
    },
    sendTicket() {
      // проверим наличие элемента Custom Filed для пользователя на текущей доске
      let cf;
      let cfId;
      if (!this.userData.cf) {
        cf = [];
      } else {
        cf = this.userData.cf;
      }
      const cb = this.currentBoard;
      const res = cf.filter((b) => b.board === cb);

      if (res.length === 0) {
        // подготовим значение
        let option;
        if (this.user.displayName) {
          option = `${this.user.displayName} (${this.userData.tel}, ${this.userData.place}, ${this.user.email})`;
        } else {
          option = this.user.email;
        }
        // добавим в trello соответствующий costom field
        axios
          .post(
            `https://api.trello.com/1/customField/${this.customfield}/options?key=${key}&token=${token}`,
            {
              value: { text: option },
              pos: 'bottom',
            }
          )
          .then((response) => {
            cf.push({
              board: this.currentBoard,
              board_cf: this.customfield,
              id: response.data.id,
            });
            this.$store.commit('updateUserData', {
              cf,
            });
            cfId = response.data.id;
          });
      } else {
        cfId = res[0].id;
      }

      // получим ID первого листа
      axios
        .get(
          `https://api.trello.com/1/boards/${this.$store.state.boards.currentBoard.board}/lists?cards=open&card_fields=all&filter=open&fields=all&key=${key}&token=${token}`
        )
        .then((response) => {
          // публикуем новую карточку
          axios
            .post(
              `https://api.trello.com/1/cards?name=${this.name}&desc=${this.desc}&idList=${response.data[0].id}&keepFromSource=all&pos=top&key=${key}&token=${token}`
            )
            .then((response2) => {
              // добавим пользователя, создавшего задачу
              axios
                .put(
                  `https://api.trello.com/1/card/${response2.data.id}/customField/${this.customfield}/item?idValue=${cfId}&key=${key}&token=${token}`
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
            });
        });
    },
  },
};
</script>

<style lang="sass" scoped>
.alert.alert-info
  border-radius: 6px
</style>
