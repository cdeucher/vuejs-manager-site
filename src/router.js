import Vue from 'vue';
import VueRouter from 'vue-router';

//import {store} from './store';

import Login    from './components/login/Login.vue';
import Signup   from './components/login/Signup.vue';
import Home     from './components/Home.vue';
import Registers from './components/registers/Registers.vue';
import Vehicle      from './components/vehicle/Vehicle.vue';
import VehicleEdit  from './components/vehicle/VehicleEdit.vue';
import VehicleView  from './components/vehicle/VehicleView.vue';

Vue.use(VueRouter);

const routes = [
  { path:'/login', component: Login },
  { path:'/register', component: Registers,
    beforeEnter (to, from, next) {
          //console.log('store',store.state.loged);
          if (localStorage.getItem('user-token')) {
              next()
          } else {
              next('/login')
          }
    }
  },
  { path: '/vehicle', component: Vehicle,
    children:[
          { path: '/vehicle/:id', component: VehicleView },
          { path: '/vehicle/:id/edit', component: VehicleEdit }
    ],
    beforeEnter (to, from, next) {
          //console.log('store',store.state.loged);
          if (localStorage.getItem('user-token')) {
              next()
          } else {
              next('/login')
          }
    }
  },
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

const router = new VueRouter({mode: 'history', routes})
router.beforeEach((to, from, next) => {
  //console.log('global beforeEach');
  next();
});

export default router
