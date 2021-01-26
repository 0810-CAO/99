const express = require('express')
const router = express.Router()
const { registerUser, loginCheck } = require('../controller/userController')
router.post('/login', async (req, res, next) => {
  // 处理登录(给容器添加登录状态信息)
  let result = await loginCheck(req.body)
  if (result.code === 200) {
    req.session.username = result.data.username//此时的req.session是在使用express-session中间件后自动添加的
    req.session.password = result.data.password
    req.session.gender = result.data.gender
  }
  return res.json(result)
})
router.post('/register', async (req, res, next) => {
  let result = await registerUser(req.body)
  return res.json(result)
})
router.get('/test', (req, res, next) => {
  console.log(req.session);
  if (req.session.username) {
    res.end('login success')
  } else {
    res.end('error')
  }
})
module.exports = router;