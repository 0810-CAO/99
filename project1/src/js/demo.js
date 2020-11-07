// 在Vue3.x中是通过Proxy来实现响应式数据的
let obj = { name: 'ccx', age: 21 }

let state = new Proxy(obj, {
  get (obj, key) {
    console.log(obj, key)
    return obj[key]
  },
  set (obj, key, value) {
    obj[key] = value
    console.log('更新界面', obj, key, value)
  }
})

console.log(state.name) // ccx
state.name = '喝了咯'
console.log(state.name)