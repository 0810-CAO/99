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
    // 用于创建一个只读的数据，并且是递归只读
    let state = readonly({
      name: 'ccx',
      attr: {
        age: 21,
        height: 1.78,
      },
    })

    function myFn() {
      state.name = '5260.site'
      state.attr.age = 22
      state.attr.height = 1.66
      console.log(state)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
