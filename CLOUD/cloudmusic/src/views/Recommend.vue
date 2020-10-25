<template>
  <div class="recommend">
    <div class="recommend-wrapper">
      <ScrollView>
        <div>
          <Banner :banners="banners"></Banner>
          <Personalized
            :personalized="personalized"
            :title="'推荐歌单'"
            @select="fatherSelectItem"
            :type="'personalized'"
          ></Personalized>
          <Personalized
            :personalized="albums"
            :title="'最新专辑'"
            @select="fatherSelectItem"
            :type="'album'"
          ></Personalized>
          <SongList :songs="songs"></SongList>
        </div>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { getBanner, getPersonalized, getAlbum, getNewSong } from "../api/index";
import Banner from "../components/Recommend/Banner";
import Personalized from "../components/Recommend/Personalized";
import SongList from "../components/Recommend/SongList";
import ScrollView from "../components/ScrollView";
export default {
  name: "Recommend",
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView
  },
  methods: {
    fatherSelectItem(id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      });
    }
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
        // console.log(data);
        // this.songs = data.result;
        let list = [];
        data.result.forEach(value => {
          let obj = {};
          obj.id = value.id;
          obj.name = value.name;
          obj.picUrl = value.song.album.picUrl;
          let singer = "";
          for (let i = 0; i < value.song["artists"].length; i++) {
            if (i === 0) {
              singer = value.song["artists"][i].name;
            } else {
              singer += "-" + value.song["artists"][i].name;
            }
          }
          obj.singer = singer;
          list.push(obj);
        });
        this.songs = list;
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
  // overflow: hidden;
}
.recommend-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.v-enter {
  transform: translateX(100%);
}
.v-enter-active {
  transition: transform 1s;
}
.v-enter-to {
  transform: translateX(0%);
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-active {
  transition: transform 1s;
}
.v-leave-to {
  transform: translateX(100%);
}
</style>
