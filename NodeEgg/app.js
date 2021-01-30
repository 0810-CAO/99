// app.js
class AppBootHook {
  constructor(app) {
    this.app = app;
  }
  // 在eggjs程序启动完毕后执行，定时任务启动就执行
  async serverDidReady() {
    // 传递的不是方法名称，而是需要被执行的那个定时任务的名称
    // await this.app.runSchedule('updateMessage')
  }
}

module.exports = AppBootHook;