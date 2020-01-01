<template>
  <div class="restore">
    <center>
      <div class="info">
        <div class="icon icon-primary">
          <i class="material-icons">assignment_ind</i>
        </div>
        <h4 class="info-title">Восстановление доступа</h4>
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
            <small
              v-if="$v.email.$error"
              class="form-text text-muteds small-alert"
              >Необходимо ввести адрес электронной почты на который будет
              отправлена ссылка.</small
            >
          </div>

          <button
            :disabled="$v.$invalid"
            type="submit"
            class="btn btn-primary btn-round"
          >
            Отправить ссылку
          </button>
          <br />
          <router-link to="/">
            <button type="button" class="btn btn-secondary btn-round">
              Назад
            </button>
          </router-link>
        </div>
      </form>
    </center>
  </div>
</template>

<script>
//import axios from "axios";
import { required, email } from "vuelidate/lib/validators/";
//import { eventEmitter } from "./../main";
//import * as fb from "firebase";

export default {
  data() {
    return {
      email: ""
    };
  },
  methods: {
    send() {}
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
  padding-left: 100px
  padding-right: 100px
.form-control-feedback
    margin-top: -28px
.small-alert
  padding-left: 55px
  text-align: left
</style>
