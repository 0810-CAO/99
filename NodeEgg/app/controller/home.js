const Controller = require('egg').Controller
class HomeController extends Controller {
  async index() {
    /*在eggjs中，会自动给控制器的this挂载一些属性
    this.ctx: 当前请求的上下文 Context 对象的实例，通过它我们可以拿到框架封装好的处理当前请求的各种便捷属性和方法。
    this.app: 当前应用 Application 对象的实例，通过它我们可以拿到框架提供的全局对象和方法。
    this.service：应用定义的 Service，通过它我们可以访问到抽象出的业务层，等价于 this.ctx.service 。
    this.config：应用运行时的配置项。
    this.logger：logger 对象，上面有四个方法（debug，info，warn，error），分别代表打印四个不同级别的日志，使用方法和效果与 context logger 中介绍的一样，但是通过这个 logger 对象记录的日志，在日志前面会加上打印该日志的文件路径，以便快速定位日志打印位置
    */
    this.ctx.body = 'www.5260.site'
  }
  async getQuery() {
    // 获取传统get请求参数
    let query = this.ctx.query//http://127.0.0.1:7001/user?name=ccx&age=22
    this.ctx.body = query//{"name":"ccx","age":"22"}
  }
  async getParams() {
    // 获取动态路由形式的get请求参数
    let params = this.ctx.params//http://127.0.0.1:7001/register/ccx/22
    this.ctx.body = params
  }
  async getBody() {
    // 获取post请求参数
    let requestBody = this.ctx.request.body
    this.ctx.body = requestBody
  }
  async getHome() {
    await this.ctx.render('index', { msg: 'www.5260.site_ccx' })
  }
  async getNews() {
    // 调用service方法
    // 注意：service目录必须放在app之下
    // service目录支持多级目录，使用链式调用即可（this.ctx.service.home.children.fun()）
    // 如果service中js文件，如果是以_或者首字母都是大写，在调用的时候必须转换成驼峰命名（get_user.js=>getUser;GetUser.js=>getUser）
    let data = await this.ctx.service.home.findNews()
    this.ctx.body = data
  }
  async setCookie() {
    this.ctx.cookies.set('name', 'ccx', {
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      // 在eggjs中为了安全，给保存的数据生成签名，获取数据的时候生成签名
      // 同保存的签名对比，如果一直则表明数据未被篡改，否则表示被篡改
      signed: true,//根据config/config.default.js生成签名
      encrypt: true//让eggjs加密后保存
    })
    this.ctx.body = '设置成功'
  }
  async getCookie() {
    let cookie = this.ctx.cookies.get('name', {
      signed: true,
      encrypt: true
    })
    this.ctx.body = `获取cookie成功=${cookie}`
  }
  //默认只会输出 INFO 及以上（WARN 和 ERROR）的日志到文件中,在config/config.default.js添加level: 'DEBUG',
  // eggjs不需要手动切割，默认每一天就是一个新的日志文件
  // 可手动配置切割方式 https://eggjs.org/zh-cn/core/logger.html
  async test() {
    this.ctx.logger.debug('debug日志')
    this.ctx.logger.info('info日志')
    this.ctx.logger.warn('warn日志')
    this.ctx.logger.error('error日志')
  }
  // async test1() {
  //   await this.ctx.render('index', { msg: this.ctx.app.msg })
  // }

  // 扩展
  async test2() {
    // console.log(this.ctx.app.Mytest('qpqp'));//application扩展
    // console.log(this.ctx.Mytest('abc'));//context扩展
    // console.log(this.ctx.request.Mytest('ccc'));//request扩展
    // console.log(this.ctx.response.Mytest('ll'));//response扩展
    // 工具类放在helper.js文件中
    console.log(this.ctx.helper.md5('abc123'));
  }
  // 中间件测试
  async test3() {
    this.ctx.body = 'test'
  }
  async index1() {
    this.ctx.body = 'index'
  }
  // 国际化
  async test4() {
    return await this.ctx.render('index', { msg: this.ctx.__('Email') })
  }
  /*
  // mysql操作数据库
  async insertUser() {
    // nthis.ctx.query={name=ccx&age=22}
    let res = await this.ctx.service.home.insertUser(this.ctx.query)
    if (res) {
      this.ctx.body = 'error'
    } else {
      this.ctx.body = 'success'
    }
  }
  */
  //  sequelize操作数据库
  async insertUser() {
    let res = await this.ctx.service.home.insertUser(this.ctx.query)
    this.ctx.body = res
  }
}
module.exports = HomeController