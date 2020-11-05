<template>
<div>
  <!--将每个功能模块抽离出来封装后import引入即可-->
  <form>
    <input type="text" v-model="state2.stu.id" />
    <input type="text" v-model="state2.stu.name" />
    <input type="text" v-model="state2.stu.age" />
    <input type="submit" @click="addStu" />
  </form>
  <ul>
    <li v-for="(stu, index) in state.stus" :key="stu.id" @click="remStu(index)">
      {{ stu.name }} -- {{ stu.age }}
    </li>
  </ul>
</div>
</template>

<script>
import useAddStudent from './js/add'
import useRemoveStudent from './js/remove'
export default {
  name: 'App',
  setup() {
    let {
      state,
      remStu
    } = useRemoveStudent()
    let {
      state2,
      addStu
    } = useAddStudent(state)

    return {
      state,
      remStu,
      state2,
      addStu,
    }
  },
}
</script>
