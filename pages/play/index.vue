<template>
  <div class="play-container">
    <div
      class="mask-container"
      :style="{ 'background-image': 'url(' + playInfo.coverImgUrl + ')' }"
    >
      <!-- <div
        class="album-cover"
        :style="{ 'background-image': 'url(' + playInfo.coverImgUrl + ')' }"
      ></div> -->
      <div class="cover-mask" style="opacity: 0.6"></div>
    </div>
    <cu-custom style="color: #fff" :isBack="true">
      <block slot="content" class="musicName">{{ playInfo.title }}</block>
    </cu-custom>
    <view class="author" :style="{ top: CustomBar + 'px' }">{{
      playInfo.singer
    }}</view>
    <view
      class="img-container"
      :style="{ transform: 'translate(-50%, -50%) rotate(' + rotate + 'deg)' }"
      v-show="!lyricShow"
    >
      <image
        :src="playInfo.coverImgUrl"
        class="authorImg"
        @click="getLyric"
      ></image>
    </view>
    <scroll-view
      scroll-y
      v-if="lyricShow"
      @click="lyricShow = false"
      :scroll-top="scrollTop"
      class="lyric-container"
      :style="{ top: CustomBar + 35 + 'px' }"
    >
      <view v-if="lyricList.length > 0">
        <view
          class="lyric-item"
          :class="{ active: index == currentLyricIndex }"
          v-for="(item, index) in lyricList"
          :key="index"
          style="text-align: center"
        >
          {{ item.content }}
        </view>
      </view>
      <p v-else class="noLyric">暂无歌词</p>
    </scroll-view>

    <view class="bottom-control">
      <view class="progress">
        <view class="audio-number">{{ playDetailInfo.current }}</view>
        <slider
          class="audio-slider"
          activeColor="rgb(248, 78, 81)"
          block-size="8"
          :value="playDetailInfo.current_value"
          :max="playDetailInfo.duration_value"
          @change="handleChange"
        ></slider>
        <view class="audio-number">{{ playDetailInfo.duration }}</view>
      </view>
      <view class="iconList flex">
        <text
          class="iconfont"
          :class="
            likeList.includes(playInfo.id)
              ? 'icon-like lighIcon'
              : 'icon-unlike'
          "
          @click="likeMusic()"
          style="margin-right: 65rpx"
        ></text>
        <text
          class="iconfont icon-play-left"
          @click="handleChangePlay(-1)"
        ></text>
        <text
          class="iconfont"
          :class="!paused ? 'icon-play' : 'icon-pause'"
          style="font-size: 90rpx; margin: 0 35px"
          @click="playMusic"
        ></text>
        <text
          class="iconfont icon-play-right"
          @click="handleChangePlay(1)"
        ></text>
        <text
          class="iconfont icon-liebiao"
          style="margin-left: 65rpx; font-size: 56rpx"
          @click.stop="modelShow = true"
        ></text>
      </view>
    </view>
    <play-list v-model="modelShow" @backHome="backHome"></play-list>
  </div>
</template>

