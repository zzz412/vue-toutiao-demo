<template>
  <div class="search-suggestion">
    <!-- 搜索建议 -->
    <van-cell title="单元格" icon="search" v-for="item in 10" :key="item" />
  </div>
</template>

<script>
export default {
  name: 'search-suggestion'
}
</script>

<style lang="scss" scoped>

</style>
