// 频道接口
import request from '@/utils/request'

// 获取用户频道列表
export function getUserChannels () {
  return request({
    method: 'get',
    url: 'user/channels'
  })
}
