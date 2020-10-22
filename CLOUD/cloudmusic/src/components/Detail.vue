<template>
  <div class="detail">
    <SubHeader :title="playlist.name"></SubHeader>
    <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
    <div class="bottom">
      <ScrollView ref="scrollview">
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>
<script>
import SubHeader from "../components/SubHeader";
import DetailTop from "../components/DetailTop";
import DetailBottom from "../components/DetailBottom";
import ScrollView from "../components/ScrollView";
import { getPlayList, getAlbumSong } from "../api/index";
export default {
  name: "Detail",
  components: {
    SubHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  data: function() {
    return {
      playlist: {}
    };
  },
  created() {
    // // 获取通过路由传递来的id使用
    // console.log(this.$route.params.type);
    if (this.$route.params.type === "personalized") {
      getPlayList({ id: this.$route.params.id })
        .then(data => {
          console.log(data);
          this.playlist = data.playlist;
        })
        .catch(err => {
          console.log(err);
        });
    } else if (this.$route.params.type === "album") {
      getAlbumSong({ id: this.$route.params.id })
        .then(data => {
          console.log(data);
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          };
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    //通过$el获取根元素的属性
    let defaultHeight = this.$refs.top.$el.offsetHeight;
    console.log(defaultHeight);
    this.$refs.scrollview.scrolling(offsetY => {
      // console.log(offsetY);
      if (offsetY < 0) {
        // console.log("up");
        // let scale = (15 * Math.abs(offsetY)) / defaultHeight;
        let scale = Math.abs(offsetY) / defaultHeight;
        this.$refs.top.changeMask(scale);
        // 注意点: 高斯模糊效果是非常消耗性能的, 不推荐在移动端中使用 如果非要在移动端中使用, 那么建议只设置一次
        // 此处使用背景的一个opacity来根据scale值设置其清晰度
        // this.$refs.top.$el.style.filter = `blur(${scale}px)`;
      } else {
        // console.log("down");
        let scale = 1 + offsetY / defaultHeight;
        // console.log(scale);
        this.$refs.top.$el.style.transform = `scale(${scale})`;
      }
    });
  }
};
</script>
<style scoped lang="scss">
@import "../assets/css/mixin";
.detail {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  @include bg_sub_color();
  .bottom {
    position: fixed;
    top: 500px;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
</style>
