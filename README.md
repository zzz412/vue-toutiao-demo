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