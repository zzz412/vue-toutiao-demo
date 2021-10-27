<template>
  <div class="comment-post">
    <!-- 输入框 -->
    <van-field
      class="comment-input"
      type="textarea"
      placeholder="请输入留言"
      v-model.trim="content"
      :maxlength="50"
      show-word-limit
      autosize
    />
    <!-- 提交按钮 -->
    <van-button class="post-btn" :disabled="content.length === 0" @click="postComment">发布</van-button>
  </div>
</template>

<script>
import { sendComment } from '@/api/comment'

export default {
  name: 'comment-post',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    async postComment () {
      // 设置加载状态
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        // 发送网络请求 发表评论
        const { new_obj } = await sendComment({
          target: this.articleId, // 对文章评论则是文章ID  对评论回复则是评论ID
          content: this.content, // 评论内容
          art_id: null // 对文章评论则为null  对评论回复则是文章ID
        })
        // 将返回的评论对象 添加到评论列表中list
        this.$emit('post', new_obj)
        // 清空文本框
        this.content = ''
        this.$toast('评论成功')
      } catch (err) {
        this.$toast('发送了错误！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-post {
  display: flex;
  align-items: center;
  padding: 40px;
  padding-right: 0;
  .comment-input {
    background: #f5f7f9;
  }
  .post-btn {
    border: none;
    width: 122px;
    height: 88px;
    padding: 0;
    color: #6ba3d8;
  }
}
</style>
