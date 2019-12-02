import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
    currentUser: ""
  },
  getters: {
    currentUserName(state) {
      let name;
      state.users.forEach(function(item) {
        if (state.currentUser == item.id) {
          name = item.value.text;
        }
      });
      return name;
    }
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
    setLists(state, payload) {
      state.lists = payload;
    },
    setMembers(state, payload) {
      state.members = payload;
    },
    setCards(state, payload) {
      state.cards = payload;
    }
  },
  actions: {
    getUsers(context) {
      axios
        .get(
          "https://api.trello.com/1/boards/" +
            board +
            "/customFields?key=" +
            key +
            "&token=" +
            token
        )
        .then(response => {
          context.commit("setUsers", response.data[0].options);
          this.$nextTick(function() {
            $("#selectedUser").selectpicker("refresh");
          });
          //this.cfid = response.data[0].id;
        });
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
    getCards(context, userID) {
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
              return card.customFieldItems[0].idValue == userID;
            }
          });

          context.commit("setCards", newArr);
        });
    }
  }
});
