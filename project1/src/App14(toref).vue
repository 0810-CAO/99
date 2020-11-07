<template>
<div>
  <p>{{name}}</p>
  <button @click="myFn">按钮</button>
</div>
</template>

<script>
import {
  toRef
} from 'vue'
export default {
  name: 'App',
  setup() {
    let obj = {
      name: 'ccx',
    }
    // 如果利用ref将某一个对象中的属性变成响应式的数据，
    // 我们修改响应式数据是不会影响到原始数据的。
    // let state = ref(obj.name)
    let name = toRef(obj, 'name')
    console.log(name)

    function myFn() {
      // name.value = 'zs'
      name.value = 'zs'

      console.log(name)
      console.log(obj)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
