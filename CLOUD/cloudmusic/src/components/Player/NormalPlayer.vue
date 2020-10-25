<template>
  <!--this.$store.getters.isFullScreen-->
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="normal-player" v-show="this.isFullScreen">
      <div class="player-wrapper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
        <PlayerBottom
          :totalTime="totalTime"
          :currentTime="currentTime"
        ></PlayerBottom>
      </div>
      <div class="play_bg">
        <img :src="currentSong.picUrl" alt="" />
      </div>
    </div>
  </transition>
</template>
<script>
import PlayerHeader from "./PlayerHeader";
import PlayerMiddle from "./PlayerMiddle";
import PlayerBottom from "./PlayerBottom";
import { mapGetters, mapActions } from "vuex";
import Velocity from "velocity-animate";
import "velocity-animate/velocity.ui";
export default {
  name: "NormalPlayer",
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  computed: {
    ...mapGetters(["isFullScreen", "currentSong"])
  },
  methods: {
    ...mapActions(["getSongLyric"]),
    enter(el, done) {
      Velocity(
        el,
        "transition.shrinkIn",
        {
          duraction: 2000
        },
        function() {
          done();
        }
      );
    },
    leave(el, done) {
      Velocity(
        el,
        "transition.shrinkOut",
        {
          duraction: 2000
        },
        function() {
          done();
        }
      );
    }
  },
  // 监听currentSong变化则歌词改变传递歌曲id
  watch: {
    currentSong(newvalue, oldvalue) {
      // 防止在删除全部歌曲后找不到歌词的情况
      if (newvalue.id == undefined) {
        return;
      }
      this.getSongLyric(newvalue.id);
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
.normal-player {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  @include bg_sub_color();
  .player-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 99;
  }
  .play_bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img {
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      filter: blur(10px);
    }
  }
}
</style>
