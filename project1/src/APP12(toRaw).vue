<template>
<div>
  <p>{{ state.name }}</p>
  <button @click="myFn">按钮</button>
</div>
</template>

<script>
import {
  reactive,
  toRaw,
  ref
} from 'vue'
export default {
  name: 'App',
  setup() {
    let obj = {
      name: 'ccx',
      age: 21,
    }
    /*如果想通过toRaw拿到ref类型的原始数据（ 创建时传入的那个数据）， 
    那么就必须明确告诉toRaw方法， 要获取的是.value的值， 
    因为经过Vue处理之后.value中保存的才是当初创建时传入的那个原始数据*/
    // ref本质：reactive
    // ref(obj) -> reactive({value: obj})
    // let state = ref(obj)
    // let obj2 = toRaw(state.value)
    // console.log(obj === obj2)

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
      console.log(obj2)
    }
    return {
      state,
      myFn,
    }
  },
}
</script>
