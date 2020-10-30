<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <!--state-->
    <p>{{ this.$store.state.name }}</p>
    <p>{{ this.$store.getters.myN }}</p>
    <hr />
    <!--mutations-->
    <p>{{ this.$store.state.num }}</p>
    <button @click="myFn">addmyFn</button>
    <hr />
    <!--actions-->
    <p>{{ this.$store.state.age }}</p>
    <button @click="myFn2">addmyFn2</button>
    <hr />
    <!--modules-->
    <!--获取模块中state中共享数据需要加模块名称，getters中数据不需要加-->
    <p>{{ this.$store.state.name }}</p>
    <p>{{ this.$store.state.home.name }}</p>
    <p>{{ this.$store.getters.getHomeName }}</p>
    <button @click="homeFn">homeFn</button>
    <button @click="homeFn2">homeFn2</button>
    <p>{{ this.$store.state.account.name }}</p>
    <p>{{ this.$store.getters.getAccountName }}</p>
    <button @click="accountFn">accountFn</button>
    <button @click="accountFn2">accountFn2</button>
    <hr />
    <p>{{ this.$store.state.account.login.name }}</p>
    <p>{{ this.$store.getters.getLoginName }}</p>
    <button @click="loginFn">loginFn</button>
    <button @click="loginFn2">loginFn2</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  mounted() {
    console.log(this.$store)
  },
  methods: {
    myFn() {
      this.$store.commit('addNum', 10)
    },
    myFn2() {
      this.$store.dispatch('asyncAddAge', 5)
    },
    homeFn() {
      this.$store.commit('addHomeName', 6)
    },
    homeFn2() {
      this.$store.dispatch('asyncAddName', 3)
    },
    accountFn() {
      this.$store.commit('addAccountName', 6)
    },
    accountFn2() {
      this.$store.dispatch('asyncAddName2', 3)
    },
    loginFn() {
      this.$store.commit('addLoginName', 8)
    },
    loginFn2() {
      this.$store.dispatch('asyncAddName3', 4)
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
