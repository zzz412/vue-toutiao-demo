<template>
  <!-- 关注按钮 -->
  <van-button
    v-if="!is_followed"
    type="info"
    slot="default"
    round
    size="small"
    class="follow-btn"
    icon="plus"
    @click="handleClick"
    :loading="loading"
  >关注</van-button>
  <!-- 已关注按钮（取消关注） -->
  <van-button
    v-else
    type="default"
    slot="default"
    round
    size="small"
    class="follow-btn"
    @click="handleClick"
    :loading="loading"
  >已关注</van-button>
</template>

<script>
import { followUser, unFollowUser } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'follow-user',
  // 利用v-model 指令 实现双向绑定（可以修改传递过来的值）
  model: {
    prop: 'is_followed', // 需要绑定的值 value
    event: 'abc' // 需要绑定的事件 input
  },
  props: {
    is_followed: {
      type: Boolean,
      required: true
    },
    authorId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    async handleClick () {
      if (!this.isLogin) return this.$toast('未登录')
      this.loading = true
      // 判断操作 为关注 还是取消关注
      if (this.is_followed) {
        // 取消关注
        await unFollowUser(this.authorId)
      } else {
        // 关注
        await followUser(this.authorId)
      }
      this.loading = false
      // 修改页面状态
      this.$emit('abc', !this.is_followed)
      this.$toast(this.is_followed ? '取消成功' : '关注成功')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
