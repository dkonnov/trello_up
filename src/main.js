import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'

Vue.use(VueRouter)

Vue.config.productionTip = false

export const eventEmitter = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
