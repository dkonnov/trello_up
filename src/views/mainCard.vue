<template>
  <div class="card mainCard">
    <div class="card-body" style="padding-bottom: 0px;margin-bottom: -15px;">
      <div class="row">
        <div
          class="col-md-6"
          style="padding-left: 30px; padding-right: 30px;padding-bottom: 40px;"
        >
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>

        <div class="col-md-6 rightCard">
          <div class="info" v-if="!this.$store.state.user.uid">
            <div class="icon icon-primary">
              <i class="material-icons">chat</i>
            </div>
            <h4 class="info-title">Привет!</h4>
            <p>
              Тут вы можете создать задачу по вашей проблеме, наблюдать за ходом
              ее исполнения.
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
            <h4 class="info-title">Ваши задачи</h4>
            <p>
              Задачи, созданные вами, будут отображаться тут. Создайте первую
              задачу в левой колонке.
            </p>
          </div>
          <div v-else-if="cardsCount">
            <h4 class="title" style="color: #3c4858">
              Ваши текущие задачи
            </h4>
            <div v-for="(card, index) of itemsOnPageArray" :key="card">
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
                  <template v-for="index in totalTabs">
                    <li
                      class="page-item"
                      :class="{ active: currentTab == index }"
                      :key="index"
                      @click="currentTab = index"
                    >
                      <a
                        class="page-link"
                        data-toggle="tab"
                        :href="'#tab' + index"
                        role="tablist"
                        aria-expanded="true"
                        >{{ index }}</a
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
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import card from "../components/card";

export default {
  name: "mainCard",
  components: {
    card
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
    }
  },
  mounted() {
    // установим фоновое изображение
    document.getElementById("backgroundDiv").style.backgroundImage =
      "url('img/backgrounds/patrick-tomasso-1272187-unsplash.jpg')";
  },
  beforeMount() {
    //setInterval(() => {
    //   if (this.$store.state.user.uid) {
    //     this.$store.dispatch("getComments");
    //   }
    // }, 10000);
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
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
