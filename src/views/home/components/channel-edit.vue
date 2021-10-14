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
       <van-grid-item class="my-grid-item">
         <span slot="text">大数据</span>
         <van-icon name="cross" slot="icon" v-show="isEdit"/>
       </van-grid-item>
       <van-grid-item class="my-grid-item">
         <span slot="text">大数据</span>
         <van-icon name="cross" slot="icon" v-show="isEdit"/>
       </van-grid-item>
       <van-grid-item class="my-grid-item">
         <span slot="text">大数据</span>
         <van-icon name="cross" slot="icon" v-show="isEdit"/>
       </van-grid-item>
       <van-grid-item class="my-grid-item">
         <span slot="text">大数据</span>
         <van-icon name="cross" slot="icon" v-show="isEdit"/>
       </van-grid-item>
       <van-grid-item class="my-grid-item">
         <span slot="text">大数据</span>
         <van-icon name="cross" slot="icon" v-show="isEdit"/>
       </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell class="recommend-channel" :border="false">
      <!-- 标题 -->
      <div slot="title" class="title">频道推荐</div>
    </van-cell>
    <!-- 频道推荐标签列表 -->
    <van-grid class="recommend-channel-list" :border="false">
      <van-grid-item class="recommend-grid-item">
        <span slot="text">大数据</span>
        <van-icon name="plus" slot="icon"/>
      </van-grid-item>
      <van-grid-item class="recommend-grid-item">
        <span slot="text">大数据</span>
        <van-icon name="plus" slot="icon"/>
      </van-grid-item>
      <van-grid-item class="recommend-grid-item">
        <span slot="text">sdasda</span>
        <van-icon name="plus" slot="icon"/>
      </van-grid-item>
      <van-grid-item class="recommend-grid-item">
        <span slot="text">大数据</span>
        <van-icon name="plus" slot="icon"/>
      </van-grid-item>
      <van-grid-item class="recommend-grid-item">
        <span slot="text">大数据</span>
        <van-icon name="plus" slot="icon"/>
      </van-grid-item>
  </van-grid>
  </div>
</template>

<script>
export default {
  name: 'channel-edit',
  data () {
    return {
      isEdit: false
    }
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
