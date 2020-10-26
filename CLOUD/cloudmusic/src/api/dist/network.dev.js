"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
_axios["default"].defaults.baseURL = "http://localhost:3000/";
_axios["default"].defaults.timeout = 5000;
var _default = {
  get: function get() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve, reject) {
      _axios["default"].get(path, {
        params: data
      }).then(function (response) {
        resolve(response.data);
      })["catch"](function (error) {
        reject(error);
      });
    });
  },
  post: function post() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve, reject) {
      _axios["default"].post(path, data).then(function (response) {
        resolve(response.data);
      })["catch"](function (error) {
        reject(error);
      });
    });
  },
  // 并发请求
  all: function all(list) {
    return new Promise(function (resolve, reject) {
      _axios["default"].all(list).then(_axios["default"].spread(function () {
        for (var _len = arguments.length, result = new Array(_len), _key = 0; _key < _len; _key++) {
          result[_key] = arguments[_key];
        }

        // 两个请求现在都执行完成
        resolve(result);
      }))["catch"](function (err) {
        reject(err);
      });
    });
  }
};
exports["default"] = _default;