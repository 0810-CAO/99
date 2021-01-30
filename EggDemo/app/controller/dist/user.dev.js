'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Controller = require('egg').Controller;

var UserController =
/*#__PURE__*/
function (_Controller) {
  _inherits(UserController, _Controller);

  function UserController() {
    _classCallCheck(this, UserController);

    return _possibleConstructorReturn(this, _getPrototypeOf(UserController).apply(this, arguments));
  }

  _createClass(UserController, [{
    key: "register",
    value: function register() {
      var ctx, res, _res;

      return regeneratorRuntime.async(function register$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ctx = this.ctx; // 1.校验数据是否符合预期

              _context.next = 3;
              return regeneratorRuntime.awrap(ctx.validate('schema.user', ctx.request.body));

            case 3:
              res = _context.sent;

              if (!res) {
                _context.next = 17;
                break;
              }

              _context.prev = 5;
              _context.next = 8;
              return regeneratorRuntime.awrap(ctx.service.user.createUser(ctx.request.body));

            case 8:
              _res = _context.sent;
              ctx.success(_res);
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](5);
              ctx.error(400, _context.t0.message);

            case 15:
              _context.next = 18;
              break;

            case 17:
              // 告诉前端数据不符合预期
              ctx.error(400, ctx.helper.errorCode[400]);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[5, 12]]);
    }
  }, {
    key: "login",
    value: function login() {
      var ctx, res;
      return regeneratorRuntime.async(function login$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              ctx = this.ctx; // console.log(ctx.request.body);

              _context2.prev = 1;
              _context2.next = 4;
              return regeneratorRuntime.awrap(ctx.service.user.findUser(ctx.request.body));

            case 4:
              res = _context2.sent;
              ctx.session.user = res;
              ctx.success(res);
              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](1);
              ctx.error(202, _context2.t0.message);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[1, 9]]);
    }
  }]);

  return UserController;
}(Controller);

module.exports = UserController;