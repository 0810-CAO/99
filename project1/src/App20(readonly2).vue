<template>
<div>
  <p>{{state.name}}</p>
  <p>{{state.attr.age}}</p>
  <p>{{state.attr.height}}</p>
  <button @click="myFn">按钮</button>
</div>
</template>

<script>
import {
  readonly,
  isReadonly,
  shallowReadonly
} from 'vue'
export default {
  name: 'App',
  setup() {
    // 用于创建一个只读的数据，但不是递归只读的
    let state = shallowReadonly({
      name: 'ccx',
      attr: {
        age: 21,
        height: 1.78,
      },
    })
    const value = {
      name: 'zs',
      age: 21
    }
    // const：赋值保护，不能给变量重新赋值
    // readonly：属性保护，不能给属性重新赋值
    function myFn() { //ui界面不变
      state.name = '5260.site' //不变
      state.attr.age = 22 //修改
      state.attr.height = 1.66 //修改
      console.log(state)
      //判断一个数据是否是只读的
      console.log(isReadonly(state)) //true
      value.name = 'ls'
      value.age = 23
      console.log(value)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
