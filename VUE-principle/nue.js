let CompilerUtil = {
  getValue(vm, value) {
    // time.h--[time,h]
    return value.split('.').reduce((data, currentKey) => {
      // 1、data-$data currentKey-time
      // 2、data-time currentKey-h
      return data[currentKey.trim()]
    }, vm.$data)
  },
  getContent(vm, value) {
    let reg = /\{\{(.+?)\}\}/gi
    let val = value.replace(reg, (...args) => {
      // console.log(args)[{{name}},name,0,{{name}}]
      return this.getValue(vm, args[1]) //此处是一个循环{{name}}-{{age}}逐个匹配替换
    })
    // console.log(val)李华
    return val
  },
  setValue(vm, attr, newValue) {
    attr.split('.').reduce((data, currentAttr, index, arr) => {
      if (index === arr.length - 1) {
        //最后一层eg:time.h.s
        data[currentAttr] = newValue
      }
      return data[currentAttr]
    }, vm.$data)
  },
  model: function (node, value, vm) {
    // node.value = vm.$data[value] time.h无法解决
    //node-<input type="text" v-model="name" />   value-name
    // 步骤一   在第一次渲染，给所有属性添加观察者
    new Wather(vm, value, (newValue, oldValue) => {
      node.value = newValue
    })
    let val = this.getValue(vm, value)
    node.value = val
    // 界面驱动数据更新
    node.addEventListener('input', (e) => {
      let newValue = e.target.value
      this.setValue(vm, value, newValue)
    })
  },
  html: function (node, value, vm) {
    new Wather(vm, value, (newValue, oldValue) => {
      node.innerHTML = newValue
    })
    let val = this.getValue(vm, value)
    node.innerHTML = val
  },
  text: function (node, value, vm) {
    new Wather(vm, value, (newValue, oldValue) => {
      node.innerText = newValue
    })
    let val = this.getValue(vm, value)
    node.innerText = val
  },
  content: function (node, value, vm) {
    // console.log(value) {{name}}->name->$data[name]
    // let val = this.getContent(vm, value)
    let reg = /\{\{(.+?)\}\}/gi
    let val = value.replace(reg, (...args) => {
      new Wather(vm, args[1], (newValue, oldValue) => {
        node.textContent = this.getContent(vm, value) //{{name}}-{{age}}
      })
      return this.getValue(vm, args[1])
    })
    node.textContent = val
  },
  // 事件
  on: function (node, value, vm, type) {
    node.addEventListener(type, (e) => {
      vm.$methods[value].call(vm, e) //value-Fn  修改this为vm(vue实例)
    })
  },
}
class Nue {
  constructor(options) {
    // 保存创建时传递来的类
    if (this.isElement(options.el)) {
      this.$el = options.el
    } else {
      this.$el = document.querySelector(options.el)
    }
    this.$data = options.data
    // 将数据保存到vue实例上以便可以使用this.name使用
    this.proxyData(this.$data)
    this.$methods = options.methods
    // 实现computed
    this.$computed = options.computed
    // 将computed中方法添加到$data中，在渲染是可以从$data获取
    this.computed2data()
    // 根据指定区域和数据去编译渲染页面
    if (this.$el) {
      // 1、给外界传入的所有数据添加get、set方法 可以监听数据变化
      new Oberver(this.$data)
      new Compier(this)
    }
  }
  computed2data() {
    for (let key in this.$computed) {
      Object.defineProperty(this.$data, key, {
        get: () => {
          return this.$computed[key].call(this)
        },
      })
    }
  }
  proxyData() {
    for (let key in this.$data) {
      Object.defineProperty(this, key, {
        get: () => {
          return this.$data[key]
        },
      })
    }
  }
  // 判断是否是一个元素
  isElement(node) {
    return node.nodeType === 1
  }
}
class Compier {
  constructor(vm) {
    this.vm = vm
    // 1、将网页上元素放到内存中
    let fragment = this.node2fragment(this.vm.$el)
    // console.log(fragment)
    // 2、利用指定的数据编译内存中元素
    this.buildTemplate(fragment)
    // 3、将编译好的内容重新渲染到网页上
    this.vm.$el.appendChild(fragment)
  }
  node2fragment(app) {
    // 1、创建一个空的文档碎片对象
    let fragment = document.createDocumentFragment()
    // 2、编译循环取到每一个元素
    let node = app.firstChild
    while (node) {
      // 只要将元素添加到文档碎片对象中，自动从网页消失
      fragment.appendChild(node)
      node = app.firstChild
    }
    // 返回存储了所有元素的文档碎片对象
    return fragment
  }
  buildTemplate(fragment) {
    let nodelist = [...fragment.childNodes]
    // console.log(nodelist)
    nodelist.forEach((node) => {
      // 判断当前遍历节点是元素（有无v-model）还是文本（有无{{}}）
      if (this.vm.isElement(node)) {
        // console.log('元素', node)
        this.buildElement(node)
        // 处理子元素
        this.buildTemplate(node)
      } else {
        // console.log('非元素', node)
        this.buildText(node)
      }
    })
  }
  buildElement(node) {
    // console.log(node)
    // 返回指定节点的属性集合(type,v-model等)
    let attrs = [...node.attributes]
    attrs.forEach((attr) => {
      //v-model="name"  name=v-model/value=name
      //v-on:click="Fn"  name=v-on:click/value=Fn
      let { name, value } = attr
      //  console.log('vue指令', name, value)
      if (name.startsWith('v-')) {
        let [directiveName, directiveType] = name.split(':') //v-on:click
        let [, directive] = directiveName.split('-')
        // console.log(directive)
        CompilerUtil[directive](node, value, this.vm, directiveType) //value-time.h
      }
    })
  }
  buildText(node) {
    let content = node.textContent
    let reg = /\{\{.+?\}\}/gi
    if (reg.test(content)) {
      // console.log('是{{}}文本', content)
      CompilerUtil['content'](node, content, this.vm)
    }
  }
}
class Oberver {
  // 只要监听类对象传递到此处，可以快速给那个类添加get、set方法
  constructor(data) {
    this.observer(data)
  }
  observer(obj) {
    if (obj && typeof obj === 'object') {
      // 遍历传入对象所有属性并添加方法
      for (let key in obj) {
        this.defineRecative(obj, key, obj[key])
      }
    }
  }
  // obj:需要操作对象 attr：需要新增的get、set方法的属性 value：新增方法属性取值
  defineRecative(obj, attr, value) {
    // 如果属性的取值又是一个对象则需要给该对象所有属性添加get、set方法
    this.observer(value)
    let dep = new Dep() //创建属于当前属性的发布订阅对象（功能）
    Object.defineProperty(obj, attr, {
      get() {
        // 步骤二 将当前属性的所有观察者对象都放到当前属性的发布订阅对象中管理
        Dep.target && dep.addSub(Dep.target)
        // debugger
        return value
      },
      set: (newvalue) => {
        if (value !== newvalue) {
          // 如果添加属性是一个对象，需要给属性对象的属性添加
          this.observer(newvalue)
          value = newvalue
          // console.log('修改数据')
          // 步骤三 当前属性发生变化就让发布订阅对象发出通知
          dep.notify()
        }
      },
    })
  }
}
// 通过定义发布订阅模式来实现数据更新后界面更新。通过定义一个观察者类，在定义一个发布订阅类，通过发布订阅类管理观察者类
class Dep {
  constructor() {
    // 管理一个属性所有的观察者对象
    this.subs = []
  }
  // 订阅观察方法
  addSub(watcher) {
    this.subs.push(watcher)
  }
  // 发布订阅方法
  notify() {
    this.subs.forEach((watcher) => watcher.update())
  }
}
class Wather {
  constructor(vm, attr, cb) {
    this.vm = vm //vue实例
    this.attr = attr //观察的属性
    this.cb = cb //回调函数
    // 创建观察者对象时就去获取当前的旧值
    this.oldValue = this.getOldValue()
  }
  getOldValue() {
    Dep.target = this
    let oldValue = CompilerUtil.getValue(this.vm, this.attr)
    Dep.target = null
    return oldValue
  }
  // 判断新值与旧值是否相等
  update() {
    let newValue = CompilerUtil.getValue(this.vm, this.attr)
    if (this.oldValue !== newValue) {
      this.cb(newValue, this.oldValue)
    }
  }
}
