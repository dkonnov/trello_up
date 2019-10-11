import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'

Vue.use(Vuelidate);

Vue.config.productionTip = false

export const eventEmitter = new Vue()

new Vue({
  render: h => h(App)
}).$mount('#app')
