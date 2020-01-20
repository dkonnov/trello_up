<template>
  <div>
    <div
      v-if="showAlert"
      class="alert alert-info alert-dismissible fade show"
      role="alert"
    >
      Пожалуйста, заполните ваши данные в разделе
      <router-link to="/accaunt">
        <u>Профиль</u>
      </router-link>
    </div>

    <center>
      <h2 class="title" style="color: #3c4858">Новая задача</h2>
    </center>

    <form @submit.prevent="sendTicket">
      <div class="form-group" :class="{ 'has-danger': $v.name.$error }">
        <label>Задача</label>
        <input
          type="text"
          v-model="name"
          id="name"
          @input="$v.name.$touch"
          class="form-control"
        />
        <small
          id="emailHelp"
          class="form-text text-muted"
          v-if="!$v.name.required"
          >Обязательное поле</small
        >
      </div>
      <div class="form-group">
        <label>Описание задачи</label>
        <textarea
          class="form-control"
          v-model="desc"
          rows="4"
          placeholder
        ></textarea>
        <small id="emailHelp" class="form-text text-muted"
          >Максимально подробно опишите вашу заявку. Заявка должна содержать
          идентификационные номера, модели устройств или сущностей, текст
          возникшей ошибки. В случае возникновения проблемы опишите
          последовательность выполнения действий.</small
        >
      </div>

      <center>
        <button
          type="submit"
          class="btn btn-primary btn-round"
          :disabled="$v.$invalid"
        >
          Подать заявку
        </button>
        <button
          type="button"
          class="btn btn-primary btn-link"
          @click="clearForm"
        >
          Очистить
        </button>
        <br />
      </center>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { eventEmitter } from "./../main";
import { required } from "vuelidate/lib/validators";
// import * as fb from "firebase";

const key = "2a754a93fa902b29d2694a2f71af3f83";
const token =
  "b5123e80de5b5de7d21f46a754d8f97e6013facb5d0d6b5d2fcc2484b5530519";
const board = "fsA5vKgk";

export default {
  name: "mainCard",
  data() {
    return {
      name: "",
      desc: "",
      selectedUser: ""
    };
  },
  validations: {
    name: {
      required
    }
  },
  mounted() {
    // своебразная защита роута
    if (!this.$store.state.user.uid) {
      this.$router.push("/");
    }
  },
  computed: {
    showAlert() {
      let res;
      if (!this.$store.state.user.displayName) {
        res = true;
      } else {
        res = false;
      }
      return res;
    }
  },
  methods: {
    clearForm() {
      this.name = "";
      this.desc = "";
    },
    sendTicket() {
      // получим ID первого листа
      axios
        .get(
          "https://api.trello.com/1/boards/" +
            board +
            "/lists?cards=open&card_fields=all&filter=open&fields=all&key=" +
            key +
            "&token=" +
            token
        )
        .then(response => {
          // публикуем новую карточку
          axios
            .post(
              "https://api.trello.com/1/cards?name=" +
                this.name +
                "&desc=" +
                this.desc +
                "&idList=" +
                response.data[0].id +
                "&keepFromSource=all&pos=top&key=" +
                key +
                "&token=" +
                token
            )
            .then(response => {
              alert(this.$store.state.customFieldsId);
              // добавим пользователя, создавшего задачу
              axios
                .put(
                  "https://api.trello.com/1/card/" +
                    response.data.id +
                    "/customField/" +
                    this.$store.state.customFieldsId +
                    "/item?idValue=" +
                    this.$store.state.userData.cf +
                    "&key=" +
                    key +
                    "&token=" +
                    token
                )
                .then(() => {
                  this.$store.dispatch("getCards", this.$store.state.user);
                });

              // напишем сообщение об успешной публикации карточки
              eventEmitter.$emit(
                "showMessage",
                "Задача добавлена! В ближайшее время она будет распределена на специалиста. Ожидайте."
              );
              this.$store.dispatch("getCards", this.$store.state.user);
              this.name = "";
              this.desc = "";
              //setTimeout(this.loadCards(), 2000);
            });
        });
    }
  }
};
</script>

<style lang="sass" scoped>
.alert.alert-info
  border-radius: 6px
</style>
