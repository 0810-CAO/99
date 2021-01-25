const {
  USER_LOGIN,
  USER_REGISTER,
  USER_INFO
} = require('./routerConst')
// 存储登录状态（cookie客户端/session服务端）
// 1、cookie特点，可在客户端、服务端对cookie进行增删查改。每次发送网络请求，客户端都会自动将当前域名的cookie发送给服务端
// 客户端存储数据可能出现存不下的情况、可能会暴露（因此需要加密，但加密后还需要再服务端存储加密后的对应关系，否则不知道加密的是什么数据）
// 2、因此可以使用session存储登录状态，1）给每个用户分配一个无关紧要的值作为一个标识2）在服务端定义一个全局变量为session容器3）将用户
// 的唯一标识作为key，用户登录后就给容器的这个key添加登录状态信息

const generatePwd = require('../utils/crypto');
/*
// 后端校验数据
const Ajv = require('ajv').default
const ajv = new Ajv()
// 自定义json schema
const userSchema = require('../validator/userValidator')
 */
const { registerUser, loginCheck } = require('../controller/userController')
const { redisSet } = require('../db/redis')
/*// 设置cookie过期时间24h
const getCookieExpires = () => {
  let date = new Date()
  date.setTime(date.getTime() + (24 * 60 * 60 * 1000))
  return date.toGMTString()
}*/
const userRouterHandle = async (req, res) => {
  if (req.method === 'post' && req.path === USER_LOGIN) {
    // 处理登录(给容器添加登录状态信息)
    let result = await loginCheck(req.body)
    if (result.code === 200) {
      req.session.username = result.data.username
      req.session.password = result.data.password
      req.session.gender = result.data.gender
      redisSet(req.userId, req.session)
    }
    // 保存登录状态
    /*if (result.code === 200) {
      // 由于cookie可以在服务端、客户端修改，存在安全隐患，在服务端设置cookie使用httponly指定只能在服务端修改
      // 在保存登录状态的时候, 还需要设置过期时间
      // 在客户端保存用户的用户名明文其实也是不安全的, 所以在在保存登录状态的时候应该加密之后再保存
      res.setHeader('Set-Cookie', `username=${generatePwd(req.body.username)};path=/;httpOnly;expires=${getCookieExpires()}`)
    }*/
    return result
  } else if (req.method === 'post' && req.path === USER_REGISTER) {
    // 处理注册
    /*
    该类代码需要写在service中
    let sql = `insert into user  (username,password) values('ccx',5260)`
    exc(sql).then((results) => {
      console.log(results);
    }).catch((err) => {
      console.log(err);
    })*/
    let result = await registerUser(req.body)
    return result
  } else if (req.method === 'get' && req.path === USER_INFO) {
    // 处理获取用户信息

  }
}
module.exports = userRouterHandle