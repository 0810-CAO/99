"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Service = require('egg').Service;

var UserService =
/*#__PURE__*/
function (_Service) {
  _inherits(UserService, _Service);

  function UserService() {
    _classCallCheck(this, UserService);

    return _possibleConstructorReturn(this, _getPrototypeOf(UserService).apply(this, arguments));
  }

  _createClass(UserService, [{
    key: "createUser",
    value: function createUser(_ref) {
      var username, password, gender, users, res;
      return regeneratorRuntime.async(function createUser$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              username = _ref.username, password = _ref.password, gender = _ref.gender;
              _context.next = 3;
              return regeneratorRuntime.awrap(this.getUser(username));

            case 3:
              users = _context.sent;

              if (!(users.length === 0)) {
                _context.next = 11;
                break;
              }

              _context.next = 7;
              return regeneratorRuntime.awrap(this.ctx.model.User.create({
                username: username,
                password: this.ctx.helper.generatePwd(password),
                gender: gender
              }));

            case 7:
              res = _context.sent;
              return _context.abrupt("return", res.dataValues);

            case 11:
              throw new Error('当前用户已存在');

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getUser",
    value: function getUser(username, password) {
      var res, _res;

      return regeneratorRuntime.async(function getUser$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!password) {
                _context2.next = 11;
                break;
              }

              _context2.next = 3;
              return regeneratorRuntime.awrap(this.ctx.model.User.findOne({
                where: {
                  username: username,
                  password: this.ctx.helper.generatePwd(password)
                }
              }));

            case 3:
              res = _context2.sent;

              if (!res) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", res.dataValues);

            case 8:
              throw new Error('用户名或密码不正确');

            case 9:
              _context2.next = 15;
              break;

            case 11:
              _context2.next = 13;
              return regeneratorRuntime.awrap(this.ctx.model.User.findAll({
                where: {
                  username: username
                }
              }));

            case 13:
              _res = _context2.sent;
              return _context2.abrupt("return", _res);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findUser",
    value: function findUser(_ref2) {
      var username, password, user;
      return regeneratorRuntime.async(function findUser$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              username = _ref2.username, password = _ref2.password;
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.getUser(username, password));

            case 3:
              user = _context3.sent;
              return _context3.abrupt("return", user);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }]);

  return UserService;
}(Service);

module.exports = UserService;