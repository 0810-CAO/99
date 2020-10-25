"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// 注意，通过import引入的组件不会按需加载
// import Recommend from '../views/Recommend'
// import Singer from '../views/Singer'
// import Rank from '../views/Rank'
// import Search from '../views/Search'
var Recommend = function Recommend(resolve) {
  Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../views/Recommend"));
  }).then(function (module) {
    resolve(module);
  });
};

var Detail = function Detail(resolve) {
  Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../views/Detail"));
  }).then(function (module) {
    resolve(module);
  });
};

var Singer = function Singer(resolve) {
  Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../views/Singer"));
  }).then(function (module) {
    resolve(module);
  });
};

var Rank = function Rank(resolve) {
  Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../views/Rank"));
  }).then(function (module) {
    resolve(module);
  });
};

var Search = function Search(resolve) {
  Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../views/Search"));
  }).then(function (module) {
    resolve(module);
  });
};

var Account = function Account(resolve) {
  Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../views/Account"));
  }).then(function (module) {
    resolve(module);
  });
};

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: "/",
  redirect: "/recommend"
}, {
  path: "/recommend",
  component: Recommend,
  children: [{
    path: "detail/:id/:type",
    component: Detail
  }]
}, {
  path: "/singer",
  component: Singer
}, {
  path: "/rank",
  component: Rank
}, {
  path: "/search",
  component: Search
}, {
  path: "/account",
  component: Account
}];
var router = new _vueRouter["default"]({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});
var _default = router;
exports["default"] = _default;