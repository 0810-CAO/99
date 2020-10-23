<template>
  <div class="play-bottom">
    <div class="bottom-progress">
      <span>00:00</span>
      <div class="progress-bar">
        <div class="progress-line">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span>00:00</span>
    </div>
    <div class="bottom-controll">
      <div class="mode"></div>
      <div class="prev"></div>
      <div class="play"></div>
      <div class="next"></div>
      <div class="favorite"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PlayBottom"
};
</script>
<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable";
.play-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      @include font_size($font_small);
      @include font_color();
    }
    .progress-bar {
      margin: 0 10px;
      height: 10px;
      width: 100%;
      background: #fff;
      position: relative;
      .progress-line {
        width: 50%;
        height: 100%;
        background: red;
        .progress-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
.bottom-controll {
  width: 100%;
  margin: 0 auto;
  padding: 50px 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    width: 84px;
    height: 84px;
  }
  .mode {
    @include bg_img("../../assets/images/loop");
  }
  .prev {
    @include bg_img("../../assets/images/prev");
  }
  .play {
    @include bg_img("../../assets/images/play");
  }
  .next {
    @include bg_img("../../assets/images/next");
  }
  .favorite {
    @include bg_img("../../assets/images/un_favorite");
  }
}
</style>
