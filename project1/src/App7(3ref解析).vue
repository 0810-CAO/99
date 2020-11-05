<template>
<div>
  <p>{{ age }}</p>
  <button @click="myFn">按钮</button>
</div>
</template>

<script>
import {
  ref
} from 'vue'
export default {
  name: 'App',
  setup() {
    let age = ref(18)

    function myFn() {
      age.value = 21
    }

    return {
      age,
      myFn,
    }
  },
}
</script>
