/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable comma-dangle */
// eslint-disable-next-line max-len
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */
import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from 'firebase';
// eslint-disable-next-line
import boards from './boards.js';
import { http } from '../http.js';

Vue.use(Vuex);

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
      http.get('/backgrounds').then(response => {
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
      http.get(`trello/boards/${state.boards.currentBoard.board}/?lists=all`).then(response => {
        commit('setLists', response.data.lists);
      });
    },
    getMembers({ commit, state }) {
      http
        .get(`trello/boards/${state.boards.currentBoard.board}/?members=all`)
        .then(response => {
          commit('setMembers', response.data.members);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getCards({ commit, state }) {
      commit('setCards', []);
      http
        .get(
          `trello/boards/${state.boards.currentBoard.board}/?cards=all&fields=all&card_customFieldItems=true`
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
      http
        .get(
          `trello/boards/${state.boards.currentBoard.board}/actions/?limit=1000&filter=commentCard&`
        )
        .then(response => {
          commit('setComments', response.data);
        });
    }
  }
});
