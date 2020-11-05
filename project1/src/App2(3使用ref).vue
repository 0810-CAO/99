<template>
<div>{{count}}</div>
<button @click="myFn">按钮</button>
</template>

<script>
import {
  ref
} from 'vue'
// ref函数只能监听简单类型的变化，不能监听复杂类型的变化（对象/数组）
export default {
  name: 'App',
  // 组合api入口函数
  setup() {
    // 定义了一个名称为count的变量，这个变量的初始值是0
    // 这个变量发生改变之后，Vue会自动更新UI
    let count = ref(0)
    // 在组合API中，如果想定义方法，不用定义到methods中，直接定义即可
    function myFn() {
      count.value += 1
    }
    // 在组合API中定义的变量/方法，要想在外界使用，必须通过return {xxx, xxx}暴露出去
    return {
      count,
      myFn,
    }
  }
}
</script>

<style>

</style>
