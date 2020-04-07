/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as fb from 'firebase';
// eslint-disable-next-line import/no-cycle
import boards from './boards.js';

Vue.use(Vuex);

const key = 'd02290573e1e3121c00a8bcb3bd08a1f';
const token = '57b6866c777bc31f1f6ca58c1a9a540873221292bbb1cf7ccfdd027d08c54349';

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
        .ref(`users/${state.user.uid}`)
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
    setBackgrounds(state, payload) {
      state.backgrounds = payload;
    }
  },
  actions: {
    getBackgrounds(context) {
      axios.get('public/trelloup.php/getBackgrounds').then(response => {
        if (response.data) {
          context.commit('setBackgrounds', response.data);
        }
      });
    },
    singOut(context) {
      context.commit('setSingOut');
    },
    getUserData({ commit, state }) {
      fb.database()
        .ref(`users/${state.user.uid}`)
        .once('value')
        .then(snapshot => {
          const res = snapshot.val();
          commit('setUserData', res);
        });
    },
    getLists({ commit, state }) {
      axios
        .get(
          `https://api.trello.com/1/boards/${state.boards.currentBoard.board}/?lists=all&key=${key}&token=${token}`
        )
        .then(response => {
          commit('setLists', response.data.lists);
        });
    },
    getMembers({ commit, state }) {
      axios
        .get(
          `https://api.trello.com/1/boards/${state.boards.currentBoard.board}/?members=all&key=${key}&token=${token}`
        )
        .then(response => {
          commit('setMembers', response.data.members);
        });
    },
    getCards({ commit, state }) {
      commit('setCards', []);
      axios
        .get(
          `https://api.trello.com/1/boards/${state.boards.currentBoard.board}/?cards=all&fields=all&card_customFieldItems=true&key=${key}&token=${token}`
        )
        .then(response => {
          // определим CF
          let cf;
          if (!state.userData.cf) {
            cf = [];
          } else {
            cf = state.userData.cf;
          }
          const res = cf.filter(b => b.board === state.boards.currentBoard.board);
          // отфильтруем карточки
          const newArr = response.data.cards.filter(card =>
            card.customFieldItems.length > 0
              ? card.customFieldItems[0].idValue === res[0].id
              : false
          );
          // отсортируем по статусу
          const newArrSorted = newArr.sort((a, b) => (a.closed > b.closed ? 1 : -1));
          commit('setCards', newArrSorted);
        });
    },
    // читаем комментарии
    getComments({ commit, state }) {
      axios
        .get(
          `https://api.trello.com/1/boards/${state.boards.currentBoard.board}/actions/?limit=1000&filter=commentCard&key=${key}&token=${token}`
        )
        .then(response => {
          commit('setComments', response.data);
        });
    }
  }
});
