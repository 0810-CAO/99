<template>
<div ref="box">
  我是div
</div>
</template>

<script>
import {
  ref,
  onMounted
} from 'vue'
export default {
  name: 'App',
  setup() {
    let box = ref(null) // reactive({value: null})

    onMounted(() => {
      console.log('onMounted', box.value)
    })

    return {
      box,
    }
  },
}
</script>
