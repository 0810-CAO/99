// 工具类方法
// 加密工具类
const crypto = require('crypto')
module.exports = {
  md5: (password) => {
    // 1、指定加密方式
    const md5 = crypto.createHash('md5')
    // 2、指定需要加密的内容和加密后输出的格式
    const hash = md5.update(password)//内容
      .digest('hex');//格式
    return hash
  }
}