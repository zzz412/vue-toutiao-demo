/* eslint-disable camelcase */
// 刷新token  达到免登录效果
// 1. token过期时去刷新token
//    怎么才能判断token过期？  服务器返回的状态码为401（无token token过期）
//    无token 与 token过期怎么区别？
//     无token  ->  本地无token  ->   跳转到登录
//     token过期 ->  本地有token ->   刷新token   ->   [是否有rf_token]  ->  有rf_token   ->  设置新的token
//                                                                          无rf_token  ->  跳转到登录
// 导入 axios
import Axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import router from '@/router'

// 创建axios实例
const service = Axios.create({
  baseURL: 'http://toutiao.zeng.pub/v1_0/' // 接口跟路径
})
// 定义统一请求拦截器
service.interceptors.request.use(
  // 请求成功
  config => {
    if (store.state.user.token) {
      // 添加用户凭证
      config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
    return config
  },
  // 请求失败
  err => Promise.reject(err)
)

// 定义统一响应拦截器
service.interceptors.response.use(
  // 响应成功
  res => {
    // 将响应真正结果返回
    return res.data.data
  },
  // 响应失败
  async err => {
    // 获取响应失败的信息
    const res = err.response
    console.log(res)
    // 判断状态码是否为401
    if (res.status === 401) {
      const token = store.state.user.token
      // 无token (从vuex中获取token)
      if (!token) {
        // 跳转到登录
        router.push('/login')
        return
      }
      // token过期 (刷新token)
      const rf_token = store.state.user.rf_token
      // 清除token
      store.commit('user/SET_TOKEN', {
        refresh_token: rf_token
      })
      try {
        // 发送请求刷新token
        const { token } = await service({
          method: 'put',
          url: 'authorizations',
          headers: {
            Authorization: 'Bearer ' + rf_token
          }
        })
        // 将新token重新设置
        store.commit('user/SET_TOKEN', {
          token,
          refresh_token: rf_token
        })
        // 将上次失效的请求 再发送一次  res.config保存了上次请求所有信息
        return service(res.config)
      } catch (error) {
        // 跳转到登录
        router.push('/login')
      }
    }
    if (res.status < 500) {
      // 提示错误内容
      Toast.fail(res.data.message || '发生错误了')
    }
    return Promise.reject(err)
  }
)

export default service
