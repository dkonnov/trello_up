import Vue from 'vue';
import Router from 'vue-router';
import hellow from './views/hellow.vue';
import login from './views/login.vue';
import tasks from './views/tasks.vue';
import boards from './views/boards.vue';
import registration from './views/registration.vue';
import accaunt from './views/accaunt.vue';
import restore from './views/restore.vue';
import changepassword from './views/changepassword.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: hellow
    },
    {
      path: '/login/:back',
      component: login
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/boards',
      component: boards
    },
    {
      path: '/registration',
      component: registration
    },
    {
      path: '/accaunt',
      component: accaunt
    },
    {
      path: '/restore',
      component: restore
    },
    {
      path: '/changepassword',
      component: changepassword
    },
    {
      path: '/:board',
      component: tasks
    }
  ],
  mode: 'history'
});
