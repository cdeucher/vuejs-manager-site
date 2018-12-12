import Vue from 'vue'
//import VueRouter from 'vue-router';
import App from './App.vue'

import router from './router'
import { store } from './store'

import VModal from 'vue-js-modal'
Vue.use(VModal, { dynamic: true })

new Vue({
  el: '#app',
  router: router,
  store:store,
  render: h => h(App)
})
