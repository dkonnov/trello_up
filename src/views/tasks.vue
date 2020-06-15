<template>
  <div>
    <!-- <div class="row" style="position: absolute">{{ boardName }}</div> -->
    <div class="row">
      <div class="col-md-6" style="padding-left: 30px; padding-right: 30px; padding-bottom: 40px;">
        <add />
      </div>

      <div class="col-md-6 rightCard">
        <div class="info" v-if="!this.$store.state.user.uid">
          <div class="icon icon-primary">
            <i class="material-icons">chat</i>
          </div>
          <h4 class="info-title">
            {{ $t('message.tasks.title1') }}
          </h4>
          <p>
            {{ $t('message.tasks.title2') }}
          </p>
        </div>

        <div class="info" v-else-if="!cardsCount">
          <div class="icon icon-primary">
            <i class="material-icons">chat</i>
          </div>
          <h4 class="info-title">
            {{ boardName }}
          </h4>
          <p>
            {{ boardDesc }}
          </p>
        </div>
        <div v-else-if="cardsCount">
          <h4 class="title" style="color: #3c4858;">
            {{ $t('message.tasks.title3') }}
          </h4>
          <div v-for="(card, index) of itemsOnPageArray" :key="card">
            <card :card="card" :index="index + indexPage" />
          </div>

          <center v-if="totalTabs > 1">
            <div width="100%" style="display: flex; align-items: center; justify-content: center;">
              <ul class="pagination nav nav-pills nav-pills-primary" role="tablist">
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
  </div>
</template>

<script>
import _ from 'lodash';
import * as fb from 'firebase';
import add from './add.vue';
import card from '../components/card.vue';

export default {
  name: 'Tasks',
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
  computed: {
    indexPage() {
      // рассчитывает сколько нужно прибавить к индексу компонента card
      return this.itemsOnPage * this.currentTab - this.itemsOnPage;
    },
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
        // eslint-disable-next-line comma-dangle
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
  mounted() {
    // своебразная защита роута
    fb.auth().onAuthStateChanged(user => {
      if (!user) {
        this.$router.push('/login/back');
      }
    });
    // получим информацию о текущей доске
    this.$store.dispatch('getCurrentBoard', this.$router.currentRoute.params.board);
    setInterval(() => {
      if (this.$store.state.user.uid) {
        this.$store.dispatch('getComments');
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
