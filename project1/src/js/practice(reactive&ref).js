function reactive (obj) {
  if (typeof obj === 'object') {
    if (obj instanceof Array) {
      // 如果是一个数组，那么取出数组中的某一个元素
      // 判断每一个元素是否又是一个对象，如果又是一个对象，如果又是一个对象，那么也需要包装成一个Proxy
      obj.forEach((item, index) => {
        if (typeof item === 'object') {
          obj[index] = reactive(item)
        }
      })
    } else {
      // 如果是一个对象，那么取出对象属性的取值
      // 判断每一个元素是否又是一个对象，如果又是一个对象，如果又是一个对象，那么也需要包装成一个Proxy
      for (let key in obj) {
        let item = obj[key]
        if (typeof item === 'object') {
          obj[key] = reactive(item)
        }
      }
    }
    return new Proxy(obj, {
      get (obj, key) {
        return obj[key]
      },
      set (obj, key, value) {
        obj[key] = value
        console.log('更新界面', JSON.stringify(obj), key, value)
        return true
      }
    })
  } else {
    console.warn('不是一个对象')
  }
}

function ref (val) {
  return reactive({
    value: val
  })
}