<template>
	<view>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="handleToHome">
				<view class="cuIcon-cu-image"><image :src="'../../static/tabBar/' + [currentPage == 'home' ? 'recommendHL' : 'recommend'] + '.png'"></image></view>
				<view :class="currentPage == 'home' ? 'tabbar-text-active-color' : 'tabbar-text-color'" style="margin-top:2px">首页</view>
			</view>
			<view class="action add-action" v-if="playInfo&&playInfo.id" @click="handleToPlay">
				<image :src="playInfo.coverImgUrl" mode="" class="music-img" :style="{ transform: 'rotate(' + rotate + 'deg)' }"></image>
			</view>
			<view class="action"  @click="handleToMy">
				<view class="cuIcon-cu-image"><image :src="'../../static/tabBar/' + [currentPage == 'my' ? 'myHL' : 'my'] + '.png'"></image></view>
				<view :class="currentPage == 'my' ? 'tabbar-text-active-color' : 'tabbar-text-color'" style="margin-top:2px">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	props: {
		currentPage: {
			type: String,
			default: 'home'
		}
	},
	computed: mapState({
		playInfo: state => state.playInfo,
		paused: state => state.paused
	}),
	data() {
		return {
			time: null,
			rotate: 0
		};
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			if (!this.paused) {
				this.initRotate();
			} else {
				clearInterval(this.timer);
			}
		},
		handleToPlay() {
			uni.navigateTo({
				url: '/pages/play/index'
			});
		},
		
		handleToMy(){
			uni.navigateTo({
				url: '/pages/my/index'
			});
		},
		
		handleToHome(){
			uni.navigateTo({
				url: '/pages/index/index'
			});
		},

		initRotate() {
			this.timer = setInterval(() => {
				this.rotate += 15;
			}, 1000);
		}
	},
	watch: {
		paused() {
			this.init();
		}
	}
};
</script>
<style lang="scss" scoped>
.music-img {
	position: absolute;
	width: 35px;
	z-index: 2;
	height: 35px;
	border-radius: 50%;
	line-height: 35px;
	font-size: 25px;
	top: -17px;
	left: 0;
	right: 0;
	margin: auto;
	padding: 0;
	transition: all 1s linear;
}
</style>
