<template>
  <!-- 评论列表 -->
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
     <!-- 评论项 -->
     <CommentItem v-for="(item, index) in list" :key="index" :comment="item"/>
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
      const { results, last_id, total_count } = await commentList({
        type: 'a', // 查询的类型 a 查文章评论 c 查评论回复
        source: this.source, // 查询的ID （a 文章id  c 评论id）
        offset: this.offset, // 文章偏移量 （分页 第一页为null  后续穿对应ID即可）
        limit: 5 // 每次查询的条数
      })
      // 将查询的数据追加在list中
      this.list.push(...results)
      // 关闭加载状态
      this.loading = false
      // 传递评论数量
      this.$emit('count', total_count)
      // 判断是否还有数据
      if (results.length <= 0) {
        // 无数据
        this.finished = true
      } else {
        // 有数据
        // eslint-disable-next-line camelcase
        this.offset = last_id
      }
    }
  },
  mounted () {
    // 手动触发load事件  不会更改loading状态
    this.loading = true
    this.onLoad()
  }
}
</script>

<style lang="scss" scoped>

</style>
