const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})
// 在koa中匹配路由是路由前缀加上后缀
router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
