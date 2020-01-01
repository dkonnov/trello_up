import Vue from "vue";
import Router from "vue-router";
import login from "./views/login";
import tasks from "./views/tasks";
import registration from "./views/registration";
import accaunt from "./views/accaunt";
import restorePassword from "./views/restorePassword.vue";

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
      path: "/tasks",
      component: tasks
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
      component: restorePassword
    }
  ],
  mode: "history"
});
