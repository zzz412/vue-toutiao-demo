<template>
  <div class="comment-reply">
    <!-- 导航条 -->
    <van-nav-bar :title="comment.reply_count ? comment.reply_count + '条回复' : '暂无回复' ">
      <!-- 左侧文字 -->
      <van-icon slot="left" name="cross" @click="$emit('close')"/>
    </van-nav-bar>
    <!-- 主体内容 -->
    <div class="scroll-warp">
      <!-- 当前评论项 -->
      <CommentItem :comment="comment"></CommentItem>
      <!-- 全部回复 -->
      <van-cell title="全部回复"></van-cell>
      <!-- 回复列表 -->
      <CommentList ref="commentListRef" :source="comment.com_id" type="c" :limit="2"></CommentList>
    </div>
    <!-- 底部评论 -->
    <div class="bottom-bar">
      <van-button round class="comment-btn" @click="postShow = true">写评论</van-button>
    </div>
    <!-- 评论输入框弹出层 -->
    <van-popup v-model="postShow" position="bottom">
      <CommentPost :target="comment.com_id" :articleId="articleId" @post="addComment"></CommentPost>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '../comment-item'
import CommentList from '../comment-list'
import CommentPost from '../comment-post'

// 1. 当前评论
// 2. 当前评论的所有回复
export default {
  name: 'comment-replay',
  components: { CommentItem, CommentList, CommentPost },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      postShow: false
    }
  },
  methods: {
    // 添加评论
    addComment (obj) {
      // 将评论添加到 评论列表
      this.$refs.commentListRef.list.unshift(obj)
      // 关闭弹出层
      this.postShow = false
      // 回复评论数量+1
      this.comment.reply_count++
      // 向外传递
      this.$emit('post', 1, true)
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  .comment-btn {
    width: 450px;
    height: 60px;
    padding: 0;
    line-height: 60px;
  }
}
.scroll-warp {
  height: calc(100vh - 90px - 92px);
  overflow-y: auto;
  .test {
    height: 3000px;
    background-image: linear-gradient(#666, red);
  }
}
</style>
