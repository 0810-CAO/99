<template>
<div>
  <!--composition api与option api混合使用-->
  <!--Composition API(组合/注入api)的本质就是在运行的时候将暴露出去的数据注入到option api中
  将数据注入到data中，将方法注入到methods中-->
  <p>{{ name }}</p>
  <button @click="myFn1">按钮</button>
  <p>{{ age }}</p>
  <button @click="myFn2">按钮</button>
</div>
</template>

<script>
import {
  ref
} from 'vue'
export default {
  name: 'App',
  data() {
    return {
      name: 'ccx',
    }
  },
  methods: {
    myFn1() {
      alert('www.5260.site')
    },
  },
  setup() {
    let age = ref(21)

    function myFn2() {
      alert('ll')
    }
    console.log(this) //undefined
    console.log(this.name)
    this.myFn1()
    return {
      age,
      myFn2,
    }
  },
}
</script>
