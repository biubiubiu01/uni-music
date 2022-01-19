<template>
	<view class="singerInfo-container">
		<view class="vague-wrapper bg-img bg-mask flex align-center" :style="{ 'background-image': 'url(' + singerInfo.cover + ')' }">
			<cu-custom class="head-title" :isBack="true" bgColor="unset"></cu-custom>
			<view class="day-recommend-info" :style="{ 'padding-top': '40px'}">
				<view class="description-wrapper">
					<view class="title">{{ singerInfo.name }}</view>
					<view class="tags flex">
						<view class="cu-capsule round" style="margin-right: 20px;">
							<view class="cu-tag tag-text">歌曲</view>
							<view class="cu-tag ">{{ singerInfo.musicSize }}</view>
						</view>
						<view class="cu-capsule round ">
							<view class="cu-tag tag-text">MV</view>
							<view class="cu-tag ">{{ singerInfo.mvSize }}</view>
						</view>
					</view>
					<view class="description" v-if="singerInfo.briefDesc">简介：{{ singerInfo.briefDesc }}</view>
				</view>
			</view>
		</view>
		<view class="recommend-main" :class="{ hasPlayInfo: playInfo.id }">
			<view class="recommend-list">
				<view class="music-title" @click="handlePlayAllMusic">
					<text class="iconfont icon-kaishi3 basic-icon-color playIcon"></text>
					全部播放
					<text class="light-text">(共{{ total }}首)</text>
				</view>
				<scroll-view scroll-y scroll-with-animation style="height: calc(100% - 55px)" @scrolltolower="reachBottom()">
					<view class="music-item flex" :class="{ active: item.id == playInfo.id }" v-for="(item, index) in musicList" :key="item.id" @click="handlePlayMusic(item)">
						<view class="index">{{ index + 1 }}</view>
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
			singerInfo: {},
			musicList: [],
			status: null,
			total: 0,
			offset: 0,
			limit: 30,
			id: ''
		};
	},
	onLoad(val) {
		this.id = val.id;
		this.getDetail();
		this.getSingerSong();
	},
	computed: mapState({
		playInfo: state => state.playInfo
	}),
	methods: {
		async getDetail() {
			const { id } = this;
			const { data } = await this.$api.getSingerInfo({ id });
			this.singerInfo = data.artist || {};
		},

		async getSingerSong() {
			uni.showLoading({
				title: '加载中...'
			});
			const { id, offset, limit } = this;
			const list = await this.$api.getSingerAllMusic({ id, order: 'hot', offset, limit });
			this.total = list.total || 0;
			this.musicList.push(...list.songs);
			this.status = null;
			uni.hideLoading();
		},

		//加载更多
		reachBottom() {
			this.status = 'loading';
			if (this.offset >= this.total) {
				this.status = 'notMore';
				return;
			}
			this.offset += 50;
			if (this.offset > this.total) {
				this.offset = this.total;
			}
			this.getSingerSong();
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
				coverImgUrl: this.singerInfo.cover + '?param=300y300',
				id: val.id
			});
		},
		handlePlayAllMusic() {
			const list = this.musicList.map(item => {
				return {
					src: '',
					title: item.name,
					singer: getName(item),
					coverImgUrl:this.singerInfo.cover + '?param=300y300' ,
					id: item.id
				};
			});
			this.$store.dispatch('playAllMUsic', list);
		}
	}
};
</script>

<style lang="scss" scoped>
.singerInfo-container {
	width: 100%;
	height: 100%;
	.vague-wrapper {
		height: 30%;
		width: 100%;
		position: relative;
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
			// justify-content: center;
			width: 100%;
			.bgImg {
				width: 200rpx;
				border-radius: 8px;
				margin-right: 20px;
			}
			.description-wrapper {
				box-sizing: border-box;
				padding: 0 15px;
				.title {
					font-size: 40rpx;
					color: #fff;
				}
				.tags {
					margin: 15px 0;
					.tag-text {
						background-color: rgb(248, 78, 81);
						color: #fff;
					}
				}
				.description {
					font-size: 24rpx;
					color: #e1d7f0;
					margin-top: 17rpx;
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
				.index {
					color: #000;
					margin-right: 3px;
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
}
</style>
