<template>
	<div class="play-container">
		<div class="mask">
			<div class="album-cover" :style="{ 'background-image': 'url(' + bgImg + ')' }"></div>
			<div class="cover-mask" style="opacity:0.6;"></div>
		</div>
		<cu-custom style="color:#fff" :isBack="true">
			<block slot="content" class="musicName">{{ playInfo.name }}</block>
		</cu-custom>
		<view class="author" :style="{ top: CustomBar + 'px' }">{{ playInfo.author }}</view>
		<view class="img-container" :style="{ transform: 'translate(-50%, -50%) rotate(' + rotate + 'deg)' }" v-show="!lyricShow">
			<image :src="bgImg" class="authorImg" @click="getLyric"></image>
		</view>
		<scroll-view scroll-y v-if="lyricShow" @click="lyricShow = false" :scroll-top="scrollTop" style="height: 60%;margin-top: 30px;">
			<view v-if="lyricList.length > 0">
				<view class="lyric-item" :class="{ active: index == currentLyricIndex }" v-for="(item, index) in lyricList" :key="index" style="text-align: center;">
					{{ item.words }}
				</view>
			</view>
			<p v-else class="noLyric">暂无歌词</p>
		</scroll-view>
		<view class="bottom-control">
			<view class="progress">
				<view class="audio-number">{{ format(currentTime) }}</view>
				<slider class="audio-slider" activeColor="#ff9700" block-size="8" :value="currentTime" :max="duration" @change="handleChange" @changing="slideChange"></slider>
				<view class="audio-number">{{ format(duration) }}</view>
			</view>
			<view class="iconList flex">
				<text class="iconfont" :class="likeList.indexOf(playInfo.id) != -1 ? 'icon-like lighIcon' : 'icon-unlike'" @click="likeMusic" style="margin-right: 65rpx;"></text>
				<text class="iconfont icon-play-left" @click="handleChangePlay('prev')"></text>
				<text class="iconfont" :class="playing ? 'icon-play' : 'icon-pause'" style="font-size: 90rpx;margin: 0 35px;" @click="playMusic"></text>
				<text class="iconfont icon-play-right" @click="handleChangePlay('next')"></text>
				<text class="iconfont icon-liebiao" style="margin-left: 65rpx;font-size: 56rpx;" @click.stop="modelShow = true"></text>
			</view>
		</view>
		<play-list :modelShow="modelShow" @handleClose="modelShow = false" @backHome="backHome"></play-list>
	</div>
</template>

