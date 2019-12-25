import Vue from "vue";
import Router from "vue-router";
import login from "./views/login.vue";
import tasks from "./views/tasks.vue";
import registration from "./views/registration.vue";

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
    }
  ],
  mode: "history"
});
