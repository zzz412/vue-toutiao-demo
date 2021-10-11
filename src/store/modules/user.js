import { getToken } from '@/utils/storage'

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
  actions: {},
  getters: {}
}
