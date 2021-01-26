<template>
	<div class="rank-container">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true"><block slot="content">排行榜</block></cu-custom>

		<scroll-view scroll-y scroll-with-animation class="musicList" :style="{ height: height }">
			<div style="margin: 10px 0;border-bottom: 1upx solid rgba(0,0,0,0.1);">
				<view class="top-item relative" v-for="item in topRankList" :key="item.id" @click="handleDeatil(item)">
					<view class="leftImage">
						<image :src="item.coverImgUrl" style="width: 100%;height: 100%;border-radius: 6px;"></image>
						<view class="collectCount" v-if="item.playCount > 0">
							<text class="iconfont icon-kaishi" style="margin-right: 3.5px;"></text>
							<text>{{ playCount(item.playCount) }}</text>
						</view>
					</view>
					<view class="rightMusic">
						<p class="title">{{ item.name }}</p>
						<p v-for="(val, index) in item.tracks" :key="index" class="music-item">
							<span class="index">{{ index + 1 }}.</span>
							<text class="musicName">{{ val.first }}</text>
							<text class="text">- {{ val.second }}</text>
						</p>
					</view>
				</view>
			</div>

			<div style="margin-top: 15x;">
				<view class="list-item" v-for="item in rankList" :key="item.id" @click="handleDeatil(item)">
					<view class="collectCount" v-if="item.playCount > 0">
						<text class="iconfont icon-kaishi" style="margin-right: 3.5px;"></text>
						<text>{{ playCount(item.playCount) }}</text>
					</view>

					<view class="bg-img flex align-end list-item-image" :style="'background-image:url(' + item.coverImgUrl + '?param=250y250)'"></view>
					<view class="list-item-text">{{ item.name }}</view>
				</view>
			</div>
		</scroll-view>
		<music-control />
	</div>
</template>

<script>
import { filterPlayCount } from '@/utils/index.js';
export default {
	data() {
		return {
			rankList: [],
			topRankList: []
		};
	},
	created() {
		this.getRankList();
	},
	computed: {
		height() {
			let height = this.CustomBar / (uni.upx2px(this.CustomBar) / this.CustomBar) + 20;
			if (this.playInfo) {
				height += 110;
			}
			return `calc(100%  - ${height}rpx)`;
		},
		playInfo() {
			return this.$store.state.playInfo;
		}
	},
	methods: {
		async getRankList() {
			uni.showLoading({
				title: '加载中...'
			});
			const data = await this.$api.getRankList();
			this.topRankList = data.list.slice(0, 4);
			this.rankList = data.list.slice(4);
			uni.hideLoading();
		},
		playCount(val) {
			return filterPlayCount(val);
		},
		handleDeatil(val) {
			uni.navigateTo({
				url: '../songDetail/index?id=' + val.id
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.rank-container {
	width: 100%;
	height: 100%;
	.musicList {
		padding: 0 5px 0 15px;
		width: 100%;
		position: relative;
		margin-top: 20rpx;
		box-sizing: border-box;
		.top-item {
			margin-bottom: 8rpx;
			.leftImage {
				display: inline-block;
				height: 210rpx;
				width: 210rpx;
				position: relative;
			}
			.rightMusic {
				width: calc(100% - 260rpx;);
				margin-left: 40rpx;
				display: inline-block;
				.title {
					font-weight: 600;
					font-size: 32rpx;
					margin: 8px 0;
				}
				.music-item {
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-bottom: 12rpx;
					.index {
						margin-right: 3px;
					}
					.musicName {
						font-size: 28rpx;
						color: rgba(0, 0, 0, 0.7);
						margin-right: 5px;
					}
					.text {
						font-size: 12px;
						color: #666;
					}
				}
			}
		}
		.collectCount {
			position: absolute;
			right: 5px;
			top: 3px;
			padding: 2px 8px;
			border-radius: 15px;
			color: #fff;
			z-index: 10;
			font-size: 12px;
			background: rgba(0, 0, 0, 0.15);
		}
		.list-item {
			width: calc(100% / 3 - 10px);
			margin: 8px 10px 7px 0;
			display: inline-block;
			overflow: hidden;
			position: relative;
			border-radius: 7px;

			.list-item-image {
				height: 210rpx;
				border-radius: 7px;
			}
			.list-item-text {
				width: 100%;
				padding-top: 2px;
				color: #666;
				font-size: 14px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
}
</style>
