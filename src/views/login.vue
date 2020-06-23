<template>
  <div class="login">
    <center>
      <div class="info">
        <div class="icon icon-primary">
          <i class="material-icons">account_circle</i>
        </div>
        <h4 class="info-title">
          {{ $t('message.singIn') }}
        </h4>
      </div>

      <form @submit.prevent="login">
        <div class="fields">
          <div
            class="input-group form-group label-floating"
            :class="{ 'has-danger': $v.email.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">mail</i>
              </span>
            </div>
            <input
              v-model="email"
              @input="$v.email.$touch"
              type="email"
              class="form-control"
              :placeholder="$t('message.reg.email')"
            />
            <button v-if="$v.email.$error" class="form-control-feedback">
              <i class="material-icons">clear</i>
            </button>
            <small v-if="$v.email.$error" class="form-text text-muteds small-alert">{{
              $t('message.emailLabel')
            }}</small>
          </div>

          <div
            class="input-group form-group label-floating"
            :class="{ 'has-danger': $v.password.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">lock_outline</i>
              </span>
            </div>
            <input
              v-model="password"
              type="password"
              @input="$v.password.$touch"
              class="form-control"
              :placeholder="$t('message.reg.password')"
            />
            <button v-if="$v.password.$error" class="form-control-feedback">
              <i class="material-icons">clear</i>
            </button>
          </div>
          <small v-if="$v.email.$error" class="form-text text-muted small-alert">{{
            $t('message.passwordLabel')
          }}</small>
        </div>

        <button class="btn btn-primary btn-round" :disabled="$v.$invalid || loading" type="submit">
          {{ $t('message.singIn') }}
        </button>
      </form>
      <br />
      <router-link to="/registration">
        <button type="button" class="btn btn-secondary btn-round">
          {{ $t('message.createAccaut') }}
        </button>
      </router-link>
      <br />
      <router-link to="/restore">
        <button type="button" class="btn btn-secondary btn-round">
          {{ $t('message.forgotPassword') }}
        </button>
      </router-link>
    </center>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators/';
import * as fb from 'firebase';
// eslint-disable-next-line
import { eventEmitter } from '../main.js';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      loading: false
    };
  },
  methods: {
    login() {
      this.loading = true;
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          // запишем данные о пользователе
          this.$store.commit('setUser', user.user);
          // получим дополнительные данные о пользователе
          this.$store.dispatch('getUserData');
          this.$store.dispatch('getUserCards');
          this.$store.dispatch('getBoards');
          this.$store.dispatch('getBackgrounds');

          if (this.$route.params.back) {
            this.$router.go(-1);
          } else {
            this.$router.push('/boards');
          }
        })
        .catch(error => {
          // отобразим ошибку логина
          this.loading = false;
          eventEmitter.$emit('showMessage', error.message);
        });
    }
  },
  validations: {
    email: {
      email,
      required
    },
    password: {
      minLength: minLength(6)
    }
  },
  beforeMount() {
    // своебразная защита роута
    if (!this.$route.params.back) {
      fb.auth().onAuthStateChanged(user => {
        if (user) {
          this.$router.push('/boards');
        }
      });
    }
  }
};
</script>

<style lang="sass">
.input-group-text
  color: #999
.fields
  margin-left: -50px
  max-width: 225px
.small-alert
  padding-left: 55px
  text-align: left
.form-control-feedback
    margin-top: -28px
.login
    padding-left: 75px
    padding-right: 75px
.bootstrap-select.btn-group .dropdown-toggle .filter-option
  text-align: center
</style>
