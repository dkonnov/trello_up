import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueRouter from 'vue-router';
import * as fb from 'firebase';
import App from './App.vue';
import './css/material-kit.min.css';
import './css/animate.min.css';

import router from './router.js';
// eslint-disable-next-line import/no-cycle
import store from './store/index.js';

Vue.use(VueRouter);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

// eslint-disable-next-line import/prefer-default-export
export const eventEmitter = new Vue();

new Vue({
  router,
  store,
  created() {
    const firebaseConfig = {
      apiKey: 'AIzaSyCosGlyRvlMjVt0YGe9zBFs4E_oIIjhhDA',
      authDomain: 'trello-up-ec2eb.firebaseapp.com',
      databaseURL: 'https://trello-up-ec2eb.firebaseio.com',
      projectId: 'trello-up-ec2eb',
      storageBucket: 'trello-up-ec2eb.appspot.com',
      messagingSenderId: '282586375421',
      appId: '1:282586375421:web:b6b6fa5a005e57885f8a94',
      measurementId: 'G-ECJKWGT3P1'
    };
    // Initialize Firebase
    fb.initializeApp(firebaseConfig);
    fb.analytics();
    // поддержим сессию
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        // запишем данные о пользователе
        this.$store.commit('setUser', user);
        // получим дополнительные данные о пользователе
        this.$store.dispatch('getUserData');
        this.$store.dispatch('getBackgrounds');
        this.$store.dispatch('getBoards');
      }
    });
  },
  render: h => h(App)
}).$mount('#app');
