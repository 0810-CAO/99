let arr = [1, 3, 5]
// set方法必须通过返回值告诉Proxy此次操作是否成功
let state = new Proxy(arr, {
  get (obj, key) {
    console.log(obj, key)
    return obj[key]
  },
  set (obj, key, value) {
    // 更新界面 [ 1, 3, 5, 7 ] 3 7
    // 更新界面 [ 1, 3, 5, 7 ] length 4
    obj[key] = value
    console.log('更新界面', obj, key, value)
    // 没有会报错
    return true
  }
})

console.log(state[1])
state.push(7)