import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    // 是否登录
    isLogin: state => {
      return state.user.token !== undefined
    }
  },
  modules: {
    user
  }
})
