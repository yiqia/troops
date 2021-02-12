import Vue from 'vue'
import App from './App.vue';
import '../src/assets/element-ui/index.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import router from './router'
import store from './store'
import VueCookie from 'vue-cookie'

import './public/index'
Vue.use(ElementUI);
Vue.use(VueCookie) // 挂在在全局了


let instance = axios.create({
  //baseURL:"http://47.100.179.136:8080"
  baseURL:"http://localhost:3001"
  //baseURL:"http://47.100.179.136:10005"
});
instance.defaults.withCredentials = true;
Vue.prototype.$http=instance;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
