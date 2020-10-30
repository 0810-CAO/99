import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './Nuex'
// vuex的本质就是一个插件，所以实现vuex就是在实现一个全局共享数据的插件
Vue.use(Vuex)
let home = {
  state: {
    name: 'name1',
  },
  getters: {
    getHomeName(state) {
      return state.name + '2020'
    },
  },
  mutations: {
    addHomeName(state, payload) {
      state.name += payload
    },
    // 多个模块中mutations可以出现同名方法（只有state不能同名），并且不会覆盖，放在数组中依次执行
    addNum(state, payload) {
      console.log('home' + state, payload)
      state.num += payload
    },
  },
  actions: {
    asyncAddName({ commit }, payload) {
      setTimeout(() => {
        commit('addHomeName', payload)
      }, 1000)
    },
    asyncAddAge({ commit }, payload) {
      console.log('home')
      setTimeout(() => {
        commit('addAge', payload)
      }, 1000)
    },
  },
}
let login = {
  state: {
    name: 'name3',
  },
  getters: {
    getLoginName(state) {
      return state.name + '4040'
    },
  },
  mutations: {
    addLoginName(state, payload) {
      state.name += payload
    },
  },
  actions: {
    asyncAddName3({ commit }, payload) {
      setTimeout(() => {
        commit('addLoginName', payload)
      }, 1000)
    },
  },
}
let account = {
  state: {
    name: 'name2',
  },
  getters: {
    getAccountName(state) {
      return state.name + '3030'
    },
  },
  mutations: {
    addAccountName(state, payload) {
      state.name += payload
    },
  },
  actions: {
    asyncAddName2({ commit }, payload) {
      setTimeout(() => {
        commit('addAccountName', payload)
      }, 1000)
    },
  },
  modules: {
    login: login,
  },
}
// 使用vuex时候通过Vuex.Store创建一个仓库，需要在vuex中新增store属性，这个属性的取值是一个类
export default new Vuex.Store({
  state: {
    name: '曹承湘',
    num: 6,
    age: 10,
    init: '刘',
  },
  getters: {
    myN(state) {
      return state.name + '1010'
    },
  },
  // 同步修改共享数据
  mutations: {
    addNum(state, payload) {
      console.log('root' + state, payload)
      state.num += payload
    },
    addAge(state, payload) {
      console.log(state, payload)
      state.age += payload
    },
  },
  // 异步修改共享数据
  actions: {
    asyncAddAge({ commit }, payload) {
      console.log('root')
      setTimeout(() => {
        commit('addAge', payload)
      }, 1000)
    },
  },
  // 模块化共享数据  将所有模块都放到state中共享导致命名匮乏。将不同模块共享的数据放到不同的state中
  modules: {
    home: home,
    account: account,
  },
})
// 每一个vue实例中都能通过this.$store拿到仓库，还需要给每个实例动态添加一个$store属性
