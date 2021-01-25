// 加密工具类
// 1、导入加密模块
const crypto = require('crypto')
const secret = '5260.site'
// 2、创建加密方法(base64、MD5(不可逆加密)、sha1、aes、rsa)
function _md5(password) {
  // 1、指定加密方式
  const md5 = crypto.createHash('md5')
  // 2、指定需要加密的内容和加密后输出的格式
  const hash = md5.update(password)//内容
    .digest('hex');//格式
  // 只要加密内容没有发生变化，加密后内容也不会发生变化，可暴力破解
  // 因此在加密之前对原始数据加盐操作（给原始数据混入一些其他的数据）
  // console.log(hash);
  return hash
}
// _md5('abcdef')//e80b5017098950fc58aad83c8c14978e
function generatePwd(password) {
  password = password + secret
  let hash = _md5(password)
  // console.log(hash);//04748a09f98e1d964981710d65609af5=>abcdef5260.site
  return hash
}
module.exports = generatePwd
// generatePwd('abcdef')