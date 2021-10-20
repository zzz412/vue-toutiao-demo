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
    <search-history v-if="!kw" :list="historyList" @search="searchSuggestion"></search-history>
    <!-- 搜索建议  文本框有值显示-->
    <search-suggestion v-if="kw && !showResult" :kw="kw" @search="searchSuggestion"></search-suggestion>
    <!-- 搜索结果  按下回车时显示-->
    <search-result v-if="showResult" :kw="kw"></search-result>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import { setItem, getItem } from '@/utils/storage'
const HISTORY_KEY = 'TOUTIAO_SEARCH_HISTORY'

export default {
  components: { SearchHistory, SearchResult, SearchSuggestion },
  name: 'search-index',
  data () {
    return {
      kw: '',
      showResult: false,
      // 搜索历史 从本地中获取
      historyList: getItem(HISTORY_KEY) || []
    }
  },
  // 监听器
  watch: {
    historyList (v) {
      // 将历史数组存到本地中
      setItem(HISTORY_KEY, this.historyList)
    }
  },
  methods: {
    // 按下了回车或搜索按钮
    onSearch () { // 会失去焦点
      this.showResult = true
      // 存历史数组中： 1. 新纪录在前面  2. 不能出现重复记录
      // 将当前搜索关键词存到 历史数组中
      // 删除历史数组中 相同的记录
      const index = this.historyList.indexOf(this.kw)
      if (index !== -1) {
        this.historyList.splice(index, 1)
      }
      this.historyList.unshift(this.kw)
    },
    // 点击了取消按钮
    onCancel () {
      // 跳转到首页
      this.$router.push('/')
    },
    searchSuggestion (v) {
      // 设置为关键字
      this.kw = v
      // 触发搜索
      this.onSearch()
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
