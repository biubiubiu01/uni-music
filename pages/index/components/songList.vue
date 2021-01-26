<template>
	<scroll-view scroll-x class="music-list-wrapper zy-list" scroll-with-animation>
		<view class="list-item" v-for="item in currentList" :key="item.id">
			<view class="hotCount" v-if="item.playCount>0||item.playcount>0">
				<text class="iconfont icon-kaishi" style="margin-right: 3.5px;"></text>
				<text>{{filterPlayCount(item.playCount||item.playcount)}}</text>
			</view>

			<view class="bg-img flex align-end list-item-image" :style="'background-image:url('+(item.picUrl||item.coverImgUrl)+'?param=230y230)'" @click="toPlayListDetail(item)">
				<view class="bg-shadeBottom padding-top-xl radioName" v-if="type">
					{{item.name}}
				</view>
			</view>
			<view class="list-item-text">{{type?item.rcmdtext:item.name}}</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		props: {
			currentList: {
				type: Array
			},
			type: {
				type: String,
				default: ''
			}
		},
		methods: {
			filterPlayCount(val) {
				if (!val || val <= 0) return 0
				else if (val < 1000) return val
				else if (val >= 1000 && val < 10000) return Math.ceil(val / 1000) + '千'
				else if (val >= 10000 && val < 100000000) return Math.ceil(val / 10000) + '万'
				return Math.ceil(val / 100000000) + '亿'
			},
			toPlayListDetail(val){
				uni.navigateTo({
					url: '../songDetail/index?id='+val.id
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.music-list-wrapper {
		white-space: nowrap;
		.list-item {
			width: 27.5%;
			margin: 0 6px;
			display: inline-block;
			overflow: hidden;
			position: relative;

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
</style>
