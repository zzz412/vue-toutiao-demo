import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入适配 flexible
import 'amfe-flexible'

// 导入vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 导入全局样式
import './style/index.scss'

// 导入全局过滤器
import '@/filters'

Vue.config.productionTip = false
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
