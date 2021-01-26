<template>
	<view>
		<cu-custom bgColor="bg-gradual-orange" :isBack="true"><block slot="content">热门歌手</block></cu-custom>
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-' + listCurID" :style="[{ height: height }]" :scroll-with-animation="true" :enable-back-to-top="true">
			<block v-for="(item, index) in list" :key="index">
				<view :class="'indexItem-' + item.name" :id="'indexes-' + item.name" :data-index="item.name">
					<view class="padding">{{ item.name }}</view>
					<view class="cu-list menu-avatar no-padding">
						<view class="cu-item" v-for="val in item.value" :key="val.id" @click.self="searchDetailSinger(val)">
							<view class="cu-avatar round lg" :style="'background-image:url(' + val.picUrl + '?param=100y100)'"></view>
							<view class="content">
								<view class="text-grey">{{ val.name }}</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="indexBar" :style="[{ height: 'calc(' + height + ' - 50px)' }]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item, index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur">{{ item.name }}</view>
			</view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">{{ listCur }}</view>
		<music-control />
	</view>
</template>

<script>
import { getGroupByPinyin } from '../../plugins/pinyin/utils.js';
export default {
	data() {
		return {
			hidden: true,
			listCurID: '',
			list: [],
			listCur: ''
		};
	},
	computed: {
		height() {
			let height = this.CustomBar / (uni.upx2px(this.CustomBar) / this.CustomBar);
			if (this.playInfo) {
				height += 110;
			}
			return `calc(100vh  - ${height}rpx)`;
		},
		playInfo() {
			return this.$store.state.playInfo;
		}
	},
	created() {
		this.getSingerList();
	},
	onReady() {
		let that = this;
		uni.createSelectorQuery()
			.select('.indexBar-box')
			.boundingClientRect(function(res) {
				that.boxTop = res.top;
			})
			.exec();
		uni.createSelectorQuery()
			.select('.indexes')
			.boundingClientRect(function(res) {
				that.barTop = res.top;
			})
			.exec();
	},
	methods: {
		async getSingerList() {
			const data = await this.$api.getSingerList();
			let list = data.list.artists;

			this.list = getGroupByPinyin(list);
			this.listCur = this.list[0];
		},
		searchDetailSinger(val) {
			uni.navigateTo({
				url: '../singerPlayList/index?id=' + val.id
			});
		},
		//获取文字信息
		getCur(e) {
			this.hidden = false;
			this.listCur = this.list[e.target.id].name;
		},
		setCur(e) {
			this.hidden = true;
			this.listCur = this.listCur;
		},
		//滑动选择Item
		tMove(e) {
			let y = e.touches[0].clientY,
				offsettop = this.boxTop,
				that = this;
			//判断选择区域,只有在选择区才会生效
			if (y > offsettop) {
				let num = parseInt((y - offsettop) / 20);
				this.listCur = that.list[num].name;
			}
		},
		//触发全部开始选择
		tStart() {
			this.hidden = false;
		},
		//触发结束选择
		tEnd() {
			this.hidden = true;
			this.listCurID = this.listCur;
		},
		indexSelect(e) {
			let that = this;
			let barHeight = this.barHeight;
			let list = this.list;
			let scrollY = Math.ceil((list.length * e.detail.y) / barHeight);
			for (let i = 0; i < list.length; i++) {
				if (scrollY < i + 1) {
					that.listCur = list[i].name;
					that.movableY = i * 20;
					return false;
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	padding-top: 100upx;
}
.indexes {
	position: relative;
}
.indexBar {
	position: fixed;
	right: 0px;
	bottom: 0px;
	padding: 20upx 20upx 20upx 60upx;
	display: flex;
	align-items: center;
}
.indexBar .indexBar-box {
	width: 40upx;
	height: auto;
	background: #fff;
	display: flex;
	flex-direction: column;
	box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
	border-radius: 10upx;
}
.indexBar-item {
	flex: 1;
	width: 40upx;
	height: 40upx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24upx;
	color: #888;
}
movable-view.indexBar-item {
	width: 40upx;
	height: 40upx;
	z-index: 9;
	position: relative;
}
movable-view.indexBar-item::before {
	content: '';
	display: block;
	position: absolute;
	left: 0;
	top: 10upx;
	height: 20upx;
	width: 4upx;
	background-color: #f37b1d;
}
.indexToast {
	position: fixed;
	top: 0;
	right: 80upx;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	width: 100upx;
	height: 100upx;
	border-radius: 10upx;
	margin: auto;
	color: #fff;
	line-height: 100upx;
	text-align: center;
	font-size: 48upx;
}
</style>
