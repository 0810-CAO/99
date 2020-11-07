<template>
<ul>
  <li v-for="item in state" :key="item.id">
    {{item.name}}
  </li>
</ul>
</template>

<script>
import {
  ref,
  customRef
} from 'vue'

function myRef(path, initValue) {
  let value = initValue
  return customRef((track, trigger) => {
    fetch(path)
      .then((res) => res.json())
      .then((data) => {
        value = data
        trigger()
      })
      .catch((err) => {
        console.log(err)
      })
    return {
      get() {
        // 这个数据是需要追踪变化的
        track()
        console.log('get', value)
        // 不能在get方法中发送网络请求。渲染界面->调用get->发送网络请求->保存数据->更新界面->调用get
        return value
      },
      set(newValue) {
        console.log('set', newValue)
        value = newValue
        // 告诉Vue触发界面更新
        trigger()
      },
    }
  })
}
export default {
  name: 'App',
  setup() {
    // let state = ref([])
    // fetch('../public/data.json')
    //   .then((res) => {
    //     return res.json()
    //   })
    //   .then((data) => {
    //     console.log(data)
    //     state.value = data
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    let state = myRef('../public/data.json', [])
    return {
      state
    }
  }
}
</script>

<style>

</style>
