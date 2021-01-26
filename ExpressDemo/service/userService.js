// 操作数据库
// const { exc, escape } = require('../db/mysql')
// 使用sequelize操纵数据库//不存在sql注入字符问题
const User = require('../db/model/user');

async function getUser(username, password) {
  if (password) {
    let results = await User.findAll({
      where: {
        username: username,
        password: password
      }
    });
    return results;
  } else {
    // let sql = `select * from user where username='${username}'`
    // let results = await exc(sql)
    // return results
    let results = await User.findAll({
      where: {
        username: username
      }
    });
    return results;
  }
}
async function createUser({ username, password, gender }) {
  // let sql = `insert into user(username,password,gender) values('${username}','${password}','${gender}')`
  // let results = await exc(sql)
  // return results
  let results = await User.create({
    username: username,
    password: password,
    gender: gender
  });
  return results['dataValues'];
}
module.exports = {
  getUser,
  createUser
}