<template>
  <div class="article-container">
    <!-- 导航 -->
    <van-nav-bar  left-arrow class="nav-bar"/>
    <!-- 内容区域 -->
    <div class="main-wrap">
      <!-- 文章标题 -->
      <div class="artilce-title">{{article.title}}</div>
      <!-- 作者信息 -->
      <van-cell class="author-info" :border="false">
        <van-image class="author-avatar" :src="article.aut_photo" slot="icon"/>
        <span slot="title">{{article.aut_name}}</span>
        <span slot="label">{{article.pubdate | relativeTime}}</span>
        <van-button type="info" slot="default" round size="small" class="follow-btn" icon="plus">关注</van-button>
      </van-cell>
      <!-- 文章内容 -->
      <div class="article-content markdown-body" v-html="article.content"></div>
    </div>
    <!-- 底部导航 -->
    <div class="bottom-bar">
      <!-- 写评论 -->
      <van-button round class="comment-btn">写评论</van-button>
      <!-- 评论数量 -->
      <van-icon name="comment-o" badge="99" class="comment-count"/>
      <!-- 收藏 -->
      <van-button icon="star-o" class="btn-item" size="small"></van-button>
      <!-- 点赞 -->
      <van-button icon="good-job-o" class="btn-item" size="small"></van-button>
      <!-- 分享 -->
      <van-button icon="share-o" class="btn-item" size="small"></van-button>
    </div>
  </div>
</template>

<script>
import { articleInfo } from '@/api/articles'

export default {
  name: 'article-index',
  props: {
    // 动态路由参数
    articleId: [String, Number]
  },
  data () {
    return {
      // 文章详情
      article: {}
    }
  },
  methods: {
    async loadArticle () {
      // 查询文章详情
      const article = await articleInfo(this.articleId)
      this.article = article
    }
  },
  mounted () {
    this.loadArticle()
  }
}
</script>

<style lang="scss" scoped>
@import url('./github.makedown.css');

.article-container {
  background: #FFF;
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #3296FA;
    ::v-deep .van-icon {
      color: #FFF;
    }
  }
  .main-wrap {
    box-sizing: border-box;
    padding: 0 32px;
    margin-top: 92px;
    margin-bottom: 88px;
    .artilce-title {
      padding: 48px 0 59px;
      margin-top: 96px;
      color: #3A3A3A;
      font-size: 40px;
      font-weight: 600;
    }
    .author-info {
      display: flex;
      align-items: center;
      padding: 0;
      margin-bottom: 30px;
      .author-avatar {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .follow-btn {
        width: 170px;
        height: 39px;
        padding: 26px 0;
        line-height: 39px;
      }
    }
    .article-content {
      font-size: 32px;
      // 文章详情的样式 使用MD文档撰写的
      // 只需要下载指定的MD css即可
    }
  }
  .bottom-bar {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    height: 88px;
    background: #FFF;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .comment-btn {
      height: 45px;
      width: 281px;
      box-sizing: border-box;
      padding: 24px 0;
      color: #a7a7a7;
    }
    .comment-count {
      margin-right: 4px;
    }
    ::v-deep .van-icon{
      font-size: 40px;
      color: #777;
    }
    .btn-item {
      border: 0;
    }
  }
}

</style>