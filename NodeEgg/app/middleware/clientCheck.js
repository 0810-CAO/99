/**
 * 自定义中间件
 * @param {options} 一个对象
 * @param {app} 服务器实例对象
 */
module.exports = (options, app) => {
  return async (ctx, next) => {
    // 1、获取客户端请求信息
    let userAgent = ctx.get('user-agent')
    //  2、判断客户端是否是谷歌浏览器
    let flag = options.ua.test(userAgent)
    if (flag) {
      ctx.status = 401
      ctx.body = '不支持当前的浏览器'
    } else {
      next()
    }
  }
}