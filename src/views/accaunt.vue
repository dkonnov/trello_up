<template>
  <div class="accaunt">
    <center>
      <div class="info">
        <div class="icon icon-primary">
          <i class="material-icons">assignment_ind</i>
        </div>
        <h4 class="info-title">{{ $t('message.accaut.main') }}</h4>
      </div>

      <form @submit.prevent="accaunt">
        <div class="fields">
          <div
            class="input-group form-group label-floating"
            :class="{ 'has-danger': $v.name.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">face</i>
              </span>
            </div>
            <input
              v-model="name"
              @input="$v.name.$touch"
              type="text"
              class="form-control"
              :placeholder="$t('message.accaut.yourName')"
            />
            <button v-if="$v.name.$error" class="form-control-feedback">
              <i class="material-icons">clear</i>
            </button>
            <small v-if="$v.name.$error" class="form-text text-muteds small-alert">{{
              $t('message.accaut.label1')
            }}</small>
          </div>

          <div
            class="input-group form-group label-floating"
            :class="{ 'has-danger': $v.tel.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">call</i>
              </span>
            </div>
            <input
              v-model="tel"
              @input="$v.tel.$touch"
              type="text"
              class="form-control"
              :placeholder="$t('message.accaut.phoneNumber')"
            />
            <button v-if="$v.tel.$error" class="form-control-feedback">
              <i class="material-icons">clear</i>
            </button>
            <small v-if="$v.tel.$error" class="form-text text-muteds small-alert">{{
              $t('message.accaut.label2')
            }}</small>
          </div>

          <div class="input-group form-group label-floating">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">apartment</i>
              </span>
            </div>
            <input
              v-model="place"
              type="text"
              class="form-control"
              :placeholder="$t('message.accaut.location')"
            />
            <button class="form-control-feedback">
              <i class="material-icons">clear</i>
            </button>
          </div>

          <br />
        </div>
        <button :disabled="$v.$invalid" type="submit" class="btn btn-primary btn-round">
          {{ $t('message.save') }}
        </button>
        <br />
        <router-link to="/changepassword">
          <button type="button" class="btn btn-secondary btn-round">
            {{ $t('message.changePassword') }}
          </button>
        </router-link>
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
import { required } from 'vuelidate/lib/validators/';
import * as fb from 'firebase';
import { mapState } from 'vuex';
import qs from 'qs';
// eslint-disable-next-line import/no-cycle
import { eventEmitter } from '../main.js';
import { http } from '../http.js';

export default {
  data() {
    return {
      name: '',
      tel: '',
      place: ''
    };
  },
  validations: {
    name: {
      required
    },
    tel: {
      required
    }
  },
  computed: {
    ...mapState(['userData', 'user', 'boards']),
    uid() {
      return this.$store.state.user.uid;
    }
  },
  methods: {
    accaunt() {
      this.$store.commit('updateUserData', {
        tel: this.tel,
        place: this.place
      });
      fb.auth()
        .currentUser.updateProfile({
          displayName: this.name
        })
        .then(() => {
          // изменим значения CustomFields
          if (this.userData.cf) {
            // подготовим значение
            const option = `${this.name} (${this.tel}, ${this.place}, ${this.user.email})`;
            this.userData.cf.forEach(value => {
              http.put(
                `trello/customField/${value.board_cf}/options/${value.id}/?`,
                qs.stringify({
                  value: { text: option }
                  // eslint-disable-next-line comma-dangle
                }),
                {
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }
              );
            });
          }

          this.$router.go(-1);
          eventEmitter.$emit('showMessage', this.$t('message.accaut.saveModal'));
        })
        .catch(error => {
          eventEmitter.$emit('showMessage', error.message);
        });
    }
  },
  beforeMount() {
    // своебразная защита роута
    fb.auth().onAuthStateChanged(user => {
      if (!user) {
        this.$router.push('/login/back');
      }
    });
    this.name = this.$store.state.user.displayName;
    this.tel = this.userData.tel;
    this.place = this.userData.place;
  }
};
</script>

<style lang="sass" scoped>
.input-group-text
  color: #999
.fields
  margin-left: -50px
.accaunt
  padding-left: 75px
  padding-right: 75px
  min-width: 350px
.form-control-feedback
  margin-top: -28px
.small-alert
  padding-left: 55px
  text-align: left
</style>
