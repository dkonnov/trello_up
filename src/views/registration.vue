<template>
  <div class="registration">
    <center>
      <div class="info">
        <div class="icon icon-primary">
          <i class="material-icons">assignment_ind</i>
        </div>
        <h4 class="info-title">Регистрация</h4>
      </div>

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
          >Необходимо ввести адрес электронной почты, которого нет в
          системе.</small
        >
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
          placeholder="Пароль ..."
        />
        <button v-if="$v.password.$error" class="form-control-feedback">
          <i class="material-icons">clear</i>
        </button>
      </div>
      <small v-if="$v.password.$error" class="form-text text-muteds small-alert"
        >Минимум 6 символов.</small
      >

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
          placeholder="Пароль еще раз ..."
        />
        <button v-if="$v.password2.$error" class="form-control-feedback">
          <i class="material-icons">clear</i>
        </button>
      </div>
      <small
        v-if="$v.password2.$error"
        class="form-text text-muteds small-alert"
        >Пароли не совпадают.</small
      >
      <br />

      <button
        :disabled="$v.$invalid"
        @click="registration"
        class="btn btn-primary btn-round"
      >
        Зарегистрироваться
      </button>
      <br />
      <router-link to="/">
        <button type="button" class="btn btn-secondary btn-round">
          Назад
        </button>
      </router-link>
    </center>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators/";
import { eventEmitter } from "./../main";
import * as fb from "firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      password2: ""
    };
  },
  methods: {
    registration() {
      fb.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          eventEmitter.$emit(
            "showMessage",
            "Спасибо за регистрацию. Теперь можно войти в систему."
          );
          this.$router.push("/");
        })
        .catch(error => {
          eventEmitter.$emit("showMessage", error.message);
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
      sameAs: sameAs("password")
    }
  }
};
</script>

<style lang="sass" scoped>
.registration
  padding-left: 100px
  padding-right: 100px
.form-control-feedback
    margin-top: -28px
.small-alert
  padding-left: 55px
  text-align: left
</style>
