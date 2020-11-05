<template>
<div>
  <ul>
    <li v-for="(stu, index) in state.stus" :key="stu.id" @click="remStu(index)">
      {{ stu.name }} -- {{ stu.age }}
    </li>
  </ul>
</div>
</template>

<script>
import {
  reactive
} from 'vue'
// reactive监听复杂类型的变化
// 解决数据和业务逻辑分散的问题
function useRemoveStudent() {
  let state = reactive({
    stus: [{
        id: 1,
        name: 'zs',
        age: 10,
      },
      {
        id: 2,
        name: 'ls',
        age: 20,
      },
      {
        id: 3,
        name: 'ww',
        age: 30,
      },
    ],
  })

  function remStu(index) {
    state.stus = state.stus.filter((stu, idx) => idx != index)
  }
  return {
    state,
    remStu,
  }
}
export default {
  name: 'App',
  setup() {
    let {
      state,
      remStu
    } = useRemoveStudent()
    return {
      state,
      remStu,
    }
  },
}
</script>
