import Vue from 'vue'
import VueRouter from 'vue-router'
import Myself from "../views/Myself";
import UserInfo from "../views/UserInfo";
import Login from "../views/Login";
import Results from "../views/Results";
import Home from "../views/Home";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component:Home,
    children: [
      {
        path: '/myself',
        name: 'myself',
        component: Myself
      },{
        path: '/userInfo',
        name: 'userInfo',
        component:UserInfo
      },
      {
        path: '/results',
        name: 'results',
        component:Results
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component:Login
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')).power:null;
  if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' })
  // 如果用户未能验证身份，则 `next` 会被调用两次
  next()
})

export default router
