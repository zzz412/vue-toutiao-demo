// 文章接口
import request from '@/utils/request'

// 根据频道获取文章列表
export function articleList (params) {
  return request({
    method: 'get',
    url: 'articles',
    params
  })
}

// 获取文章详情
export function articleInfo (id) {
  return request({
    method: 'get',
    url: `articles/${id}`
  })
}
