import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import "./css/material-kit.min.css";
import "./css/animate.min.css";
import VueRouter from "vue-router";
import router from "./router";
import store from "./store";

Vue.use(VueRouter);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

export const eventEmitter = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // получим первоначальные сведения о пользователе, вошедшем в систему
    this.$store.dispatch("getUsers");
  }
}).$mount("#app");
