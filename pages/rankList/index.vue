<template>
	<view class="rank-container">
		<cu-custom bgColor="#fff" :isBack="true"><view slot="content" style="color: #000">排行榜</view></cu-custom>
		<scroll-view scroll-y scroll-with-animation :style="{ height: height }">
			<box-title title="TOP5" style="margin-top: 10px;"></box-title>
			<scroll-view scroll-x class="nav scroll-top">
				<view class="top-rank-item relative" v-for="(item, index) in topRankList" :key="item.id" @click="handleDeatil(item)">
					<view class="bg-img rank-item-image" :style="'background-image:url(' + item.coverImgUrl + '?param=230y230)'">
						<image src="../../static/NO1.png" mode="" v-if="index === 0" class="index"></image>
						<image src="../../static/NO2.png" mode="" v-if="index === 1" class="index"></image>
						<image src="../../static/NO3.png" mode="" v-if="index === 2" class="index"></image>
					</view>
					<view class="hot-count" v-if="item.playCount > 0">
						<text class="iconfont icon-kaishi" style="margin-right: 3.5px;"></text>
						<text>{{ playCount(item.playCount) }}</text>
					</view>
				</view>
			</scroll-view>
			<box-title title="排行榜"></box-title>
			<view class="rank-list page-background">
				<view class="rank-list-item bg-white flex" v-for="item in rankList" :key="item.id" @click="handleDeatil(item)">
					<view class="bg-img music-img" :style="'background-image:url(' + item.coverImgUrl + '?param=230y230)'">
						<view class="hot-count" v-if="item.playCount > 0">
							<text class="iconfont icon-kaishi" style="margin-right: 3.5px;"></text>
							<text>{{ playCount(item.playCount) }}</text>
						</view>
					</view>
					<view class="music-info">
						<view class="music-name">{{ item.name }}</view>
						<view class="music-tags" v-if="item.tags && item.tags.length > 0">
							<text v-for="(val, index) in item.tags" :key="val" class="cu-tag round  light" :class="index === 1 ? 'bg-blue' : index == 0 ? 'bg-olive' : 'bg-orange'">
								{{ val }}
							</text>
						</view>
						<view class="music-update" v-else>{{ item.updateFrequency }}</view>
						<view class="music-description">{{ item.description }}</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<music-control v-if="playInfo.id" />
	</view>
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
			let height = this.CustomBar
			if (this.playInfo.id) {
				height += 55;
			}
			return `calc(100%  - ${height}px)`;
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
			let list = [];
			if (data.list) {
				list = data.list.sort((a, b) => {
					return b.playCount - a.playCount;
				});
			}
			this.topRankList = list.slice(0, 5);
			this.rankList = list.slice(5);
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
	.scroll-top {
		margin-bottom: 15px;
		padding-right: 15px;
		box-sizing: border-box;
		.top-rank-item {
			width: calc(100% / 3 - 24px);
			margin-left: 15px;
			margin-top: 15px;
			display: inline-block;
			position: relative;
			.rank-item-image {
				height: 105px;
				border-radius: 6px;
				.index {
					position: absolute;
					left: -10px;
					top: -4px;
					width: 21px;
					height: 21px;
					z-index: 999;
				}
			}
		}
	}
	.rank-list {
		margin-top: 10px;
		box-sizing: border-box;

		.rank-list-item {
			margin-bottom: 5px;
			width: 100%;
			padding: 10px 15px;
			box-sizing: border-box;
			.music-img {
				width: 100px;
				height: 100px;
				border-radius: 6px;
				position: relative;
			}
			.music-info {
				flex: 1;
				margin-left: 15px;
				.music-name {
					font-size: 30rpx;
					margin-bottom: 7px;
					color: #000;
				}
				.music-tags {
					margin-bottom: 10px;
				}
				.music-update {
					color: rgba(0, 0, 0, 0.5);
					font-size: 24rpx;
					margin-bottom: 10px;
				}
				.music-description {
					white-space: normal;
					color: rgba(0, 0, 0, 0.5);
					font-size: 12px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			}
		}
	}
	.hot-count {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 40px;
		padding: 3px 6px 0 0;
		text-align: right;
		color: #fff;
		z-index: 10;
		font-size: 12px;
		background-image: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0));
		border-radius: 6px;
	}
}
</style>
