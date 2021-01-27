const Koa = require('koa')//导入koa
const app = new Koa()//创建服务端实例
const views = require('koa-views')//动态资源
const json = require('koa-json')//输出json
const onerror = require('koa-onerror')//处理错误
const bodyparser = require('koa-bodyparser')//处理post
// const logger = require('koa-logger')//记录日志
const path = require('path')
const fs = require('fs')
const morgan = require('koa-morgan')
require('./db/sync')
// 借助koa-generic-session+koa-redis保存登录状态
const session = require('koa-generic-session');//保存登录状态包
const redisStore = require('koa-redis');
const { REDIS_CONFIG } = require('./config/db')
// npm install --save koa-morgan保存日志
//封装的路由
const user = require('./routes/user')

// error handler
onerror(app)
// 注册解析post请求参数的中间件
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
// 注册处理json中间件
app.use(json())
// 注册记录日志中间件
// app.use(logger())
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), { flags: 'a' })
app.use(morgan('combined', {
  stream: accessLogStream
}));
// 注册静态资源中间件
app.use(require('koa-static')(__dirname + '/public'))
// 注册静动态资源中间件
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// 配置保存登录状态的中间件
app.keys = ['www.5260.site_ccx']//用于生成无关紧要的userId
app.use(session({
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: redisStore({
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`//保存到redis
  })
}))
// 注册路由
// routes
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
