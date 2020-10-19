/*eslint-disable*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import One from '../components/one'
import Two from '../components/two'
Vue.use(VueRouter)

const routes = [{
    path: '/one',
    component: One
}, {
    path: '/two',
    component: Two
}]

const router = new VueRouter({
    routes
})

export default router