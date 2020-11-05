<template>
<div>
  <p>{{ state }}</p>
  <button @click="myFn">按钮</button>
</div>
</template>

<script>
import {
  reactive,
  toRaw
} from 'vue'
export default {
  name: 'App',
  setup() {
    let obj = {
      name: 'ccx',
      age: 21,
    }
    let state = reactive(obj)
    let obj2 = toRaw(state)
    console.log(obj === state) // false
    console.log(obj === obj2) //true
    // state和obj的关系
    // 引用关系，state的本质是一个Proxy对象，在这个Proxy对象引用了obj
    function myFn() {
      // state.name = 'll'
      // console.log(state)
      // 如果直接修改obj，那么是无法触发界面更新的，只有通过包装之后的对象来修改，才会触发界面的更新
      obj2.name = 'zs'
      console.log(state)
      console.log(obj)
    }
    return {
      state,
      myFn,
    }
  },
}
</script>
