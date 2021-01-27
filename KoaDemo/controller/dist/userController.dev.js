"use strict";

// 后端校验数据
var Ajv = require('ajv')["default"];

var ajv = new Ajv();

var userSchema = require('../validator/userValidator');

var _require = require('../service/userService'),
    getUser = _require.getUser,
    createUser = _require.createUser;

var _require2 = require('../model/resultModel'),
    SuccessModel = _require2.SuccessModel,
    ErrorModel = _require2.ErrorModel;

var _require3 = require('../config/errorConst'),
    userDataFail = _require3.userDataFail,
    userExistFail = _require3.userExistFail,
    userRegisterFail = _require3.userRegisterFail,
    userLoginFail = _require3.userLoginFail;

var generatePwd = require('../utils/crypto');

function userValidate(data) {
  return ajv.validate(userSchema, data);
} // 校验用户是否存在需要获取mysql中数据，因此需要使用service层


function userExists(username) {
  var users;
  return regeneratorRuntime.async(function userExists$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getUser(username));

        case 2:
          users = _context.sent;
          return _context.abrupt("return", users.length !== 0);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function registerUser(_ref) {
  var username, password, gender, valid, isExists;
  return regeneratorRuntime.async(function registerUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          username = _ref.username, password = _ref.password, gender = _ref.gender;
          // 1、校验数据是否正确
          // let valid = ajv.validate(userSchema, req.body)
          // console.log(valid);
          // console.log(ajv.errors);//返回不符合后端校验原因
          valid = userValidate({
            username: username,
            password: password,
            gender: gender
          });

          if (valid) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", new ErrorModel(userDataFail));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(userExists(username));

        case 6:
          isExists = _context2.sent;

          if (!(valid && !isExists)) {
            _context2.next = 19;
            break;
          }

          _context2.prev = 8;
          _context2.next = 11;
          return regeneratorRuntime.awrap(createUser({
            username: username,
            password: generatePwd(password),
            gender: gender
          }));

        case 11:
          return _context2.abrupt("return", new SuccessModel({
            msg: '注册成功'
          }));

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](8);
          return _context2.abrupt("return", new ErrorModel(userRegisterFail));

        case 17:
          _context2.next = 20;
          break;

        case 19:
          return _context2.abrupt("return", new ErrorModel(userExistFail));

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[8, 14]]);
}

function loginCheck(_ref2) {
  var username, password, users;
  return regeneratorRuntime.async(function loginCheck$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          username = _ref2.username, password = _ref2.password;
          _context3.next = 3;
          return regeneratorRuntime.awrap(getUser(username, generatePwd(password)));

        case 3:
          users = _context3.sent;

          if (!(users.length !== 0)) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", new SuccessModel({
            msg: '登录成功',
            data: users[0]
          }));

        case 8:
          return _context3.abrupt("return", new ErrorModel(userLoginFail));

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
}

module.exports = {
  registerUser: registerUser,
  loginCheck: loginCheck
};