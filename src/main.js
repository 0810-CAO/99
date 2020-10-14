// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'
import './assets/font/iconfont.css'
import axios from 'axios'
// 富文本编辑器及样式
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
    //通过接口获取菜单数据，请求拦截器添加token，保证拥有获取数据的权限
    //request拦截器中展示进度条start response中隐藏进度条
axios.interceptors.request.use(config => {
    NProgress.start()
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
axios.interceptors.response.use(config => {
        NProgress.done()
        return config
    })
    /* eslint-disable no-new */
    // 注册为全局可用组件
Vue.component('tree-table', TreeTable)
    // 全局定义格式化时间日期函数
Vue.filter('dateFormate', function(origin) {
        const dt = new Date(origin)
        const y = dt.getFullYear()
        const m = (dt.getMonth() + 1 + '').padStart(2, '0')
        const d = (dt.getDate() + '').padStart(2, '0')
        const hh = (dt.getHours() + '').padStart(2, '0')
        const mm = (dt.getMinutes() + '').padStart(2, '0')
        const ss = (dt.getSeconds() + '').padStart(2, '0')
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    })
    // 注册为全局可用组件
Vue.use(VueQuillEditor)
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})