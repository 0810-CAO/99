// npm install -g express-generator
// 导入第三方模块
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs')
// 保存登录状态模块session
const session = require('express-session')
// 保存登录状态模块redis（依赖express-session）
const RedisStore = require('connect-redis')(session)
const redisClient = require('./db/redis')
require('./db/sync')

// 导入处理路由的模块
var userRouter = require('./routes/user');
// 创建服务端实例对象
var app = express();
// 处理动态网页
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// 处理日志，在express中使用morgan记录日志，安装、导入、注册即可 
// 注册该中间件的时候需要指定日志的模式,默认情况输出到控制台
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), { flags: 'a' })
app.use(logger('combined', {
  stream: accessLogStream
}));;//combined更详细，dev记录mtehod/url/status/response-time...
// 处理post请求参数
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 解析cookie
app.use(cookieParser());
// 使用session和redis存储登录状态
app.use(session({
  name: 'userId',//指定key的值
  secret: 'www.5260.site_ccx',//用于生成无关紧要的userID
  cookie: { path: '/', httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  store: new RedisStore({ client: redisClient })//使用redis保存登录
}))
// 处理静态网页
app.use(express.static(path.join(__dirname, 'public')));
// 注册路由
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err.status, err.message);
  res.end(err.message)
  // render the error page
  
  // res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
