import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state={
    options: [],
    worker:[]
}

const mutations={
    initOptions(state,params){
        state.options=params;
    },
    initWorker(state,params){
        state.worker=params;
    }
}


export default new Vuex.Store({
    state,mutations
})