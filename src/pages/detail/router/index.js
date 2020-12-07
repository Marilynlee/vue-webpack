import Vue from 'vue'
import Router from 'vue-router'

import Detail from '@/pages/detail/home'

import NotFound from '@/components/404'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: '',
    meta: {
      title: '首页'
    },
    redirect: '/detail'
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {
      title: '详情页',
      needLogin: false
    },
    component: Detail
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
