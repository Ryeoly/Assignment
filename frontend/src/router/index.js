import Vue from 'vue'
import Router from 'vue-router'
import mainframe from '@/components/mainframe'
import noticeframe from '@/components/noticeframe'
import enrollframe from '@/components/enrollframe'
import resultframe from '@/components/resultframe'
import rankingframe from "@/components/rankingframe";
import Login from '@/components/login'
import SplashPage from "@/components/SplashPage";
import Join from "@/components/join";
import view from "@/components/view-detail";

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
      path: '/result',
      component: resultframe
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
      path: '/notice/:snum',
      name: 'notice',
      component: noticeframe,
      props: true
    },
    {
      path: '/enroll',
      component: enrollframe
    },
    {
      path: '/ranking',
      component: rankingframe
    },
    {
      path: '/viewdetail/:index',
      component: view,
      name: 'view',
      props: true
    }
  ]
})
