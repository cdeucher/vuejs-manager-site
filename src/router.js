import Vue from 'vue';
import VueRouter from 'vue-router';

//import {store} from './store';

import Login    from './components/login/Login.vue';
import Signup   from './components/login/Signup.vue';
import Dashboard from './components/dashboard/Dashboard.vue';
import Registers from './components/registers/Registers.vue';
import Vehicle      from './components/vehicle/Vehicle.vue';
import VehicleEdit  from './components/vehicle/VehicleEdit.vue';
import VehicleView  from './components/vehicle/VehicleView.vue';
import Owner      from './components/owner/Owner.vue';
import OwnerEdit  from './components/owner/OwnerEdit.vue';
import OwnerView  from './components/owner/OwnerView.vue';
import Transaction from './components/transaction/Transaction.vue';
import TransactionBuy from './components/transaction/TransactionBuy.vue';
import TransactionSell from './components/transaction/TransactionSell.vue';
import TransactionOther from './components/transaction/TransactionOther.vue';

Vue.use(VueRouter);

const routes = [
  { path:'/login', component: Login },
  { path:'/register', component: Registers,
    beforeEnter (to, from, next) {
          if (localStorage.getItem('user-token')) {
              next()
          } else {
              next('/login')
          }
    }
  },
  { path: '/owner', component: Owner,
    children:[
          { path: '/owner/:id', component: OwnerView },
          { path: '/owner/:id/edit', component: OwnerEdit }
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
  { path: '/transaction', component: Transaction,
    children:[
          { path: '/transaction/:vehicleId/buy', component: TransactionBuy },
          { path: '/transaction/:vehicleId/sell', component: TransactionSell },
          { path: '/transaction/:vehicleId/other', component: TransactionOther }
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
  { path: '/', component: Dashboard,
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
          next()
          //if (localStorage.getItem('user-token')) {
          //    next()
          //} else {
          //    next('/login')
          //}
    }
  },
]

const router = new VueRouter({ routes}) //mode: 'history',
router.beforeEach((to, from, next) => {
  //console.log('global beforeEach');
  next();
});

export default router
