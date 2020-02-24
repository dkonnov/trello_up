import * as fb from "firebase";

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
    }
  },
  actions: {
    getCurrentBoard({ commit, dispatch }, value) {
      fb.database()
        .ref("boards")
        .orderByChild("board")
        .equalTo(value)
        .on("child_added", function(snapshot) {
          commit("setCurrentBoard", snapshot.val());
          // получим данные из Trello
          dispatch("getMembers");
          dispatch("getLists");
          dispatch("getCards");
          dispatch("getComments");
          dispatch("getCustomFields");
        });
    },
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
