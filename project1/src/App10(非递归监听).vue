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
  shallowReactive
} from 'vue'
import {
  shallowRef
} from 'vue'
export default {
  name: 'App',
  setup() {
    let state = shallowReactive({
      // let state = shallowRef({
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
      state.a = '1' //不修改第一层后续ui数据不会修改
      state.gf.b = '2'
      state.gf.f.c = '3'
      state.gf.f.s.d = '4'
      // 如果是通过shallowRef创建数据，nameVue监听的是.value的变化，并不是第一层的变化
      // state.value.a = '1'
      // state.value.gf.b = '2'
      // state.value.gf.f.c = '3'
      // state.value.gf.f.s.d = '4'

      console.log(state)
      console.log(state.gf)
      console.log(state.gf.f)
      console.log(state.gf.f.s)
      // state.value = {
      //   a: '1',
      //   gf: {
      //     b: '2',
      //     f: {
      //       c: '3',
      //       s: {
      //         d: '4',
      //       },
      //     },
      //   },
      // }
      // console.log(state)
      // console.log(state.value)
      // console.log(state.value.gf)
      // console.log(state.value.gf.f)
      // console.log(state.value.gf.f.s)
    }

    return {
      state,
      myFn,
    }
  },
}
</script>
