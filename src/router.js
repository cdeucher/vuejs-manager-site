import Vue from 'vue';
import VueRouter from 'vue-router';

//import {store} from './store';

import Login  from './components/login/Login.vue';
import Signup from './components/login/Signup.vue';
import Home   from './components/Home.vue';

Vue.use(VueRouter);

const routes = [
  { path:'/login', component: Login },
  { path: '/', component: Home,
    beforeEnter (to, from, next) {
          //console.log('store',store.state.loged);
          if (localStorage.getItem('user-token')) {
              next()
          } else {
              next('/login')
          }
    }
  }
 ,{ path: '/signup', component: Signup,
    beforeEnter (to, from, next) {
          //console.log('store',store.state.loged);
          if (localStorage.getItem('user-token')) {
              next()
          } else {
              next('/login')
          }
    }
  },
]

export default new VueRouter({mode: 'history', routes})
