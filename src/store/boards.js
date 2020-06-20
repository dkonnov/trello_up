/* eslint-disable import/no-useless-path-segments */
// eslint-disable-next-line max-len
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */
import * as fb from 'firebase';

// eslint-disable-next-line
import { eventEmitter } from '../main.js';

export default {
  state: {
    boards: [],
    currentBoard: []
  },
  mutations: {
    setCurrentBoard(state, payload) {
      state.currentBoard = payload;
    },
    setBoards(state, payload) {
      state.boards = payload;
    },
    clearCurrentBoard(state) {
      state.currentBoard = [];
    }
  },
  actions: {
    clearCurrent({ commit }) {
      commit('clearCurrentBoard');
    },
    deleteBoard({ dispatch }, value) {
      // eslint-disable-next-line no-alert
      console.log(123);
      eventEmitter.$emit(
        'showMessage',
        'Are you sure?',
        // eslint-disable-next-line prefer-arrow-callback
        () => {
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
        .ref(`boards/${value}`)
        .once('value')
        .then(snapshot => {
          const values = snapshot.val();
          values.id = value;
          commit('setCurrentBoard', values);
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
        .then(snapshot => {
          const res = snapshot.val();
          const newArr = [];
          if (res) {
            Object.keys(res).forEach(key => {
              newArr.push({
                id: key,
                user_id: res[key].user_id,
                board: res[key].board,
                name: res[key].name,
                desc: res[key].desc
              });
            });
          }
          commit('setBoards', newArr);
        });
    }
  }
};
