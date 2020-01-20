import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import _ from "lodash";
import * as fb from "firebase";

Vue.use(Vuex);

const key = "2a754a93fa902b29d2694a2f71af3f83";
const token =
  "b5123e80de5b5de7d21f46a754d8f97e6013facb5d0d6b5d2fcc2484b5530519";
const board = "fsA5vKgk";

export default new Vuex.Store({
  state: {
    users: {},
    lists: {},
    members: {},
    cards: {},
    comments: {},
    currentUser: {},
    currentUserData: {}
  },
  getters: {
    currentUserName(state) {
      return state.currentUser.displayName
        ? state.currentUser.displayName
        : state.currentUser.email;
    },
    currentCostomFieldUserId() {
      return this.$store.state.currentUserData.cf;
    }
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
    setCurrentUserData(state, payload) {
      state.currentUserData = payload;
    },
    updateCurrentUserData(state, payload) {
      // добавим сведения в state
      _.assign(state.currentUserData, payload);
      // запишем данные о пользователе в Firebase
      fb.database()
        .ref("users/" + state.currentUser.uid)
        .set(state.currentUserData);
    },
    setSingOut(state) {
      state.currentUser = {};
      state.cards = {};
    },
    setLists(state, payload) {
      state.lists = payload;
    },
    setMembers(state, payload) {
      state.members = payload;
    },
    setCards(state, payload) {
      state.cards = payload;
    },
    setComments(state, payload) {
      state.comments = payload;
    }
  },
  actions: {
    singOut(context) {
      context.commit("setSingOut");
    },
    getLists(context) {
      axios
        .get(
          "https://api.trello.com/1/boards/" +
            board +
            "/?lists=all&key=" +
            key +
            "&token=" +
            token
        )
        .then(response => {
          context.commit("setLists", response.data.lists);
        });
    },
    getMembers(context) {
      axios
        .get(
          "https://api.trello.com/1/boards/" +
            board +
            "/?members=all&key=" +
            key +
            "&token=" +
            token
        )
        .then(response => {
          context.commit("setMembers", response.data.members);
        });
    },
    getCards({ commit, getters }) {
      axios
        .get(
          "https://api.trello.com/1/boards/fsA5vKgk/?cards=open&fields=all&card_customFieldItems=true&key=" +
            key +
            "&token=" +
            token
        )
        .then(response => {
          var newArr = response.data.cards.filter(function(card) {
            if (card.customFieldItems.length > 0) {
              return (
                card.customFieldItems[0].idValue ==
                getters.currentCostomFieldUserId
              );
            }
          });

          commit("setCards", newArr);
        });
    },
    // читаем комментарии
    getComments({ commit }) {
      axios
        .get(
          "https://api.trello.com/1/boards/fsA5vKgk/actions/?limit=1000&filter=commentCard&key=" +
            key +
            "&token=" +
            token
        )
        .then(response => {
          commit("setComments", response.data);
        });
    }
  }
});
