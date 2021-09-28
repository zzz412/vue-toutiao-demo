import request from '@/utils/request'

// 用户登录/注册
export function login (data) {
  return request({
    method: 'post',
    url: 'authorizations',
    data
  })
}
