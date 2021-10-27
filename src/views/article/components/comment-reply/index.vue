<template>
  <div class="comment-reply">
    <!-- 导航条 -->
    <van-nav-bar title="123123">
      <!-- 左侧文字 -->
      <van-icon slot="left" name="cross" @click="$emit('close')"/>
    </van-nav-bar>
    <!-- 主体内容 -->
    <div class="scroll-warp">
      <div class="test"></div>
    </div>
    <!-- 底部评论 -->
    <div class="bottom-bar">
      <van-button round class="comment-btn">写评论</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment-replay'
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
