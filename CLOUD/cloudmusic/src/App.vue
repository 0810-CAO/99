<template>
  <div class="app">
    <MainHeader></MainHeader>
    <Tabbar></Tabbar>
    <!--歌手、搜索界面keepalive-->
    <keep-alive include="Singer,Search">
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import MainHeader from "./components/MainHeader.vue";
import Tabbar from "./components/Tabbar.vue";
import Player from "./views/Player.vue";
export default {
  name: "App",
  components: {
    MainHeader,
    Tabbar,
    Player
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "./assets/css/variable";
.theme {
  position: fixed;
  left: 0;
  bottom: 0;
  button {
    width: 100px;
    height: 100px;
    &:nth-of-type(1) {
      background: $background-color-theme;
    }
    &:nth-of-type(2) {
      background: $background-color-theme1;
    }
    &:nth-of-type(3) {
      background: $background-color-theme2;
    }
  }
}
</style>
