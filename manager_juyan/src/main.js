// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入样式
import './assets/css/base.css'
//全局引入elmentui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.prototype.$ajax=axios
Vue.use(ElementUI);

import store from './store'
//引入加载动画
import loading from './components/loading';
Vue.use(loading);


import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)



Vue.config.productionTip = false

/* eslint-disable no-new */
import {getCookie,delCookie} from './utils/utils';
axios.defaults.withCredentials = true

// 拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  store.dispatch('SHOW_LOADING');


  
  return config;
}, function (error) {
  console.log("",error)
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  store.dispatch('HIDE_LOADING')
  return response;
}, function (error) {
  // Do something with response error
  store.dispatch('HIDE_LOADING')
  return Promise.reject(error);
 
});

new Vue({
  el: '#app',
  router,store,
  components: { App },
  template: '<App/>'
})
