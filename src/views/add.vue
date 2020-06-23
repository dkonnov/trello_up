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
/* eslint-disable comma-dangle */
import { required } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import qs from 'qs';
import { eventEmitter } from '../main.js';
import { http } from '../http.js';

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
    current() {
      return this.$store.state.boards.currentBoard;
    }
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
      const cb = this.current.board;
      const res = cf.filter(b => b.board === cb);

      if (res.length === 0) {
        // подготовим значение
        let option;
        if (this.user.displayName) {
          option = `${this.user.displayName} (${this.userData.tel}, ${this.userData.place}, ${this.user.email})`;
        } else {
          option = this.user.email;
        }

        // добавим в trello соответствующий costom field
        http
          .post(
            `trello/customField/${this.current.customfield}/options/?`,
            qs.stringify({
              value: { text: option },
              pos: 'bottom'
            }),
            {
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }
          )
          .then(response => {
            cf.push({
              board_id: this.current.id,
              board: this.current.board,
              name: this.current.name,
              board_cf: this.current.customfield,
              id: response.data.id
            });
            this.$store.commit('updateUserData', {
              cf
            });
            cfId = response.data.id;
          });
      } else {
        cfId = res[0].id;
      }

      // получим ID первого листа
      http
        .get(
          `trello/boards/${this.current.board}/lists?cards=open&card_fields=all&filter=open&fields=all`
        )
        .then(response => {
          // публикуем новую карточку
          http
            .post(
              `trello/cards?name=${this.name}&desc=${this.desc}&idList=${response.data[0].id}&keepFromSource=all&pos=top&subscribed=true`
            )
            .then(response2 => {
              // добавим пользователя, создавшего задачу
              console.log(`${this.current.customfield}`);
              http
                .put(
                  `trello/card/${response2.data.id}/customField/${this.current.customfield}/item?idValue=${cfId}`,
                  {},
                  {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                  }
                )
                .then(() => {
                  this.$store.dispatch('getCards', this.$store.state.user);
                });

              // напишем сообщение об успешной публикации карточки
              eventEmitter.$emit('showMessage', this.$t('message.tasks.add'));
              this.$store.dispatch('getCards', this.$store.state.user);
              this.name = '';
              this.desc = '';
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
