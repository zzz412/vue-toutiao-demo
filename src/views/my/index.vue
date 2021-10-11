<template>
  <div class="page-container">
    <!-- 个人信息展示区 -->
    <div class="header">
      <img src="@/assets/mobile.png" alt="">
      <span>登录 / 注册</span>
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
  </div>
</template>

<script>
export default {
  name: 'my'
}
</script>

<style lang="scss" scoped>
.header {
  height: 361px;
  // ~ 路径被webpack解析
  background: url('~@/assets/banner.png');
  background-size: cover;
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
</style>
