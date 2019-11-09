<template>
  <div class="login">
    <center>
      <div class="info">
        <div class="icon icon-primary">
          <i class="material-icons">account_circle</i>
        </div>
        <h4 class="info-title">Авторизация</h4>
      </div>

      <div class="form-group" :class="{'has-danger': $v.selectedUser.$error}">
        <label for="exampleFormControlSelect2">Пользователь</label>

        <select
          @change="loadCards"
          @blur="$v.selectedUser.$touch"
          data-live-search="true"
          id="selectedUser"
          class="form-control selectpicker show-tick"
          v-model="selectedUser"
          data-style="btn btn-link"
        >
          <option data-hidden="true"></option>
          <option v-for="user of users" :value="user.id" :key="user">{{user.value.text}}</option>
        </select>
        <small
          id="emailHelp"
          class="form-text text-muted"
          v-if="!$v.selectedUser.required"
        >Обязательное поле</small>
      </div>

      <router-link to="newtask">
        <button class="btn btn-primary btn-round">Вход</button>
      </router-link>
      <br />
      <button type="button" class="btn btn-secondary btn-round" disabled>Регистрация</button>
    </center>
  </div>
</template>


<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";

const key = "2a754a93fa902b29d2694a2f71af3f83";
const token =
  "b5123e80de5b5de7d21f46a754d8f97e6013facb5d0d6b5d2fcc2484b5530519";
const board = "fsA5vKgk";

export default {
  name: "hollowCard",
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
  mounted() {
    axios
      .get(
        "https://api.trello.com/1/boards/" +
          board +
          "/customFields?key=" +
          key +
          "&token=" +
          token
      )
      .then(response => {
        this.users = response.data[0].options;
        this.$nextTick(function() {
          $("#selectedUser").selectpicker("refresh");
        });
        this.cfid = response.data[0].id;
      });
  }
};
</script>

<style lang="sass" scoped>
.login
    padding-left: 100px
    padding-right: 100px
</style>