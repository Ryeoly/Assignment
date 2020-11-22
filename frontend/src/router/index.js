import Vue from 'vue'
import Router from 'vue-router'
import mainframe from '@/components/mainframe'
import noticeframe from '@/components/noticeframe'
import enrollframe from '@/components/enrollframe'
import Login from '@/components/login'
import SplashPage from "@/components/SplashPage";
import Join from "@/components/join";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: SplashPage
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/Join',
      component: Join
    },
    {
      path: '/main',
      component: mainframe
    },
    {
      path: '/notice',
      component: noticeframe
    },
    {
      path: '/enroll',
      component: enrollframe
    }
  ]
})
