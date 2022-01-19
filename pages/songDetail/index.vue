<template>
	<view class="song-detail-container">
		<view class="vague-wrapper  flex align-center">
			<image src="../../static/background.png" class="background-img"></image>
			<view class="absolve-wrapper">
			<cu-custom class="head-title" :isBack="true" bgColor="unset"><block slot="content">歌单详情</block></cu-custom>
			<view class="day-recommend-info" :style="{ 'padding-top': CustomBar + 'px' }">
				<image :src="bgImg" mode="widthFix" class="bgImg"></image>
				<view class="song-info">
					<view class="name text-overflow">{{ currentPlayList.name }}</view>
					<view class="content" v-if="currentPlayList.creator">
						<image :src="currentPlayList.creator.avatarUrl + '?param45y45'" mode="" class="avatar"></image>
						{{ currentPlayList.creator.nickname }}
					</view>
					<view class="description" v-if="currentPlayList.description">简介：{{ currentPlayList.description }}</view>
				</view>
			</view>
		</view>
		</view>
		<view class="recommend-main" :class="{ hasPlayInfo: playInfo.id }">
			<view class="recommend-list">
				<view class="music-title" @click="handlePlayAllMusic">
					<text class="iconfont icon-kaishi3 basic-icon-color playIcon"></text>
					全部播放
					<text class="light-text">(共{{ musicList.length }}首)</text>
				</view>
				<scroll-view scroll-y scroll-with-animation style="height: calc(100% - 55px)">
					<view class="music-item flex" :class="{ active: item.id == playInfo.id }" v-for="(item, index) in musicList" :key="item.id" @click="handlePlayMusic(item)">
						<image :src="item.al.picUrl + '?param=60y60'" mode="widthFix" class="music-img"></image>
						<view class="music-info">
							<view class="music-name text-overflow">{{ item.name }}</view>
							<view class="music-singer text-overflow flex">
								<span class="small-icon">{{ item.id % 2 == 0 ? 'SQ' : 'HD' }}</span>
								{{ item.ar ? item.ar.map(item => item.name).join('/') : '' }}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<music-control v-if="playInfo.id" />
	</view>
</template>

<script>
import { getImage, getName } from '@/utils/index.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			currentPlayList: {},
			musicList: [],
			bgImg: '',
			CustomBar:this.CustomBar-15
		};
	},
	onLoad(val) {
		this.getPlayDetail(val.id);
	},
	computed: mapState({
		playInfo: state => state.playInfo
	}),
	methods: {
		async getPlayDetail(id) {
			uni.showLoading({
				title: '加载中...'
			});
			const data = await this.$api.getPlayListData({ id });
			this.currentPlayList = data.playlist || [];
			this.bgImg = this.currentPlayList.coverImgUrl + 'param?300y300';
			const arr = data.playlist.trackIds.map(item => item.id).join(',');
			const list = await this.$api.getPlayDetail({ ids: arr });
			this.musicList = list.songs || [];
			uni.hideLoading();
		},
		//点击播放
		handlePlayMusic(val) {
			if (this.playInfo.id == val.id) {
				uni.navigateTo({
					url: '../play/index'
				});
				return;
			}
			this.$store.dispatch('playMusic', {
				src: '',
				title: val.name,
				singer: getName(val),
				coverImgUrl: getImage(val),
				id: val.id
			});
		},

		//播放全部
		handlePlayAllMusic() {
			const list = this.musicList.map(item => {
				return {
					src: '',
					title: item.name,
					singer: getName(item),
					coverImgUrl: getImage(item),
					id: item.id
				};
			});
			this.$store.dispatch('playAllMUsic', list);
		}
	}
};
</script>

<style lang="scss" scoped>
.song-detail-container {
	width: 100%;
	height: 100%;
	.vague-wrapper {
		height: 30%;
		width: 100%;
		position: relative;
		.background-img{
		   width: 100%;
		   height: 100%;
		}
		.absolve-wrapper{
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.5);
		}
		.head-title {
			color: #fff;
			position: absolute;
			top: 0;
			width: 100%;
			z-index: 9999;
		}
		.day-recommend-info {
			box-sizing: border-box;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			.bgImg {
				width: 200rpx;
				border-radius: 8px;
				margin-right: 20px;
			}
			.song-info {
				margin-bottom: 12rpx;
				color: #fff;
				max-width: calc(100% - 175px);
				.name {
					font-size: 32rpx;
				}
				.content {
					margin: 15rpx 0;
					color: #fff;
					.avatar {
						width: 25px;
						height: 25px;
						border-radius: 50%;
						display: inline-block;
						vertical-align: middle;
						margin-right: 6px;
					}
				}
				.description {
					font-size: 24rpx;
					color: #e1d7f0;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					line-height: 18px;
				}
			}
		}
	}
	.recommend-main {
		height: 70%;
		width: 100%;
		position: relative;
		&.hasPlayInfo {
			height: calc(70% - 110rpx);
		}
		.recommend-list {
			position: absolute;
			top: -5%;
			left: 0;
			right: 0;
			bottom: 0;
			background: #fff;
			border-top-left-radius: 26px;
			border-top-right-radius: 26px;
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
				width: 100%;
				&:last-of-type {
					margin-bottom: 0;
				}
				&.active {
					background-image: linear-gradient(to right, rgba(247, 73, 79, 0.1), rgba(247, 73, 79, 0.05));
					.music-info {
						.music-name,
						.small-icon,
						.music-singer {
							color: #f84e51 !important;
						}
						&::before {
							content: '';
							width: 4px;
							height: 65px;
							background-image: linear-gradient(to bottom, rgb(253, 117, 102), rgb(247, 73, 79));
							position: absolute;
							left: 0px;
							top: 3px;
						}
					}
				}
				.music-img {
					width: 58px;
					border-radius: 6px;
				}
				.music-info {
					margin-left: 15px;
					max-width: calc(100% - 75px);
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
}
</style>
