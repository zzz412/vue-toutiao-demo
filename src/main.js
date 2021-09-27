import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入适配 flexible
import 'amfe-flexible'

// 导入vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 导入字体图标
import './fonts/iconfont.css'

Vue.config.productionTip = false
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
