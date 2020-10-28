<template>
  <Header class="header">
    <div slot="left" class="header-left"></div>
    <p slot="center" class="header-title">cloud音乐</p>
    <div slot="right" class="header-right" @click.stop="accountClick"></div>
  </Header>
</template>
<script>
import Header from "./Header";
export default {
  name: "MainHeader",
  components: {
    Header
  },
  methods: {
    accountClick() {
      this.$router.push("/account");
    }
  }
};
</script>
<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.header {
  .header-left {
    @include bg_img("../assets/images/logo");
  }
  .header-right {
    @include bg_img("../assets/images/account");
  }
  .header-title {
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
  }
}
</style>
