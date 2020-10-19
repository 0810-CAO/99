"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _index = _interopRequireDefault(require("./plugin/loading/index.js"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _index2 = _interopRequireDefault(require("./store/index.js"));

var _vant = require("vant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*eslint-disable*/
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
_vue["default"].use(_index["default"]);

_vue["default"].use(_vant.NavBar);

_vue["default"].use(_vant.Card);

_vue["default"].use(_vant.SubmitBar); // import { Row, Button } from 'element-ui'
// Vue.use(ElementUI)
// Vue.use(Row)
// Vue.use(Button)


_vue["default"].config.productionTip = false; // nodemodules 依赖和包
// public 静态资源（会简单复制）永远不会改变的静态资源或者webpack不支持的第三方库
// src assets（图片、文字静态资源）components文件夹（自定义组件，小组件、公共组件）
// views (大组件) router（存储vuerouter相关文件）store（vuex相关文件）

new _vue["default"]({
  router: _router["default"],
  store: _index2["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');