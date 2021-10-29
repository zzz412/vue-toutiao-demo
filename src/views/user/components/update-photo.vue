<template>
  <div class="update-photo">
    <!-- 图片 显示预览图-->
    <img class="img" :src="img" alt="" ref="img">
    <div class="toolbar">
      <span class="cancel" @click="$emit('close')">取消</span>
      <span class="confirm" @click="onConfirm">确定</span>
    </div>
  </div>
</template>

<script>
// 导入裁剪图片的插件
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { uploadUserPhoto } from '@/api/user'

export default {
  name: 'update-photo',
  props: {
    img: {
      type: [Object, String],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  methods: {
    onConfirm () {
      // 获取当前裁剪后的图片（文件）
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        // 创建formData对象
        const formData = new FormData()
        // 将转换后的文件添加到对象中
        formData.append('photo', blob)
        try {
          // form-data格式 只支持formData对象
          const { photo } = await uploadUserPhoto(formData)
          // 1. 关闭弹出层
          this.$emit('close')
          // 2. 提示成功
          this.$toast('修改成功')
          // 3. 设置用户的头像
          this.$emit('confirm', photo)
        } catch (err) {
          this.$toast('修改失败')
        }
      })
    }
  },
  mounted () {
    // 初始化裁剪工具
    // 1. 获取需要裁剪的元素
    const img = this.$refs.img
    // 2. 实例化裁剪对象
    this.cropper = new Cropper(img, {
      viewMode: 1, // 裁剪比例
      dragMode: 'move', // 裁剪方式
      aspectRatio: 1, // 缩放比例
      cropBoxMovable: false, // 取消拖动裁剪框
      cropBoxResizable: false, // 取消伸缩裁剪框
      background: false // 取消裁剪背景
    })
  }
}
</script>

<style lang="scss" scoped>
.update-photo {
  background: #000;
  height: 100%;
  .img {
    // 固定写法  必须和父元素一样的宽
    max-width: 100%;
  }
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    color: #fff;
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    padding: 16px;
    span {
      padding: 8px;
    }
  }

}
</style>
