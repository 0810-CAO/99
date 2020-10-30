"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _Nuex = _interopRequireDefault(require("./Nuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import Vuex from 'vuex'
// vuex的本质就是一个插件，所以实现vuex就是在实现一个全局共享数据的插件
_vue["default"].use(_Nuex["default"]);

var home = {
  state: {
    name: 'name1'
  },
  getters: {
    getHomeName: function getHomeName(state) {
      return state.name + '2020';
    }
  },
  mutations: {
    addHomeName: function addHomeName(state, payload) {
      state.name += payload;
    },
    // 多个模块中mutations可以出现同名方法（只有state不能同名），并且不会覆盖，放在数组中依次执行
    addNum: function addNum(state, payload) {
      console.log('home' + state, payload);
      state.num += payload;
    }
  },
  actions: {
    asyncAddName: function asyncAddName(_ref, payload) {
      var commit = _ref.commit;
      setTimeout(function () {
        commit('addHomeName', payload);
      }, 1000);
    },
    asyncAddAge: function asyncAddAge(_ref2, payload) {
      var commit = _ref2.commit;
      console.log('home');
      setTimeout(function () {
        commit('addAge', payload);
      }, 1000);
    }
  }
};
var login = {
  state: {
    name: 'name3'
  },
  getters: {
    getLoginName: function getLoginName(state) {
      return state.name + '4040';
    }
  },
  mutations: {
    addLoginName: function addLoginName(state, payload) {
      state.name += payload;
    }
  },
  actions: {
    asyncAddName3: function asyncAddName3(_ref3, payload) {
      var commit = _ref3.commit;
      setTimeout(function () {
        commit('addLoginName', payload);
      }, 1000);
    }
  }
};
var account = {
  state: {
    name: 'name2'
  },
  getters: {
    getAccountName: function getAccountName(state) {
      return state.name + '3030';
    }
  },
  mutations: {
    addAccountName: function addAccountName(state, payload) {
      state.name += payload;
    }
  },
  actions: {
    asyncAddName2: function asyncAddName2(_ref4, payload) {
      var commit = _ref4.commit;
      setTimeout(function () {
        commit('addAccountName', payload);
      }, 1000);
    }
  },
  modules: {
    login: login
  }
}; // 使用vuex时候通过Vuex.Store创建一个仓库，需要在vuex中新增store属性，这个属性的取值是一个类

var _default = new _Nuex["default"].Store({
  state: {
    name: '曹承湘',
    num: 6,
    age: 10,
    init: '刘'
  },
  getters: {
    myN: function myN(state) {
      return state.name + '1010';
    }
  },
  // 同步修改共享数据
  mutations: {
    addNum: function addNum(state, payload) {
      console.log('root' + state, payload);
      state.num += payload;
    },
    addAge: function addAge(state, payload) {
      console.log(state, payload);
      state.age += payload;
    }
  },
  // 异步修改共享数据
  actions: {
    asyncAddAge: function asyncAddAge(_ref5, payload) {
      var commit = _ref5.commit;
      console.log('root');
      setTimeout(function () {
        commit('addAge', payload);
      }, 1000);
    }
  },
  // 模块化共享数据  将所有模块都放到state中共享导致命名匮乏。将不同模块共享的数据放到不同的state中
  modules: {
    home: home,
    account: account
  }
}); // 每一个vue实例中都能通过this.$store拿到仓库，还需要给每个实例动态添加一个$store属性


exports["default"] = _default;