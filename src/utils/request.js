// 导入 axios
import Axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

// 创建axios实例
const service = Axios.create({
  baseURL: 'http://toutiao.zeng.pub/v1_0/' // 接口跟路径
})
// 定义统一请求拦截器
service.interceptors.request.use(
  // 请求成功
  config => {
    // 添加用户凭证
    config.headers.Authorization = 'Bearer ' + store.state.user.token
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
  err => {
    // 获取响应失败的信息
    const res = err.response
    if (res.status < 500) {
      // 提示错误内容
      Toast.fail(res.data.message || '发生错误了')
    }
    return Promise.reject(err)
  }
)

export default service
