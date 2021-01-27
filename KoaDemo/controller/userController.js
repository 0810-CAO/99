// 后端校验数据
const Ajv = require('ajv').default
const ajv = new Ajv()
const userSchema = require('../validator/userValidator')
const { getUser, createUser } = require('../service/userService')
const { SuccessModel, ErrorModel } = require('../model/resultModel')
const { userDataFail, userExistFail, userRegisterFail, userLoginFail } = require('../config/errorConst')
const generatePwd = require('../utils/crypto')

function userValidate(data) {
  return ajv.validate(userSchema, data)
}
// 校验用户是否存在需要获取mysql中数据，因此需要使用service层
async function userExists(username) {
  let users = await getUser(username)
  return users.length !== 0
}
async function registerUser({ username, password, gender }) {
  let valid = userValidate({ username, password, gender })
  if (!valid) {
    return new ErrorModel(userDataFail)
  }
  // 2、判断当前校验用户是否存在
  let isExists = await userExists(username)
  if (valid && !isExists) {
    try {
      await createUser({ username, password: generatePwd(password), gender })
      return new SuccessModel({ msg: '注册成功' })
    } catch (e) {
      return new ErrorModel(userRegisterFail)
    }
  } else {
    return new ErrorModel(userExistFail)
  }
}
async function loginCheck({ username, password }) {
  let users = await getUser(username, generatePwd(password))
  if (users.length !== 0) {
    return new SuccessModel({ msg: '登录成功', data: users[0] })
  } else {
    return new ErrorModel(userLoginFail)
  }
}
module.exports = {
  registerUser,
  loginCheck
}