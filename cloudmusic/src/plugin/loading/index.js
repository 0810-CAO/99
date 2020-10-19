/*eslint-disable*/
/*封装组件为插件使用*/
import Vue from 'vue'
import Loading from './Loading'
export default {
    install: function() {
        Vue.component(Loading.name, Loading)
    }
}