"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
_axios["default"].defaults.baseURL = 'http://localhost:3000/';
_axios["default"].defaults.timeout = 8000;
var count = 0; // 添加请求拦截器

_axios["default"].interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  count++;

  _vue["default"].showLoading();

  return config;
}, function (error) {
  // 对请求错误做些什么
  _vue["default"].hiddenLoading();

  return Promise.reject(error);
}); // 添加响应拦截器


_axios["default"].interceptors.response.use(function (response) {
  // 对响应数据做点什么
  count--;

  if (count === 0) {
    _vue["default"].hiddenLoading();
  }

  return response;
}, function (error) {
  // 对响应错误做点什么
  _vue["default"].hiddenLoading();

  return Promise.reject(error);
});

var _default = {
  get: function get() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
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
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
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