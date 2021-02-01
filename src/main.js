import Vue from 'vue'
import App from './App.vue';
import '../src/assets/element-ui/index.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import router from './router'
import store from './store'

import './public/index'
Vue.use(ElementUI);
Vue.prototype.$http=axios.create({
  baseURL:"http://localhost:3001"
  //baseURL:"http://47.100.179.136:10005"
});



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
