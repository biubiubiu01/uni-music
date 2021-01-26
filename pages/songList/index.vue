<template>
	<div class="playList-container">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true"><block slot="content">歌单列表</block></cu-custom>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="item.name == currentName ? 'text-orange cur' : ''" v-for="(item, index) in tagList" :key="index" @click="tabSelect(item, index)">
				{{ item.name }}
			</view>
		</scroll-view>
		<scroll-view scroll-y scroll-with-animation @scrolltolower="reachBottom()"  :style="{ height: height, 'margin-top': '20rpx' }">
			<view class="tower-swiper" @touchmove="TowerMove" @touchstart="TowerStart" @touchend="TowerEnd">
				<view
					class="tower-item"
					:class="item.zIndex == 1 ? 'none' : ''"
					v-for="(item, index) in swiperList"
					:key="index"
					:style="[{ '--index': item.zIndex, '--left': item.mLeft }]"
					:data-direction="direction"
					@click="toPlayListDetail(item)"
				>
					<view class="swiper-item">
						<image :src="item.coverImgUrl + '?param=200y200'" mode="aspectFill" style="border-radius: 8px;">
							<view class="title" v-if="item.mLeft == 0">{{ item.name }}</view>
						</image>
					</view>
				</view>
			</view>
			<div class="musicList">
				<view class="list-item" v-for="item in recommendList" :key="item.id">
					<view class="hotCount" v-if="item.playCount > 0 || item.playcount > 0">
						<text class="iconfont icon-kaishi" style="margin-right: 3.5px;"></text>
						<text>{{ playCount(item.playCount || item.playcount) }}</text>
					</view>

					<view class="bg-img flex align-end list-item-image" :style="'background-image:url(' + item.coverImgUrl + '?param=230y230)'" @click="toPlayListDetail(item)">
						<view class="bg-shadeBottom padding-top-xl radioName">{{ item.name }}</view>
					</view>
					<view class="list-item-text">{{ item.name }}</view>
				</view>
				<view class="loading" v-if="status == 'loading' || status == 'notMore'">{{ status == 'notMore' ? '没有更多了' : '努力加载中...' }}</view>
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
			recommendList: [],
			direction: '',
			swiperList: [],
			currentName: '全部',
			scrollLeft: 0,
			tagList: [],
			status: null,
			total: 0,
			offset: 0,
		};
	},
	created() {
		this.getSongTagList();
		this.getRecommendData();
	},
	computed: {
		height() {
			let height = this.CustomBar / (uni.upx2px(this.CustomBar) / this.CustomBar) + 110;
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
		reachBottom() {
			this.status = 'loading';
			if (this.offset >= this.total) {
				this.status = 'notMore';
				return;
			}
			this.offset += 30;
			if (this.offset > this.total) {
				this.offset = this.total;
			}

			this.getRecommendData(true);
		},

		async getRecommendData(bool) {
			uni.showLoading({
				title: '加载中...'
			});
			const cat = this.currentName;
			const offset = this.offset;
			const data = await this.$api.getSongList({ cat, offset, limit: 30, order: 'hot' });
			this.total = data.total || 0;
			let list = data.playlists || [];
			if (bool) {
				this.recommendList.push(...list);
				this.status = null;
			} else {
				let swiperList = list.slice(0, 6);
				swiperList.forEach((item, index) => {
					item.zIndex = parseInt(swiperList.length / 2) + 1 - Math.abs(index - parseInt(swiperList.length / 2));
					item.mLeft = index - parseInt(swiperList.length / 2);
				});
				this.swiperList = swiperList;
				this.recommendList = list.slice(6);
			}

			uni.hideLoading();
		},
		async getSongTagList() {
			const data = await this.$api.getSongTagList();
			let list = data.sub || [];
			this.tagList = [{ name: '全部' }, ...list];
		},
		playCount(val) {
			return filterPlayCount(val);
		},
		tabSelect(val, index) {
			this.currentName = val.name;
			this.scrollLeft = (index - 1) * 60;
			this.offset = 0;
			this.total = 0;
			this.swiperList = [];
			this.recommendList = [];
			this.getRecommendData();
		},
		// towerSwiper触摸开始
		TowerStart(e) {
			this.towerStart = e.touches[0].pageX;
		},
		// towerSwiper计算方向
		TowerMove(e) {
			this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left';
		},
		// towerSwiper计算滚动
		TowerEnd(e) {
			let direction = this.direction;
			let list = this.swiperList;
			if (direction == 'right') {
				let mLeft = list[0].mLeft;
				let zIndex = list[0].zIndex;
				for (let i = 1; i < this.swiperList.length; i++) {
					this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft;
					this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex;
				}
				this.swiperList[list.length - 1].mLeft = mLeft;
				this.swiperList[list.length - 1].zIndex = zIndex;
			} else {
				let mLeft = list[list.length - 1].mLeft;
				let zIndex = list[list.length - 1].zIndex;
				for (let i = this.swiperList.length - 1; i > 0; i--) {
					this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft;
					this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex;
				}
				this.swiperList[0].mLeft = mLeft;
				this.swiperList[0].zIndex = zIndex;
			}
			this.direction = '';
			this.swiperList = this.swiperList;
		},

		toPlayListDetail(val) {
			uni.navigateTo({
				url: '../songDetail/index?id=' + val.id
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.playList-container {
	width: 100%;
	height: 100%;
	.tower-swiper {
		height: 400rpx !important;
		overflow: unset;
		.tower-item {
			width: 330rpx;
			transform: scale(calc(0.5 + var(--index) / 10));
			margin-left: calc(var(--left) * 100upx - 150upx);
			z-index: var(--index);
			.title {
				text-align: center;
				margin-top: 10px;
				position: absolute;
			}
		}
	}
	.musicList {
		padding-left: 15px;
		width: 100%;
		position: relative;
		margin-top: 60px;
		box-sizing: border-box;
		.list-item {
			width: calc(100% / 3 - 15px);
			margin-right: 15px;
			margin-bottom: 7px;
			display: inline-block;
			overflow: hidden;
			position: relative;
			border-radius: 7px;

			.hotCount {
				position: absolute;
				width: 100%;
				height: 50px;
				padding: 3px 6px 0 0;
				text-align: right;
				color: #fff;
				z-index: 10;
				font-size: 12px;
				background-image: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0));
			}

			.list-item-image {
				height: 115px;
				border-radius: 7px;
			}

			.list-item-text {
				height: 35px;
				width: 100%;
				padding-top: 2px;
				white-space: normal;
				color: #666;
				font-size: 12px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}

			.radioName {
				width: 100%;
				color: #fff;
				font-size: 12px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				padding: 0 0 8px 8px;
			}
		}
	}
}
</style>
