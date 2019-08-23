import Vue from 'vue'
import Router from 'vue-router'
import hollowCard from './views/hollowCard.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: hollowCard
    }
  ],
  mode: 'history'
})
