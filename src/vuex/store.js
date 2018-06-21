import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state={
    alias:'',
    name:'',
    options: [],
    worker:[],
    managerType:[]
}

const mutations={
    initAlias(state,params){
        state.alias=params;
    },
    initName(state,params){
        state.name=params;
    },
    initOptions(state,params){
        state.options=params;
    },
    initWorker(state,params){
        state.worker=params;
    },
    initManagerType(state,params){
        state.managerType=params;
    }
}


export default new Vuex.Store({
    state,mutations
})