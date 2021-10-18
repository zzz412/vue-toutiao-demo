// 频道接口
import request from '@/utils/request'

// 获取用户频道列表
export function getUserChannels () {
  return request({
    method: 'get',
    url: 'user/channels'
  })
}

// 获取全部频道列表
export function getAllChannels () {
  return request({
    method: 'get',
    url: 'channels'
  })
}

// 设置用户频道列表
export function addUserChannels (data) {
  return request({
    method: 'patch',
    url: 'user/channels',
    data
  })
}

// 删除用户频道列表
export function removeUserChannels (id) {
  return request({
    method: 'delete',
    url: `user/channels/${id}`
  })
}
