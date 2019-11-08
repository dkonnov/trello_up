import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/"
      //component: hollowCard
    },
    {
      path: "/:user"
      //component: mainCard
    }
  ],
  mode: "history"
});
