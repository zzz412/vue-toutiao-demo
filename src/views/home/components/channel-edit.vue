<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell class="my-channel" :border="false">
      <!-- 标题 -->
      <div slot="title" class="title">我的频道</div>
      <!-- 操作按钮 -->
      <van-button
        class="edit-btn"
        type="danger"
        round
        plain
        size="mini"
        @click="isEdit = !isEdit"
      >{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <!-- 我的频道标签列表 -->
    <van-grid class="my-channel-list" :border="false">
       <van-grid-item class="my-grid-item" v-for="(channel, index) in myChannels" :key="index" @click="handlerChannel(index, channel.id)">
         <span slot="text" :style="{ color: active === index ? 'red' : '' }">{{channel.name}}</span>
         <!-- !fixedChannels.includes(channel.id)  当前频道id不在固定频道中出现 -->
         <van-icon name="cross" slot="icon" v-show="isEdit && !fixedChannels.includes(channel.id)"/>
       </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell class="recommend-channel" :border="false">
      <!-- 标题 -->
      <div slot="title" class="title">频道推荐</div>
    </van-cell>
    <!-- 频道推荐标签列表 -->
    <van-grid class="recommend-channel-list" :border="false">
      <van-grid-item class="recommend-grid-item" v-for="(channels, index) in recommendChannels" :key="index" @click="addChannel(channels)">
        <span slot="text">{{channels.name}}</span>
        <van-icon name="plus" slot="icon"/>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, removeUserChannels } from '@/api/channels'
import { mapGetters } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'channel-edit',
  // 接收父组件传递的值 props
  props: {
    // 我的频道列表
    myChannels: {
      type: Array,
      required: true
    },
    // 当前激活频道
    active: {
      type: [String, Number],
      default: 0
    }
  },
  data () {
    return {
      isEdit: false,
      // 固定频道
      fixedChannels: [0],
      // 全部频道
      allChannels: [],
      // 推荐频道
      rdChannels: []
    }
  },
  computed: {
    ...mapGetters(['isLogin']),
    recommendChannels () {
      // 从所有频道中筛选出与用户频道 不同的值
      // 推荐的频道【用户未设置的频道】 = 所有的频道 - 用户的频道
      // 筛选数组数据
      return this.allChannels.filter(item => {
        // includes是否存在（简单类型） some是否存在(复杂类型)
        // 当前遍历值的id是否在我的频道列表中存在
        // eslint-disable-next-line eqeqeq
        return !this.myChannels.some(item2 => item2.id == item.id)
      })
    }
  },
  methods: {
    // 获取所有频道
    async getAllChannels () {
      const { channels } = await getAllChannels()
      this.allChannels = channels
    },
    // 添加频道
    async addChannel (item) {
      // 1. 将当前点击的频道 添加到我的频道中
      this.myChannels.push(item)
      // 2. 删除推荐频道中的对应频道【计算属性会自动计算】
      // 3. 发送请求 将频道添加到服务器中
      // 用户是否登录
      if (this.isLogin) {
        // 已登录
        await addUserChannels({
          channels: [{
            id: item.id, // 频道的ID
            seq: this.myChannels.length // 添加的序号
          }]
        })
      } else {
        // 将myChannels保存在本地中
        setItem('TOUTIAO_MY_CHANNELS', this.myChannels)
      }
    },
    // 点击频道
    async handlerChannel (index, id) {
      if (this.isEdit) {
        // 编辑状态  -> 删除该频道【删除数组中元素】
        this.myChannels.splice(index, 1)
        // 如果删除的索引 小于等于 激活的索引 那么将激活索引-1
        if (index <= this.active) {
          this.$emit('switchTab', {
            active: this.active - 1,
            popup: true
          })
        }
        if (this.isLogin) {
          // 发送请求 删除对应频道
          await removeUserChannels(id)
        } else {
          setItem('TOUTIAO_MY_CHANNELS', this.myChannels)
        }
      } else {
        // 非编辑状态 -> 切换频道(父元素 activeTab)
        this.$emit('switchTab', {
          active: index
        })
      }
    }
  },
  mounted () {
    this.getAllChannels()
  }
}
</script>

<style lang="scss" scoped>
.channel-edit {
  padding-top: 87px;
  .my-channel, .recommend-channel {
    ::v-deep .van-cell__value {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .title {
      color: #333333;
      font-size: 32px;
      font-weight: 600;
    }
    .edit-btn {
      padding: 6px 20px;
      color: #FB9797;
      border-color: #FB9797;
    }
  }
  .my-channel-list, .recommend-channel-list {
    margin-top: 28px;
    padding: 0 22px;
    .my-grid-item, .recommend-grid-item {
      margin-bottom: 29px;
      ::v-deep .van-grid-item__content {
        position: relative;
        width: 160px;
        height: 86px;
        background: #F4F5F6;
        border-radius: 6px;
        flex-direction: row;
        align-items: center;
        white-space: nowrap;
        .van-grid-item__icon-wrapper {
          font-size: 12px;
          font-weight: bold;
          margin-top: 4px;
          margin-right: 6px;
          position: unset;
        }
        .van-icon-cross {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #ccc;
          width: 30px;
          height: 30px;
          text-align: center;
          color: #fff;
          line-height: 30px;
          font-size: 12px;
          border-radius: 50%;
        }
      }
      span {
        font-size: 28px;
        color: #222222;
      }
    }
  }
}
</style>
