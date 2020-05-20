/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/no-cycle */
// eslint-disable-next-line max-len
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */
import * as fb from 'firebase';

import { eventEmitter } from '../main.js';

export default {
  state: {
    boards: [],
    currentBoard: [],
  },
  mutations: {
    setCurrentBoard(state, payload) {
      state.currentBoard = payload;
    },
    setBoards(state, payload) {
      state.boards = payload;
    },
  },
  actions: {
    deleteBoard({ dispatch }, value) {
      eventEmitter.$emit(
        'showMessage',
        'Вы действительно хотите отключить связь с этой докой? Пользователи не смогут создавать в ней новые задачи.',
        // eslint-disable-next-line prefer-arrow-callback
        () => {
          console.log('fb');
          fb.database()
            .ref('boards/')
            .child(value)
            .remove()
            .then(() => {
              dispatch('getBoards');
            });
          // eslint-disable-next-line comma-dangle
        }
      );
    },
    getCurrentBoard({ commit, dispatch }, value) {
      fb.database()
        .ref('boards')
        .orderByChild('board')
        .equalTo(value)
        .on('child_added', (snapshot) => {
          commit('setCurrentBoard', snapshot.val());
          // получим данные из Trello
          dispatch('getMembers');
          dispatch('getLists');
          dispatch('getCards');
          dispatch('getComments');
        });
    },
    getBoards({ commit, rootState }) {
      fb.database()
        .ref('boards')
        .orderByChild('user_id')
        .equalTo(rootState.user.uid)
        .once('value')
        .then((snapshot) => {
          const res = snapshot.val();
          const newArr = [];
          if (res) {
            Object.keys(res).forEach((key) => {
              newArr.push({
                id: key,
                user_id: res[key].user_id,
                board: res[key].board,
                name: res[key].name,
                desc: res[key].desc,
              });
            });
          }
          commit('setBoards', newArr);
        });
    },
  },
};
