import Vue from "vue";
import Router from "vue-router";
import login from "./views/login.vue";
import newTask from "./views/newTask.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: login
    },
    {
      path: "/newtask",
      component: newTask
    }
  ],
  mode: "history"
});
