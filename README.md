# 头条移动端
## 1. 项目构建： 
+ vue  
+ vuex
+ vue-router
+ sass
+ babel
+ eslint

## 2. 项目运行：  
`yarn serve` || `npm run serve`

## 3. 将项目托管到git（码云）仓库进行版本管理

执行git命令
+ `git remote add origin https://gitee.com/zzz412/vue-toutiao-demo.git`  
将本地仓库连接到远程仓库
+ `git push -u origin master`  
将本地仓库代码推送到远程仓库  后续只需要执行 `git push`

## 4. 下载vant UI组件库

### 4.1  前台移动端 vant ui (有赞)  
`npm i vant` || `yarn add vant`  

### 4.2  下载 vscode  vant 提示插件  
`Vant Snippets`

### 4.3  如何引入vant ？
+  按需引入  
+  全部引入  直接导入
+  CDN引入

## 5 移动端做适配
+  不同设备下的适配  `npm i -S amfe-flexible` || `yarn add amfe-flexible`
      在main.js中引入 即可

+  单位改为rem (一款插件将项目中的所有px 转为 rem) postcss-pxtorem
      `npm i postcss-pxtorem@5.1.1 -D` || `yarn add postcss-pxtorem@5.1.1 -D`

postcss.config.js 配置代码
``` js
  module.exports = {
        plugins: {
            'postcss-pxtorem': {
                  // 因为vant 以375宽度作为设计标准
                  // 判断 如果为vant的文件 则以37.5作为标准 则 以 75作为标准
                  rootValue: ({ file }) => filincludes('vant') ? 37.5 : 75,
                  propList: ['*']
            }
      }
 }
```

## 6. 制作字体图标库
网站： 阿里巴巴图标库 `https://www.iconfont.cn/`

## 7. 封装网络请求模块
axios  `npm i axios` || `yarn add axios`
1. 在utils中新建 `request.js` 文件
2. 封装 `request.js`
``` js
// 导入 axios
import Axios from 'axios'

// 创建axios实例
const service = Axios.create({
  baseURL: 'http://toutiao.zeng.pub/v1_0/' // 接口跟路径
})

export default service
```
3. 设置请求跟路径 `http://toutiao.zeng.pub/v1_0/`

## 8. 登录页面
1. 配置路由表
router/index.js
``` js
const routes = [
  { // 登录
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  }
]
```

2. 创建登录视图(页面)
views/login/index.vue
``` vue
<template>
  <div class="login-container">
    登录
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style lang="scss" scoped>

</style>

```

3. 编写页面结构与样式
**给index.html 页面设置移动端兼容**
``` html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover">
```
``` vue
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

```

4. 给输入框添加验证规则
``` js
{
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
```
对应的输入框添加规则
``` html
<van-field :rules="formRules.mobile">
     <!-- 代码省略 -->
</van-field>
<van-field :rules="formRules.code">
     <!-- 代码省略 -->
</van-field>
```

5. 监听表单提交并发送登录
**设置事件监听和输入框的name值**
``` html
<van-form @submit="formSubmit">
  <van-field name="mobile"></van-field>
  <van-field name="code"></van-field>
</van-form>
```

**添加对应方法**
``` js
methods: {
  async formSubmit (form) {
    // 发送请求 进行用户登录
    // 使用try catch 组合 捕获错误信息
    try { // 放入会出错的代码
      const res = await login(form)
      console.log(res)
    } catch (error) { // 出错时做的代码
      console.log(error.response)
      // 提示错误信息
      this.$toast.fail('登录失败')
    }
  }
}
```

**login请求封装**
``` js
import request from '@/utils/request'

// 用户登录/注册
export function login (data) {
  return request({
    method: 'post',
    url: 'authorizations',
    data
  })
}
```

6. 设置响应拦截器
utils/request.js
``` js
// 定义统一响应拦截器
service.interceptors.response.use(
  // 响应成功
  res => {
    // 将响应真正结果返回
    return res.data.data
  },
  // 响应失败
  err => {
    // 获取响应失败的信息
    const res = err.response
    if (res.status < 500) {
      // 提示错误内容
      Toast.fail(res.data.message || '发生错误了')
    }
    return Promise.reject(err)
  }
)
```

7. 将token保存在cookie中
下载 `js-cookie`
创建 `utils/storage.js`文件

``` js
import Cookie from 'js-cookie'

// 存Token
export function setToken (token) {
  Cookie.set('VUE_TOUTIAO_TOKEN', token, { expires: 7 })
}

// 取Token
export function getToken () {
  return Cookie.get('VUE_TOUTIAO_TOKEN')
}

// 删Token
export function removeToken () {
  Cookie.remove('VUE_TOUTIAO_TOKEN')
}
```

