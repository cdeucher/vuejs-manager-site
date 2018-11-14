import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
       loged: {},
       token: {}
    },
    getters:{
        loged(state){
           return state.loged;
        },
        token(state){
           return state.token;
        }
    }
});
