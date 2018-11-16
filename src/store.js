import Vue from 'vue';
import Vuex from 'vuex';

import router from './router';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
       loged: '',
       token: ''
    },
    getters:{
        loged(state){
           return state.loged;
        },
        token(state){
           return state.token;
        }
    },
    mutations: {
        authUser (state, userData) {
            //console.log('authUser',userData)
            state.token  = userData.token
            state.loged  = userData.loged
        },
        clearAuthData (state) {
            state.token = null;
            state.loged = null;
            localStorage.removeItem('user-expirationDate')
            localStorage.removeItem('user-token')
            localStorage.removeItem('user-loged')
            router.replace('/login')
        }
    },
    actions: {
        tryAutoLogin({commit, state}){
            //console.log('tryAutoLogin');
            commit('authUser', {
                token: localStorage.getItem('user-token'),
                loged: localStorage.getItem('user-loged')
            })
        },
        login({commit, state, dispatch},data){
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
