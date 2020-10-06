// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/font/iconfont.css'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1/"
    //通过接口获取菜单数据，请求拦截器添加token，保证拥有获取数据的权限
axios.interceptors.request.use(config => {
        console.log(config)
        config.headers.Authorization = window.sessionStorage.getItem('token')
        return config
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})