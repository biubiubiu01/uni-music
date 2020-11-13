<template>
	<view class="radius shadow fotter-container" v-if="playInfo">
		<view class="fixed-container">
			<view class="cu-avatar playImage round" :style="'background-image:url('+playInfo.img1v1Url+')'"></view>
			<view class="play-center">
				<view class="music-name">
					{{playInfo.name}}
				</view>
				<view class="music-author">
					{{playInfo.author}}
				</view>
			</view>
			<view class="play-right">
				<play-icon :playInfo="playInfo"></play-icon>
				<text class="iconfont icon-liebiao play-list"></text>
			</view>
		</view>
	</view>

</template>

<script>
	import playIcon from "@/components/playIcon/index.vue"
	export default {
		data() {
			return {
				
			}
		},
		components:{playIcon},
		computed: {
			playInfo() {
				return this.$store.state.playInfo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fotter-container {
		height: 110rpx;
		width: 100%;

		.fixed-container {
			position: fixed;
			z-index: 20;
			width: 100%;
			height: 110rpx;
			bottom: 50px;
			border-top: 1px solid rgba(0, 0, 0, 0.33);
			display: flex;
			background: #fff;
		}

		.playImage {
			width: 80rpx;
			height: 80rpx;
			margin: auto 12px auto 6px;
		}

		.play-center {
			flex: auto;
			display: flex;
			flex-wrap: wrap;
			align-content: center;

			.music-name {
				color: #000;
				font-size: 30rpx;
				margin-bottom: 3px;
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.music-author {
				font-size: 12px;
				color: #666;
				width: 100%;
			}
		}

		.play-right {
			width: 92px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.play-list {
				font-size: 28px;
				margin-right: 12px;
			}
		}
	}
</style>
