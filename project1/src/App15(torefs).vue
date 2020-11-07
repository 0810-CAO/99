<template>
<div>
  <p>{{state}}</p>
  <button @click="myFn">按钮</button>
</div>
</template>

<script>
import {
  toRefs
} from 'vue'
export default {
  name: 'App',
  setup() {
    let obj = {
      name: 'ccx',
      age: 21
    }
    let state = toRefs(obj)

    function myFn() {
      state.name.value = 'zs'
      state.age.value = 111
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
