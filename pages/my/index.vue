<template>
  <view class="my-container">
    <view class="mask-container">
      <div class="cover-mask" style="opacity: 0.6"></div>
      <cu-custom bgColor="unset"><block slot="content">我的</block></cu-custom>
      <image
        src="../../static/tabBar/head.jpg"
        mode=""
        class="head-img"
      ></image>
      <view class="username">凌晨四点的上海</view>
    </view>
    <view class="recommend-main">
      <div class="tabs flex">
        <view
          class="tab-item"
          :class="{ active: currentType == 'history' }"
          @click="changeType"
          >最近</view
        >
        <view
          class="tab-item"
          :class="{ active: currentType == 'like' }"
          @click="changeType"
          >喜欢</view
        >
      </div>
      <view class="music-title" @click="handlePlayAllMusic">
        <text class="iconfont icon-kaishi3 basic-icon-color playIcon"></text>
        全部播放
        <text class="light-text">(共{{ musicList.length }}首)</text>
      </view>
      <scroll-view
        scroll-y
        scroll-with-animation
        style="height: calc(100% - 100px)"
      >
        <view
          class="music-item flex"
          :class="{ active: item.id == playInfo.id }"
          v-for="(item, index) in musicList"
          :key="item.id"
          @click="handlePlayMusic(item)"
        >
          <image
            :src="item.al.picUrl + '?param=60y60'"
            class="music-img"
          ></image>
          <view class="music-info">
            <view class="music-name text-overflow">{{ item.name }}</view>
            <view class="music-singer text-overflow flex">
              <span class="small-icon">{{
                item.id % 2 == 0 ? "SQ" : "HD"
              }}</span>
              {{ item.ar ? item.ar.map((item) => item.name).join("/") : "" }}
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <tab-bar currentPage="my" />
  </view>
</template>

<script>
import { getImage, getName } from "@/utils/index.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      currentType: "history",
      musicList: [],
    };
  },
  computed: mapState({
    playInfo: (state) => state.playInfo,
    paused: (state) => state.paused,
    userInfo: (state) => state.userInfo,
  }),
  onShow() {
    if (this.currentType == "history") {
      this.getUserHistory();
    } else {
      this.getUserInfo();
    }
  },
  methods: {
    //获取用户喜欢的音乐
    async getUserInfo() {
      const uid = this.userInfo.id;
      const timestamp = new Date().getTime();
      const data = await this.$api.getUserInfo({ uid, timestamp });
      const id = data.playlist[0].id;
      uni.showLoading({
        title: "加载中...",
      });
      const list = await this.$api.getPlayListData({ id, timestamp });
      const arr = list.playlist.trackIds.map((item) => item.id).join(",");
      this.musicList = [];
      if (arr) {
        const temp = await this.$api.getPlayDetail({ ids: arr, timestamp });
        this.musicList = temp.songs || [];
      }

      uni.hideLoading();
    },

    //获取用户播放记录
    async getUserHistory() {
      const uid = this.userInfo.id;
      const timestamp = new Date().getTime();
      const data = await this.$api.getUserHistory({ uid, timestamp, type: 0 });
      this.musicList = data.allData.map((item) => item.song);
    },

    changeType() {
      this.currentType = this.currentType == "history" ? "like" : "history";
      if (this.currentType == "history") {
        this.getUserHistory();
      } else {
        this.getUserInfo();
      }
    },

    //播放全部
    handlePlayAllMusic() {
      if (this.musicList.length === 0) return;
      const list = this.musicList.map((item) => {
        return {
          src: "",
          title: item.name,
          singer: getName(item),
          coverImgUrl: getImage(val),
          id: item.id,
        };
      });

      this.$store.dispatch("playAllMUsic", list);
    },

    //点击播放
    handlePlayMusic(val) {
      if (this.playInfo.id == val.id) {
        uni.navigateTo({
          url: "../play/index",
        });
        return;
      }
      this.$store.dispatch("playMusic", {
        src: "",
        title: val.name,
        singer: getName(val),
        coverImgUrl: getImage(val),
        id: val.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.my-container {
  width: 100%;
  height: 100%;
  position: relative;
  .mask-container {
    overflow: hidden;
    position: absolute;
    height: 30%;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-image: url(../../static/tabBar/head.jpg);
    &:after {
      content: "";
      position: absolute;
      width: 130%;
      height: 130%;
      left: 0;
      top: 0;
      z-index: 1;
      filter: blur(10px);
      transform: translate(-3rem, -3rem);
      background: inherit;
      background-size: 100% 100%;
    }
    .cover-mask {
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: 3;
      background-color: rgba(0, 0, 0, 0.8);
    }
    .head-img {
      width: 108px;
      height: 108px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 99;
      border-radius: 50%;
      overflow: hidden;
    }
    .username {
      position: absolute;
      left: 50%;
      bottom: 20px;
      transform: translateX(-50%);
      z-index: 99;
      color: #fff;
      font-size: 36rpx;
    }
  }
  .recommend-main {
    width: 100%;
    position: absolute;
    top: 30%;
    bottom: 50px;
    .tabs {
      box-shadow: 0 0 0.8px rgb(0, 0, 0 / 10%);
      width: 100%;
      height: 45px;
      align-items: center;
      .tab-item {
        flex: 1;
        font-size: 32rpx;
        text-align: center;
        color: rgba(0, 0, 0, 0.5);
        &.active {
          color: rgb(248, 78, 81);
        }
      }
    }
    .music-title {
      padding-left: 20px;
      margin: 15px 0;
      box-sizing: border-box;
      color: #000;
      font-size: 32rpx;
      font-weight: 600;
      .playIcon {
        margin-right: 8px;
        font-size: 40rpx;
      }
      .light-text {
        font-size: 24rpx;
        margin-left: 6px;
        color: rgba(0, 0, 0, 0.5);
      }
    }
    .music-item {
      height: 70px;
      box-sizing: border-box;
      padding: 0 20px;
      align-items: center;
      margin-bottom: 10px;
      position: relative;
      &:nth-last-of-type {
        margin-bottom: 0;
      }
      &.active {
        background-image: linear-gradient(
          to right,
          rgba(247, 73, 79, 0.1),
          rgba(247, 73, 79, 0.05)
        );
        .music-info {
          .music-name,
          .small-icon,
          .music-singer {
            color: #f84e51 !important;
          }
          &::before {
            content: "";
            width: 4px;
            height: 65px;
            background-image: linear-gradient(
              to bottom,
              rgb(253, 117, 102),
              rgb(247, 73, 79)
            );
            position: absolute;
            left: 0px;
            top: 3px;
          }
        }
      }
      .music-img {
        width: 58px !important;
        height: 58px !important;
        border-radius: 6px;
      }
      .music-info {
        margin-right: 15px;
        margin-left: 15px;
        width: calc(100vw - 135px);
        text-align: left;
        .music-name {
          font-size: 30rpx;
          margin-bottom: 7px;
          color: #000;
        }
        .music-singer {
          color: rgba(0, 0, 0, 0.5);
          font-size: 24rpx;
          align-items: center;
          .small-icon {
            margin-right: 6px;
            transform: scale(0.9);
            color: rgba(0, 0, 0, 0.5);
            font-size: 12px;
            padding: 1px 3px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 4px;
          }
        }
      }
    }
  }
}
</style>