<script>
import playList from "../../components/musicControl/playList.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      modelShow: false,
      scrollTop: 0,
      currentLyricIndex: 0,
      //歌词
      lyricList: [],
      //旋转角度
      rotate: 0,
      //喜欢音乐list
      likeList: [],
      //是否显示歌词
      lyricShow: false,
      //定时器
      timer: null,
      playDetailInfo: {
        current: "00:00",
        duration: "00:00",
        current_value: 0,
        duration_value: 0,
      },
	  CustomBar:this.CustomBar
    };
  },
  components: { playList },
  computed: {
    ...mapState({
      playInfo: (state) => state.playInfo,
      paused: (state) => state.paused,
      userInfo: (state) => state.userInfo,
    }),
  },
  onShow() {
    if (!this.paused) {
      this.initRotate();
    } else {
      clearInterval(this.timer);
    }
    this.getLikeData();
    this.playDetailInfo = this.$audio.playinfo;
    this.initLyric();
    this.$audio.syncStateOn("page-index-get-state", ({ playinfo }) => {
      this.playDetailInfo = { ...playinfo };
      this.initLyric();
    });
  },
  methods: {
    initLyric() {
      if (this.lyricList.length == 0) return;
      let timeStamp = this.playDetailInfo.current;
      this.currentLyricIndex = this.lyricList.findIndex((item, index) => {
        return item.time < timeStamp && this.lyricList[index + 1]
          ? this.lyricList[index + 1].time > timeStamp
          : true;
      });
      this.scrollTop = this.currentLyricIndex * 36;
    },
    //获取喜欢音乐列表
    async getLikeData() {
      const uid = this.userInfo.id;
      const timestamp = new Date().getTime();
      const data = await this.$api.likeData({ uid, timestamp });
      this.$nextTick(() => {
        this.likeList = data.ids || [];
      });
    },

    //喜欢或取消喜音乐
    async likeMusic() {
      let bool = this.likeList.includes(this.playInfo.id);
      const timestamp = new Date().getTime();
      const data = await this.$api.likeMusic({
        id: this.playInfo.id,
        timestamp,
        like: !bool,
      });
      this.getLikeData();
    },

    //拖动 完成
    handleChange(event) {
      this.$audio.seek(event.target.value);
    },

    //播放或暂停
    playMusic() {
      if (this.paused) {
        this.initRotate();
      } else {
        clearInterval(this.timer);
      }
      let list = this.$audio.audiolist;
      let index = list.findIndex((item) => item.id == this.playInfo.id);
      this.$audio.operate(index);
      this.$store.commit("SET_PASUED", !this.paused);
    },

    //旋转
    initRotate() {
      this.timer = setInterval(() => {
        this.rotate += 9;
      }, 1000);
    },

    //获取歌词
    async getLyric(bool) {
      this.lyricShow = true;
      let data = [];
      const id = this.playInfo.id;
      const res = await this.$api.getLyric({ id });
      data = (res.lrc.lyric || "").split("\n");
      let timeReg = /^\[.*\]/;
      let json = [];
      data.forEach((item) => {
        if (item.match(timeReg)) {
          let time = item.match(timeReg)[0].substr(1, 8);
          let minute = time.substr(0, 2);
          let second = time.substr(3, 2);
          let ms = time.substr(6, 2);
          json.push({
            time,
            ms:
              parseInt(minute) * 60 * 1000 +
              parseInt(second) * 1000 +
              parseInt(ms) * 10,
            content: item.substr(11),
          });
        }
      });
      this.lyricList = json;
    },

    //切换歌曲  --上一首或下一首
    handleChangePlay(count) {
      this.$store.dispatch("changePlay", count);
    },

    backHome() {
      uni.switchTab({
        url: "/pages/index/index",
      });
    },
  },
  onHide() {
    //卸载page-index-get-state,提高页面性能
    this.$audio.syncStateOff("page-index-get-state");
  },
  watch: {
    playInfo: {
      handler() {
        this.scrollTop = 0;
        this.getLyric(true);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.play-container {
  position: relative;
  width: 100%;
  height: 100%;
  .author {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255, 255, 255, 0.9);
    font-size: 28rpx;
  }
  .mask-container {
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background-size: cover;
    background-position: center;
    &:after {
      content: "";
      position: absolute;
      width: 130%;
      height: 130%;
      left: 0;
      top: 0;
      z-index: 1;
      filter: blur(15px);
      transform: translate(-3rem, -3rem);
      background: inherit;
      background-size: 100% 100%;
    }
    // .album-cover {
    //   position: absolute;
    //   top: 0;
    //   bottom: 0;
    //   left: 0;
    //   z-index: 2;
    //   width: 100%;
    //   height: 100%;
    //   background-size: cover;
    //   background-position: center;
    //   filter: blur(20px);
    // }
    .cover-mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 3;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
  .img-container {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450rpx;
    height: 450rpx;
    background: url(../../static/musicImg.png) no-repeat;
    background-size: 100% 100%;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.3);
    transition: all 1s linear;
    .authorImg {
      border-radius: 50%;
      width: 315rpx;
      height: 315rpx;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .lighIcon {
    color: rgb(248, 78, 81) !important;
  }
  .lyric-container {
    position: absolute;
    bottom: calc(10% + 100px);
    .lyric-item {
      color: #e1d7f0;
      height: 40px;
      line-height: 40px;
      &.active {
        color: rgb(248, 78, 81);
      }
    }
    .noLyric {
      position: absolute;
      top: 50%;
      left: 50%;
      color: #fff;
      transform: translate(-50%, -50%);
    }
  }

  .bottom-control {
    position: absolute;
    bottom: 10%;
    left: 10px;
    right: 10px;
    .progress {
      width: 100%;
      display: flex;
      align-items: center;
      .audio-number {
        width: 120upx;
        font-size: 24upx;
        line-height: 1;
        color: #fff;
        text-align: center;
      }
      .audio-slider {
        flex: 1;
        margin: 0;
      }
    }
    .iconList {
      justify-content: center;
      align-items: center;
      margin-top: 26rpx;
      .iconfont {
        color: #fff;
        font-size: 48rpx;
      }
    }
  }
}
</style>
