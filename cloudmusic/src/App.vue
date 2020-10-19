<template>
  <div id="app">
    <!--<p>{{msg}}</p>
    <button @click='say'>say</button>
    <One></One>
    <Two></Two>
    <button @click='getName'>getname</button>
    <router-link to="/one">one</router-link>
    <router-link to="/two">two</router-link>
    <router-view></router-view>-->
    <van-nav-bar
      title='购物车'
      left-text='返回'
      right-text='按钮'
      left-arrow
      @click-left='onClickLeft'
      @click-right='onClickRight'
    />
    <van-card
  num='2'
  price='2.00'
  desc='描述信息'
  title='商品标题'
  thumb='https://img.yzcdn.cn/vant/ipad.jpeg'
/>
<Loading></Loading>
<van-submit-bar :price='3050' button-text='提交订单'/>
  </div>
</template>

<script>
// import One from './components/one'
// import Two from './components/two'
export default {
  name: 'App',
  data() {
    return {
      msg: '河南和才能见'
    };
  },
  methods: {
    say() {
      console.log('hello');
    },
    getName() {
      console.log(this.$store.state.name);
    },
    onClickLeft() {
      alert('返回');
    },
    onClickRight() {
      alert('按钮');
    }
  },
  components: {
    // One: One,
    // Two: Two
  }
};
</script>

<style scoped>
p {
  background: red;
}
</style>
