import Vue from 'vue';
import Vuex from 'vuex';

import router from './router';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
       loged: '',
       token: '',
       host: 'http://www:3000',
       vehicles: []
    },
    getters:{
        loged(state){
           return state.loged;
        },
        token(state){
           return state.token;
        },
        host(state){
           return state.host;
        },
        vehicles(state){
           return state.vehicles;
        }
    },
    mutations: {
        pullVehicles (state, vehicles) {
            state.vehicles  = vehicles.vehicles
        },
        authUser (state, userData) {
            //console.log('authUser',userData)
            state.token  = userData.token
            state.loged  = userData.loged
        },
        clearAuthData (state) {
            console.log('clearAuthData');
            state.token = null;
            state.loged = null;
            localStorage.removeItem('user-expirationDate')
            localStorage.removeItem('user-token')
            localStorage.removeItem('user-loged')
            router.replace('/login')
        }
    },
    actions: {
        pullVehicle({commit},vehicles){
            commit('pullVehicles', {
                vehicles: vehicles
            })
        },
        //use in App.vue
        tryAutoLogin({commit}){
            try{
                var expiration = parseInt(localStorage.getItem('user-expirationDate'));
            }catch(e){
                expiration = 0;
            }
            let now = new Date().getTime();
            if(now > expiration){
                commit('clearAuthData')
            }else{
                commit('authUser', {
                    token: localStorage.getItem('user-token'),
                    loged: localStorage.getItem('user-loged')
                })
            }
        },
        login({commit},data){
            //console.log('login1',state, data.user, data.token);
            localStorage.setItem('user-expirationDate', data.expires)
            localStorage.setItem('user-token', data.token)
            localStorage.setItem('user-loged', data.user)
            commit('authUser', {
                token: data.token,
                loged: data.user
            })
            router.replace('/')
        },
        logout({commit}){
           //dispatch('setLogoutTimer')
           commit('clearAuthData')
        }
    }
});
