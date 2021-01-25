"use strict";

// 服务端业务逻辑核心文件，处理各种请求
var queryString = require('querystring'); // goods和user路由


var goodsRouterHandle = require('./router/goods');

var userRouterHandle = require('./router/user'); // 登录静态资源


var staticServer = require('./utils/staticServer');

var path = require('path');

var rootPath = path.join(__dirname, 'public'); // 准备请求各种参数

var initParams = function initParams(req) {
  // 准备请求方式、路径、参数
  // 1、处理请求方式
  req.method = req.method.toLowerCase(); // 2、处理请求路径

  req.path = req.url.split('?')[0]; // 3、处理请求参数

  return new Promise(function (resolve, reject) {
    if (req.method === "get") {
      var params = req.url.split('?')[1];
      req.query = queryString.parse(params); //存放get传入参数

      resolve();
    } else if (req.method === "post") {
      var _params = '';
      req.on('data', function (chunk) {
        _params += chunk;
      });
      req.on('end', function () {
        req.body = queryString.parse(_params); //存放post传入参数

        resolve();
      });
    }
  });
};

var setEnd = function setEnd(res, data) {
  res.writeHead(200, {
    'Content-Type': 'application/json;charset=utf-8;'
  });
  res.end(JSON.stringify(data));
}; // 1、为了区分开发阶段和上线阶段需要定义一个变量
// 2、需要使用cross-env(一款运行跨平台的设置和使用环境变量的脚本)
// 3、由于在自定义配置环境变量的时候，在不同的环境下，配置的方式也是不同，所以需要使用该插件统一配置方式
// 4、npm install --save-dev cross-env
// 5、"scripts"中配置
//    "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js"
//    "build": "cross-env NODE_ENV=pro nodemon ./bin/www.js"


console.log(process.env.NODE_ENV); //dev/pro

var serverHandle = function serverHandle(req, res) {
  return regeneratorRuntime.async(function serverHandle$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(staticServer.readFile(req, res, rootPath));

        case 2:
          res.setEnd = setEnd; // 处理各种请求，需要知道请求方式、路径、参数

          initParams(req).then(function _callee() {
            var goodsData, userData;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    // 处理商品的路由
                    goodsData = goodsRouterHandle(req, res);

                    if (!goodsData) {
                      _context.next = 4;
                      break;
                    }

                    // res.end(JSON.stringify(goodsData))
                    res.setEnd(res, goodsData);
                    return _context.abrupt("return");

                  case 4:
                    _context.next = 6;
                    return regeneratorRuntime.awrap(userRouterHandle(req, res));

                  case 6:
                    userData = _context.sent;

                    if (!userData) {
                      _context.next = 10;
                      break;
                    }

                    // res.end(JSON.stringify(userData))
                    res.setEnd(res, userData);
                    return _context.abrupt("return");

                  case 10:
                    res.writeHead(404, {
                      'Content-Type': 'text/plain; charset=utf-8;'
                    });
                    res.end('404 Not Found');

                  case 12:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // 1、json schema（注意前端预校验表单，后端需要二次校验）
// 定义了json格式的规范（见validator/userValidator.js）
// 2、ajv库（nodejs中使用该库校验前端传递过来的json数据是否符合指定的json schema规范）
// npm install ajv
// （静态/动态网页+json）<=router(view+api)<=controller(业务逻辑+返回格式)<=service(数据处理)<=mysql


module.exports = serverHandle;