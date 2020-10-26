"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _fastclick = _interopRequireDefault(require("fastclick"));

require("./assets/css/base.scss");

var _vueLazyload = _interopRequireDefault(require("vue-lazyload"));

var _vconsole = _interopRequireDefault(require("vconsole"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
_vue["default"].use(_vueLazyload["default"], {
  // 可以通过配置loading配置图片还未加载好之前的占位图片  v-lazy
  loading: "./assets/images/loading.png"
});

_fastclick["default"].attach(document.body);

_vue["default"].config.productionTip = false;
var vconsole = new _vconsole["default"]();

_vue["default"].use(vconsole);

new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount("#app");