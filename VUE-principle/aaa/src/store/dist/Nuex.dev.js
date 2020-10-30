"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// install方法会在外界调用vue.use的时候执行，并将vue实例和一些额外参数传递过来
var install = function install(Vue, options) {
  // 给每个实例动态添加一个$store属性
  // mixin方法在创建每一个vue实例时执行
  Vue.mixin({
    beforeCreate: function beforeCreate() {
      // vue在创建会先创建父组件后创建子组件root App  HelloWorld
      console.log(this.$options.name); // root->App->HelloWorld
      // 如果是根组件，默认就有store。

      if (this.$options && this.$options.store) {
        this.$store = this.$options.store;
      } else {
        // 不是根组件，需要将store变成$store即可(将父组件的$store赋值给它即可)
        this.$store = this.$parent.$store;
      }
    }
  });
};

var Store =
/*#__PURE__*/
function () {
  function Store(options) {
    _classCallCheck(this, Store);

    // this.options = options
    // 将传递进来的state放到store上
    // 将创建时需要共享的数据添加到store上面，这样就可以通过this.$store拿到这个store，也就可以通过.state拿到需要共享的属性
    // this.state = options.state
    // 在vue中存在一个util工具类，使用defineReactive方法将数据变成双向绑定的数据（给那个对象添加属性、添加什么属性、属性的值）
    _vue["default"].util.defineReactive(this, 'state', options.state); // 将传递进来的getters放到store上


    this.initGetters(options); // 将传递进来的mutations放到store上

    this.initMutations(options); // 将传递进来的actions放到store上

    this.initActions(options);
  }

  _createClass(Store, [{
    key: "initGetters",
    value: function initGetters(options) {
      var _this = this;

      // this.getters = options.getters
      // 1、拿到传递进来的getters
      var getters = options.getters || {}; // 2、在store上新增一个getters属性

      this.getters = {}; // 3、将传递进来的getters中的方法添加到当前store的getters上

      var _loop = function _loop(key) {
        Object.defineProperty(_this.getters, key, {
          get: function get() {
            return getters[key](_this.state); //绑定并执行传参
          }
        });
      };

      for (var key in getters) {
        _loop(key);
      }
    }
  }, {
    key: "commit",
    value: function commit(type, payload) {
      console.log(this);
      this.mutations[type](payload);
    }
  }, {
    key: "initMutations",
    value: function initMutations(options) {
      var _this2 = this;

      // 1、拿到传递进来的mutations
      var mutations = options.mutations || {}; // 2、在store上新增一个mutations属性

      this.mutations = {}; // 3、将传递进来的mutations中的方法添加到当前store的mutations上

      var _loop2 = function _loop2(key) {
        _this2.mutations[key] = function (payload) {
          mutations[key](_this2.state, payload);
        };
      };

      for (var key in mutations) {
        _loop2(key);
      }
    }
  }, {
    key: "dispatch",
    value: function dispatch(type, payload) {
      this.actions[type](payload);
    }
  }, {
    key: "initActions",
    value: function initActions(options) {
      var _this3 = this;

      // 1、拿到传递进来的actions
      var actions = options.actions || {}; // 2、在store上新增一个actions属性

      this.actions = {}; // 3、将传递进来的actions中的方法添加到当前store的mutations上

      var _loop3 = function _loop3(key) {
        _this3.actions[key] = function (payload) {
          actions[key](_this3, payload);
        };
      };

      for (var key in actions) {
        _loop3(key);
      }
    }
  }]);

  return Store;
}();

var _default = {
  install: install,
  Store: Store
};
exports["default"] = _default;