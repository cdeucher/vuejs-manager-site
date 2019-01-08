import Vue from 'vue';
import Vuex from 'vuex';

import router from './router';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
       loged: '',
       token: '',
       host: 'http://www:3000',//'http://ec2-52-90-245-155.compute-1.amazonaws.com:3000',//
       vehicles: [],
       owners: [],
       options: [
                 { text: 'Proposta', value: 'Proposta', activated:false },
                 { text: 'Vendido', value: 'Vendido', activated:false },
                 { text: 'Estoque', value: 'Estoque', activated:false },
                 { text: 'Alienado', value: 'Alienado', activated:false },
                 { text: 'Desativado', value: 'Desativado', activated:false }
               ],
       filter : undefined
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
        },
        owners(state){
           return state.owners;
        },
        options(state){
           return state.options;
        },
        filter(state){
           return state.filter;
        }
    },
    mutations: {
        pullVehicles (state, vehicles) {
            state.vehicles  = vehicles.vehicles
        },
        pullOwners (state, owners) {
            state.owners  = owners.owners
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
        },
        updateOption(state, option) {
            //console.log('updateOption',option);
            for(let i in state.options){
                state.options[i].activated = (option.text == state.options[i].text) ? (option.activated == true) ? false : true : false
            }
        },
        updateFilter(state, filter) {
            state.filter = filter
        }
    },
    actions: {
        pullVehicle({commit},vehicles){
            commit('pullVehicles', {
                vehicles: vehicles
            })
        },
        pullOwners({commit},owners){
            commit('pullOwners', {
                owners: owners
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
        },
        updateOption({commit},option){
            commit('updateOption', option)
        },
        updateFilter({commit},filter){
            commit('updateFilter', filter)
        }
    }
});
