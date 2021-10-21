import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  { // 主页
    path: '/',
    component: Layout,
    children: [
      { path: '', name: 'home', component: () => import('@/views/home') },
      { path: '/qs', name: 'qs', component: () => import('@/views/qs') },
      { path: '/video', name: 'video', component: () => import('@/views/video') },
      { path: '/my', name: 'my', component: () => import('@/views/my') }
    ]
  },
  { // 登录
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  { // 搜索
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  { // 文章详情
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将动态路由的参数 传到组件的props中
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
