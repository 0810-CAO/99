"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _NueRouter = _interopRequireDefault(require("./Nue-Router"));

var _Home = _interopRequireDefault(require("../views/Home.vue"));

var _About = _interopRequireDefault(require("../views/About.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import VueRouter from 'vue-router'
_vue["default"].use(_NueRouter["default"]);

var routes = [{
  path: '/',
  name: 'Home',
  component: _Home["default"]
}, {
  path: '/about',
  name: 'About',
  component: _About["default"]
}];
var router = new _NueRouter["default"]({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: routes
});
var _default = router;
exports["default"] = _default;