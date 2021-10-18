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
         <article-list :channelId="channel.id"></article-list>
        </van-tab>
        <!-- 编辑按钮 -->
        <i slot="nav-right" class="iconfont icon-gengduo" @click="setChannelPopup = true"></i>
    </van-tabs>
    <!-- 编辑标签 弹出层 -->
    <van-popup
      v-model="setChannelPopup"
      position="bottom"
      closeable
      close-icon-position="top-left"
      style="height: 100%;"
    >
      <channel-edit :myChannels="channels" :active="activeTab" @switchTab="switchTab"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channels'
import articleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'

export default {
  components: { articleList, ChannelEdit },
  name: 'home',
  data () {
    return {
      activeTab: 0,
      channels: [],
      setChannelPopup: false // 自定义频道弹窗
    }
  },
  methods: {
    async getUserChannels () {
      const { channels } = await getUserChannels()
      this.channels = channels
    },
    switchTab ({ active, popup = false }) {
      // 切换频道
      this.activeTab = active
      // 关闭弹出层
      this.setChannelPopup = popup
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
    border-bottom: 1px solid #EDEFF3;
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
    height: 80px;
    line-height: 80px;
    text-align: center;
    background: rgba(255,255,255, .9);
  }
}
</style>
