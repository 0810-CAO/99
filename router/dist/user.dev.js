"use strict";

var _require = require('./routerConst'),
    USER_LOGIN = _require.USER_LOGIN,
    USER_REGISTER = _require.USER_REGISTER,
    USER_INFO = _require.USER_INFO; // 存储登录状态（cookie客户端/session服务端）
// cookie特点，可在客户端、服务端对cookie进行增删查改。每次发送网络请求，客户端都会自动将当前域名的cookie发送给服务端
// 统一返回数据格式


var _require2 = require('../model/resultModel'),
    SuccessModel = _require2.SuccessModel,
    ErrorModel = _require2.ErrorModel;
/*
// 后端校验数据
const Ajv = require('ajv').default
const ajv = new Ajv()
// 自定义json schema
const userSchema = require('../validator/userValidator')
 */


var _require3 = require('../controller/userController'),
    registerUser = _require3.registerUser,
    loginCheck = _require3.loginCheck;

var userRouterHandle = function userRouterHandle(req, res) {
  var result, _result;

  return regeneratorRuntime.async(function userRouterHandle$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.method === 'post' && req.path === USER_LOGIN)) {
            _context.next = 8;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(loginCheck(req.body));

        case 3:
          result = _context.sent;

          // 保存登录状态
          if (result.code == 200) {
            res.setHeader('Set-Cookie', "username=".concat(req.body.username, ";path=/;"));
          }

          return _context.abrupt("return", result);

        case 8:
          if (!(req.method === 'post' && req.path === USER_REGISTER)) {
            _context.next = 15;
            break;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(registerUser(req.body));

        case 11:
          _result = _context.sent;
          return _context.abrupt("return", _result);

        case 15:
          if (!(req.method === 'get' && req.path === USER_INFO)) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", new SuccessModel('获取用户信息成功', {
            name: 'ccx',
            age: 22
          }));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = userRouterHandle;