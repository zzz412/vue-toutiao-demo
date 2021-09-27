module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 因为vant 以375宽度作为设计标准
      // 判断 如果为vant的文件 则以37.5作为标准 否则 以 75作为标准
      rootValue: ({ file }) => file.includes('vant') ? 37.5 : 75,
      propList: ['*']
    }
  }
}
