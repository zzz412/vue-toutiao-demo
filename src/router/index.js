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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
