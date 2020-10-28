<!--eslint-disable-->
<template>
  <!--<div class="header" @click="changeTheme">
    <div class="header-left"></div>
    <p class="header-title">cloud音乐</p>
    <div class="header-right" @click.stop="accountClick"></div>
  </div>-->
  <!--使用自定义插槽来解决头部样式冗余-->
  <div class="header" @click="changeTheme">
    <div class="left"><slot name="left">左边</slot></div>
    <slot name="center">中间</slot>
    <div class="right"><slot name="right" class="right">右边</slot></div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      themes: ["theme", "theme1", "theme2"],
      index: 0
    };
  },
  methods: {
    changeTheme() {
      this.index++;
      if (this.index >= this.themes.length) {
        this.index = 0;
      }
      document.documentElement.setAttribute(
        "data-theme",
        this.themes[this.index]
      );
    },
    accountClick() {
      this.$router.push("/account");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/variable";
@import "../assets/css/mixin";

.header {
  width: 100%;
  height: 100px;
  display: flex;
  @include bg_color();
  justify-content: space-between;
  .left,
  .right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
    * {
      width: 100%;
      height: 100%;
    }
  }
  // .left {
  //   @include bg_img("../assets/images/logo");
  // }
  // .right {
  //   @include bg_img("../assets/images/account");
  // }
  // .header-title {
  //   text-align: center;
  //   line-height: 100px;
  //   color: #fff;
  //   font-weight: bold;
  //   @include font_size($font_medium);
  // }
}
</style>
