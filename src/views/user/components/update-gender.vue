<template>
  <div class="update-gender">
    <van-picker
      title="修改性别"
      show-toolbar
      :default-index="value"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user'

export default {
  name: 'update-gender',
  // v-model value input
  props: {
    // 默认性别
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    async onConfirm (value, index) {
      try {
        await updateUserInfo({
          gender: index
        })
        this.$toast('修改性别成功')
        this.$emit('close')
        this.$emit('input', index)
      } catch (err) {
        this.$toast('修改性别失败')
      }
    },
    onCancel () {
      console.log('点击了取消')
    },
    onChange () {
      console.log('修改了')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
