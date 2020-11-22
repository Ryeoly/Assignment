import Vue from 'vue'
import Router from 'vue-router'
import mainframe from '@/components/mainframe'
import noticeframe from '@/components/noticeframe'
import enrollframe from '@/components/enrollframe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
