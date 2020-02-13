<template>
  <div class="changepassword">
    <center>
      <div class="info">
        <div class="icon icon-primary">
          <i class="material-icons">vpn_key</i>
        </div>
        <h4 class="info-title">Смена пароля</h4>
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
        </div>
        <br />

        <button
          :disabled="$v.$invalid || loading"
          type="submit"
          class="btn btn-primary btn-round"
        >
          Сменить
        </button>
        <br />
      </form>
      <router-link to="/tasks">
        <button type="button" class="btn btn-secondary btn-round">
          Назад
        </button>
      </router-link>
    </center>
  </div>
</template>

<script>
import { minLength, sameAs } from "vuelidate/lib/validators/";
import { eventEmitter } from "./../main";
import * as fb from "firebase";

export default {
  data() {
    return {
      password: "",
      password2: "",
      uid: "",
      loading: false
    };
  },
  mounted() {
    // своебразная защита роута
    if (!this.$store.state.user.uid) {
      this.$router.push("/");
    }
  },
  methods: {
    change() {
      this.loading = true;
      fb.auth()
        .currentUser.updatePassword(this.password)
        .then(() => {
          eventEmitter.$emit("showMessage", "Пароль изменен.");
          this.$router.push("/add");
        })
        .catch(error => {
          eventEmitter.$emit("showMessage", error.message);
          this.loading = false;
        });
    }
  },
  validations: {
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
.input-group-text
  color: #999
.fields
  margin-left: -50px
.changepassword
  padding-left: 100px
  padding-right: 100px
.form-control-feedback
    margin-top: -28px
.small-alert
  padding-left: 55px
  text-align: left
</style>
