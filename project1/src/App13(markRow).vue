<template>
<div>
  <p>{{state}}</p>
  <button @click="myFn">按钮</button>
</div>
</template>

<script>
import {
  markRaw,
  reactive
} from 'vue'
export default {
  name: 'App',
  setup() {
    let obj = {
      name: 'ccx',
      age: 21,
    }
    obj = markRaw(obj)
    let state = reactive(obj)

    function myFn() {
      state.name = 'liu'
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
