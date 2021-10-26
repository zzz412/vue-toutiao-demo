<template>
  <van-cell class="content-item">
    <!-- 头像 -->
    <van-image slot="icon" :src="imgSrc" class="avatar" />
    <!-- 用户名 -->
    <div class="top" slot="title">
      <span class="username">张帆嫌犯</span>
      <!-- 点赞图片 -->
      <van-button class="like-btn" slot="default" icon="good-job-o" >赞</van-button>
    </div>

    <!-- 评论信息 -->
    <div class="comment-info" slot="label">
      <!-- 评论 -->
      <div class="content">123u2123</div>
      <!-- 底部信息 -->
      <div class="bottom">
        <span class="time">3天前</span>
        <van-button class="rp-btn" round>回复 0</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
export default {
  name: 'comment-item',
  data () {
    return {
      imgSrc: require('@/assets/logo.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.content-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .username {
      color: #406599;
      font-size: 26px;
    }
    .like-btn {
      border: 0;
      padding: 0;
      font-size: 20px;
      height: unset;
    }
  }
  .comment-info {
    .content {
      padding: 26px 0;
      font-size: 32px;
      color: #222;
    }
    .bottom {
      display: flex;
      align-items: center;
      .time {
        margin-right: 24px;
        color: #222;
      }
      .rp-btn {
        width: 134px;
        height: 48px;
        font-size: 18px;
        padding: 0;
      }
    }
  }
}
</style>
