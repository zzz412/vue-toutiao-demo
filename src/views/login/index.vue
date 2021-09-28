<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="login-nav-bar" />
    <!-- 表单单元格 -->
    <van-form @submit="formSubmit">
      <!-- 输入框： lable 文本  left-icon 左侧图标  placeholder 提示文本 -->
       <van-field type="number" maxlength="11" name="mobile" placeholder="请输入手机号" v-model="form.mobile" class="login-field" :rules="formRules.mobile">
         <!-- 自定义输入框的内容  插槽 -->
         <template #left-icon>
          <i class="iconfont icon-shouji"></i>
         </template>
       </van-field>
       <van-field type="number" maxlength="6" name="code" placeholder="请输入验证码" v-model="form.code" class="login-field" :rules="formRules.code">
         <template #left-icon>
          <i class="iconfont icon-yanzhengma"></i>
         </template>
         <template #button>
           <van-button type="info" class="send-code-btn" size="mini" color="#EDEDED" round>获取验证码</van-button>
         </template>
       </van-field>
       <!-- 登录按钮 -->
       <div class="login-btn">
        <van-button block type="info" native-type="submit" color="#6DB4FB">登录</van-button>
       </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { setToken } from '@/utils/stroage'

export default {
  name: 'login',
  data () {
    return {
      form: {},
      formRules: { // 验证规则
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[345789]\d{9}$/, message: '手机号不符合规则' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码不符合规则' }
        ]
      }
    }
  },
  methods: {
    async formSubmit (form) {
      // 显示登录中的状态条
      this.$toast.loading({
        message: '登录中',
        forbidClick: true,
        overlay: false,
        duration: 0
      })
      // 发送请求 进行用户登录
      // 使用try catch 组合 捕获错误信息
      try { // 放入会出错的代码
        const { token } = await login(form)
        // 将token存到本地中
        setToken(token)
        // 提示内容
        this.$toast.success('登录成功')
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  ::v-deep .login-nav-bar {
    height: 88px;
    background: #3296FA;
    .van-nav-bar__title {
      color: #FFF;
    }
  }
  .login-field {
    i.iconfont {
      font-size: 37px;
      color: #666666;
    }
    ::v-deep .van-field__button {
      border-left: 1px solid #eee;
      padding-left: 20px;
    }
    .send-code-btn {
      color: #666666 !important;
      font-size: 22px;
      padding: 13px 19px;
      border-left: 1px solid red;
    }
  }
  .login-btn {
    margin: 53px 28px;
  }
}
</style>
