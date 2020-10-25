<template>
  <swiper :options="swiperOption" class="banner">
    <swiper-slide class="cd">
      <div class="cd-warpper" ref="cdWarpper">
        <img :src="currentSong.picUrl" alt="" />
      </div>
      <p>{{ getFirstLyric() }}</p>
    </swiper-slide>
    <swiper-slide class="lyric" ref="lyric">
      <ScrollView ref="scrollView">
        <ul>
          <!--根据当前播放时间来确定高亮的歌词位置 注意是字符串-->
          <li
            v-for="(value, key) in currentLyric"
            :key="key"
            :class="{ active: currentLineNum === key }"
          >
            {{ value }}
          </li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
import Swiper2, { Navigation, Pagination } from "swiper";
Swiper2.use([Navigation, Pagination]);
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import ScrollView from "../ScrollView";
import { mapGetters } from "vuex";
export default {
  name: "PlayerMiddle",
  data() {
    return {
      swiperOption: {
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          // 自定义默认分页器圆点类名
          bulletClass: "my-bullet",
          bulletActiveClass: "my-bullet-active"
        },
        // 从网络获取
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      currentLineNum: "0"
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
  },
  computed: {
    ...mapGetters(["isPlaying", "currentSong", "currentLyric"])
  },
  // 监听播放按钮状态来控制旋转
  watch: {
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.cdWarpper.classList.add("active");
      } else {
        this.$refs.cdWarpper.classList.remove("active");
      }
    },
    currentTime(newValue, oldValue) {
      // // 同步高亮歌词
      // let lineNum = Math.floor(newValue) + "";
      // // 根据在某一秒没有歌词来判断高亮是否需要修改
      // let result = this.currentLyric[lineNum];
      // if (result !== undefined && result !== "") {
      //   this.currentLineNum = lineNum;
      //   // 歌词滚动同步 只需要在高亮变化时判断
      //   let currentLyricTop = document.querySelector("li.active").offsetTop;
      //   // console.log(currentLyricTop);拿到原生的高度
      //   let lyricHeight = this.$refs.lyric.$el.offsetHeight;
      //   if (currentLyricTop > lyricHeight / 2) {
      //     this.$refs.scrollView.scrollTo(
      //       0,
      //       lyricHeight / 2 - currentLyricTop,
      //       100
      //     );
      //   }
      // }
      let lineNum = Math.floor(newValue);
      this.currentLineNum = this.getActiveLineNum(lineNum);
      // 歌词滚动同步 只需要在高亮变化时判断
      let currentLyricTop = document.querySelector(".lyric .active").offsetTop;
      // console.log(currentLyricTop);拿到原生的高度当前歌词大于页面一半则向上，否则滚动至初始
      let lyricHeight = this.$refs.lyric.$el.offsetHeight;
      if (currentLyricTop > lyricHeight / 2) {
        this.$refs.scrollView.scrollTo(
          0,
          lyricHeight / 2 - currentLyricTop,
          200
        );
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 200);
      }
    },
    // 解决第一句歌词不在第0秒
    currentLyric(newValue, oldValue) {
      for (let key in newValue) {
        this.currentLineNum = key;
        return;
      }
    }
  },
  methods: {
    // 获取第一句歌词
    getFirstLyric() {
      for (let key in this.currentLyric) {
        return this.currentLyric[key];
      }
    },
    // 避免因为快进播放后歌词出现缓慢（如果找不到当前点击时间直接找上一行歌词）
    getActiveLineNum(lineNum) {
      // 解决第一句歌词不在第0秒
      if (lineNum < 0) {
        return this.currentLineNum;
      }
      let result = this.currentLyric[lineNum + ""];
      if (result === undefined || result === "") {
        lineNum--;
        return this.getActiveLineNum(lineNum);
      } else {
        return lineNum + "";
      }
    }
  },
  props: {
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
.banner {
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
  .cd {
    .cd-warpper {
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 20px solid #fff;
      overflow: hidden;
      animation: circle 4s linear infinite;
      // 设置旋转的状态
      animation-play-state: paused;
      &.active {
        animation-play-state: running;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      @include font_size($font_medium);
      @include font_color();
      margin-top: 50px;
      text-align: center;
    }
  }
  .lyric {
    li {
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin: 10px 0;
      &:last-of-type {
        padding-bottom: 50%;
      }
      &.active {
        color: #fff;
      }
    }
  }
}
@keyframes circle {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<style lang="scss">
@import "../../assets/css/mixin";
.my-bullet {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  margin: 0 20px;
}
.my-bullet-active {
  width: 60px;
  border-radius: 10px;
  @include bg_color();
}
</style>
