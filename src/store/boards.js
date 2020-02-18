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
          const res = snapshot.val();
          const newArr = [];
          Object.keys(res).forEach(key => {
            newArr.push({
              id: key,
              user_id: res[key].user_id,
              board: res[key].board,
              name: res[key].name,
              desc: res[key].desc
            });
          });
          commit("setBoards", newArr);
        })
        .catch(value => {
          alert(value);
        });
    }
  }
};
