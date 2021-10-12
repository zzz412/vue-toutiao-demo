<template>
  <div class="page-container">
    <!-- 导航头部 -->
    <van-nav-bar class="nav-bar">
      <div class="nav-search-bar" slot="title">
        <i class="iconfont icon-sousuo"></i> <span>搜索</span>
      </div>
    </van-nav-bar>
    <!-- 选项卡标签与列表 -->
    <van-tabs v-model="activeTab" class="home-tab">
      <!-- 循环渲染 频道列表 -->
       <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id" class="home-tab-item">
         内容 {{channel.name}}
        </van-tab>
        <!-- 编辑按钮 -->
        <i slot="nav-right" class="iconfont icon-gengduo"></i>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channels'

export default {
  name: 'home',
  data () {
    return {
      activeTab: 0,
      channels: []
    }
  },
  methods: {
    async getUserChannels () {
      const { channels } = await getUserChannels()
      this.channels = channels
    }
  },
  mounted () {
    this.getUserChannels()
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  background-color: #3296FA;
  height: 88px;
  ::v-deep .van-nav-bar__title {
    max-width:unset;
  }
  .nav-search-bar {
    width: 555px;
    height: 64px;
    background: rgba(255,255,255, .2);
    border-radius: 32px;
    color: #FFF;
    line-height: 64px;
    font-size: 28px;
    .iconfont {
      font-size: 32px;
    }
  }
}
.home-tab {
  ::v-deep .van-tabs__wrap {
    height: 80px;
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tab{
      border-right: 1px solid #EDEFF3;
      width: 200px;
    }
    .van-tabs__line {
      background: #3296FA;
      width: 31px;
      height: 6px;
      bottom: 8px;
    }
    .van-tab--active .van-tab__text {
      color: #333333;
      font-size: 30px;
      font-weight: bold;
    }
    .van-tab__text {
      color: #777777;
      font-size: 28px;
    }
  }
  .icon-gengduo {
    position: fixed;
    right: 0;
    width: 66px;
    font-size: 40px;
    color: #333333;
    height: 82px;
    line-height: 82px;
    text-align: center;
    background: rgba(255,255,255, .9);
  }
}
</style>
