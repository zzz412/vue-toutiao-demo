<template>
  <div class="article-list-container">
    <!-- 下拉刷新组件
       v-model  当前状态  true 刷新中  false 未刷新
       @refresh 下拉刷新触发【会自动将v-model的状态改为true】
     -->
    <van-pull-refresh v-model="isPullRefresh" @refresh="refreshLoad">
      <!-- 列表组件
          v-model 加载状态 true 加载中 false 加载完毕
          finished 是否结束  true 结束 false 未结束 【当为true时便不会再触发加载事件（意味没有数据了）】
          @load  加载事件 【当滑动到底部时会自动触发, 并将v-model改为true  加载完毕时 手动改为false】(页面加载时会触发一次)
          finished-text 结束时显示的文字
       -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="一滴都不剩了！！！"
          @load="getArticles"
        >
        <ArticleItem v-for="(article, index) in articles" :key="index" :article="article"/>
       </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { articleList } from '@/api/articles'
import ArticleItem from '@/components/article-item'

export default {
  name: 'article-list',
  components: { ArticleItem },
  props: {
    // 频道ID
    channelId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      articles: [],
      isPullRefresh: false, // 是否下拉刷新中
      loading: false, // 是否上拉加载中
      finished: false // 是否完成
    }
  },
  methods: {
    // 获取文章列表
    async getArticles () {
      const res = await articleList({
        channel_id: this.channelId, // 频道ID
        // 第一次用当前时间戳   后面都用历史时间戳
        timestamp: this.pre_timestamp ? this.pre_timestamp : new Date().getTime() // 时间戳: 获取最新文章【当前时间戳】 获取上一页文章【历史事件戳（pre_timestamp）】
      })
      // 保存历史时间戳
      this.pre_timestamp = res.pre_timestamp
      // 将加载的数据 添加到数据列表
      this.articles.push(...res.results)
      // 关闭加载状态
      this.loading = false
      // 判断是否还有数据
      if (res.results <= 0) {
        // 关闭加载
        this.finished = true
      }
    },
    // 下拉刷新
    async refreshLoad () {
      const res = await articleList({
        channel_id: this.channelId, // 频道ID
        // 第一次用当前时间戳   后面都用历史时间戳
        timestamp: new Date().getTime() // 时间戳: 获取最新文章【当前时间戳】 获取上一页文章【历史事件戳（pre_timestamp）】
      })
      // 将加载的数据 添加到数据列表
      this.articles = res.results
      // 关闭刷新状态
      this.isPullRefresh = false
      // 开启加载
      this.finished = false
    }
  }
}
</script>

<style lang="scss" scoped>
.article-list-container {
  // 88 80 98
  height: 80vh;
  overflow-y: auto;
}
</style>
