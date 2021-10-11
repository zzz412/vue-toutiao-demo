<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="login-nav-bar" />
    <!-- 表单单元格 -->
    <van-form @submit="formSubmit" ref="formRef">
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
           <!-- 表单中的按钮默认是提交按钮  需要设置为普通按钮 -->
           <van-button v-if="!countDown" @click="sendCode" native-type="button" type="info" class="send-code-btn" size="mini" color="#EDEDED" round>获取验证码</van-button>
           <van-count-down v-else :time="60 * 1000" format="ss s" @finish="countDown = false"/>
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
import { sendCode } from '@/api/user'

export default {
  name: 'login',
  data () {
    return {
      form: {},
      formRules: { // 验证规则
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[0345789]\d{9}$/, message: '手机号不符合规则' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码不符合规则' }
        ]
      },
      countDown: false // 开启倒计时
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
      await this.$store.dispatch('user/login', form)
      this.$toast.success('登录成功')
    },
    // 发送验证码
    sendCode () {
      // 1. 验证手机号的有效性
      this.$refs.formRef.validate('mobile')
        .then(async flag => { // 验证成功
          try {
            // 2. 开启倒计时
            this.countDown = true
            // 3. 发送请求
            await sendCode(this.form.mobile)
          } catch (error) {
            // 请求失败 停止倒计时
            this.countDown = false
          }
        })
        .catch(err => { // 验证失败
          console.log(err)
        })
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
