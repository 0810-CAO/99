"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _fastclick = _interopRequireDefault(require("fastclick"));

require("./assets/css/base.scss");

var _vueLazyload = _interopRequireDefault(require("vue-lazyload"));

var _index = _interopRequireDefault(require("./plugin/loading/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
// import MetaInfo from 'vue-meta-info'
// Vue.use(MetaInfo)
// 网络请求等待提示
_vue["default"].use(_index["default"], {
  title: "客官请稍等"
});

_vue["default"].use(_vueLazyload["default"], {
  // 可以通过配置loading配置图片还未加载好之前的占位图片  v-lazy
  loading: "./assets/images/loading.png"
});

_fastclick["default"].attach(document.body);

_vue["default"].config.productionTip = false; // const vconsole = new VConsole();
// Vue.use(vconsole);

new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount("#app");