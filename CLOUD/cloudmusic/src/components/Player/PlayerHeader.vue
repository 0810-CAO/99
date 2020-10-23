<!--eslint-disable-->
<template>
  <div class="header">
    <div class="header-left"></div>
    <div class="header-title">
      <h3>1</h3>
      <p>2</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: "PlayerHeader",
  data() {
    return {};
  },
  methods: {},
  props: {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.header {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  .header-left {
    @include bg_img("../../assets/images/down");
  }
  // .header-right {
  //   // @include bg_img("../../assets/images/more");
  // }
  .header-title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #fff;
    @include font_size($font_medium);
    @include no-wrap();
  }
}
</style>
