<template>
  <div class="row" style="width:100%">
    <div
      class="col-md-6"
      style="padding-left: 30px; padding-right: 30px;padding-bottom: 40px;"
    >
      <addBoard />
    </div>

    <div class="col-md-6 rightCard">
      <div class="info">
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
          <button
            type="button"
            @click="getData"
            class="btn btn-secondary btn-round"
          >
            Назад
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import addBoard from "../views/addBoard";
import * as fb from "firebase";

export default {
  name: "boards",
  components: {
    addBoard
  },
  methods: {
    getData() {
      fb.database()
        .ref("boards")
        .once("value")
        .then(snapshot => {
          let res = snapshot.val();
          alert(res);
        })
        .catch(value => {
          alert(value);
        });
    }
  }
};
</script>

<style scoped>
.row {
  min-height: 650px;
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
