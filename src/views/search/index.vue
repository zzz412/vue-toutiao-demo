<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <van-search
      class="search-bar"
      v-model="kw"
      placeholder="请输入搜索关键词"
      show-action
      background="#3296FA"
    />
    <!-- 搜索历史 -->
    <search-history></search-history>
    <!-- 搜索结果 -->
    <search-result></search-result>
    <!-- 搜索建议 -->
    <search-suggestion></search-suggestion>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
export default {
  components: { SearchHistory, SearchResult, SearchSuggestion },
  name: 'search-index',
  data () {
    return {
      kw: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.search-container {
  .search-bar {
    ::v-deep .van-field__control::placeholder {
      color: #969799;
    }
    .van-search__action {
      color: #FFF;
    }
  }
}
</style>
