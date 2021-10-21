<template>
  <van-cell
    class="article-item"
    :to="{ name: 'article', params: { articleId: article.art_id } }"
  >
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
      <!-- dayjs 时间处理库  相对时间（插件） -->
      <span>{{article.pubdate | relativeTime}}</span>
    </div>
    <!-- default插值 单图 -->
    <van-image
      slot="default"
      v-if="article.cover.type == 1"
      :src="article.cover.images[0]"
      class="cover-img"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'article-item',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
