<template>
  <div class="accaunt">
    <center>
      <div class="info">
        <div class="icon icon-primary">
          <i class="material-icons">assignment_ind</i>
        </div>
        <h4 class="info-title">Ваш аккаунт</h4>
      </div>

      <form @submit.prevent="accaunt">
        <div class="fields">
          <div
            class="input-group form-group label-floating"
            :class="{ 'has-danger': $v.name.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">face</i>
              </span>
            </div>
            <input
              v-model="name"
              @input="$v.name.$touch"
              type="text"
              class="form-control"
              placeholder="Ваше имя ..."
            />
            <button v-if="$v.name.$error" class="form-control-feedback">
              <i class="material-icons">clear</i>
            </button>
            <small
              v-if="$v.name.$error"
              class="form-text text-muteds small-alert"
              >Необходимо ввести ваше имя, чтобы специалист знал как к вам
              обратиться.</small
            >
          </div>

          <div
            class="input-group form-group label-floating"
            :class="{ 'has-danger': $v.tel.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">call</i>
              </span>
            </div>
            <input
              v-model="tel"
              @input="$v.tel.$touch"
              type="text"
              class="form-control"
              placeholder="Номер телефона ..."
            />
            <button v-if="$v.tel.$error" class="form-control-feedback">
              <i class="material-icons">clear</i>
            </button>
            <small
              v-if="$v.tel.$error"
              class="form-text text-muteds small-alert"
              >Для того чтобы с вами могли связаться, укажите свой номер
              телефона.</small
            >
          </div>

          <div
            class="input-group form-group label-floating"
            :class="{ 'has-danger': $v.place.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">apartment</i>
              </span>
            </div>
            <input
              v-model="place"
              @input="$v.place.$touch"
              type="text"
              class="form-control"
              placeholder="Место нахождения  ..."
            />
            <button v-if="$v.place.$error" class="form-control-feedback">
              <i class="material-icons">clear</i>
            </button>
            <small
              v-if="$v.place.$error"
              class="form-text text-muteds small-alert"
              >Для того чтобы с вами могли связаться, укажите свой номер
              телефона.</small
            >
          </div>

          <br />
        </div>
        <button
          :disabled="$v.$invalid"
          type="submit"
          class="btn btn-primary btn-round"
        >
          Сохранить
        </button>
        <br />
        <router-link to="/changepassword">
          <button type="button" class="btn btn-secondary btn-round">
            Сменить пароль
          </button>
        </router-link>
        <br />
        <router-link to="/add">
          <button type="button" class="btn btn-secondary btn-round">
            Назад
          </button>
        </router-link>
      </form>
    </center>
  </div>
</template>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators/";
import * as fb from "firebase";
import { eventEmitter } from "./../main";

const key = "d02290573e1e3121c00a8bcb3bd08a1f";
const token =
  "57b6866c777bc31f1f6ca58c1a9a540873221292bbb1cf7ccfdd027d08c54349";

export default {
  data() {
    return {
      name: "",
      tel: "",
      place: ""
    };
  },
  validations: {
    name: {
      required
    },
    tel: {
      required
    },
    place: {
      required
    }
  },
  computed: {
    uid() {
      return this.$store.state.user.uid;
    }
  },
  methods: {
    accaunt() {
      this.$store.commit("updateUserData", {
        tel: this.tel,
        place: this.place
      });
      fb.auth()
        .currentUser.updateProfile({
          displayName: this.name
        })
        .then(() => {
          // подготовим значение
          let option = this.name + "(" + this.tel + ", " + this.place + ")";
          // изменим значение CustomFieldsId
          axios
            .put(
              "https://api.trello.com/1/customField/" +
                this.$store.state.customFieldsId +
                "/options/" +
                this.$store.state.userData.cf +
                "/?key=" +
                key +
                "&token=" +
                token,
              {
                value: { text: option }
              }
            )
            .then(() => {
              this.$router.push("/add");
              eventEmitter.$emit("showMessage", "Изменения сохранены!");
            });
        })
        .catch(error => {
          eventEmitter.$emit("showMessage", error.message);
        });
    }
  },
  mounted() {
    // своебразная защита роута
    if (!this.$store.state.user.uid) {
      this.$router.push("/");
    }
    this.name = this.$store.state.user.displayName;
    this.tel = this.$store.state.userData.tel;
    this.place = this.$store.state.userData.place;
  }
};
</script>

<style lang="sass" scoped>
.input-group-text
  color: #999
.fields
  margin-left: -50px
.accaunt
  padding-left: 100px
  padding-right: 100px
.form-control-feedback
    margin-top: -28px
.small-alert
  padding-left: 55px
  text-align: left
</style>
