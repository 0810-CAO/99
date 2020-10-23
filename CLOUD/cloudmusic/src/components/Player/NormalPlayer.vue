<template>
  <!--this.$store.getters.isFullScreen-->
  <div class="normal-player" v-show="this.isFullScreen">
    <div class="player-wrapper">
      <PlayerHeader></PlayerHeader>
      <PlayerMiddle></PlayerMiddle>
      <PlayerBottom></PlayerBottom>
    </div>
    <div class="play_bg">
      <img
        src="http://p1.music.126.net/6F5lJnwBJL_LT9t_V_YBZg==/109951165403300035.jpg?imageView&quality=89"
        alt=""
      />
    </div>
  </div>
</template>
<script>
import PlayerHeader from "./PlayerHeader";
import PlayerMiddle from "./PlayerMiddle";
import PlayerBottom from "./PlayerBottom";
import { mapGetters } from "vuex";
export default {
  name: "NormalPlayer",
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  computed: {
    ...mapGetters(["isFullScreen"])
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
