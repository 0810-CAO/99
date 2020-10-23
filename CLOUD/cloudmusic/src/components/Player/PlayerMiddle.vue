<template>
  <swiper :options="swiperOption" class="banner">
    <swiper-slide class="cd">
      <div class="cd-wrapper">
        <img
          src="http://p1.music.126.net/6F5lJnwBJL_LT9t_V_YBZg==/109951165403300035.jpg?imageView&quality=89"
          alt=""
        />
      </div>
      <p>11111111</p>
    </swiper-slide>
    <swiper-slide class="lyric">
      <ScrollView>
        <ul>
          <li>我是第1个li</li>
          <li>我是第2个li</li>
          <li>我是第3个li</li>
          <li>我是第4个li</li>
          <li>我是第5个li</li>
          <li>我是第6个li</li>
          <li>我是第7个li</li>
          <li>我是第8个li</li>
          <li>我是第9个li</li>
          <li>我是第10个li</li>
          <li>我是第11个li</li>
          <li>我是第12个li</li>
          <li>我是第13个li</li>
          <li>我是第14个li</li>
          <li>我是第15个li</li>
          <li>我是第16个li</li>
          <li>我是第17个li</li>
          <li>我是第18个li</li>
          <li>我是第19个li</li>
          <li>我是第20个li</li>
          <li>我是第21个li</li>
          <li>我是第22个li</li>
          <li>我是第23个li</li>
          <li>我是第24个li</li>
          <li>我是第25个li</li>
          <li>我是第26个li</li>
          <li>我是第27个li</li>
          <li>我是第28个li</li>
          <li>我是第29个li</li>
          <li>我是第30个li</li>
          <li>我是第31个li</li>
          <li>我是第32个li</li>
          <li>我是第33个li</li>
          <li>我是第34个li</li>
          <li>我是第35个li</li>
          <li>我是第36个li</li>
          <li>我是第37个li</li>
          <li>我是第38个li</li>
          <li>我是第39个li</li>
          <li>我是第40个li</li>
          <li>我是第41个li</li>
          <li>我是第42个li</li>
          <li>我是第43个li</li>
          <li>我是第44个li</li>
          <li>我是第45个li</li>
          <li>我是第46个li</li>
          <li>我是第47个li</li>
          <li>我是第48个li</li>
          <li>我是第49个li</li>
          <li>我是第50个li</li>
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
      }
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
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
    .cd-wrapper {
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 15px solid #fff;
      overflow: hidden;
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
        padding-bottom: 100px;
      }
    }
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
