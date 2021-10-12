<template>
  <div class="page-container">
    <!-- 个人信息展示区 -->
    <!-- 登录前 -->
    <div class="header no-login" v-if="!isLogin">
      <img src="@/assets/mobile.png" alt="">
      <span>登录 / 注册</span>
    </div>
    <!-- 登录后 -->
    <div class="header login" v-else>
      <!-- 头像 名称 区域 -->
      <div class="info1">
        <img src="@/assets/logo.png" alt="">
        <span class="username">某某扣2</span>
        <van-button type="default" class="edit-info-btn" size="mini" round>编辑资料</van-button>
      </div>
      <!-- 资料区域 -->
      <div class="info2">
        <div class="item">
          <span>12</span>
          <span>头条</span>
        </div>
        <div class="item">
          <span>12</span>
          <span>粉丝</span>
        </div>
        <div class="item">
          <span>12</span>
          <span>关注</span>
        </div>
        <div class="item">
          <span>12</span>
          <span>获赞</span>
        </div>
      </div>
    </div>

    <!-- 功能区  宫格-->
    <!-- 默认一行展示四个格子 column-num 自定义列数 -->
    <van-grid :column-num="2" class="my-grid" clickable>
      <van-grid-item class="my-grid-item">
        <!-- 自定义图标 -->
        <i class="iconfont icon-shoucang" slot="icon"></i>
        <span slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item  class="my-grid-item">
        <!-- 自定义图标 -->
        <i class="iconfont icon-lishi" slot="icon"></i>
        <span slot="text">历史</span>
      </van-grid-item>
    </van-grid>

    <!-- 单元格区 -->
    <div class="my-cell-gruop">
      <van-cell title="消息通知" is-link/>
      <van-cell title="小智同学" is-link/>
    </div>

    <!-- 退出登录 -->
    <div class="logout" v-if="isLogin">
      <van-cell title="退出登录" title-class="logout-text"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'my',
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 361px;
  // ~ 路径被webpack解析
  background: url('~@/assets/banner.png');
  background-size: cover;
  &.no-login {
    // 设置为flex容器
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 132px;
      height: 132px;
    }
    span {
      font-size: 28px;
      color: #FFF;
      margin-top: 15px;
    }
  }
  &.login {
    overflow: hidden;
    .info1 {
      display: flex;
      // 设置主轴方向 两端对齐 中间居中
      justify-content: space-between;
      align-items: center;
      margin: 80px 32px 0;
      img {
        width: 132px;
        height: 132px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #FFF;
      }
      span.username {
        font-size: 30px;
        color: #FFF;
        flex: 1;
        margin-left: 22px;
      }
      .edit-info-btn {
        padding: 0 17px;
        span {
          color: #666666;
          font-size: 20px;
        }
      }
    }
    .info2 {
      margin-top: 55px;
      display: flex;
      .item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #FFF;
        span:first-child {
          font-size: 36px;
        }
        span:last-child {
          font-size: 23px;
        }
      }
    }
  }
}
.my-grid {
  .my-grid-item {
    margin-bottom: 9px;
    .iconfont {
      font-size: 45px;
      margin-bottom: 12px;
    }
    .icon-shoucang {
      color: #EB5253;
    }
    .icon-lishi {
      color: #FF9D1D;
    }
    span {
      color: #333;
      font-size: 28px;
    }
  }
}
.my-cell-gruop {
  margin-bottom: 9px;
}
.logout {
  .logout-text {
    text-align: center;
    color: #D86262;
    font-size: 30px;
  }
}
</style>
