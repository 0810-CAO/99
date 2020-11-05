<template>
<div>
  <p>{{age}}</p>
  <p>{{state}}</p>
  <button @click="myFn">按钮</button>
</div>
</template>

<script>
import {
  ref,
  isRef,
  isReactive,
  reactive
} from 'vue'

export default {
  name: 'App',
  setup() {
    let age = ref(18)
    let state = reactive({
      age: 18
    })

    function myFn() {
      console.log(isRef(age))
      console.log(isRef(state))
      console.log(isReactive(age))
      console.log(isReactive(state))
    }

    return {
      age,
      state,
      myFn,
    }
  },
}
</script>
