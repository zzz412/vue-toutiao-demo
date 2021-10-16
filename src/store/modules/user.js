import { getToken, setToken, removeToken, setItem, getItem, removeItem } from '@/utils/storage'
import { login } from '@/api/user'
const TOUTIAO_RF_TOKEN = 'TOUTIAO_RF_TOKEN'

const defaultState = () => {
  return {
    token: getToken(),
    rf_token: getItem(TOUTIAO_RF_TOKEN)
  }
}

export default {
  namespaced: true, // 命名空间
  state: defaultState(),
  mutations: {
    SET_TOKEN (state, data) {
      state.token = data.token
      state.rf_token = data.refresh_token
    }
  },
  actions: {
    async login ({ commit }, info) {
      try { // 放入会出错的代码
        // eslint-disable-next-line camelcase
        const { token, refresh_token } = await login(info)
        // 将token存到本地中
        setToken(token)
        // 将rf_token存到本地中
        setItem(TOUTIAO_RF_TOKEN, refresh_token)
        commit('SET_TOKEN', {
          token,
          refresh_token
        })
      } catch (error) {}
    },
    // 退出登录
    logout ({ commit }) {
      // 1. 清除本地的token
      removeToken()
      removeItem(TOUTIAO_RF_TOKEN)
      // 2. 清除vuex的token
      commit('SET_TOKEN', {})
    }
  },
  getters: {}
}
