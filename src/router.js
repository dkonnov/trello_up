import Vue from "vue";
import Router from "vue-router";
import login from "./views/login";
import add from "./views/add";
import addBoard from "./views/addBoard";
import registration from "./views/registration";
import accaunt from "./views/accaunt";
import restore from "./views/restore";
import changepassword from "./views/changepassword";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: login
    },
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/add",
      component: add
    },
    {
      path: "/boards",
      component: addBoard
    },
    {
      path: "/registration",
      component: registration
    },
    {
      path: "/accaunt",
      component: accaunt
    },
    {
      path: "/restore",
      component: restore
    },
    {
      path: "/changepassword",
      component: changepassword
    }
  ],
  mode: "history"
});
