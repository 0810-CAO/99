"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Login = _interopRequireDefault(require("../components/Login.vue"));

var _Home = _interopRequireDefault(require("../components/Home.vue"));

var _Welcome = _interopRequireDefault(require("../components/Welcome.vue"));

var _Users = _interopRequireDefault(require("../components/user/Users.vue"));

var _Rights = _interopRequireDefault(require("../components/power/Rights.vue"));

var _Roles = _interopRequireDefault(require("../components/power/Roles.vue"));

var _Cate = _interopRequireDefault(require("../components/goods/Cate.vue"));

var _Params = _interopRequireDefault(require("../components/goods/Params.vue"));

var _List = _interopRequireDefault(require("../components/goods/List.vue"));

var _Add = _interopRequireDefault(require("../components/goods/Add.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var router = new _vueRouter["default"]({
  //访问根路径重定向到login
  routes: [{
    path: '/',
    redirect: 'login'
  }, {
    path: '/login',
    component: _Login["default"]
  }, {
    path: '/home',
    component: _Home["default"],
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: _Welcome["default"]
    }, {
      path: '/users',
      component: _Users["default"]
    }, {
      path: '/rights',
      component: _Rights["default"]
    }, {
      path: '/roles',
      component: _Roles["default"]
    }, {
      path: '/categories',
      component: _Cate["default"]
    }, {
      path: '/params',
      component: _Params["default"]
    }, {
      path: '/goods',
      component: _List["default"]
    }, {
      path: '/goods/add',
      component: _Add["default"]
    }]
  }]
}); //拦截路由导航守卫，防止直接通过url访问到页面,轻质跳转到登录页面

router.beforeEach(function (to, from, next) {
  if (to.path === '/login') return next();
  var tokenstr = window.sessionStorage.getItem('token');
  if (!tokenstr) return next('/login');
  next();
});
var _default = router;
exports["default"] = _default;