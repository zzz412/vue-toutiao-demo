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
