// 服务端业务逻辑核心文件，处理各种请求
const queryString = require('querystring')
// goods和user路由
const goodsRouterHandle = require('./router/goods')
const userRouterHandle = require('./router/user')
// 登录静态资源
const staticServer = require('./utils/staticServer')
const path = require('path')
const rootPath = path.join(__dirname, 'public')
// 1、服务端存在的问题，操作系统会给每一个应用程序分配一块存储空间（1.6g、3g）
// 当前session是一个全局变量，会出现存不下；应用程序重启会释放存储空间；登录状态会出现无法共享，由于多进程之间内存相互隔离
// 2、session的特点，数据量不大（存储的都是常用信息）；访问频率极高（对性能要求高每次操作都会验证session）；不害怕丢失（丢失后再登录即可）
// 3、解决方案，redis可搭建集群突破内存限制；redis不重启数据不会消失；存储在redis中的数据无论哪个进程都可以访问；redis性能极好，速度极快
const { redisGet } = require('./db/redis')
// 定义变量作为session的容器
// const SESSION_CONTAINER = {}

const generatePwd = require('./utils/crypto');
// sequliaze
require('./db/sync');
// 日志
const writeLog = require('./utils/log');
// cookie过期时间
const getCookieExpires = () => {
  let date = new Date()
  date.setTime(date.getTime() + (24 * 60 * 60 * 1000))
  return date.toGMTString()
}
// 准备请求各种参数
const initParams = (req, res) => {
  // 准备请求方式、路径、参数
  // 1、处理请求方式
  req.method = req.method.toLowerCase()
  // 2、处理请求路径
  req.path = req.url.split('?')[0]
  // 3、处理请求参数
  return new Promise((resolve, reject) => {
    if (req.method === "get") {
      let params = req.url.split('?')[1]
      req.query = queryString.parse(params)//存放get传入参数
      resolve()
    } else if (req.method === "post") {
      let params = ''
      req.on('data', (chunk) => {
        params += chunk
      })
      req.on('end', () => {
        req.body = queryString.parse(params)//存放post传入参数
        resolve()
      })
    }
  })
}
const initCookieSession = async (req, res) => {
  // 1、处理cookie //客户端
  req.cookie = {}
  if (req.headers.cookie) {
    req.headers.cookie.split(';').forEach(item => {
      let keyValue = item.split('=')
      req.cookie[keyValue[0]] = keyValue[1]
    });
  }
  // 2、获取用户唯一标识// 保存登录状态标识(session)服务器端
  req.userId = req.cookie.userId
  if (!req.userId) {
    req.userId = `${Date.now()}_${Math.random}_5260.site`
    // 给当前用户分配容器
    // SESSION_CONTAINER[req.userId] = {}
    req.session = {}
    res.setHeader('Set-Cookie', `userId=${generatePwd(req.userId)};path=/;httpOnly;expires=${getCookieExpires()}`)
  }
  // if (!SESSION_CONTAINER[req.userId]) {
  //   // 给当前用户分配容器
  //   SESSION_CONTAINER[req.userId] = {}
  // }
  if (!req.session) {
    req.session = await redisGet(req.userId) || {}
  }
  // req.session = SESSION_CONTAINER[req.userId]
  console.log(req.session);//{username: '110@qq.com',password: '7284830a391d160b4b5bfa4f3cc3a618',gender: '3'}
}
const setEnd = (res, data) => {
  res.writeHead(200, {
    'Content-Type': 'application/json;charset=utf-8;'
  })
  res.end(JSON.stringify(data))
}
// 1、为了区分开发阶段和上线阶段需要定义一个变量
// 2、需要使用cross-env(一款运行跨平台的设置和使用环境变量的脚本)
// 3、由于在自定义配置环境变量的时候，在不同的环境下，配置的方式也是不同，所以需要使用该插件统一配置方式
// 4、npm install --save-dev cross-env
// 5、"scripts"中配置
//    "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js"
//    "build": "cross-env NODE_ENV=pro nodemon ./bin/www.js"
console.log(process.env.NODE_ENV);//dev/pro
const serverHandle = async (req, res) => {
  // 0、准备cookie和session
  await initCookieSession(req, res)
  // 1、返回静态网页(异步执行，否则直接跳转到404)
  await staticServer.readFile(req, res, rootPath)
  res.setEnd = setEnd
  // 处理各种请求，需要知道请求方式、路径、参数
  initParams(req, res).then(async () => {
    writeLog(`${req.method}--${req.url}--${req.headers['user-agent']}`)
    // 处理商品的路由
    let goodsData = goodsRouterHandle(req, res)
    if (goodsData) {
      // res.end(JSON.stringify(goodsData))
      res.setEnd(res, goodsData)
      return
    }
    // 处理用户的路由
    let userData = await userRouterHandle(req, res)
    if (userData) {
      // res.end(JSON.stringify(userData))
      res.setEnd(res, userData)
      return
    }
    res.writeHead(404, {
      'Content-Type': 'text/plain; charset=utf-8;'
    });
    res.end('404 Not Found');
  })
}
// 1、json schema（注意前端预校验表单，后端需要二次校验）
// 定义了json格式的规范（见validator/userValidator.js）
// 2、ajv库（nodejs中使用该库校验前端传递过来的json数据是否符合指定的json schema规范）
// npm install ajv
// （静态/动态网页+json）<=router(view+api)<=controller(业务逻辑+返回格式)<=service(数据处理)<=mysql
module.exports = serverHandle