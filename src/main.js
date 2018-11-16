import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

import router from './router'
import { store } from './store';

import Home from './components/Home.vue';
import Login from './components/login/Login.vue';


new Vue({
  el: '#app',
  router: router,
  store:store,
  render: h => h(App)
})
