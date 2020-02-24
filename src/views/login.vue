<template>
  <div class="login">
    <center>
      <div class="info">
        <div class="icon icon-primary">
          <i class="material-icons">account_circle</i>
        </div>
        <h4 class="info-title">Вход</h4>
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
              placeholder="Электронная почта ..."
            />
            <button v-if="$v.email.$error" class="form-control-feedback">
              <i class="material-icons">clear</i>
            </button>
          </div>
          <small
            v-if="$v.email.$error"
            class="form-text text-muteds small-alert"
            >Необходимо ввести адрес электронной почты, который вы использовали
            при регистрации.</small
          >

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
          <small
            v-if="$v.password.$error"
            class="form-text text-muteds small-alert"
            >Минимум 6 символов.</small
          >
        </div>
        <button
          class="btn btn-primary btn-round"
          :disabled="$v.$invalid || loading"
          type="submit"
        >
          Вход
        </button>
      </form>
      <br />
      <router-link to="/registration">
        <button type="button" class="btn btn-secondary btn-round">
          Регистрация
        </button>
      </router-link>
      <br />
      <router-link to="/restore">
        <button type="button" class="btn btn-secondary btn-round">
          Забыл пароль
        </button>
      </router-link>
    </center>
  </div>
</template>

<script>
import { eventEmitter } from "./../main";
import * as fb from "firebase";
import { required, email, minLength } from "vuelidate/lib/validators/";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      loading: false
    };
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
  methods: {
    login() {
      this.loading = true;
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          // запишем данные о пользователе
          this.$store.commit("setUser", user.user);
          // получим дополнительные данные о пользователе
          this.$store.dispatch("getUserData");
          this.$store.dispatch("getBackgrounds");
          this.$store.dispatch("getBoards");
          this.$router.push("/boards");
        })
        .catch(error => {
          // отобразим ошибку логина
          this.loading = false;
          eventEmitter.$emit("showMessage", error.message);
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
.small-alert
  padding-left: 55px
  text-align: left
.form-control-feedback
    margin-top: -28px
.login
    padding-left: 75px
    padding-right: 75px
    max-width: 350px
.bootstrap-select.btn-group .dropdown-toggle .filter-option
  text-align: center
</style>
