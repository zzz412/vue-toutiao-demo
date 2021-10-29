<template>
  <div class="user-container">
    <!-- 导航栏 -->
    <van-nav-bar class="nav-bar" title="个人信息"  left-arrow @click-left="$router.back()"/>
    <!-- 单元格 -->
    <van-cell-group>
      <!-- 文件上传框 change 当文件选择时 -->
      <input type="file" ref="file" hidden @change="fileChange">
      <!-- 头像 -->
      <van-cell title="头像" is-link @click="$refs.file.click()">
        <van-image :src="info.photo" round fit="contain" class="avatar" width="30" height="30"/>
      </van-cell>
      <!-- 昵称 -->
      <van-cell title="昵称" is-link :value="info.name"></van-cell>
      <!-- 性别 -->
      <van-cell title="性别" is-link :value="info.gender ? '女' : '男'" @click="is_update_gender = true"></van-cell>
      <!-- 生日 -->
      <van-cell title="生日" is-link :value="info.birthday" @click="is_update_birthday = true"></van-cell>
    </van-cell-group>
    <!-- 更改头像 弹出层 -->
    <van-popup v-model="is_update_photo" position="bottom" style="height: 100%;">
      <!-- $event为事件传递出来的参数 -->
      <update-photo v-if="is_update_photo" @close="is_update_photo = false" :img="img" @confirm="info.photo = $event"></update-photo>
    </van-popup>
    <!-- 修改性别 弹出层 -->
    <van-popup v-model="is_update_gender" position="bottom">
      <update-gender v-model="info.gender" @close="is_update_gender = false"></update-gender>
    </van-popup>
    <!-- 修改生日 弹出层 -->
    <van-popup v-model="is_update_birthday" position="bottom">
      <update-birthday v-model="info.birthday" @close="is_update_birthday = false"></update-birthday>
    </van-popup>
  </div>
</template>

<script>
import { userProFile } from '@/api/user'
import UpdatePhoto from './components/update-photo'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'

export default {
  name: 'user-index',
  components: { UpdatePhoto, UpdateGender, UpdateBirthday },
  data () {
    return {
      info: {},
      img: '',
      is_update_photo: false,
      is_update_gender: false,
      is_update_birthday: false
    }
  },
  methods: {
    // 获取用户信息
    async loadUserInfo () {
      const info = await userProFile()
      this.info = info
    },
    // 确认选择文件
    fileChange () {
      // 1. 显示弹出层
      this.is_update_photo = true
      // 2. 获取选择的文件 选择的文件都保存在files属性中
      const file = this.$refs.file.files[0]
      // 3. 将文件类型 转为 URL地址类型
      this.img = window.URL.createObjectURL(file)
      // 4. 清空文件选择框 (防止change事件不触发)
      this.$refs.file.value = ''
    }
  },
  mounted () {
    this.loadUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.user-container {
  .van-nav-bar {
    background: #3692fA;
    ::v-deep {
      .van-nav-bar__title, .van-icon{
        color: #FFF;
      }
    }
  }
  .van-cell {
    display: flex;
    align-items: center;
    ::v-deep .van-cell__value {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}

</style>
