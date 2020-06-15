<template>
  <div class="registration">
    <center>
      <div class="info">
        <div class="icon icon-primary">
          <i class="material-icons">assignment_ind</i>
        </div>
        <h4 class="info-title">
          {{ $t('message.createAccaut') }}
        </h4>
      </div>

      <form @submit.prevent="registration">
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
              $t('message.emailLabelInRegistration')
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
          <small v-if="$v.password.$error" class="form-text text-muted small-alert">{{
            $t('message.passwordLabel')
          }}</small>

          <div
            class="input-group form-group label-floating"
            :class="{ 'has-danger': $v.password2.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">lock_outline</i>
              </span>
            </div>
            <input
              v-model="password2"
              type="password"
              @input="$v.password2.$touch"
              class="form-control"
              :placeholder="$t('message.reg.password2')"
            />
            <button v-if="$v.password2.$error" class="form-control-feedback">
              <i class="material-icons">clear</i>
            </button>
          </div>
          <small v-if="$v.password2.$error" class="form-text text-muteds small-alert">{{
            $t('message.reg.notEqual')
          }}</small>
        </div>
        <br />

        <button :disabled="$v.$invalid || loading" type="submit" class="btn btn-primary btn-round">
          {{ $t('message.createAccaut') }}
        </button>
        <br />
      </form>
      <a @click="$router.go(-1)">
        <button type="button" class="btn btn-secondary btn-round">
          {{ $t('message.back') }}
        </button>
      </a>
    </center>
  </div>
</template>

<script>
import {
  required, email, minLength, sameAs
} from 'vuelidate/lib/validators/';
import * as fb from 'firebase';
// eslint-disable-next-line import/no-cycle
import { eventEmitter } from '../main.js';

export default {
  data() {
    return {
      email: '',
      password: '',
      password2: '',
      uid: '',
      loading: false
    };
  },
  methods: {
    registration() {
      this.loading = true;
      fb.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(response => {
          this.uid = response.user.uid;

          // запишем данные о пользователе
          fb.database()
            .ref(`users/${this.uid}`)
            .set({
              background: 'patrick-tomasso-1272187-unsplash.jpg'
            })
            .catch(error => {
              eventEmitter.$emit('showMessage', error.message);
            });

          // Отправим письмо о подтверждении почты
          fb.auth()
            .currentUser.sendEmailVerification()
            .then(() => {
              eventEmitter.$emit('showMessage', this.$('message.reg.registrationModal'));
            })
            .catch(error => {
              eventEmitter.$emit('showMessage', error.message);
            });
          this.$router.push('/');
          this.loading = false;
        })
        .catch(error => {
          eventEmitter.$emit('showMessage', error.message);
          this.loading = false;
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
    },
    password2: {
      sameAs: sameAs('password')
    }
  }
};
</script>

<style lang="sass" scoped>
.input-group-text
  color: #999
.fields
  margin-left: -50px
  max-width: 225px
.registration
  padding-left: 75px
  padding-right: 75px

.form-control-feedback
    margin-top: -28px
.small-alert
  padding-left: 55px
  text-align: left
</style>
