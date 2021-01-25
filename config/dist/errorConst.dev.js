"use strict";

// json返回的错误数据常量msg
module.exports = {
  userDataFail: {
    code: 1001,
    msg: '数据格式问题'
  },
  userExistFail: {
    code: 1002,
    msg: '用户已存在'
  },
  userRegisterFail: {
    code: 1003,
    msg: '注册失败'
  },
  userLoginFail: {
    code: 1004,
    msg: '登录失败'
  }
};