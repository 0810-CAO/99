"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App"));

var _router = _interopRequireDefault(require("./router"));

require("./plugins/element.js");

require("./assets/css/global.css");

var _vueTableWithTreeGrid = _interopRequireDefault(require("vue-table-with-tree-grid"));

require("./assets/font/iconfont.css");

var _axios = _interopRequireDefault(require("axios"));

var _vueQuillEditor = _interopRequireDefault(require("vue-quill-editor"));

require("quill/dist/quill.core.css");

require("quill/dist/quill.snow.css");

require("quill/dist/quill.bubble.css");

var _nprogress = _interopRequireDefault(require("nprogress"));

require("nprogress/nprogress.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 富文本编辑器及样式
_vue["default"].config.productionTip = false;
_vue["default"].prototype.$http = _axios["default"];
_axios["default"].defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1/"; //通过接口获取菜单数据，请求拦截器添加token，保证拥有获取数据的权限
//request拦截器中展示进度条start response中隐藏进度条

_axios["default"].interceptors.request.use(function (config) {
  _nprogress["default"].start();

  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
});

_axios["default"].interceptors.response.use(function (config) {
  _nprogress["default"].done();

  return config;
});
/* eslint-disable no-new */
// 注册为全局可用组件


_vue["default"].component('tree-table', _vueTableWithTreeGrid["default"]); // 全局定义格式化时间日期函数


_vue["default"].filter('dateFormate', function (origin) {
  var dt = new Date(origin);
  var y = dt.getFullYear();
  var m = (dt.getMonth() + 1 + '').padStart(2, '0');
  var d = (dt.getDate() + '').padStart(2, '0');
  var hh = (dt.getHours() + '').padStart(2, '0');
  var mm = (dt.getMinutes() + '').padStart(2, '0');
  var ss = (dt.getSeconds() + '').padStart(2, '0');
  return "".concat(y, "-").concat(m, "-").concat(d, " ").concat(hh, ":").concat(mm, ":").concat(ss);
}); // 注册为全局可用组件


_vue["default"].use(_vueQuillEditor["default"]);

new _vue["default"]({
  el: '#app',
  router: _router["default"],
  components: {
    App: _App["default"]
  },
  template: '<App/>'
});