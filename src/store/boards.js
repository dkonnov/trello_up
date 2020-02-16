import * as fb from "firebase";

export default {
  state: {
    boards: []
  },
  mutations: {
    setBoards(state, payload) {
      state.boards = payload;
    }
  },
  actions: {
    getBoards({ commit }) {
      fb.database()
        .ref("boards")
        .once("value")
        .then(snapshot => {
          commit("setBoards", snapshot.val());
        })
        .catch(value => {
          alert(value);
        });
    }
  }
};
