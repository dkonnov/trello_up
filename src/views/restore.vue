<template>
  <div class="restore">
    <center>
      <div class="info">
        <div class="icon icon-primary">
          <i class="material-icons">assignment_ind</i>
        </div>
        <h4 class="info-title">
          Восстановление доступа
        </h4>
        <p>
          Введите адрес электронной почты, который вы указывали при регистрации, и мы отправим вам
          на него ссылку для смены пароля.
        </p>
      </div>
      <form @submit.prevent="send">
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
              placeholder="Электронная почта ..."
            />
            <button v-if="$v.email.$error" class="form-control-feedback">
              <i class="material-icons">clear</i>
            </button>
            <small v-if="$v.email.$error" class="form-text text-muteds small-alert"
              >Необходимо ввести адрес электронной почты на который будет отправлена ссылка.</small
            >
          </div>
        </div>
        <button :disabled="$v.$invalid" type="submit" class="btn btn-primary btn-round">
          Отправить ссылку
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
import { required, email } from 'vuelidate/lib/validators/';
import * as fb from 'firebase';

export default {
  data() {
    return {
      email: ''
    };
  },
  methods: {
    send() {
      fb.auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.$eventEmitter.$emit(
            'showMessage',
            'Мы отправили вам письмо со ссылкой для восстановления доступа. Если вы его не нашли, то возможно оно по ошибке попало в папку «Спам».'
          );
          this.$router.push('/');
        })
        .catch(error => {
          this.$eventEmitter.$emit('showMessage', error.message);
        });
    }
  },
  validations: {
    email: {
      email,
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
.restore
  padding-left: 75px
  padding-right: 75px
  width: 350px
.form-control-feedback
    margin-top: -28px
.small-alert
  padding-left: 55px
  text-align: left
</style>
