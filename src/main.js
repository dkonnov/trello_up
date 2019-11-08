import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import "./css/material-kit.min.css";
import "./css/animate.min.css";
import VueRouter from "vue-router";
import router from "./router";

Vue.use(VueRouter);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

export const eventEmitter = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
