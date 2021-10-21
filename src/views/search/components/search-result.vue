<template>
  <div class="search-result">
    <!-- 搜索结果 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="fetchData"
    >
      <ArticleItem  v-for="(item, i) in list" :key="i" :article="item" class="result-item"/>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ArticleItem from '@/components/article-item'

// 什么情况下触发搜素？ 按下回车、点击搜索关键字
export default {
  name: 'search-result',
  components: { ArticleItem },
  props: {
    // 搜索关键字
    kw: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false, // 加载状态
      finished: false, // 是否能加载
      list: [], // 数据列表
      page: 1 // 页码
    }
  },
  methods: {
    async fetchData () {
      // 调用接口 获取搜索结果
      const { page, results } = await getSearchResult({
        page: this.page,
        per_page: 20,
        q: this.kw
      })
      // console.log(page, per_page, results)
      // 追加到数组中
      this.list.push(...results)
      // 页码 + 1
      this.page = page + 1
      // 关闭加载状态
      this.loading = false
      // 判断是否数据
      if (results.length <= 0) {
        // 关闭加载
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-result {
  .result-item {
    margin-bottom: 12px;
  }
}
</style>
