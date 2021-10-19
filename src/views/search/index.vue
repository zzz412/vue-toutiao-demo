<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <!-- form为了在ios输入法中显示搜索功能键 -->
    <form action="/" class="search-bar">
      <van-search
        v-model="kw"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296FA"
        @search="onSearch"
        @cancel="onCancel"
        @focus="showResult = false"
      />
    </form>
    <!-- 搜索历史  文本框没有值显示-->
    <search-history v-if="!kw"></search-history>
    <!-- 搜索建议  文本框有值显示-->
    <search-suggestion v-if="kw && !showResult"></search-suggestion>
    <!-- 搜索结果  按下回车时显示-->
    <search-result v-if="showResult"></search-result>
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
      kw: '',
      showResult: false
    }
  },
  methods: {
    // 按下了回车或搜索按钮
    onSearch () { // 会失去焦点
      console.log(1)
      this.showResult = true
    },
    // 点击了取消按钮
    onCancel () {
      // 跳转到首页
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.search-container {
  padding-top: 108px;
  .search-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    ::v-deep .van-field__control::placeholder {
      color: #969799;
    }
    .van-search__action {
      color: #FFF;
    }
  }
}
</style>
