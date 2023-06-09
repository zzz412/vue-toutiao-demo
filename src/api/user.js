import request from '@/utils/request'

// 用户登录/注册
export function login (data) {
  return request({
    method: 'post',
    url: 'authorizations',
    data
  })
}

// 发送验证码
export function sendCode (phone) {
  return request({
    method: 'get',
    url: `sms/codes/${phone}`
  })
}

// 获取用户信息
export function userInfo () {
  return request({
    method: 'get',
    url: 'user'
  })
}

// 关注用户
export function followUser (id) {
  return request({
    method: 'post',
    url: 'user/followings',
    data: {
      target: id
    }
  })
}

// 取消关注用户
export function unFollowUser (id) {
  return request({
    method: 'delete',
    url: `user/followings/${id}`
  })
}

// 获取用户个人资料
export function userProFile () {
  return request({
    method: 'get',
    url: 'user/profile'
  })
}

// 上传用户头像
export function uploadUserPhoto (data) {
  return request({
    method: 'patch',
    url: 'user/photo',
    data
  })
}

// 修改用户资料
export function updateUserInfo (data) {
  return request({
    method: 'patch',
    url: 'user/profile',
    data
  })
}
