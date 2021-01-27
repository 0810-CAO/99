// koa是一个轻量级框架，将所有的功能都封装到独立的模块中，需要安装才能使用
// 处理静态资源=》npm install koa-static
// 处理动态资源=》npm install koa-views
// 处理路由=》npm install koa-router //https://github.com/ZijianHe/koa-router
// 处理post请求参数=》npm install koa-bodyparser
// 处理错误=》npm install koa-onerror

// 1、导入koa
const Koa = require('koa')
const serve = require('koa-static');//导入处理静态资源的模块
const views = require('koa-views');//导入处理动态资源的模块
const Router = require('koa-router');//导入处理路由的模块
const router = new Router(); //创建路由对象
const bodyParser = require('koa-bodyparser')//导入处理post请求参数模块
const onerror = require('koa-onerror')//处理错误
// 2、创建服务端实例对象
const app = new Koa()
onerror(app)//告诉koa-onerror需要捕获所有服务端实例对象错误
app.use(serve('public'));//注册处理静态资源的中间件
app.use(views('views', { extension: 'ejs' }))
app.use(bodyParser())//注册处理post请求参数中间件
// koa中的ctx就是express中的req+res
// app.use(async (ctx, next) => {//动态资源
//   // ctx.body = "hello"
//   await ctx.render('index', { msg: 'www.5260.site' })//http://localhost:3000/index
// })

// 处理路由
router.get('/api/goods/list', (ctx, next) => {
  ctx.body = "get /api/goods/list"//ctx.body===res.writeHeader+res.end
});
router.get('/api/user/info', (ctx, next) => {
  ctx.body = {
    method: 'get',
    name: 'ccx',
    age: 22
  }
});
router.post('/api/user/login', (ctx, next) => {
  ctx.body = "post /api/user/login"
})
router.post('/api/user/register', (ctx, next) => {
  ctx.body = {
    method: 'post',
    name: 'ccx',
    age: 22
  }
})

// 处理get请求参数
router.get('/login', (ctx, next) => {
  let request = ctx.request
  console.log(request.query);//转换成对象之后的get请求参数([Object: null prototype] { name: 'ccx', age: '22' })
  console.log(request.querystring);//获取字符串形式的请求参数(name=ccx&age=22)
})
router.get('/login1/:name/:age', (ctx, next) => {//获取动态路由
  console.log(ctx.params);//{ name: 'ccx', age: '22' }
})
// 处理post请求参数，需要借助koa-bodyparser中间件
router.post('/user', (ctx, next) => {
  let request = ctx.request
  console.log(request.body)//{ username: 'ccx', password: '123456' }
})

// 处理cookie，不需要引入插件，只需要拿到ctx即可
router.get('/setCookie', (ctx, next) => {
  // ctx.cookies.set('username', 'ccx', { httpOnly: true, path: '/', maxAge: 10000 })
  // 在koa中不能给cookie设置中文的值,需要将中文转换成base64
  let value = new Buffer('曹承湘').toString('base64')
  ctx.cookies.set('username', value, { httpOnly: true, path: '/', maxAge: 10000 })

  /*let value=new Buffer('曹承湘').toString('base64')
  console.log(value);//5pu55om/5rmY
  let res=new Buffer('5pu55om/5rmY','base64').toString()
  console.log(res); */
})
router.get('/getCookie', (ctx, next) => {
  let value = ctx.cookies.get('username')
  let res = new Buffer(value, 'base64').toString()
  console.log(res);
})

// 处理错误
app.use((err, ctx) => {
  console.log(err.status, err.message);
  ctx.body = err.message
})
app
  .use(router.routes())//启动路由功能
  .use(router.allowedMethods());//自动设置响应头
app.listen(3000)