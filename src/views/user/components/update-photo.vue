<template>
  <div class="update-photo">
    <!-- 图片 显示预览图-->
    <img class="img" :src="img" alt="" ref="img">
    <div class="toolbar">
      <span class="cancel" @click="$emit('close')">取消</span>
      <span class="confirm">确定</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

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
  mounted () {
    // 初始化裁剪工具
    // 1. 获取需要裁剪的元素
    const img = this.$refs.img
    // 2. 实例化裁剪对象
    this.cropper = new Cropper(img, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
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
