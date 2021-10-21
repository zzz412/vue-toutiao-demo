<template>
  <div class="article-container">
    文章详情
  </div>
</template>

<script>
export default {
  name: 'article-index',
  props: {
    // 动态路由参数
    articleId: [String, Number]
  },
  mounted () {
    // 如何获取动态路由的值
    console.log(this.articleId)
  }
}
</script>

<style lang="scss" scoped>

</style>
