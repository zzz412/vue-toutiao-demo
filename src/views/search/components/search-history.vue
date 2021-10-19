<template>
  <div class="search-history">
    <!-- 搜索历史 -->
    <van-cell title="搜索历史" class="history-nav">
      <van-icon name="delete-o" v-if="!isDelete" @click="isDelete = true"/>
      <div class="oper" v-else>
        <span>全部删除</span>
        <span @click="isDelete = false">完成</span>
      </div>
    </van-cell>

    <!-- 历史列表 -->
    <div class="history-list">
      <van-cell title="单元格1" v-for="i in 10" :key="i" >
        <van-icon name="close" v-if="isDelete" />
      </van-cell>

    </div>
  </div>
</template>

<script>
export default {
  name: 'search-history',
  data () {
    return {
      isDelete: false
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
