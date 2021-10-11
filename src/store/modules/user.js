import { getToken, setToken } from '@/utils/storage'
import { login } from '@/api/user'

const defaultState = () => {
  return {
    token: getToken()
  }
}

export default {
  namespaced: true, // 命名空间
  state: defaultState(),
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    }
  },
  actions: {
    async login ({ commit }, info) {
      try { // 放入会出错的代码
        const { token } = await login(info)
        // 将token存到本地中
        setToken(token)
        commit('SET_TOKEN', token)
      } catch (error) {}
    }
  },
  getters: {}
}
