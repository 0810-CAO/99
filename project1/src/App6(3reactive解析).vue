<template>
<div>
  <p>{{ state.time }}</p>
  <!--<p>{{state}}</p>
  <p>{{state.number}}</p>
  <p>{{state}}</p>
  <p>{{state.time}}</p>-->
  <button @click="myFn">按钮</button>
</div>
</template>

<script>
import {
  reactive
} from 'vue'
export default {
  name: 'App',
  setup() {
    // 创建一个响应式数据
    // 本质：就是将传入的数据包装成一个Proxy(Proxy用于修改某些操作的默认行为)对象
    // 1、let state = reactive(123)
    // 2、let state = reactive({number:123})
    // 3、let state = reactive([1, 3, 5])
    let state = reactive({
      time: new Date(),
    })

    function myFn() {
      // 1、state = 1111 // 由于在创建响应式数据的时候传递的不是一个对象，所以无法实现响应式
      // 2、state.age = 666
      // 3、state[0] = 666
      const newTime = new Date(state.time.getTime())
      newTime.setDate(newTime.getDate() + 1)
      state.time = newTime
      // 直接修改以前的页面不会同步
      // state.time.setDate(state.time.getDate() + 1)
      // console.log(state.time)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
