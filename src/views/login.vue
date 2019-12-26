<template>
  <div class="login">
    <center>
      <div class="info">
        <div class="icon icon-primary">
          <i class="material-icons">account_circle</i>
        </div>
        <h4 class="info-title">Авторизация</h4>
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
            <small
              v-if="$v.email.$error"
              class="form-text text-muteds small-alert"
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
          <small
            v-if="$v.password.$error"
            class="form-text text-muteds small-alert"
            >Минимум 6 символов.</small
          >
        </div>
        <button
          class="btn btn-primary btn-round"
          :disabled="$v.$invalid"
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
      <router-link to="/registration">
        <button type="button" class="btn btn-secondary btn-round" disabled>
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
      password: ""
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
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.commit("setCurrentUser", user.user);
          this.$router.push("/tasks");
        })
        .catch(error => {
          eventEmitter.$emit("showMessage", error.message);
        });
      //
      // this.$store.dispatch("getLists");
      // this.$store.dispatch("getMembers");
      // this.$store.dispatch("getCards", this.selectedUser);
      // this.$router.push("/tasks");
    }
  },
  beforeMount() {
    this.$store.dispatch("getUsers");
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
    padding-left: 100px
    padding-right: 100px
.bootstrap-select.btn-group .dropdown-toggle .filter-option
  text-align: center
</style>
