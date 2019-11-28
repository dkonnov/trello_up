<template>
  <div class="login">
    <center>
      <div class="info">
        <div class="icon icon-primary">
          <i class="material-icons">account_circle</i>
        </div>
        <h4 class="info-title">Авторизация</h4>
      </div>

      <div class="form-group" :class="{ 'has-danger': $v.selectedUser.$error }">
        <label for="exampleFormControlSelect2">Пользователь</label>

        <select
          @blur="$v.selectedUser.$touch"
          data-live-search="true"
          id="selectedUser"
          class="form-control selectpicker show-tick"
          v-model="selectedUser"
          data-style="btn btn-link"
        >
          <option data-hidden="true"></option>
          <option
            v-for="user of this.$store.state.users"
            :value="user.id"
            :key="user"
            >{{ user.value.text }}</option
          >
        </select>
        <small
          id="emailHelp"
          class="form-text text-muted"
          v-if="!$v.selectedUser.required"
          >Обязательное поле</small
        >
      </div>

      <button
        class="btn btn-primary btn-round"
        :disabled="$v.$invalid"
        @click="login"
      >
        Вход
      </button>
      <br />
      <button type="button" class="btn btn-secondary btn-round" disabled>
        Регистрация
      </button>
    </center>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "login",
  data() {
    return {
      selectedUser: "",
      users: []
    };
  },
  validations: {
    selectedUser: {
      required
    }
  },
  methods: {
    login() {
      this.$store.commit("setCurrentUser", this.selectedUser);
      this.$store.dispatch("getLists");
      this.$store.dispatch("getMembers");
      this.$store.dispatch("getCards");
      this.$router.push("/tasks");
    }
  },
  mounted() {
    // получим первоначальные сведения о пользователе, вошедшем в систему
    this.$store.dispatch("getUsers");
    this.$nextTick(function() {
      $("#selectedUser").selectpicker("refresh");
    });
  }
};
</script>

<style lang="sass">
.login
    padding-left: 100px
    padding-right: 100px
.bootstrap-select.btn-group .dropdown-toggle .filter-option
  text-align: center
</style>
