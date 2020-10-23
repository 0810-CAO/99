<template>
  <div class="mini-player">
    <div class="player-wrapper">
      <div class="player-left">
        <img src="../../../public/apple-touch-icon.png" alt="" />
        <div class="player-title">
          <h3>陈奕迅</h3>
          <p>不再说话</p>
        </div>
      </div>
      <div class="player-right">
        <div class="play"></div>
        <div class="list"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MiniPlayer"
};
</script>
<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.mini-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 150px;
  .player-wrapper {
    width: 100%;
    height: 100%;
    @include bg_color();
    display: flex;
    align-items: center;
    justify-content: space-between;
    .player-left {
      display: flex;
      padding-left: 30px;
      width: 50%;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .player-title {
        display: flex;
        flex-direction: column;
        /*align-items: center;*/
        justify-content: center;
        @include no-wrap();
        h3 {
          @include font_size($font_medium);
          @include font_color();
        }
        p {
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
    }
    .player-right {
      display: flex;
      align-items: center;
      .play {
        width: 84px;
        height: 84px;
        @include bg_img("../../assets/images/play");
        &.active {
          @include bg_img("../../assets/images/pause");
        }
      }
      .list {
        width: 120px;
        height: 120px;
        @include bg_img("../../assets/images/list");
      }
    }
  }
}
</style>
