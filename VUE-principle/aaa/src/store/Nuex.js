import Vue from 'vue'
// install方法会在外界调用vue.use的时候执行，并将vue实例和一些额外参数传递过来
const install = (Vue, options) => {
  // 给每个实例动态添加一个$store属性
  // mixin方法在创建每一个vue实例时执行
  Vue.mixin({
    beforeCreate() {
      // vue在创建会先创建父组件后创建子组件root App  HelloWorld
      console.log(this.$options.name)
      // root->App->HelloWorld
      // 如果是根组件，默认就有store。
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store
      } else {
        // 不是根组件，需要将store变成$store即可(将父组件的$store赋值给它即可)
        this.$store = this.$parent.$store
      }
    },
  })
}
class ModuleCollection {
  constructor(rootModule) {
    this.register([], rootModule)
  }
  register(arr, rootModule) {
    // console.log(arr) //[] ["home"] ["account"] ["account", "login"]
    // 按照需要的格式创建模块
    let module = {
      _raw: rootModule,
      _state: rootModule.state,
      _children: {},
    }
    if (arr.length === 0) {
      // 保存根模块
      this.root = module
    } else {
      // 保存子模块
      // this.root._children[arr[arr.length - 1]] = module
      // let testArr = ['account', 'login']
      // let res = testArr.splice(0, testArr.length - 1)
      // console.log(res)["account"]
      let parent = arr.splice(0, arr.length - 1).reduce((root, currentKey) => {
        return root._children[currentKey]
      }, this.root)
      parent._children[arr[arr.length - 1]] = module
    }
    for (let childrenModuleName in rootModule.modules) {
      let childrenModule = rootModule.modules[childrenModuleName]
      this.register(arr.concat(childrenModuleName), childrenModule)
    }
  }
}
class Store {
  constructor(options) {
    // this.options = options
    // 将传递进来的state放到store上
    // 将创建时需要共享的数据添加到store上面，这样就可以通过this.$store拿到这个store，也就可以通过.state拿到需要共享的属性
    // this.state = options.state
    // 在vue中存在一个util工具类，使用defineReactive方法将数据变成双向绑定的数据（给那个对象添加属性、添加什么属性、属性的值）
    Vue.util.defineReactive(this, 'state', options.state)
    // 提取模块信息
    this.modules = new ModuleCollection(options)
    console.log(this.modules)
    // let root = {
    //   _raw: rootModule,
    //   _state: rootModule.state,
    //   _children: {
    //     home: {
    //       _raw: homeModule,
    //       _state: homeModule.state,
    //       _children: {},
    //       account: {
    //         _raw: accountModule,
    //         _state: accountModule.state,
    //         _children: {
    //           login: {
    //             _raw: loginModule,
    //             _state: loginModule.state,
    //             _children: {},
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    this.initModules([], this.modules.root)
  }
  initModules(arr, rootModule) {
    // console.log(arr)//[]  [home] [account] [home,login]
    if (arr.length > 0) {
      // 当前为子模块，需要将数据安装到this.state上
      let parent = arr.splice(0, arr.length - 1).reduce((state, currentKey) => {
        return state[currentKey]
      }, this.state)
      Vue.set(parent, arr[arr.length - 1], rootModule._state)
    }
    // 将传递进来的getters放到store上
    this.initGetters(rootModule._raw)
    // 将传递进来的mutations放到store上
    this.initMutations(rootModule._raw)
    // 将传递进来的actions放到store上
    this.initActions(rootModule._raw)
    // 否则需要从跟模块中取出字模块安装
    for (let childrenModuleName in rootModule._children) {
      let childrenModule = rootModule._children[childrenModuleName]
      this.initModules(arr.concat(childrenModuleName), childrenModule)
    }
  }
  initGetters(options) {
    // this.getters = options.getters
    // 1、拿到传递进来的getters
    let getters = options.getters || {}
    // 2、在store上新增一个getters属性
    this.getters = this.getters || {}
    // 3、将传递进来的getters中的方法添加到当前store的getters上
    for (let key in getters) {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](options.state) //绑定并执行传参
        },
      })
    }
  }
  commit = (type, payload) => {
    // console.log(this)
    this.mutations[type].forEach((fn) => fn(payload))
  }
  initMutations(options) {
    // 1、拿到传递进来的mutations
    let mutations = options.mutations || {}
    // 2、在store上新增一个mutations属性
    this.mutations = this.mutations || {}
    // 3、将传递进来的mutations中的方法添加到当前store的mutations上
    for (let key in mutations) {
      this.mutations[key] = this.mutations[key] || []
      this.mutations[key].push((payload) => {
        mutations[key](options.state, payload)
      })
    }
  }
  dispatch = (type, payload) => {
    this.actions[type].forEach((fn) => fn(payload))
  }
  initActions(options) {
    // 1、拿到传递进来的actions
    let actions = options.actions || {}
    // 2、在store上新增一个actions属性
    this.actions = this.actions || {}
    // 3、将传递进来的actions中的方法添加到当前store的actions上
    for (let key in actions) {
      this.actions[key] = this.actions[key] || []
      this.actions[key].push((payload) => {
        actions[key](this, payload)
      })
    }
  }
}
export default {
  install,
  Store,
}
