<template>
  <div class="search-suggestion">
    <!-- 搜索建议 -->
    <van-cell icon="search" v-for="(item, index) in hightOptions" :key="index" @click="$emit('search', options[index])">
      <div slot="title" v-html="item"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'

export default {
  name: 'search-suggestion',
  props: {
    kw: { // 搜索关键词
      type: String,
      required: true
    }
  },
  data () {
    return {
      options: [],
      hightOptions: []
    }
  },
  watch: {
    kw: {
      handler: 'loadSuggestion', // 绑定的函数
      immediate: true // 组件加载时就调用一次
    }
  },
  methods: {
    // 获取搜索建议
    async loadSuggestion (v) {
      // 啥时候触发该方法 ? kw改变时
      const { options } = await getSuggestion(v)
      this.options = options
      this.hightOptions = this.kwHight(options)
    },
    // 设置关键字高亮
    kwHight (options) {
      // 判断options的结果有效性
      if (options[0] === null || !options.length) return []
      // 思路： 从匹配的结果中找到对应关键字   ->  替换关键字为特殊标签 -> v-html渲染
      const replaceOptions = options.map(item => {
        // 1. 创建正则表达式  /1/ig
        const reg = new RegExp(this.kw, 'ig')
        // 2. 替换关键词为标签
        return item.replace(reg, `<span class="highlight">${this.kw}</span>`)
      })
      return replaceOptions
    }
  }
}
</script>

<style lang="scss" scoped>
.search-suggestion {
  ::v-deep .van-cell__title {
    .highlight {
      color: #3296fa
    }
  }
}

</style>
