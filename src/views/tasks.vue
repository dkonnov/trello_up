<template>
  <div class="row">
    <div
      class="col-md-6"
      style="padding-left: 30px; padding-right: 30px;padding-bottom: 40px;"
    >
      <add />
    </div>

    <div class="col-md-6 rightCard">
      <div class="info" v-if="!this.$store.state.user.uid">
        <div class="icon icon-primary">
          <i class="material-icons">chat</i>
        </div>
        <h4 class="info-title">Привет!</h4>
        <p>
          Тут вы можете создать задачу по вашей проблеме, наблюдать за ходом ее
          исполнения.
          <br />
          <br />Для начала работы необходимо авторизоваться. Если вас нет в
          списке пользователей, зарегистрируйтесь или обратитесь к
          администратору по телефону.
        </p>
      </div>

      <div class="info" v-else-if="!cardsCount">
        <div class="icon icon-primary">
          <i class="material-icons">chat</i>
        </div>
        <h4 class="info-title">{{ boardName }}</h4>
        <p>
          {{ boardDesc }}
        </p>
      </div>
      <div v-else-if="cardsCount">
        <h4 class="title" style="color: #3c4858">
          Ваши текущие задачи
        </h4>
        <div v-for="(card, index) of itemsOnPageArray" :key="index">
          <card :card="card" :index="index" />
        </div>

        <center v-if="totalTabs > 1">
          <div
            width="100%"
            style="display: flex;align-items: center; justify-content: center;"
          >
            <ul
              class="pagination nav nav-pills nav-pills-primary"
              role="tablist"
            >
              <template v-for="(tab, index) in totalTabs">
                <li
                  class="page-item"
                  :class="{ active: currentTab == tab }"
                  :key="index"
                  @click="currentTab = tab"
                >
                  <a
                    class="page-link"
                    data-toggle="tab"
                    :href="'#tab' + tab"
                    role="tablist"
                    aria-expanded="true"
                    >{{ tab }}</a
                  >
                </li>
              </template>
            </ul>
          </div>
          <br />
        </center>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import add from "../views/add";
import card from "../components/card";
import * as fb from "firebase";

export default {
  name: "tasks",
  components: {
    card,
    add
  },
  data() {
    return {
      users: [],
      currentTab: 1,
      itemsOnPage: 5
    };
  },
  methods: {
    showCustomField(value) {
      if (value) {
        if (value.idValue == this.selectedUser) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  },
  computed: {
    cards() {
      return this.$store.state.cards;
    },
    cardsCount() {
      return this.$store.state.cards.length;
    },
    totalTabs() {
      return Math.ceil(this.cards.length / this.itemsOnPage);
    },
    itemsOnPageArray() {
      return _.slice(
        this.$store.state.cards,
        this.itemsOnPage * this.currentTab - this.itemsOnPage,
        this.itemsOnPage * this.currentTab
      );
    },
    boardName() {
      return this.$store.state.boards.currentBoard.name;
    },
    boardDesc() {
      return this.$store.state.boards.currentBoard.desc;
    }
  },
  beforeMount() {
    // своебразная защита роута
    fb.auth().onAuthStateChanged(user => {
      if (!user) {
        this.$router.push("/login/back");
      }
    });
    // получим информацию о текущей доске
    this.$store.dispatch(
      "getCurrentBoard",
      this.$router.currentRoute.params["board"]
    );
    setInterval(() => {
      if (this.$store.state.user.uid) {
        this.$store.dispatch("getComments");
      }
    }, 30000);
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
  /* min-height: 600px; */
  border-radius: 3px;
  top: -15px;
  margin-bottom: -30px;
  bottom: 0px;
  padding-left: 30px;
  padding-right: 30px;
  margin-right: 0px;
}
</style>
