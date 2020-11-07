function shallowReactive(obj) {
  return new Proxy(obj, {
    get(obj, key) {
      return obj[key]
    },
    set(obj, key, value) {
      obj[key] = value
      console.log('更新界面', obj, key, value)
      return true
    },
  })
}
let obj = {
  a: 'a',
  gf: {
    b: 'b',
    f: {
      c: 'c',
      s: {
        d: 'd',
      },
    },
  },
}
// let state = shallowReactive(obj)
// state.a = '1' //更新第一层
// state.gf.b = '2'
// state.gf.f.c = '3'
// state.gf.f.s.d = '4'
function shallowRef (val) {
  return shallowReactive({
    value: val
  })
}
let state = shallowRef(obj)
// state.value.a = '1' //更新第一层
// state.value.gf.b = '2'
// state.value.gf.f.c = '3'
// state.value.gf.f.s.d = '4'
state.value= {//只能更新一层，但是第一层就是value
  a: 11,
  gf: {
    b: 111,
    f: {
      c: 111,
      s: {
        d: 1111,
      },
    },
  },
}