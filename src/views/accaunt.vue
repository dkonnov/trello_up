<template>
  <div class="accaunt">
    <center>
      <h4 class="info-title">Ваши данные</h4>

      <form @submit.prevent="accaunt">
        <div class="fields">
          <div
            class="input-group form-group label-floating"
            :class="{ 'has-danger': $v.name.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">mail</i>
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
                <i class="material-icons">mail</i>
              </span>
            </div>
            <input
              v-model="tel"
              @input="$v.tel.$touch"
              type="text"
              class="form-control"
              placeholder="Ваше имя ..."
            />
            <button v-if="$v.tel.$error" class="form-control-feedback">
              <i class="material-icons">clear</i>
            </button>
            <small
              v-if="$v.tel.$error"
              class="form-text text-muteds small-alert"
              >Необходимо ввести ваше имя, чтобы специалист знал как с вами
              связаться по телефону.</small
            >
          </div>

          <br />

          <button
            :disabled="$v.$invalid"
            type="submit"
            class="btn btn-primary btn-round"
          >
            Сохранить
          </button>
          <br />
          <router-link to="/tasks">
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
import { required } from "vuelidate/lib/validators/";
import * as fb from "firebase";
import { eventEmitter } from "./../main";

export default {
  data() {
    return {
      name: "",
      tel: ""
    };
  },
  validations: {
    name: {
      required
    },
    tel: {
      required
    }
  },
  methods: {
    accaunt() {
      fb.auth()
        .currentUser.updateProfile({
          displayName: this.name,
          phoneNumber: this.tel
        })
        .then(() => {
          //this.$store.commit("updateCurrentUser", this.name);
          this.$router.push("/tasks");
          eventEmitter.$emit("showMessage", "Ваши данные сохранены!");
        })
        .catch(error => {
          eventEmitter.$emit("showMessage", error.message);
        });
    }
  },
  mounted() {
    // своебразная защита роута
    if (!this.$store.state.currentUser) {
      this.$router.push("/");
    }
    this.name = this.$store.state.currentUser.displayName;
    this.tel = this.$store.state.currentUser.phoneNumber;
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
