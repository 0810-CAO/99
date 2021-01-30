// exports.keys = 'www.5260.site_ccx'//用于生成客户端中保存的userId
module.exports = {
  keys: 'www.5260.site_ccx',
  security: {
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  },
  view: {
    mapping: {
      '.html': 'ejs'
    }
  },
  logger: {
    level: 'DEBUG'//打印所有级别日志到文件中
  },

  // 配置需要的中间件，数组顺序即为中间件的加载顺序
  /*全局注册中间件// 中间件名称就是文件名称
  middleware: ['clientCheck'],
  // 配置 gzip 中间件的配置
  // 此处的key时中间件文件的名称，值将来就会传递给中间件的options
  clientCheck: {
    ua: /Chrome/, 
  },*/
  // 国际化
  i18n: {
    defaultLocale: 'zh-CN'
  },
  /* 
    // mysql配置
    mysql: {
      client: {
        // host
        host: '8.131.77.175',
        // 端口号
        port: '3306',
        // 用户名
        user: 'demo',
        // 密码
        password: 'j6izGiySCTpiCXSZ',
        // 数据库名
        database: 'users',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    }
    */
  //  sequelize操作数据库
  sequelize: {
    dialect: 'mysql',
    host: '8.131.77.175',
    user: 'demo',
    password: 'j6izGiySCTpiCXSZ',
    database: 'demo',
    port: 3306
  }
}
