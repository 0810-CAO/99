const Service = require('egg').Service
class HomeService extends Service {
  async findNews() {
    /*
    在service定义的方法中处理数据库和网络数据
    service中也会挂载跟控制器一样的属性
    this.ctx: 当前请求的上下文 Context 对象的实例，通过它我们可以拿到框架封装好的处理当前请求的各种便捷属性和方法。
    this.app: 当前应用 Application 对象的实例，通过它我们可以拿到框架提供的全局对象和方法。
    this.service：应用定义的 Service，通过它我们可以访问到其他业务层，等价于 this.ctx.service 。
    this.config：应用运行时的配置项。
    this.logger：logger 对象，上面有四个方法（debug，info，warn，error），分别代表打印四个不同级别的日志，使用方法和效果与 context logger 中介绍的一样，但是通过这个 logger 对象记录的日志，在日志前面会加上打印该日志的文件路径，以便快速定位日志打印位置
    
    service上下文属性还挂载了其他的属性
    this.ctx.curl 发起网络调用。
    this.ctx.service.otherService 调用其他 Service。
    this.ctx.db 发起数据库调用等， db 可能是其他插件提前挂载到 app 上的模块
    */
    // 发送带&不带参数的get请求
    let response = await this.ctx.curl('https://www.5260.site:8443/HR_mange/selectOneSalaryByEmployeeID?employeeID=2011130301')
    // let response = await this.ctx.curl('https://www.5260.site:8443/HR_mange/selectOneSalaryByEmployeeID')
    // 发送带&不带参数的post请求
    // let response = await this.ctx.curl('https://www.5260.site:8443/HR_mange/selectOneSalaryByEmployeeID',{
    // method:'post'
    // 加上data即变成带参
    // data:{
    // name:'ccx',
    // age:22
    // }
    // })
    let data = JSON.parse(response.data)//转成字符串
    console.log('HomeService', data);
    return data
  }
  /*
  // mysql
  async insertUser({ name, age }) {
    try {
      let res = await this.ctx.app.mysql.insert('user1', { name: name, age: age })
      return res.affectedRows === 1
    } catch (e) {
      console.error(e);
      return false
    }
  }*/
  //  sequelize操作数据库
  async insertUser({ name, age }) {
    try {
      let res = await this.ctx.model.User.create({ name: name, age: age })
      return res.dataValues
    } catch (e) {
      return "error"
    }
  }
}
module.exports = HomeService