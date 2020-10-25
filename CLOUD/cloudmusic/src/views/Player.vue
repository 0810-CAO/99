<template>
  <div class="player">
    <NormalPlayer
      :totalTime="totalTime"
      :currentTime="currentTime"
    ></NormalPlayer>
    <!--此处通过向子组件传递一个父组件中的函数（该函数可以调用另一个子组件的函数）以此实现mini播放组件的show-->
    <MiniPlayer></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
    <audio
      :src="currentSong.url"
      ref="audio"
      @timeupdate="timeupdate"
      @ended="end"
    ></audio>
  </div>
</template>
<script>
import NormalPlayer from "../components/Player/NormalPlayer";
import MiniPlayer from "../components/Player/MiniPlayer";
import ListPlayer from "../components/Player/ListPlayer";
import { mapGetters, mapActions } from "vuex";
import mode from "../store/modeType";
import {
  getRandomIntInclusive,
  setLocalStorage,
  getLocalStorage
} from "../tools/tools";
export default {
  name: "Player",
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  computed: {
    ...mapGetters([
      "currentSong",
      "isPlaying",
      "currentIndex",
      "curTime",
      "modeType",
      "songs",
      "favoriteList",
      "historyList"
    ])
  },
  watch: {
    isPlaying(newvalue, oldvalue) {
      if (newvalue) {
        // 需要监听播放按钮和切歌按钮（仅在播放切歌时会修改）对播放历史数组进行修改
        this.sethistorySong(this.currentSong);
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    // 监听currentindex避免当正在播放过程中歌曲切换
    currentIndex() {
      this.$refs.audio.oncanplay = () => {
        this.totalTime = this.$refs.audio.duration;
        if (this.isPlaying) {
          this.sethistorySong(this.currentSong);
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
      };
    },
    // 点击进度条后更新播放进度
    curTime(newvalue, oldvalue) {
      this.$refs.audio.currentTime = newvalue;
    },
    // 持久化操作favorite、history 使用封装在tools中的方法
    favoriteList(newvalue, oldvalue) {
      // window.localStorage.setItem("favoriteList", JSON.stringify(newvalue));
      setLocalStorage("favoriteList", newvalue);
    },
    historyList(newvalue, oldvalue) {
      // window.localStorage.setItem("historyList", JSON.stringify(newvalue));
      setLocalStorage("historyList", newvalue);
    }
  },
  created() {
    // let list = JSON.parse(window.localStorage.getItem("favoriteList"));
    let list = getLocalStorage("favoriteList");
    if (list === null) {
      return;
    }
    this.setfavoriteList(list);
    // let list2 = JSON.parse(window.localStorage.getItem("historyList"));
    let list2 = getLocalStorage("historyList");
    if (list2 === null) {
      return;
    }
    this.sethistoryList(list2);
  },
  mounted() {
    this.$refs.audio.oncanplay = () => {
      this.totalTime = this.$refs.audio.duration;
    };
  },
  data() {
    return {
      totalTime: 0,
      currentTime: 0
    };
  },
  methods: {
    ...mapActions([
      "setCurrentIndex",
      "setfavoriteList",
      "sethistorySong",
      "sethistoryList"
    ]),
    timeupdate(event) {
      // console.log(event.target.currentTime);
      this.currentTime = event.target.currentTime;
    },
    // 歌曲结束后下一首歌跳转方法
    end() {
      if (this.modeType === mode.loop) {
        this.setCurrentIndex(this.currentIndex + 1);
        console.log(this.currentIndex);
      } else if (this.modeType === mode.one) {
        this.$refs.audio.play();
      } else if (this.modeType === mode.random) {
        let index = getRandomIntInclusive(0, this.songs.length - 1);
        this.setCurrentIndex(index);
      }
    }
  }
};
</script>
<style scoped lang="scss"></style>
