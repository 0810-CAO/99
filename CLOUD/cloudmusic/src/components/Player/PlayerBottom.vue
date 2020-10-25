<template>
  <div class="play-bottom">
    <div class="bottom-progress">
      <span ref="eleCurrentTime">00:00</span>
      <div class="progress-bar" @click="progressClick" ref="progressBar">
        <div class="progress-line" ref="progressLine">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span ref="eleTotalTime">00:00</span>
    </div>
    <div class="bottom-controll">
      <div class="mode loop" @click="mode" ref="mode"></div>
      <div class="prev" @click="prev"></div>
      <div class="play" @click="play" ref="play"></div>
      <div class="next" @click="next"></div>
      <div
        class="favorite"
        @click="favorite"
        :class="{ active: isFavorite(currentSong) }"
      ></div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import modeType from "../../store/modeType";
import { formartTime } from "../../tools/tools";
export default {
  name: "PlayBottom",
  methods: {
    // 分别在playerbottom/miniplayer/listplayer中对按钮变化操作
    ...mapActions([
      "setIsPlaying",
      "setModeType",
      "setCurrentIndex",
      "setCurrentTime",
      "setfavoriteSong"
    ]),
    play() {
      this.setIsPlaying(!this.isPlaying);
    },
    mode() {
      // 切换播放模式
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one);
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random);
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop);
      }
    },
    prev() {
      this.setCurrentIndex(this.currentIndex - 1);
    },
    next() {
      this.setCurrentIndex(this.currentIndex + 1);
    },
    favorite() {
      this.setfavoriteSong(this.currentSong);
    },
    // 需要判断歌曲的id否则网页销毁后报错
    isFavorite(song) {
      let result = this.favoriteList.find(function(currentValue) {
        return currentValue.id === song.id;
      });
      return result !== undefined;
    },
    progressClick(event) {
      // 计算进度条位置
      // let normalLeft = event.target.offsetLeft;
      let normalLeft = this.$refs.progressBar.offsetLeft;
      let eventLeft = event.pageX;
      let clickLeft = eventLeft - normalLeft;
      // let progressWidth = event.target.offsetWidth;
      let progressWidth = this.$refs.progressBar.offsetWidth;
      let value = clickLeft / progressWidth;
      this.$refs.progressLine.style.width = value * 100 + "%";
      let currentTime = this.totalTime * value;
      // console.log(currentTime);
      this.setCurrentTime(currentTime);
    }
  },
  computed: {
    ...mapGetters([
      "isPlaying",
      "modeType",
      "currentIndex",
      "currentSong",
      "favoriteList"
    ])
  },
  watch: {
    // 通过监听ref获取的元素中添加属性来切换暂停播放
    isPlaying(newvalue, oldvalue) {
      if (newvalue) {
        this.$refs.play.classList.add("active");
      } else {
        this.$refs.play.classList.remove("active");
      }
    },
    // 监听播放方式
    modeType(newvalue, oldvalue) {
      if (newvalue === modeType.loop) {
        this.$refs.mode.classList.remove("random");
        this.$refs.mode.classList.add("loop");
      } else if (newvalue === modeType.one) {
        this.$refs.mode.classList.remove("loop");
        this.$refs.mode.classList.add("one");
      } else if (newvalue === modeType.random) {
        this.$refs.mode.classList.remove("one");
        this.$refs.mode.classList.add("random");
      }
    },
    // 监听总时间
    totalTime(newValue, oldValue) {
      let time = formartTime(newValue);
      this.$refs.eleTotalTime.innerHTML = time.minute + ":" + time.second;
    },
    // 进度条及时间的同步
    currentTime(newValue, oldValue) {
      let time = formartTime(newValue);
      this.$refs.eleCurrentTime.innerHTML = time.minute + ":" + time.second;
      let value = (newValue / this.totalTime) * 100;
      this.$refs.progressLine.style.width = value + "%";
    }
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  }
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
      // position: relative;
      .progress-line {
        width: 0%;
        height: 100%;
        background: red;
        position: relative;
        .progress-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          left: 100%;
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
    &.loop {
      @include bg_img("../../assets/images/loop");
    }
    &.one {
      @include bg_img("../../assets/images/one");
    }
    &.random {
      @include bg_img("../../assets/images/shuffle");
    }
    @include bg_img("../../assets/images/loop");
  }
  .prev {
    @include bg_img("../../assets/images/prev");
  }
  .play {
    @include bg_img("../../assets/images/play");
    &.active {
      @include bg_img("../../assets/images/pause");
    }
  }
  .next {
    @include bg_img("../../assets/images/next");
  }
  .favorite {
    @include bg_img("../../assets/images/un_favorite");
    &.active {
      @include bg_img("../../assets/images/favorite");
    }
  }
}
</style>
