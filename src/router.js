import Vue from "vue";
import Router from "vue-router";
import login from "./views/login.vue";
import tasks from "./views/tasks.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: login
    },
    {
      path: "/tasks",
      component: tasks
    }
  ],
  mode: "history"
});