登录后保存token
``` js
const { token } = await login(form)
// 将token存到本地中
setToken(token)
// 提示内容
this.$toast.success('登录成功')
```

## 9. 验证码处理
结构处理
``` html 
<template #button>
  <!-- 表单中的按钮默认是提交按钮  需要设置为普通按钮 -->
  <van-button v-if="!countDown" @click="sendCode" native-type="button" type="info" class="send-code-btn" size="mini" color="#EDEDED" round>获取验证码</van-button>
  <van-count-down v-else :time="60 * 1000" format="ss s" @finish="countDown = false"/>
</template>
```

逻辑处理
``` js
data () {
  return {
    countDown: false // 开启倒计时
  }
}

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
```

## 10. 我的页面
### 10.1 头部编写
``` html
<!-- 登录前 -->
<div class="header no-login" v-if="!isLogin">
  <img src="@/assets/mobile.png" alt="">
  <span>登录 / 注册</span>
</div>
<!-- 登录后 -->
<div class="header login" v-else>
  <!-- 头像 名称 区域 -->
  <div class="info1">
    <img src="@/assets/logo.png" alt="">
    <span class="username">某某扣2</span>
    <van-button type="default" class="edit-info-btn" size="mini" round>编辑资料</van-button>
  </div>
  <!-- 资料区域 -->
  <div class="info2">
    <div class="item">
      <span>12</span>
      <span>头条</span>
    </div>
    <div class="item">
      <span>12</span>
      <span>粉丝</span>
    </div>
    <div class="item">
      <span>12</span>
      <span>关注</span>
    </div>
    <div class="item">
      <span>12</span>
      <span>获赞</span>
    </div>
  </div>
</div>
```

样式处理
``` css
.header {
  height: 361px;
  // ~ 路径被webpack解析
  background: url('~@/assets/banner.png');
  background-size: cover;
  &.no-login {
    // 设置为flex容器
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 132px;
      height: 132px;
    }
    span {
      font-size: 28px;
      color: #FFF;
      margin-top: 15px;
    }
  }
  &.login {
    overflow: hidden;
    .info1 {
      display: flex;
      // 设置主轴方向 两端对齐 中间居中
      justify-content: space-between;
      align-items: center;
      margin: 80px 32px 0;
      img {
        width: 132px;
        height: 132px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #FFF;
      }
      span.username {
        font-size: 30px;
        color: #FFF;
        flex: 1;
        margin-left: 22px;
      }
      .edit-info-btn {
        padding: 0 17px;
        span {
          color: #666666;
          font-size: 20px;
        }
      }
    }
    .info2 {
      margin-top: 55px;
      display: flex;
      .item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #FFF;
        span:first-child {
          font-size: 36px;
        }
        span:last-child {
          font-size: 23px;
        }
      }
    }
  }
}
```

### 10.2 登录与未登录逻辑判断
通过vuex中的token信息  判断是否登录
store/index.js
``` js
export default new Vuex.Store({
  getters: {
    // 是否登录
    isLogin: state => {
      return state.user.token !== undefined
    }
  },
  modules: {
    user
  }
})
```

views/my/index.vue
解析出登录状态
``` js
import { mapGetters } from 'vuex'
export default {
  name: 'my',
  computed: {
    ...mapGetters(['isLogin'])
  }
}
```

### 10.3 其他样式
``` html
<!-- 功能区  宫格-->
<!-- 默认一行展示四个格子 column-num 自定义列数 -->
<van-grid :column-num="2" class="my-grid" clickable>
  <van-grid-item class="my-grid-item">
    <!-- 自定义图标 -->
    <i class="iconfont icon-shoucang" slot="icon"></i>
    <span slot="text">收藏</span>
  </van-grid-item>
  <van-grid-item  class="my-grid-item">
    <!-- 自定义图标 -->
    <i class="iconfont icon-lishi" slot="icon"></i>
    <span slot="text">历史</span>
  </van-grid-item>
</van-grid>

<!-- 单元格区 -->
<div class="my-cell-gruop">
  <van-cell title="消息通知" is-link/>
  <van-cell title="小智同学" is-link/>
</div>

<!-- 退出登录 -->
<div class="logout" v-if="isLogin">
  <van-cell title="退出登录" title-class="logout-text"/>
</div>
```

``` css
.my-grid {
  .my-grid-item {
    margin-bottom: 9px;
    .iconfont {
      font-size: 45px;
      margin-bottom: 12px;
    }
    .icon-shoucang {
      color: #EB5253;
    }
    .icon-lishi {
      color: #FF9D1D;
    }
    span {
      color: #333;
      font-size: 28px;
    }
  }
}
.my-cell-gruop {
  margin-bottom: 9px;
}
.logout {
  .logout-text {
    text-align: center;
    color: #D86262;
    font-size: 30px;
  }
}
```