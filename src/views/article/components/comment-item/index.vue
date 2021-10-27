<template>
  <van-cell class="content-item">
    <!-- 头像 -->
    <van-image slot="icon" round :src="comment.aut_photo" class="avatar" />
    <!-- 用户名 -->
    <div class="top" slot="title">
      <span class="username">{{comment.aut_name}}</span>
      <!-- 点赞图片 -->
      <!-- style="color: #e5645f;" -->
      <van-button
        :loading="loading"
        class="like-btn"
        :class="{ liking: comment.is_liking }"
        slot="default"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        @click="onLiking"
      >
      {{ comment.like_count || '赞' }}
      </van-button>
    </div>

    <!-- 评论信息 -->
    <div class="comment-info" slot="label">
      <!-- 评论 -->
      <div class="content">{{comment.content}}</div>
      <!-- 底部信息 -->
      <div class="bottom">
        <span class="time">{{comment.pubdate | relativeTime}}</span>
        <van-button class="rp-btn" round @click="$emit('reply')">回复 {{comment.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { commentLike, commentUnLike } from '@/api/comment'

export default {
  name: 'comment-item',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      imgSrc: require('@/assets/logo.png'),
      loading: false
    }
  },
  methods: {
    async onLiking () {
      this.loading = true
      // 判断 操作类型
      if (this.comment.is_liking) {
        // 已点赞   取消点赞
        await commentUnLike(this.comment.com_id)
        this.comment.like_count--
      } else {
        // 未点赞   点赞
        await commentLike(this.comment.com_id)
        this.comment.like_count++
      }
      // 修改页面
      this.comment.is_liking = !this.comment.is_liking
      // 提示文本
      this.$toast.success('操作成功')
      this.loading = false
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
      &.liking {
        color: #e5645f;
      }
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