<script>
import { debounce } from '@/utils/index.js';
import playList from '../../components/musicControl/playList.vue';
export default {
	data() {
		return {
			duration: 0,
			currentTime: 0,
			seeking: false,
			slideChange: null,
			timer: null,
			rotate: 0,
			modelShow: false,
			lyricShow: false,
			lyricList: [],
			scrollTop: 0,
			currentLyricIndex: 0,
			CustomBar: this.CustomBar,
			audioSrc: '',
			likeList: []
		};
slideChange	},
	components: { playList },
	computed: {
		playInfo() {
			return this.$store.state.playInfo;
		},
		playing() {
			return this.$store.state.playing;
		},
		playList() {
			return this.$store.state.playList;
		},
		userInfo() {
			return this.$store.state.userInfo;
		},
		bgImg() {
			if (this.playInfo && this.playInfo.img1v1Url) {
				return this.playInfo.img1v1Url;
			}
			return '';
		}
	},
	created() {
		this.slideChange = debounce(e => {
			this.handleChanging(e);
		}, 300);
	},
	onShow() {
		if (this.playing) {
			this.initRotate();
		} else {
			clearInterval(this.timer);
		}
		this.duration = this.$audio.duration || 0;
		this.currentTime = this.$audio.currentTime || 0;
		//音频更新
		this.$audio.onTimeUpdate(() => {
			if (!this.seeking) {
				this.currentTime = this.$audio.currentTime;
				for (var i = 0; i < this.lyricList.length - 1; i++) {
					var prevTime = this.lyricList[i].time,
						nextTime = this.lyricList[i + 1].time;
					if (parseFloat(this.currentTime) > prevTime && parseFloat(this.currentTime) < nextTime) {
						this.currentLyricIndex = i;
						this.scrollTop = this.currentLyricIndex * 36;
						return;
					}
				}
			}
		});
		this.$audio.onPlay(() => {
			this.audioSrc = this.$audio.src;
		});
		this.$audio.onPrev(() => {
			if (this.playList.length == 1) {
				return;
			}
			this.handleChangePlay('prev');
		});
		this.$audio.onNext(() => {
			if (this.playList.length == 1) {
				return;
			}
			this.handleChangePlay('next');
		});
		this.$audio.onEnded(() => {
			if (this.playList.length == 1) {
				this.$store.commit('SET_PLAYING', false);
				clearInterval(this.timer);
				return;
			}
			this.handleChangePlay('next');
		});
		this.getLikeData();
	},
	methods: {
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
			let bool = false;
			if (this.likeList.indexOf(this.playInfo.id) == -1) {
				bool = true;
			}
			const timestamp = new Date().getTime();
			const data = await this.$api.likeMusic({ id: this.playInfo.id, timestamp, like: bool });
			this.getLikeData();
		},
		//拖动 中
		handleChanging(e) {
			this.seeking = true;
			this.currentTime = e.detail.value;
			for (var i = 0; i < this.lyricList.length - 1; i++) {
				var prevTime = this.lyricList[i].time,
					nextTime = this.lyricList[i + 1].time;
				if (parseFloat(this.currentTime) > prevTime && parseFloat(this.currentTime) < nextTime) {
					this.currentLyricIndex = i;
					this.scrollTop = this.currentLyricIndex * 36;
					return;
				}
			}
		},
		//拖动 完成
		handleChange(e) {
			this.$audio.seek(e.detail.value);
			this.seeking = false;
		},
		//播放或暂停
		playMusic() {
			if (this.playing) {
				this.$audio.pause();
				clearInterval(this.timer);
			} else {
				this.$audio.play();
				this.initRotate();
			}
			this.$store.commit('SET_PLAYING', !this.playing);
		},

		//旋转
		initRotate() {
			this.timer = setInterval(() => {
				this.rotate += 9;
			}, 1000);
		},

		//获取歌词
		async getLyric() {
			this.lyricShow = true;
			let data = [];
			if (this.playInfo.source) {
				const songmid = this.playInfo.id;
				const res = await this.$api.searchQQMusicLyric({ songmid });
				data = (res.data.lyric || '').split('\n');
			} else {
				const id = this.playInfo.id;
				const res = await this.$api.getLyric({ id });
				data = (res.lrc.lyric || '').split('\n');
			}
			let arr = [];
			data.forEach(item => {
				var words = item.split(']');
				var time = words[0].slice(1, 10);
				arr.push({
					time: (time.slice(0, 2) - 0) * 60 + (time.slice(3, 5) - 0) + (time.slice(6, 9) - 0) / 1000, //歌词时间转换为秒
					words: words[1] ? words[1] : ''
				});
			});
			this.lyricList = arr;
		},
		//格式化时间
		format(num) {
			return '0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(Math.floor(num % 60)).length) + Math.floor(num % 60);
		},

		//切换歌曲  --上一首或下一首
		handleChangePlay(val) {
			this.$store.dispatch('changePlay', val);
		},

		backHome() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.play-container {
	position: relative;
	width: 100%;
	height: 100%;
	.lighIcon {
		color: #ff9700 !important;
	}
	.lyric-item {
		color: #fcf7e9;
		height: 40px;
		line-height: 40px;
		&.active {
			color: #ff9700;
		}
	}
	.noLyric {
		position: absolute;
		top: 50%;
		left: 50%;
		color: #fff;
		transform: translate(-50%, -50%);
	}
	.musicName {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.author {
		position: absolute;
		top: 55px;
		left: 50%;
		transform: translateX(-50%);
		color: #ccc;
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
