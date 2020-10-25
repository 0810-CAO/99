<template>
  <div class="account-bottom">
    <div class="bottom-play" @click="selectAllMusic">
      <span></span>
      <span>播放全部</span>
    </div>
    <div class="bottom-wrapper">
      <ScrollView>
        <SongListItem
          :songs="switchNum === 0 ? favoriteList : historyList"
        ></SongListItem>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import ScrollView from "../ScrollView";
import SongListItem from "../SongListItem";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "AccountBottom",
  components: {
    ScrollView,
    SongListItem
  },
  computed: {
    ...mapGetters(["favoriteList", "historyList"])
  },
  props: {
    switchNum: {
      type: Number,
      default: 0,
      required: true
    }
  },
  methods: {
    // 由于在本地的localstorage中存储过数据，只需要从本地获取数据即刻
    ...mapActions(["setFullScreen", "setSongDetail", "setCurrentIndex"]),
    ...mapMutations(["SET_SONG_DETAIL"]),
    selectAllMusic() {
      // let ids = []
      if (this.switchNum === 0) {
        // ids = this.favoriteList.map(function (item) {
        //   return item.id
        // })
        // this.$store.commit('SET_SONG_DETAIL', this.favoriteList)
        this.SET_SONG_DETAIL(this.favoriteList);
      } else {
        // ids = this.historyList.map(function (item) {
        //   return item.id
        // })
        this.SET_SONG_DETAIL(this.historyList);
      }
      // this.setSongDetail(ids)
      this.setFullScreen(true);
      this.setCurrentIndex(0);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.account-bottom {
  position: fixed;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
  .bottom-play {
    width: 260px;
    height: 60px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    @include border_color();
    border-radius: 30px;
    span {
      display: inline-block;
      &:nth-of-type(1) {
        width: 46px;
        height: 46px;
        @include bg_img("../../assets/images/small_play");
        margin-right: 20px;
      }
    }
  }
  .bottom-wrapper {
    position: fixed;
    top: 200px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>
