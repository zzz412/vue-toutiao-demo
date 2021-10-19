<template>
  <div class="search-result">
    <!-- 搜索结果 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="fetchData"
    >
       <van-cell v-for="(item, i) in list" :key="i" :title="item"/>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'search-result',
  data () {
    return {
      loading: false, // 加载状态
      finished: false, // 是否能加载
      list: [] // 数据列表
    }
  },
  methods: {
    fetchData () {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(i)
        }
        // 关闭加载状态
        this.loading = false
        // 判断数据是否加载完成
        if (this.list.length >= 50) {
          this.finished = true
        }
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
