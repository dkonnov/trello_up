<template>
  <div class="changepassword">
    <center>
      <div class="info">
        <div class="icon icon-primary">
          <i class="material-icons">vpn_key</i>
        </div>
        <h4 class="info-title">{{ $t('message.changePassword') }}</h4>
      </div>
      <form @submit.prevent="change">
        <div class="fields">
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
          <small v-if="$v.password.$error" class="form-text text-muteds small-alert">{{
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
          {{ $t('message.save') }}
        </button>
        <br />
      </form>
      <a @click="$router.go(-1)">
        <button type="button" class="btn btn-secondary btn-round">{{ $t('message.back') }}</button>
      </a>
    </center>
  </div>
</template>

<script>
import { minLength, sameAs, required } from 'vuelidate/lib/validators/';
import * as fb from 'firebase';
// eslint-disable-next-line import/no-cycle
import { eventEmitter } from '../main.js';

export default {
  data() {
    return {
      password: '',
      password2: '',
      uid: '',
      loading: false
    };
  },
  beforeMount() {
    // своебразная защита роута
    fb.auth().onAuthStateChanged(user => {
      if (!user) {
        this.$router.push('/login/back');
      }
    });
  },
  methods: {
    change() {
      this.loading = true;
      fb.auth()
        .currentUser.updatePassword(this.password)
        .then(() => {
          eventEmitter.$emit('showMessage', this.$('message.reg.changePasswordModal'));
          this.$router.push('/add');
        })
        .catch(error => {
          eventEmitter.$emit('showMessage', error.message);
          this.loading = false;
        });
    }
  },
  validations: {
    password: {
      minLength: minLength(6),
      required
    },
    password2: {
      sameAs: sameAs('password'),
      required
    }
  }
};
</script>

<style lang="sass" scoped>
.input-group-text
  color: #999
.fields
  margin-left: -50px
.changepassword
  padding-left: 75px
  padding-right: 75px
  min-width: 350px
.form-control-feedback
  margin-top: -28px
.small-alert
  padding-left: 55px
  text-align: left
</style>
