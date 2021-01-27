const router = require('koa-router')()
const { registerUser, loginCheck } = require('../controller/userController')
router.prefix('/api/user')//路由前缀
router.post('/login', async (ctx, next) => {
  // 处理登录(给容器添加登录状态信息)
  let result = await loginCheck(ctx.request.body)
  if (result.code === 200) {
    ctx.session.username = result.data.username//自动将ctx中数据保存到redis中
    ctx.session.password = result.data.password
    ctx.session.gender = result.data.gender
  }
  return ctx.body = result
})
router.post('/register', async (ctx, next) => {
  let result = await registerUser(ctx.request.body)
  return ctx.body = result
})
router.get('/test', (ctx, next) => {
  console.log(ctx.session);
  if (ctx.session.username) {
    ctx.body = "login success"
  } else {
    ctx.body = "login error"
  }
})
module.exports = router;