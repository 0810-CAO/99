<template>
<div>
  <p>{{ state.a }}</p>
  <p>{{ state.gf.b }}</p>
  <p>{{ state.gf.f.c }}</p>
  <p>{{ state.gf.f.s.d }}</p>
  <button @click="myFn">按钮</button>
</div>
</template>

<script>
import {
  shallowRef,
  triggerRef
} from 'vue'
export default {
  name: 'App',
  setup() {
    let state = shallowRef({
      a: 'a',
      gf: {
        b: 'b',
        f: {
          c: 'c',
          s: {
            d: 'd',
          },
        },
      },
    })

    function myFn() {
      state.value.gf.f.s.d = '4'
      triggerRef(state)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
