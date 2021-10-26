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

// 对评论或回复 点赞
export function commentLike (target) {
  return request({
    method: 'post',
    url: 'comment/likings',
    data: {
      target
    }
  })
}

// 对评论或回复 取消点赞
export function commentUnLike (target) {
  return request({
    method: 'delete',
    url: `comment/likings/${target}`
  })
}
