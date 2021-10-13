// 全局过滤器
import Vue from 'vue'

import dayjs from 'dayjs'

// 导入相对时间插件包
import relativeTime from 'dayjs/plugin/relativeTime'

import 'dayjs/locale/zh-cn'
// dayjs默认语言包为英文
dayjs.locale('zh-cn')

// 扩展到dayjs中
dayjs.extend(relativeTime)

// 定义相对时间 全局过滤器
Vue.filter('relativeTime', v => {
  return dayjs().to(dayjs(v))
})
