// 文章接口
import request from '@/utils/request'

// 获取搜索建议
export function getSuggestion (q) {
  return request({
    method: 'get',
    url: 'suggestion',
    params: {
      q
    }
  })
}
