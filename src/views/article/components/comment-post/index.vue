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
    <van-button class="post-btn" :disabled="content.length === 0">发布</van-button>
  </div>
</template>

<script>
export default {
  name: 'comment-post',
  data () {
    return {
      content: ''
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
