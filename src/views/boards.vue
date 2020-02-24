<template>
  <div class="row" style="width:100%">
    <div
      class="col-md-6"
      style="padding-left: 30px; padding-right: 30px;padding-bottom: 40px;"
    >
      <addBoard />
    </div>

    <div class="col-md-6 rightCard">
      <div class="info" v-if="!boards">
        <div class="icon icon-primary">
          <i class="material-icons">chat</i>
        </div>
        <h4 class="info-title">Подключенные доски</h4>
        <p>
          Тут вы можете подключить Ваши доски Trello.<br />
          <br />
          Подключенными досками смогут пользоваться все зарегистрированные
          пользователи, у которых будет ссылка.<br />
          <br />
          Ссылку вы можете отправлять клиентам и сотрудникам по электронной
          почте, либо разместить на внутреннем ресурсе или сайте.
        </p>
      </div>
      <div v-if="boards">
        <h4 class="title" style="color: #3c4858">
          Доски Trello подключенные вами
        </h4>
        <template v-for="(board, index) in boards">
          <div
            class="card wow fadeInUp"
            style="width: 100%;"
            data-wow-duration="2s"
            :key="index"
          >
            <div class="card-body">
              <h4 class="card-title">
                {{ board.name }}
              </h4>
              <h6 class="card-subtitle mb-2 text-muted">
                ID {{ board.board }}
              </h6>
              {{ board.desc }}
              <div align="right">
                <div style="display: block;float: right; margin: 2px;">
                  <router-link :to="board.board">
                    <button
                      class="btn btn-secondary btn-fab btn-fab-mini btn-round"
                      type="button"
                      title="Перейти"
                    >
                      <i class="material-icons">keyboard_arrow_right</i>
                    </button>
                  </router-link>
                </div>
                <div style="display: block;float: right; margin: 2px;">
                  <button
                    class="btn btn-secondary btn-fab btn-fab-mini btn-round"
                    type="button"
                    @click="deleteBoard(board.id)"
                    title="Удалить связь с доской"
                  >
                    <i class="material-icons">link_off</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import addBoard from "../views/addBoard";
import { eventEmitter } from "./../main";
import * as fb from "firebase";

export default {
  name: "boards",
  components: {
    addBoard
  },
  methods: {
    deleteBoard(id) {
      eventEmitter.$emit(
        "showMessage",
        "Вы действительно хотите отключеть связь с этой докой? Пользователи не смогут создавать в ней новые задачи.",
        function() {
          fb.database()
            .ref("boards/")
            .child(id)
            .remove()
            .then(() => {
              this.$store.dispatch("getBoards");
            });
        }
      );
    }
  },
  computed: {
    boards() {
      return this.$store.state.boards.boards;
    }
  },
  mounted() {
    // своебразная защита роута
    fb.auth().onAuthStateChanged(user => {
      if (!user) {
        this.$router.push("/");
      }
    });
  }
};
</script>

<style scoped>
.row {
  min-height: 650px;
}
.material-icons {
  color: #999;
}
.mainCard {
  margin-top: -25px;
  min-height: 600px; /* Минимальная высота */
}
.rightCard {
  background-color: rgb(243, 241, 241);
  border-radius: 3px;
  top: -15px;
  margin-bottom: 0px;
  bottom: 0px;
  padding-left: 30px;
  padding-right: 30px;
  margin-right: 0px;
}
</style>
