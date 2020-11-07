<template>
<div>
  <p>{{ age }}</p>
  <button @click="myFn">按钮</button>
</div>
</template>

<script>
import {
  customRef
} from 'vue'
// 自定义ref
function myRef(value) {
  return customRef((track, trigger) => {
    return {
      get() {
        track() // 告诉Vue这个数据需要追踪变化
        console.log('get', value)
        return value
      },
      set(newValue) {
        console.log('set', newValue)
        value = newValue
        trigger() // 告诉Vue触发界面更新
      },
    }
  })
}

export default {
  name: 'App',
  setup() {
    let age = myRef(18)

    function myFn() {
      age.value += 1
    }

    return {
      age,
      myFn,
    }
  },
}
</script>
