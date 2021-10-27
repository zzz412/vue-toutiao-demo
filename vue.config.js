module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://toutiao.zeng.pub/v1_0/',
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
