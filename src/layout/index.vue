<template>
  <div class="app-container">
    <!-- 内容区域 -->
    <router-view></router-view>
    <!-- 底部导航区域 -->
    <van-tabbar route active-color="#3296FA" inactive-color="#707070" class="bottom-bar">
      <van-tabbar-item to="/">
        首页
        <i slot="icon" class="iconfont icon-shouye"></i>
      </van-tabbar-item>
      <van-tabbar-item to="/qs">
        问答
        <i slot="icon" class="iconfont icon-wenda"></i>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        视频
        <i slot="icon" class="iconfont icon-shipin"></i>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        我的
        <i slot="icon" class="iconfont icon-wode"></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  min-height: 100vh;
  background: #F5F7F9;
}
.bottom-bar {
  height: 98px;
  .iconfont {
    font-size: 40px;
  }
  ::v-deep .van-tabbar-item__text {
    font-size: 20px;
  }
}
</style>
