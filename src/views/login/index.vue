<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="login-nav-bar" />
    <!-- 表单单元格 -->
    <van-form>
      <!-- 输入框： lable 文本  left-icon 左侧图标  placeholder 提示文本 -->
       <van-field name="手机号" placeholder="请输入手机号" v-model="form.mobile" class="login-field">
         <!-- 自定义输入框的内容  插槽 -->
         <template #left-icon>
          <i class="iconfont icon-shouji"></i>
         </template>
       </van-field>
       <van-field name="验证码" placeholder="请输入验证码" v-model="form.code" class="login-field">
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
export default {
  name: 'login',
  data () {
    return {
      form: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  & ::v-deep .login-nav-bar {
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
    & ::v-deep .van-field__button {
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
