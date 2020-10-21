<template>
  <div class="recommend">
    <ScrollView>
      <div>
        <Banner :banners="banners"></Banner>
        <Personalized
          :personalized="personalized"
          :title="'推荐歌单'"
        ></Personalized>
        <Personalized :personalized="albums" :title="'最新专辑'"></Personalized>
        <SongList :songs="songs"></SongList>
      </div>
    </ScrollView>
  </div>
</template>
<script>
import { getBanner, getPersonalized, getAlbum, getNewSong } from "../api/index";
import Banner from "../components/Banner";
import Personalized from "../components/Personalized";
import SongList from "../components/SongList";
import ScrollView from "../components/ScrollView";
export default {
  name: "Recommend",
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView
  },
  data() {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: []
    };
  },
  created() {
    getBanner()
      .then(data => {
        console.log(data);
        this.banners = data.banners;
      })
      .catch(function(err) {
        console.log(err);
      });
    getPersonalized()
      .then(data => {
        console.log(data);
        this.personalized = data.result;
      })
      .catch(function(err) {
        console.log(err);
      });
    getAlbum()
      .then(data => {
        console.log(data);
        this.albums = data.albums.splice(0, 6);
      })
      .catch(function(err) {
        console.log(err);
      });
    getNewSong()
      .then(data => {
        console.log(data);
        this.songs = data.result;
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>
<style scoped lang="scss">
.recommend {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
