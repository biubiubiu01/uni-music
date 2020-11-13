<template>
	<view class="recommend-container ">
		<view class="bg-gradual-orange">
			<cu-custom bgColor="bg-gradual-orange">
				<block slot="content">懂你的音乐</block>
			</cu-custom>
			<view class="cu-bar search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="搜索音乐 / 歌词" confirm-type="search" @input="searchIcon"></input>
				</view>
			</view>
		</view>
		<view class="main-container">
			<scroll-view scroll-y style="height: 100%;">
				<view class="banner-wrapper">
					<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
					 duration="500" style="height: 158px;min-height: 158px;">
						<swiper-item v-for="item in swiperList" :key="item.bannerId" class="banner-item">
							<image :src="item.pic||item.imageUrl" mode="scaleToFill"></image>
						</swiper-item>
					</swiper>
				</view>

				<view class="list-wrapper flex">
					<view class="cu-item flex-sub list-item" v-for="(item,index) in listOption" :key="item.ico">
						<view :class="'iconfont list-ico page-icon-color icon-'+item.ico">
						</view>
						<text class="list-title">{{item.name}}</text>
					</view>
				</view>

				<view class="music-wrapper">
					<zy-title title="为你精挑细选" buttonName="查看更多" iconName="right" :right="true"></zy-title>
					<zy-list :currentList="recommendList"></zy-list>
				</view>
				<view class="music-wrapper" v-if="dayRecommendList.length>0">
					<zy-title title="猜你喜欢" buttonName="播放全部" iconName="kaishi2"></zy-title>
					<zy-song :currentList="dayRecommendList"></zy-song>
				</view>
				<view class="music-wrapper" v-if="dayRecommendMusicList.length>0">
					<zy-title title="推荐歌单" buttonName="查看更多" iconName="right" :right="true"></zy-title>
					<zy-list :currentList="dayRecommendMusicList"></zy-list>
				</view>
				<view class="music-wrapper">
					<zy-title title="新歌速递" buttonName="播放全部" iconName="kaishi2"></zy-title>
					<zy-song :currentList="newSongList"></zy-song>
				</view>
				<view class="music-wrapper">
					<zy-title title="热门歌手" buttonName="查看更多" iconName="right" :right="true"></zy-title>
					<zy-singer :currentList="hotSingerList"></zy-singer>
				</view>
				<view class="music-wrapper">
					<zy-title title="精选电台" buttonName="查看更多" iconName="right" :right="true"></zy-title>
					<zy-list :currentList="radioList"></zy-list>
				</view>
			</scroll-view>
			<music-control v-if="playInfo" />
		</view>

	</view>
</template>

<script>
	import zyTitle from "./zy-title.vue"
	import zyList from "./zy-list.vue"
	import zySong from "./zy-song/index.vue"
	import zySinger from "./zy-singer.vue"
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				swiperList: [],
				recommendList: [],
				dayRecommendList: [],
				dayRecommendMusicList: [],
				newSongList: [],
				hotSingerList: [],
				radioList: [],
				listOption: [{
					name: '每日推荐',
					ico: 'xihuan'
				}, {
					name: '推荐歌单',
					ico: 'remen'
				}, {
					name: '排行榜',
					ico: 'paihang'
				}, {
					name: '热门歌手',
					ico: 'maikefeng'
				}],
				reload: false,
			}
		},
		components: {
			zyTitle,
			zyList,
			zySong,
			zySinger
		},
		computed: {
			playInfo() {
				return this.$store.state.playInfo
			}
		},
		onLoad() {
			// this.$api.login({
			// 	phone: 13297924279,
			// 	password: '+qq123456789'
			// }).then(res => {
			// 	setTimeout(() => {
			// 		this.getDayRecommendData()
			// 		this.getDayRecommendMusicData()
			// 	}, 2000)
			// })
			this.getData()
		},
		onPullDownRefresh() {
			this.reload = true;
			this.getData()
			setTimeout(() => {
				this.reload = false;
				uni.stopPullDownRefresh();
			}, 500)
		},
		methods: {
			getData() {
				this.getDayRecommendData()
				this.getDayRecommendMusicData()
				this.getBannerData()
				this.getRecommendData()
				this.getNewSongData()
				this.getHotSingerData()
				this.getRadioData()
			},

			// 获取轮播图数据
			async getBannerData() {
				const data = await this.$api.getBanner();
				this.swiperList = data.banners || []
			},

			//获取推荐歌单数据
			async getRecommendData() {
				const data = await this.$api.getRecommendList()
				if (this.reload) {
					this.recommendList = data.result.reverse()
					return
				}
				this.recommendList = data.result || []
			},

			//获取猜你喜欢歌曲
			async getDayRecommendData() {
				const data = await this.$api.getDayRecommendList()
				if (this.reload) {
					this.dayRecommendList = (data.recommend || []).slice(10, 19)
					return
				}
				this.dayRecommendList = (data.recommend || []).slice(0, 9)
			},

			//获取推荐歌单
			async getDayRecommendMusicData() {
				const data = await this.$api.getDayRecommendMusicList()
				if (this.reload) {
					this.dayRecommendMusicList = (data.recommend || []).reverse()
					return
				}
				this.dayRecommendMusicList = data.recommend || []
			},

			//获取新歌数据
			async getNewSongData() {
				const data = await this.$api.getNewSongList()
				if (this.reload) {
					this.newSongList = data.result.slice(1, 10).reverse()
					return
				}
				this.newSongList = data.result.slice(0, 9)
			},

			//获取热门歌手数据
			async getHotSingerData() {
				const data = await this.$api.getHotSingerList()
				this.hotSingerList = (data.artists || []).slice(0, 10)

			},

			//获取电台数据
			async getRadioData() {
				const data = await this.$api.getRadioList()
				this.radioList = data.djRadios || []
			},
		}
	}
</script>

<style lang="scss" scoped>
	.recommend-container {
		position: relative;
		height: 100%;

		.main-container {
			flex: 1;
			position: relative;

			.banner-wrapper {
				box-sizing: border-box;
				padding: 10px;

				.banner-item {
					border-radius: 5px;
				}
			}

			.list-wrapper {
				margin: 1.5px 0;

				.list-item {
					text-align: center;
					font-size: 24rpx;
				}

				.list-ico {
					font-size: 54rpx;
					margin-bottom: 4px;
				}
			}

			.music-wrapper {
				margin: 20px 0;

				&:last-of-type {
					margin-bottom: 0;
				}
			}
		}
	}
</style>
