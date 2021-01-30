// 手动创建egg项目
// npm init --y
// npm i egg --save #egg模块就是egg.js的核心模块
// npm i egg-bin --save-dev #egg-bin模块，用于快速启动项目，用于本地开发调试的模块
// "dev":"egg-bin dev"
// 注意目录结构，参考https://eggjs.org/zh-cn/basics/structure.html

// 在router.js中必须暴露出去一个方法，这个方法接受一个参数，即是服务端的实例对象
module.exports = app => {
  // console.log(app);
  // {
  //   env: 'local',
  //   name: 'NodeEgg',
  //   baseDir: '/Users/caochengxiang/Downloads/Node Express KOA/RootNode/NodeEgg',
  //   subdomainOffset: 2,
  //   config: '<egg config>',
  //   controller: '<egg controller>',
  //   httpclient: '<egg httpclient>',
  //   loggers: '<egg loggers>',
  //   middlewares: '<egg middlewares>',
  //   router: '<egg router>',
  //   serviceClasses: '<egg serviceClasses>'
  // }
  // 1、从服务端的实例对象中结构出处理路由的对象和处理控制器的对象
  const { router, controller } = app
  // 2、利用处理路由的对象监听路由的请求（监听方式同koa,不同的是不需要导入控制器，直接使用controller（即服务器实例中结构的控制器对象）.控制器名称.方法）
  router.get('/', controller.home.index)
  // 处理get/post请求参数
  router.get('/user', controller.home.getQuery)
  router.get('/register/:name/:age', controller.home.getParams)
  router.get('/login', controller.home.getBody)
  // eggjs不需要处理静态资源,直接放在public目录即可

  // 处理动态资源，需要借助插件（即特殊的中间件）
  /*
  使用npm i egg-view-ejs --save
  在config目录下新建plugin.js
  exports.ejs = {
    enable: true,
    package: 'egg-view-ejs'
  }
  export.default.js中新增如下配置
  view:{mapping:{'.html':'ejs'}}
  在app目录中新建view目录，将动态网页放在该目录
  在控制器中通过上下文render方法渲染
  */
  router.get('/home', controller.home.getHome)

  // eggjs处理数据都是在service中处理
  router.get('/news', controller.home.getNews)

  // 处理cookie
  router.get('/setCookie', controller.home.setCookie)
  router.get('/getCookie', controller.home.getCookie)

  // 处理日志，已经内置了日志模块
  /*
  appLogger ${appInfo.name}-web.log，例如 example-app-web.log，应用相关日志，供应用开发者使用的日志。我们在绝大数情况下都在使用它。
  coreLogger egg-web.log 框架内核、插件日志。
  errorLogger common-error.log 实际一般不会直接使用它，任何 logger 的 .error() 调用输出的日志都会重定向到这里，重点通过查看此日志定位异常。
  agentLogger egg-agent.log agent 进程日志，框架和使用到 agent 进程执行任务的插件会打印一些日志到这里。
  egg-schedule.log 定时日志
  日志级别：日志分为 NONE，DEBUG，INFO，WARN 和 ERROR 5 个级别。
  */
  router.get('/test', controller.home.test)

  // 定时任务schedule/updateMessage.js
  // router.get('/test1', controller.home.test1)

  // eggjs扩展
  // 默认eggjs在application/context/request/response,提供很多方法给我们使用，可以扩展.
  // 在app中创建extend目录后添加对应js文件
  router.get('/test2', controller.home.test2)

  // 中间件,在app目录下创建middleware目录（指定路由使用中间件，方法二）
  let clientCheck = app.middleware.clientCheck({ ua: /Chrome/ })
  router.get('/test3', clientCheck, controller.home.test3)
  router.get('/index1', controller.home.index1)

  // 国际化（多语言切换）
  router.get('/test4', controller.home.test4)

  // mysql
  // router.get('/insert',controller.home.insertUser)//name=ccx&age=22

  // sequelize
  router.get('/insert', controller.home.insertUser)

  // 配置文件
  // config.prod.js 线上环境加载
  // config.test.js 测试环境加载
  // config.local.js 开发环境加载
  // config.default.js 默认配置
  // 如果出现同名的配置，后面三个配置文件会覆盖default
  // 设置当前环境
  // EGG_SERVER_ENV=xxx
}