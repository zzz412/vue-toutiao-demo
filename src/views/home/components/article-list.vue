<template>
  <div class="article-list-container">
    <!-- 文章 -->
    <van-cell class="article-item" v-for="article in articles" :key="article.art_id">
      <!-- title插槽  标题 -->
      <!-- van-multi-ellipsis--l2  多行省略文本 -->
      <div slot="title" class="title van-multi-ellipsis--l2">
        {{article.title}}
      </div>
      <!-- label插槽  多图-->
      <div slot="label" class="cover-list" v-if="article.cover.type == 3">
        <van-image
          v-for="(image, i) in article.cover.images"
          :key="i"
          :src="image"
          class="cover-item"
        />
      </div>
      <!-- label插槽  作者 评论  时间-->
      <div slot="label" class="info">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}} 评论</span>
        <span>{{article.pubdate}}</span>
      </div>
      <!-- default插值 单图 -->
      <van-image
        slot="default"
        v-if="article.cover.type == 1"
        :src="article.cover.images[0]"
        class="cover-img"
      />
    </van-cell>
  </div>
</template>

<script>
import { articleList } from '@/api/articles'

export default {
  name: 'article-list',
  props: {
    // 频道ID
    channelId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      articles: []
    }
  },
  methods: {
    // 获取文章列表
    async getArticles () {
      const res = await articleList({
        channel_id: this.channelId, // 频道ID
        timestamp: new Date().getTime() // 时间戳: 获取最新文章【当前时间戳】 获取上一页文章【历史事件戳（pre_timestamp）】
      })
      this.articles = res.results
    }
  },
  mounted () {
    this.getArticles()
  }
}
</script>

<style lang="scss" scoped>
.article-list-container {
  .article-item {
    padding-top: 20px;
    padding-bottom: 30px;
    &::after {
        width: 100%;
        left: 0;
    }
    ::v-deep .van-cell__title {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    ::v-deep .van-cell__value {
      flex: unset;
      width: 232px;
      height: 146px;
      margin-left: 26px;
    }
    .title {
      font-size: 32px;
      color: #3A3A3A;
    }
    .cover-list {
      display: flex;
      margin: 30px 0;
      .cover-item {
        flex: 1;
        height: 146px;
        margin-right: 4px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .info {
      span {
        margin: 0 6px;
        color: #B4B4B4;
        font-size: 23px;
      }
    }
    .cover-img {
      width: 232px;
      height: 146px;
    }
  }
}
</style>
