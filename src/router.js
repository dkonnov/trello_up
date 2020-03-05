import Vue from "vue";
import Router from "vue-router";
import hollow from "./views/hollow";
import login from "./views/login";
import tasks from "./views/tasks";
import boards from "./views/boards";
import registration from "./views/registration";
import accaunt from "./views/accaunt";
import restore from "./views/restore";
import changepassword from "./views/changepassword";
import feature from "./views/feature";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: hollow
    },
    {
      path: "/feature",
      component: feature
    },
    {
      path: "/login",
      component: login
    },
    {
      path: "/tasks",
      component: tasks
    },
    {
      path: "/boards",
      component: boards
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
    },
    {
      path: "/:board",
      component: tasks
    }
  ],
  mode: "history"
});
