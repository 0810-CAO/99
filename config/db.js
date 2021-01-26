// 数据库连接配置文件
let MYSQL_CONFIG
// redis配置文件
let REDIS_CONFIG
if (process.env.NODE_ENV === 'dev') {
  // MYSQL_CONFIG = {
  //   host: '8.131.77.175',
  //   port: '3306',
  //   user: 'demo',
  //   password: 'j6izGiySCTpiCXSZ',
  //   database: 'demo'
  // }
  MYSQL_CONFIG = {
    databaseName: 'demo',
    databaseUserName: 'demo',
    databasePassword: 'j6izGiySCTpiCXSZ',
    conf: {
      host: '8.131.77.175', // MySQL服务器地址
      port: 3306, // MySQL服务器端口号
      dialect: 'mysql', // 告诉Sequelize当前要操作的数据库类型
      pool: {
        max: 5, // 最多有多少个连接
        min: 0, // 最少有多少个连接
        idle: 10000, // 当前连接多久没有操作就断开
        acquire: 30000, // 多久没有获取到连接就断开
      }
    }
  }
  REDIS_CONFIG = {
    host: '127.0.0.1',
    port: '6379',
  }
} else if (process.env.NODE_ENV === 'pro') {
  MYSQL_CONFIG = {
    databaseName: 'demo',
    databaseUserName: 'demo',
    databasePassword: 'j6izGiySCTpiCXSZ',
    conf: {
      host: '8.131.77.175', // MySQL服务器地址
      port: 3306, // MySQL服务器端口号
      dialect: 'mysql', // 告诉Sequelize当前要操作的数据库类型
      pool: {
        max: 5, // 最多有多少个连接
        min: 0, // 最少有多少个连接
        idle: 10000, // 当前连接多久没有操作就断开
        acquire: 30000, // 多久没有获取到连接就断开
      }
    }
  }
  REDIS_CONFIG = {
    host: '127.0.0.1',
    port: '6379',
  }
}
module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
}