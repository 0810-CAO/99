// 手动安装配置
// npm install express
// 1、导入express
const express = require('express')
const path = require('path')
// 处理路由方式二(模块开发)
const userRouter = require('./router/user')
const cookieParser = require('cookie-parser')

// 2、调用express方法，创建服务端实例对象
const app = express()
// 处理静态资源
app.use(express.static(path.join(__dirname, 'public')))
// 处理动态资源
// 1、告诉express动态资源存储在什么地方
app.set('views', path.join(__dirname, 'views'))
// 2、告诉express动态网页使用的是什么模板引擎
app.set('view engine', 'ejs')
// 3、监听请求，返回渲染后的动态网页
app.get('/index', (req, res, next) => {
  // 注意：express给请求对象和响应对象添加了很多自定义方法
  res.render('index', { msg: 'www.5260.site' })
})
// 处理路由一
// express会将get的请求参数转换成对象后，放到请求对象的query属性中
app.get('/api/goods/list', (req, res, next) => {//http://localhost:3000/api/goods/list?name=ccx&age=22
  console.log(req.query);//{ name: 'ccx', age: '22' }
})
app.get('/api/user/info', (req, res, next) => {
  // 响应对象的json对象方法是express给响应对象扩展的
  // 这个方法会自动将对象转换成字符串之后返回，还会自动帮助我们设置响应头
  res.json({
    name: 'ccx',
    age: '22',
    method: 'get'
  })
})

// express会将post的请求参数转换成对象后，放到请求对象的query属性中
app.use(express.json())//告诉express能够解析application/json类型的请求参数
app.use(express.urlencoded({ extended: false }))//告诉express能够解析表单类型的请求参数，extended: false使用自带的querystring解析
app.post('/api/goods/detail', (req, res, next) => {//http://localhost:3000/api/goods/detail?name=ccx&age=22
  console.log(req.body);//[Object: null prototype] { name: 'ccx', age: '22' }
})
app.post('/api/user/register', (req, res, next) => {
  res.json({
    name: 'ccx02',
    age: '22',
    method: 'post'
  })
})
app.get('/', function (req, res, next) {
  // res.send('he')
  res.writeHead(200, {
    'Content-Type': 'text/plain;charset=utf-8;'
  })
  res.end('www.5260.site')
})

// express处理cookie
app.get('/setCookie', (req, res, next) => {
  res.cookie('username', 'ccx', { httpOnly: true, path: '/', maxAge: 10000 })
  res.end()
})
// 拿到cookie需要npm install cookie-parser插件
app.use(cookieParser())//注册插件
app.get('/getCookie', (req, res, next) => {
  console.log(req.cookies);//{ username: 'ccx' }
})

// app.use('/api/user', userRouter)// 注册路由，给定共同的地址/api/user
// 3、告诉服务端需要监听哪一个端口
app.listen(3000, () => {
  console.log('liston ok');
})