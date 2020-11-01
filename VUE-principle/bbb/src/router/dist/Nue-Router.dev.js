"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NueRouterInfo = function NueRouterInfo() {
  _classCallCheck(this, NueRouterInfo);

  this.currentPath = null;
};

var NueRouter =
/*#__PURE__*/
function () {
  function NueRouter(options) {
    _classCallCheck(this, NueRouter);

    this.mode = options.mode || 'hash';
    this.router = options.routes || []; // 提取路由信息
    // {
    //   '/home':Home,
    //   '/about':About
    // }

    this.routesMap = this.createRoutesMap();
    console.log(this.routesMap);
    this.routeInfo = new NueRouterInfo(); // 初始化默认路由信息

    this.initDefault();
  }

  _createClass(NueRouter, [{
    key: "initDefault",
    value: function initDefault() {
      var _this = this;

      if (this.mode === 'hash') {
        console.log(location.hash);

        if (!location.hash) {
          location.hash = '/';
        }

        window.addEventListener('load', function () {
          _this.routeInfo.currentPath = location.hash.slice(1);
        });
        window.addEventListener('hashchange', function () {
          _this.routeInfo.currentPath = location.hash.slice(1);
          console.log(_this.routeInfo);
        });
      } else {
        console.log(location.pathname);

        if (!location.pathname) {
          location.pathname = '/';
        }

        window.addEventListener('load', function () {
          _this.routeInfo.currentPath = location.hash.slice(1);
        });
        window.addEventListener('popstate', function () {
          _this.routeInfo.currentPath = location.hash.slice(1);
          console.log(_this.routeInfo);
        });
      }
    }
  }, {
    key: "createRoutesMap",
    value: function createRoutesMap() {
      return this.routes.reduce(function (map, route) {
        map[route.path] = route.component;
        return map;
      }, {});
    }
  }]);

  return NueRouter;
}();

NueRouter.install = function (Vue, options) {
  Vue.mixin({
    beforeCreate: function beforeCreate() {
      if (this.$options && this.$options.router) {
        this.$router = this.$options.router;
        this.$route = this.$router.routeInfo;
      } else {
        this.$router = this.$parent.$router;
        this.$route = this.$router.routeInfo;
      }
    }
  });
  Vue.component('router-link', {
    props: {
      to: String
    },
    render: function render() {
      re;
    }
  });
};

var _default = NueRouter;
exports["default"] = _default;