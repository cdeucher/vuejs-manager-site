import Vue from 'vue'
import App from './App.vue'

import router from './router'
import { store } from './store'

import VModal from 'vue-js-modal'
Vue.use(VModal, { dynamic: true })

//https://mirari.cc/v-viewer/
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer)

import moment from 'moment'
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
})
Vue.filter('null', function(value) {
  if (value) {
    return (value == undefined) ? '' : value
  }
})

new Vue({
  el: '#app',
  router: router,
  store:store,
  render: h => h(App)
})
