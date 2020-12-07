import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home/home'

import NotFound from '@/components/404'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: '',
    meta: {
      title: '首页'
    },
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '主页',
      needLogin: false
    },
    component: Home
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '页面不存在'
    },
    component: NotFound
  }
]
const paths = []
routes.filter(item => paths.push(item.path))

const router = new Router({
  routes
})

router.beforeEach(async (to, from, next) => {
  if (!paths.includes(to.path)) router.push('/404')
  next()
})
export default router
