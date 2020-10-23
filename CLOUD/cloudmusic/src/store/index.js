/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  // // 保存全局数据
  // state: {
  //   isFullScreen: false
  // },
  // // 修改全局数据方法
  // mutations: {
  //   changeFullScreen(state, flag) {
  //     state.isFullScreen = flag
  //   }
  // },
  // // 用于保存触发mutations中保存的方法
  // actions: {
  //   setFullScreen({
  //     commit
  //   }, flag) {
  //     commit('changeFullScreen', flag)
  //   }
  // },
  // getters: {
  //   // 将共享数据返回给外界
  //   isFullScreen(state) {
  //     return state.isFullScreen
  //   }
  // },
  // modules: {}
  // 抽离后的代码
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
})
