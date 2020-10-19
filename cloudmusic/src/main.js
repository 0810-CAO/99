/*eslint-disable*/
import Vue from 'vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import Loading from './plugin/loading/index.js'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
Vue.use(Loading)
import { NavBar, Card, SubmitBar } from 'vant'
Vue.use(NavBar)
Vue.use(Card)
Vue.use(SubmitBar)
    // import { Row, Button } from 'element-ui'
    // Vue.use(ElementUI)
    // Vue.use(Row)
    // Vue.use(Button)
Vue.config.productionTip = false
    // nodemodules 依赖和包
    // public 静态资源（会简单复制）永远不会改变的静态资源或者webpack不支持的第三方库
    // src assets（图片、文字静态资源）components文件夹（自定义组件，小组件、公共组件）
    // views (大组件) router（存储vuerouter相关文件）store（vuex相关文件）
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')