import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import * as fb from "firebase";
import boards from "./boards";
import { eventEmitter } from "./../main";

Vue.use(Vuex);

const key = "d02290573e1e3121c00a8bcb3bd08a1f";
const token =
  "57b6866c777bc31f1f6ca58c1a9a540873221292bbb1cf7ccfdd027d08c54349";

export default new Vuex.Store({
  modules: {
    boards
  },
  state: {
    lists: {},
    members: {},
    cards: {},
    comments: {},
    user: {},
    userData: {},
    customFieldsId: "",
    backgrounds: {}
  },
  getters: {
    userName(state) {
      return state.user.displayName ? state.user.displayName : state.user.email;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setUserData(state, payload) {
      state.userData = payload;
    },
    updateUserData(state, payload) {
      // добавим сведения в state
      Object.assign(state.userData, payload);
      // запишем данные о пользователе в Firebase
      fb.database()
        .ref("users/" + state.user.uid)
        .set(state.userData);
    },
    setSingOut(state) {
      state.user = {};
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
    },
    setCustomField(state, payload) {
      state.customFieldsId = payload;
    },
    setBackgrounds(state, payload) {
      state.backgrounds = payload;
    }
  },
  actions: {
    getBackgrounds(context) {
      axios.get("public/trelloup.php/getBackgrounds").then(response => {
        if (response.data) {
          context.commit("setBackgrounds", response.data);
        }
      });
    },
    singOut(context) {
      context.commit("setSingOut");
    },
    getUserData({ commit, state }) {
      fb.database()
        .ref("users/" + state.user.uid)
        .once("value")
        .then(snapshot => {
          let res = snapshot.val();
          commit("setUserData", res);
        });
    },
    getCustomFields({ commit, state }) {
      axios
        .get(
          "https://api.trello.com/1/boards/" +
            state.boards.currentBoard.board +
            "/customFields?key=" +
            key +
            "&token=" +
            token
        )
        .then(response => {
          commit("setCustomField", response.data[0].id);
        })
        .catch(() => {
          commit("setCustomField", "");
          eventEmitter.$emit(
            "showMessage",
            "К сожалению на этой доске больше нет Custom Field. Для нормально работы необходим хотябы один раскрывающийся список Custom Field. Пожалуйста, создайте его в Trello."
          );
        });
    },
    getLists({ commit, state }) {
      axios
        .get(
          "https://api.trello.com/1/boards/" +
            state.boards.currentBoard.board +
            "/?lists=all&key=" +
            key +
            "&token=" +
            token
        )
        .then(response => {
          commit("setLists", response.data.lists);
        });
    },
    getMembers({ commit, state }) {
      axios
        .get(
          "https://api.trello.com/1/boards/" +
            state.boards.currentBoard.board +
            "/?members=all&key=" +
            key +
            "&token=" +
            token
        )
        .then(response => {
          commit("setMembers", response.data.members);
        });
    },
    getCards({ commit, state }) {
      axios
        .get(
          "https://api.trello.com/1/boards/" +
            state.boards.currentBoard.board +
            "/?cards=open&fields=all&card_customFieldItems=true&key=" +
            key +
            "&token=" +
            token
        )
        .then(response => {
          var newArr = response.data.cards.filter(card => {
            if (card.customFieldItems.length > 0) {
              return card.customFieldItems[0].idValue == state.userData.cf;
            }
          });
          commit("setCards", newArr);
        });
    },
    // читаем комментарии
    getComments({ commit, state }) {
      axios
        .get(
          "https://api.trello.com/1/boards/" +
            state.boards.currentBoard.board +
            "/actions/?limit=1000&filter=commentCard&key=" +
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
