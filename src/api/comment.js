// 评论接口
import request from '@/utils/request'

// 获取评论或评论回复
export function commentList (params) {
  return request({
    method: 'get',
    url: 'comments',
    params
  })
}
