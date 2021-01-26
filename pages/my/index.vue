<template>
	<div class="my-container">
		<div class="list-description">
			<div class="mask">
				<div class="album-cover bgImg"><open-data type="userAvatarUrl"></open-data></div>
				<div class="head"><open-data type="userAvatarUrl"></open-data></div>
				<div class="cover-mask" style="opacity:0.6;"></div>
			</div>
		</div>
		<div class="music-all-list" :class="{ hasControl: playInfo }">
			<div class="tabs">
				<view class="tab-item" :class="{ active: currentType == 'history' }" @click="changeType">最近</view>
				<view class="tab-item" :class="{ active: currentType == 'like' }" @click="changeType">喜欢</view>
			</div>
			<div class="music-title" style="margin:15px 0" v-if="musicList.length > 0" @click="handlePlayAllMusic">
				<text class="iconfont icon-kaishi3 playIcon"></text>
				播放全部 ({{ musicList.length }})
			</div>
			<scroll-view scroll-y scroll-with-animation :style="{ height: height }">
				<div class="music-item flex" :class="{ lastMusic: index == musicList.length - 1 }" v-for="(item, index) in musicList" :key="item.id" @click="handlePlayMusic(item)">
					<span class="index">{{ index + 1 }}</span>
					<image :src="item.al.picUrl + '?param=60y60'" mode="" class="musicImg"></image>
					<div class="rightInfo">
						<div class="music-info">
							<span :style="{ color: item.id == playInfo.id ? '#ff9700' : 'rgb(86,124,166)' }">{{ item.name }}</span>
							<span v-if="item.alia.length > 0" style="margin-left: 5px;">({{ item.alia[0] }})</span>
						</div>
						<div class="music-info" style="margin-top:6px;">
							<span v-for="(val, i) in item.ar" :key="val.id">
								{{ val.name }}
								<span v-if="i != item.ar.length - 1" style="margin:0 3px">/</span>
							</span>
							<span v-if="item.al.name" style="margin-left: 5px;">- {{ item.al.name }}</span>
						</div>
					</div>
				</div>
			</scroll-view>
		</div>
		<music-control />
	</div>
</template>

<script>
import { getImage, getName } from '@/utils/index.js';
export default {
	data() {
		return {
			currentType: 'history',
			musicList: []
		};
	},
	computed: {
		userInfo() {
			return this.$store.state.userInfo;
		},
		playInfo() {
			return this.$store.state.playInfo;
		},
		playing() {
			return this.$store.state.playing;
		},
		height() {
			let height = 30;
			if (this.musicList.length > 0) {
				height += 55;
			}
			return `calc(100%  - ${height}px)`;
		}
	},
	onShow() {
		if (this.currentType == 'history') {
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
			const id=data.playlist[0].id
			uni.showLoading({
				title: '加载中...'
			});
			const list = await this.$api.getPlayListData({ id });
			const arr = list.playlist.trackIds.map(item => item.id).join(',');
			const temp = await this.$api.getPlayDetail({ ids: arr });
			this.musicList = temp.songs || [];
			uni.hideLoading();
		},

		//获取用户播放记录
		async getUserHistory() {
			const uid = this.userInfo.id;
			const timestamp = new Date().getTime();
			const data = await this.$api.getUserHistory({ uid, timestamp, type: 0 });
			this.musicList = data.allData.map(item => item.song);
		},

		changeType() {
			this.currentType = this.currentType == 'history' ? 'like' : 'history';
			if (this.currentType == 'history') {
				this.getUserHistory();
			} else {
				this.getUserInfo();
			}
		},

		//播放全部
		handlePlayAllMusic() {
			let list = this.musicList.map(item => {
				return {
					name: item.name,
					id: item.id,
					img1v1Url: getImage(item),
					author: getName(item)
				};
			});
			this.$store.dispatch('playAllMUsic', list);
		},

		//点击播放
		handlePlayMusic(val) {
			if (this.playing && this.playInfo && this.playInfo.id == val.id) {
				uni.navigateTo({
					url: '../play/index'
				});
				return;
			}
			let currentPlay = {
				name: val.name,
				id: val.id,
				img1v1Url: getImage(val),
				author: getName(val)
			};
			this.$store.dispatch('playMusic', currentPlay);
		}
	}
};
</script>

<style lang="scss" scoped>
.my-container {
	width: 100%;
	height: 100%;
	position: relative;
	.head {
		width: 235rpx;
		height: 235rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 99;
		border-radius: 50%;
		overflow: hidden;
	}
	.lastMusic {
		border-bottom: unset !important;
	}
	.tabs {
		border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
		padding-bottom: 10px;
		width: 100%;
		.tab-item {
			width: 50%;
			display: inline-block;
			text-align: center;
			&.active {
				color: #ff9700;
			}
		}
	}
}
</style>
