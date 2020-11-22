import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import SplashPage from "@/components/SplashPage";
import Join from "@/components/join";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'SplashPage',
      component: SplashPage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/join',
      name: 'join',
      component: Join
    }
  ]
})
