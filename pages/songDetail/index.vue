<template>
	<div class="playList-container">
		<div class="list-description">
			<div class="mask">
				<div v-if="bgImg" class="album-cover" :style="{ 'background-image': 'url(' + bgImg + ')' }"></div>
				<div class="cover-mask" style="opacity:0.6;"></div>
			</div>
			<cu-custom style="color:#fff" bgColor="unset" :isBack="true"><block slot="content">歌单详情</block></cu-custom>
			<div class="description-wrapper">
				<image :src="bgImg" class="images" v-if="bgImg"></image>
				<div class="text" v-if="currentPlayList.name">
					<p class="title">{{ currentPlayList.name }}</p>
					<p class="content">
						<image :src="currentPlayList.creator.avatarUrl + '?param45y45'" mode="" class="avatar"></image>
						{{ currentPlayList.creator.nickname }}
					</p>
					<p class="description" v-if="currentPlayList.description">简介：{{ currentPlayList.description }}</p>
				</div>
			</div>
		</div>

		<div class="music-all-list" :class="{ hasControl: playInfo }">
			<div class="music-title" @click="handlePlayAllMusic">
				<text class="iconfont icon-kaishi3 playIcon"></text>
				播放全部 ({{ musicList.length }})
			</div>
			<scroll-view scroll-y style="height: calc(100% - 40px);margin-top: 10px;">
				<div class="music-item flex" v-for="(item, index) in musicList" :class="{ lastMusic: index == musicList.length - 1 }" :key="item.id" @click="handlePlayMusic(item)">
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
			currentPlayList: {},
			musicList: []
		};
	},
	onLoad(val) {
		this.getPlayDetail(val.id);
	},
	computed: {
		bgImg() {
			return this.currentPlayList.coverImgUrl + 'param?300y300';
		},
		playInfo() {
			return this.$store.state.playInfo;
		},
		playing() {
			return this.$store.state.playing;
		}
	},
	methods: {
		async getPlayDetail(id) {
			uni.showLoading({
				title: '加载中...'
			});
			const data = await this.$api.getPlayListData({ id });
			this.currentPlayList = data.playlist || [];
			const arr = data.playlist.trackIds.map(item => item.id).join(',');
			const list = await this.$api.getPlayDetail({ ids: arr });
			this.musicList = list.songs || [];
			uni.hideLoading();
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
		}
	}
};
</script>

<style lang="scss" scoped>
.playList-container {
	width: 100%;
	height: 100%;
	.lastMusic {
		border-bottom: unset !important;
	}
}
</style>
