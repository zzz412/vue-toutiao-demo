<template>
  <!-- 评论列表 -->
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
     <!-- 评论项 -->
     <CommentItem v-for="item in list" :key="item"/>
  </van-list>
</template>

<script>
import CommentItem from '../comment-item'
import { commentList } from '@/api/comment'

export default {
  name: 'comment-list',
  components: { CommentItem },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null
    }
  },
  methods: {
    async onLoad () {
      const data = await commentList({
        type: 'a', // 查询的类型 a 查文章评论 c 查评论回复
        source: this.source, // 查询的ID （a 文章id  c 评论id）
        offset: this.offset, // 文章偏移量 （分页 第一页为null  后续穿对应ID即可）
        limit: 5 // 每次查询的条数
      })
      console.log(data)
      this.loading = false
      this.finished = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
