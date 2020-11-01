class NueRouterInfo {
  constructor() {
    this.currentPath = null
  }
}
class NueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash'
    this.router = options.routes || []
    // 提取路由信息
    // {
    //   '/home':Home,
    //   '/about':About
    // }
    this.routesMap = this.createRoutesMap()
    console.log(this.routesMap)
    this.routeInfo = new NueRouterInfo()
    // 初始化默认路由信息
    this.initDefault()
  }
  initDefault() {
    if (this.mode === 'hash') {
      console.log(location.hash)
      if (!location.hash) {
        location.hash = '/'
      }
      window.addEventListener('load', () => {
        this.routeInfo.currentPath = location.hash.slice(1)
      })
      window.addEventListener('hashchange', () => {
        this.routeInfo.currentPath = location.hash.slice(1)
        console.log(this.routeInfo)
      })
    } else {
      console.log(location.pathname)
      if (!location.pathname) {
        location.pathname = '/'
      }
      window.addEventListener('load', () => {
        this.routeInfo.currentPath = location.hash.slice(1)
      })
      window.addEventListener('popstate', () => {
        this.routeInfo.currentPath = location.hash.slice(1)
        console.log(this.routeInfo)
      })
    }
  }
  createRoutesMap() {
    return this.routes.reduce((map, route) => {
      map[route.path] = route.component
      return map
    }, {})
  }
}
NueRouter.install = (Vue, options) => {
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.router) {
        this.$router = this.$options.router
        this.$route = this.$router.routeInfo
        Vue.util.defineReactive(this, 'xxx', this.$router)
      } else {
        this.$router = this.$parent.$router
        this.$route = this.$router.routeInfo
      }
    },
  })
  Vue.component('router-link', {
    props: {
      to: String,
    },
    render() {
      // this._self.$router.mode
      let path = this.to
      if (this._self.$router.mode === 'hash') {
        path = '#' + path
      }
      return <a href={path}>{this.$slots.default}</a>
    },
  })
  Vue.component('router-view', {
    render(h) {
      let routesMap = this._self.$router.routesMap
      let currentPath = this._self.$router.currentPath
      let currentComponent = routesMap[currentPath]
      return h(currentComponent)
    },
  })
}
export default NueRouter
