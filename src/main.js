// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueClipBoard from 'vue-clipboard2';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/common.scss';
import './assets/icon/iconfont.css'
import axios from 'axios';
import store from './store';
import './permission'; // 权限
import './utils/request.js'; //拦截器
import {baseUrl} from "./config/env"; //服务器地址
import website from './config/website'; //站点设置
import {ttGet, ttPost, color, abrasion, quality, quality2} from "./utils/util.js";
import {getStore, setStore, removeStore} from "./utils/store.js";
 
Vue.use(VueClipBoard);
Vue.use(ElementUI);

Vue.prototype.$server_url = baseUrl;
Vue.prototype.$img_url = baseUrl + '/public/uploads/';
Vue.prototype.$website = website;
Vue.prototype.$axios = axios;
Vue.prototype.$ttGet = ttGet;
Vue.prototype.$ttPost = ttPost;
Vue.prototype.$color = color;
Vue.prototype.$abrasion = abrasion;
Vue.prototype.$quality = quality;
Vue.prototype.$quality2 = quality2;
Vue.prototype.$getStore = getStore;
Vue.prototype.$setStore = setStore;
Vue.prototype.$removeStore = removeStore;
Vue.config.productionTip = false;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
