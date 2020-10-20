module.exports = {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue: 100, // 根元素字体大小 小技巧：只需要将样式的px改为大写的Px即可排除不需要转换为rem的样式
        propList: ['*']
      }
    }
  }