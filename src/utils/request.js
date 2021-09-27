// 导入 axios
import Axios from 'axios'

// 创建axios实例
const service = Axios.create({
  baseURL: 'http://toutiao.zeng.pub/v1_0/' // 接口跟路径
})

export default service
