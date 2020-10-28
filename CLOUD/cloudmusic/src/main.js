/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import fastclick from "fastclick";
import "./assets/css/base.scss";
import VueLazyload from "vue-lazyload";
import Loading from "./plugin/loading/index";
// import MetaInfo from 'vue-meta-info'
// Vue.use(MetaInfo)
// 网络请求等待提示
Vue.use(Loading, {
  title: "客官请稍等"
});
Vue.use(VueLazyload, {
  // 可以通过配置loading配置图片还未加载好之前的占位图片  v-lazy
  loading: "./assets/images/loading.png"
});
fastclick.attach(document.body);
Vue.config.productionTip = false;
// const vconsole = new VConsole();
// Vue.use(vconsole);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
