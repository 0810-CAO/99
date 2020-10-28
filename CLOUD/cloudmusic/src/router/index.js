/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
// 注意，通过import引入的组件不会按需加载
// import Recommend from '../views/Recommend'
// import Singer from '../views/Singer'
// import Rank from '../views/Rank'
// import Search from '../views/Search'
const Recommend = resolve => {
  import('../views/Recommend').then(module => {
    resolve(module)
  })
}
const Detail = resolve => {
  import('../views/Detail').then(module => {
    resolve(module)
  })
}
const Singer = resolve => {
  import('../views/Singer').then(module => {
    resolve(module)
  })
}
const Rank = resolve => {
  import('../views/Rank').then(module => {
    resolve(module)
  })
}
const Search = resolve => {
  import('../views/Search').then(module => {
    resolve(module)
  })
}
const Account = resolve => {
  import('../views/Account').then(module => {
    resolve(module)
  })
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  {
    path: '/rank',
    component: Rank,
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/account',
    component: Account
  }
]

const router = new VueRouter({
  // 注意点: 如果Router中使用的是history模式, 那么打包之后的项目不能刷新, 刷新就会出现404
  // 解决方案: 1.Router这两个不要使用history模式, 使用hash模式
  //           2.在服务端上面进行一些额外的配置
  // 注意点: 如果需要使用预渲染的插件, 那么Router的模式必须是history模式
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
