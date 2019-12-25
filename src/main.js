import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import "./css/material-kit.min.css";
import "./css/animate.min.css";
import VueRouter from "vue-router";
import router from "./router";
import store from "./store";
import * as fb from "firebase";

Vue.use(VueRouter);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

export const eventEmitter = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyCosGlyRvlMjVt0YGe9zBFs4E_oIIjhhDA",
      authDomain: "trello-up-ec2eb.firebaseapp.com",
      databaseURL: "https://trello-up-ec2eb.firebaseio.com",
      projectId: "trello-up-ec2eb",
      storageBucket: "trello-up-ec2eb.appspot.com",
      messagingSenderId: "282586375421",
      appId: "1:282586375421:web:b6b6fa5a005e57885f8a94",
      measurementId: "G-ECJKWGT3P1"
    };
    // Initialize Firebase
    fb.initializeApp(firebaseConfig);
    fb.analytics();
  }
}).$mount("#app");
