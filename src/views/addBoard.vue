<template>
  <div class="accaunt">
    <center>
      <div class="info">
        <div class="icon icon-primary">
          <i class="material-icons">chrome_reader_mode</i>
        </div>
        <h4 class="info-title">Подключение доски</h4>
        Для подключения доски необходимо ввести ее <b>ID</b>, добавить на доску
        пользователя <b>@userup3</b>, а также компонент <b>CustomFields</b> и
        создать ее первый элемент.
      </div>

      <form @submit.prevent="add">
        <div class="fields">
          <div
            class="input-group form-group label-floating"
            :class="{ 'has-danger': $v.board.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">link</i>
              </span>
            </div>
            <input
              v-model="board"
              @input="$v.board.$touch"
              type="text"
              class="form-control"
              placeholder="ID достки в Trello ..."
            />
            <button v-if="$v.board.$error" class="form-control-feedback">
              <i class="material-icons">clear</i>
            </button>
            <small
              v-if="$v.board.$error"
              class="form-text text-muteds small-alert"
              >Укажите ID доски в Trello в которой вы планируете принимать
              задачи</small
            >
          </div>

          <div class="input-group form-group label-floating">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">insert_comment</i>
              </span>
            </div>
            <input
              v-model="board"
              type="text"
              class="form-control"
              placeholder="Название доски"
            />
          </div>

          <div class="input-group form-group label-floating">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">notes</i>
              </span>
            </div>
            <textarea
              class="form-control"
              rows="4"
              placeholder="Приветственное описание"
            ></textarea>
          </div>

          <br />
        </div>
        <button
          :disabled="$v.$invalid || loading"
          type="submit"
          class="btn btn-primary btn-round"
        >
          Проверить и подключить
        </button>
        <br />
        <router-link to="/tasks">
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
      board: "",
      loading: false
    };
  },
  validations: {
    board: {
      required
    }
  },
  methods: {
    add() {
      this.loading = true;
      // проверим доступность достки
      axios
        .get(
          "https://api.trello.com/1/boards/" +
            this.board +
            "/?cards=open&fields=all&card_customFieldItems=true&key=" +
            key +
            "&token=" +
            token
        )
        .then(() => {
          fb.database()
            .ref("boards/")
            .push({
              user_id: this.$store.state.user.uid,
              board: this.board
            })
            .then(() => {
              this.loading = false;
              this.$store.dispatch("getBoards");
              eventEmitter.$emit(
                "showMessage",
                "Все поучилось! Теперь можно пользоваться доской и добавлять задачи через Trello Up!"
              );
            });
        })
        .catch(() => {
          this.loading = false;
          eventEmitter.$emit(
            "showMessage",
            "Данную доску невозможно добавить. Для добавления доски введите верный ID, а также пригласите на доску пользователя @userup3."
          );
        });
    }
  },
  mounted() {
    // своебразная защита роута
    if (!this.$store.state.user.uid) {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="sass" scoped>
.input-group-text
  color: #999
.fields
  margin-left: -50px
.accaunt
  padding-left: 75px
  padding-right: 75px
  min-width: 350px
.form-control-feedback
    margin-top: -28px
.small-alert
  padding-left: 55px
  text-align: left
</style>
