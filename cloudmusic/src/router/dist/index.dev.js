"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _one = _interopRequireDefault(require("../components/one"));

var _two = _interopRequireDefault(require("../components/two"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*eslint-disable*/
_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/one',
  component: _one["default"]
}, {
  path: '/two',
  component: _two["default"]
}];
var router = new _vueRouter["default"]({
  routes: routes
});
var _default = router;
exports["default"] = _default;