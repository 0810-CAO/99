// 1、导入mysql驱动
const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')
// 2、创建连接对象
const connection = mysql.createConnection(MYSQL_CONFIG)
// 3、连接mysql数据库
connection.connect()
// 4、操作mysql数据库
// sql语句封装方法
const exc = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, function (error, results) {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}
module.exports = {
  exc,
  escape: mysql.escape//去除特殊字符，放置sql注入
};
