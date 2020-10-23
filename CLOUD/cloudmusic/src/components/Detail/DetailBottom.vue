<template>
  <ul class="detail-bottom">
    <li class="bottom-top">
      <div class="bottom-icon"></div>
      <div class="bottom-title">播放全部</div>
    </li>
    <li
      v-for="value in playlist"
      :key="value.id"
      class="item"
      @click="selectMusic"
    >
      <h3>{{ value.name }}</h3>
      <p>{{ value.al.name }}-{{ value.ar[0].name }}</p>
    </li>
  </ul>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "DetailBottom",
  props: {
    playlist: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions(["setFullScreen"]),
    // 通过该方法触发dispatch，然后在actions中使用commit来调用mutations修改state全局中的变量来控制页面
    selectMusic() {
      // this.$store.dispatch("setFullScreen", true);
      this.setFullScreen(true);
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable";
.detail-bottom {
  width: 100%;
  li {
    width: 100%;
    height: 120px;
    padding: 20px;
    box-sizing: border-box;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
  }
  .bottom-top {
    display: flex;
    align-items: center;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    .bottom-icon {
      width: 60px;
      height: 60px;
      margin-right: 20px;
      @include bg_img("../../assets/images/small_play");
    }
    .bottom-title {
      @include font_color();
      @include font_size($font_large);
    }
  }
  .item {
    h3 {
      @include font_color();
      @include font_size($font_medium);
    }
    p {
      @include font_color();
      @include font_size($font_small);
      margin-top: 10px;
      opacity: 0.8;
    }
  }
}
</style>
