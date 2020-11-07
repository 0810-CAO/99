function shallowReadonly (obj) {
  return new Proxy(obj, {
    get (obj, key) {
      return obj[key]
    },
    set (obj, key, value) {
      console.warn(`${key} 只读`)
    }
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
let state=shallowReadonly(obj)
state.a = '1' //更新第一层
state.gf.b = '2'
state.gf.f.c = '3'
state.gf.f.s.d = '4'

// readonly只需要使用reactive并将其中的set方法变为一个console.warn即可