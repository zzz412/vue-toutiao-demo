<template>
  <div class="update-gender">
    <van-datetime-picker
      type="date"
      v-model="currentDate"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'update-gender',
  // v-model value input
  props: {
    // 默认性别
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      currentDate: dayjs(this.value).$d,
      minDate: new Date(1950, 1, 1),
      maxDate: new Date()
    }
  },
  methods: {
    async onConfirm (value) {
      try {
        const date = dayjs(value).format('YYYY-MM-DD')
        await updateUserInfo({
          birthday: date
        })
        this.$toast('修改生日成功')
        this.$emit('close')
        this.$emit('input', date)
      } catch (err) {
        this.$toast('修改生日失败')
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
