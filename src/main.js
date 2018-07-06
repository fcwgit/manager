// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'babel-polyfill';
import axios from 'axios';
axios.defaults.baseURL = 'http://10.12.17.230:8080/manage'

Vue.config.productionTip = false
axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
