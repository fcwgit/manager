import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state={
    role:false,
    isLogin:false,
    alias:'',
    name:'',
    pageSize:'',
    options: [],
    // worker:[],
    managerType:[],
    branchMasterType:[],
    branchSlaverType:[]
}

const mutations={
    setRole(state,params){
        sessionStorage.setItem('role',params);
        state.role=params;
    },
    setIsLogin(state,params){
        sessionStorage.setItem('isLogin',params);
        state.isLogin=params;
    },
    initAlias(state,params){
        sessionStorage.setItem('alias',params);
        state.alias=params;
    },
    initName(state,params){
        sessionStorage.setItem('name',params);
        state.name=params;
    },
    initOptions(state,params){
        state.options=params;
        sessionStorage.setItem('options',JSON.stringify(params));
    },
    // initWorker(state,params){
    //     state.worker=params;
    //     sessionStorage.setItem('worker',JSON.stringify(params));
    // },
    initManagerType(state,params){
        sessionStorage.setItem('managerType',JSON.stringify(params));
        state.managerType=params;
    },
    initPageSize(state,params){
        sessionStorage.setItem('pageSize',params);
        state.pageSize=params;
    },
    initBranchMasterType(state,params){
        sessionStorage.setItem('branchMasterType',JSON.stringify(params));
        state.branchMasterType=params;
    },
    initBranchSlaverType(state,params){
        sessionStorage.setItem('branchSlaverType',JSON.stringify(params));
        state.branchSlaverType=params;
    }
}


export default new Vuex.Store({
    state,mutations
})