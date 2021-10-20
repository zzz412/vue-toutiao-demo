<template>
  <div class="search-history">
    <!-- 搜索历史 -->
    <van-cell title="搜索历史" class="history-nav">
      <van-icon name="delete-o" v-if="!isDelete" @click="isDelete = true"/>
      <div class="oper" v-else>
        <span @click="removeAllHistory">全部删除</span>
        <span @click="isDelete = false">完成</span>
      </div>
    </van-cell>

    <!-- 历史列表 -->
    <div class="history-list">
      <van-cell :title="item" v-for="(item, i) in list" :key="i" @click="$emit('search', item)">
        <van-icon name="close" v-if="isDelete" @click="removeHistory(i)"/>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search-history',
  props: {
    // 搜索历史列表
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isDelete: false
    }
  },
  methods: {
    // 删除单个历史
    removeHistory (index) {
      this.list.splice(index, 1)
    },
    // 删除全部历史
    removeAllHistory () {
      // 直接修改长度 vue监听不到 页面不能改变  this.list.length = 0
      this.$parent.historyList = []
    }
  }
}
</script>

<style lang="scss" scoped>
.search-history {
  .history-nav {
    .oper {
      span {
        margin: 0 5px;
      }
    }
  }
}
</style>
