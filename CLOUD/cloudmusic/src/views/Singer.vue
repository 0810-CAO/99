<template>
  <div class="singer">
    <div class="singer-wrapper">
      <ScrollView ref="scrollView">
        <ul class="list-wrapper">
          <li
            class="list-group"
            v-for="(value, index) in list"
            :key="index"
            ref="group"
          >
            <h2 class="group-title">{{ keys[index] }}</h2>
            <ul>
              <li
                class="group-item"
                v-for="obj in list[index]"
                :key="obj.id"
                @click.stop="switchSinger(obj.id)"
              >
                <img v-lazy="obj.img1v1Url" alt="" />
                <p>{{ obj.name }}</p>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
      <ul class="list-keys">
        <!--为了实现在点击右侧后移动也能够实现切换的效果
        <li
          v-for="(key, index) in keys"
          :key="key"
          @click.stop="keyDown(index)"
          :class="{ active: currentTouch === index }"
        >-->
        <li
          v-for="(key, index) in keys"
          :key="key"
          :data-index="index"
          @touchstart.stop.prevent="touchstart"
          @touchmove.stop.prevent="touchmove"
          :class="{ active: currentTouch === index }"
        >
          {{ key }}
        </li>
      </ul>
      <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">
        {{ fixTitle }}
      </div>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// import { getHotArtists } from "../api/index";
// import { getLetterArtists } from "../api/index";
import { getAllArtists } from "../api/index";
import ScrollView from "../components/ScrollView";
export default {
  name: "Singer",
  components: {
    ScrollView
  },
  created() {
    getAllArtists()
      .then(result => {
        // console.log(result)
        this.keys = result.keys;
        this.list = result.list;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    // 右侧点击方法，获取已经封装好的数组来结合index调用scrollView的方法滚动
    keyDown(index) {
      this.currentTouch = index;
      // console.log(index);
      let offsetY = this.groupsTop[index];
      // console.log(offsetY);
      this.$refs.scrollView.scrollTo(0, -offsetY);
    },
    // 点击滚动
    touchstart(event) {
      let index = parseInt(event.target.dataset.index);
      this.keyDown(index);
      this.beginOffsetY = event.touches[0].pageY;
    },
    // 滑动滚动
    touchmove(event) {
      this.moveOffsetY = event.touches[0].pageY;
      let offsetY =
        (this.moveOffsetY - this.beginOffsetY) / event.target.offsetHeight;
      let index = parseInt(event.target.dataset.index) + Math.floor(offsetY);
      if (index < 0) {
        index = 0;
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1;
      }
      console.log(index);
      this.keyDown(index);
    },
    switchSinger(id) {
      this.$router.push(`/singer/detail/${id}/singer`);
    }
  },
  computed: {
    // 实现滚动时分组的吸顶
    fixTitle() {
      if (this.scrollY >= 0) {
        return "";
      } else {
        return this.keys[this.currentTouch];
      }
    }
  },
  data() {
    return {
      keys: [],
      list: [],
      groupsTop: [],
      currentTouch: 0,
      beginOffsetY: 0,
      moveOffsetY: 0,
      scrollY: 0
    };
  },
  watch: {
    // 通过监听每个一个li距离顶部距离来判断点击右侧和左侧展示的内容
    list() {
      // console.log(this.$refs.group);
      // watch只能监听数据变化，不能保证是否渲染完成，此时使用nextTick拿到渲染完成后的数据
      this.$nextTick(() => {
        this.$refs.group.forEach(group => {
          this.groupsTop.push(group.offsetTop);
        });
        console.log(this.groupsTop);
      });
    },
    // 实现一种下一个吸顶将上一个顶出去的效果
    fixTitle() {
      this.$nextTick(() => {
        this.fixTitleHeight = this.$refs.fixTitle.offsetHeight;
      });
    }
  },
  // 吸顶效果具体实现
  mounted() {
    this.$refs.scrollView.scrolling(y => {
      this.scrollY = y;
      // 顶部区域
      if (y >= 0) {
        this.currentTouch = 0;
        return;
      }
      // 通过滚动的距离来确定index的位置  中间区域
      for (let i = 0; i < this.groupsTop.length - 1; i++) {
        let preTop = this.groupsTop[i];
        let nextTop = this.groupsTop[i + 1];
        if (-y >= preTop && -y <= nextTop) {
          this.currentTouch = i;
          // 实现一种下一个吸顶将上一个顶出去的效果
          // 1.用下一组标题的偏移位 + 当前滚动出去的偏移位
          let diffOffsetY = nextTop + y;
          let fixTitleOffsetY = 0;
          // 2.判断计算的结果是否是 0 ~ 分组标题高度的值
          if (diffOffsetY >= 0 && diffOffsetY <= this.fixTitleHeight) {
            // 满足条件开始移动上一组标题
            fixTitleOffsetY = diffOffsetY - this.fixTitleHeight;
          } else {
            // 不满足条件需要固定在顶部
            fixTitleOffsetY = 0;
          }
          if (fixTitleOffsetY === this.fixTitleOffsetY) {
            return;
          }
          this.fixTitleOffsetY = fixTitleOffsetY;
          this.$refs.fixTitle.style.transform = `translateY(${fixTitleOffsetY}px)`;
          return;
        }
      }
      // 底部区域
      this.currentTouch = groupsTop.length - 1;
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin";
@import "../assets/css/variable";
.singer {
  width: 100%;
  height: 100%;
  .singer-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 184px;
    bottom: 0px;
    overflow: hidden;
    @include bg_sub_color();
    .list-wrapper {
      .list-group {
        .group-title {
          @include bg_color();
          @include font_size($font_medium);
          color: #fff;
          padding: 10px 20px;
          box-sizing: border-box;
        }
        .group-item {
          display: flex;
          justify-content: flex-start;
          padding: 10px 20px;
          border-bottom: 1px solid #ccc;
          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
          }
          p {
            @include font_size($font_medium);
            @include font_color();
            display: flex;
            align-items: center;
            margin-left: 20px;
          }
        }
      }
    }
    .list-keys {
      position: fixed;
      right: 10px;
      top: 60%;
      transform: translateY(-50%);
      li {
        @include font_color();
        @include font_size($font_medium_s);
        padding: 3px 0;
        &.active {
          text-shadow: 0 0 10px #000;
        }
      }
    }
    .fix-title {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      padding: 10px 20px;
      box-sizing: border-box;
      @include font_size($font_medium);
      color: #fff;
      @include bg_color();
    }
  }
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
