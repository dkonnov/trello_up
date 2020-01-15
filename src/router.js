import Vue from "vue";
import Router from "vue-router";
import login from "./views/login";
import add from "./views/add";
import registration from "./views/registration";
import accaunt from "./views/accaunt";
import restore from "./views/restore";

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
    }
  ],
  mode: "history"
});
