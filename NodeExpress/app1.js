const express = require('express')
const userRouter = require('./router/user')
const createError = require('http-errors')
const app = express()
// 1、use既可以处理没有路由地址的请求，也可以处理有路由地址的请求
// 2、use既可以处理get请求，也可以处理post请求
// 3、在处理请求的时候是从上至下的判断，哪一个先满足就哪一个处理
// 4、如果在处理请求的回调函数中没有调用next方法，处理完不会向下判断；调用后就会继续向下判断
/*app.use((req, res, next) => {
  console.log("1 无路由地址");
  next()
})
app.use('/', (req, res, next) => {
  console.log("2 有路由地址");
  next()
})
app.get('/api', (req, res, next) => {
  console.log("get /api");//1 无路由地址  2 有路由地址  get /api
  next()
})
app.get('/user', (req, res, next) => {
  console.log("get /user");
  next()
})
app.post('/api', (req, res, next) => {
  console.log("post /api");
  next()
})
app.post('/user', (req, res, next) => {
  console.log("post /user");
  next()
})
// 通过next方法可以将同一个请求的多个业务逻辑拆分到不同的方法中处理，这样提高代码可读性、可维护性、保证代码单一性
app.get('/api/user/info', (req, res, next) => {
  console.log("验证用户是否登录");
  next()
}, (req, res, next) => {
  console.log("用户已经登录，可查看信息");
})*/

// express错误处理 npm install http-errors
app.get('/api/user/login', (req, res, next) => {
  res.end('login')
})
app.get('/api/user/register', (req, res, next) => {
  res.end('register')
})
// 由于在处理请求的时候会从上至下的匹配，由于前面的处理方法都没有调用next方法，
// 所以处理完成后就不会向下匹配，由于use没有指定路由地址，并且可以处理get、post请求
// 只要前面的路由没有匹配到，就会执行下面的use
app.use((req, res, next) => {
  next(createError(404))
})
app.use((err, req, res, next) => {
  console.log(err.status, err.message);
  res.end(err.message)
})

// 1、中间件：一个函数，接受3个参数request请求对象、response响应对象、next函数，
// 当请求进来，会从第一个中间件开始进行匹配，如果匹配则进入，不匹配则依次向后对比匹配
// 2、作用：讲义请求的处理过程，分发到多个环节中，目的效率高，便于维护，即一个环节干一件事
// 3、分类：应用级别中间件（app.get/app.post）路由级别中间件（router.get/post）
// 错误处理中间件（多一个参数err）内置中间件（express.static()/express.json()/express.urlencoded()）
// 第三方中间件（cookie-parse）
app.listen(3000, () => {
  console.log('liston ok');
})