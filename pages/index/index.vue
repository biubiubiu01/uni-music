<template>
	<view class="recommend-container ">
		<view class="bg-gradual-orange">
			<cu-custom bgColor="bg-gradual-orange">
				<block slot="content">Uni Music</block>
			</cu-custom>
			<view class="cu-bar search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="搜索音乐 / 歌词" confirm-type="search" @click="toSearch"></input>
				</view>
			</view>
		</view>
			<scroll-view :style="{height:height}" class="main-container" scroll-y>
				<view class="banner-wrapper">
					<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
					 duration="500" style="height: 158px;min-height: 158px;">
						<swiper-item v-for="item in swiperList" :key="item.bannerId" class="banner-item">
							<image :src="item.pic||item.imageUrl" mode="scaleToFill"></image>
						</swiper-item>
					</swiper>
				</view>

				<view class="list-wrapper flex">
					<view class="cu-item flex-sub list-item" v-for="(item,index) in listOption" :key="item.ico" @click="handleNative(item.url)">
						<view :class="'iconfont list-ico page-icon-color icon-'+item.ico">
						</view>
						<text class="list-title">{{item.name}}</text>
					</view>
				</view>
				<view class="music-wrapper" v-if="dayRecommendList.length>0">
					<box-title title="猜你喜欢" buttonName="播放全部" iconName="kaishi2" @handlePlay="handlePlay('dayRecommendList')"></box-title>
					<music-list :currentList="dayRecommendList"></music-list>
				</view>
				
				
				<view class="music-wrapper" v-if="dayRecommendMusicList.length>0">
				    <box-title title="根据您的喜好生成的歌单" buttonName="查看更多" :right="true" iconName="kaishi2" @handlePlay="handleNative('../songList/index')"></box-title>
					<song-list :currentList="dayRecommendMusicList"></song-list>
				</view>
				
				<view class="music-wrapper">
				   <box-title title="热门推荐歌单" buttonName="查看更多" iconName="kaishi2" :right="true"  @handlePlay="handleNative('../songList/index')"></box-title>
					<song-list :currentList="recommendList"></song-list>
				</view>

				<view class="music-wrapper">
					<box-title title="新歌速递" buttonName="播放全部" iconName="kaishi2" @handlePlay="handlePlay('newSongList')"></box-title>
					<music-list :currentList="newSongList"></music-list>
				</view>
				<view class="music-wrapper">
					<box-title title="网友精选歌单" buttonName="查看更多" :right="true" iconName="kaishi2" @handlePlay="handleNative('../songList/index')"></box-title>
					<song-list :currentList="selectData"></song-list>
				</view>
				<view class="music-wrapper">
					<box-title title="热门歌手" buttonName="查看更多"iconName="kaishi2" :right="true" @handlePlay="handleNative('../singer/index')"></box-title>
					<singer-list :currentList="hotSingerList"></singer-list>
				</view>
			</scroll-view>

		<music-control />
	</view>
</template>

<script>
	import songList from "./components/songList.vue"
	import musicList from "./components/musicList.vue"
	import singerList from "./components/singerList.vue"
	import { getImage, getName } from '@/utils/index.js';
	export default {
		data() {
			return {
				swiperList: [],
				recommendList: [],
				dayRecommendList: [],
				dayRecommendMusicList: [],
				newSongList: [],
				hotSingerList: [],
				selectData:[],
				listOption: [{
					name: '每日推荐',
					ico: 'xihuan',
					url:'../dayRecommend/index'
				}, {
					name: '推荐歌单',
					ico: 'remen',
					url:'../songList/index'
				}, {
					name: '排行榜',
					ico: 'paihang',
					url:'../rankList/index'
				}, {
					name: '热门歌手',
					ico: 'maikefeng',
					url:'../singer/index'
				}],
			}
		},
		components: {
			songList,
			musicList,
			singerList
		},
		computed: {
			cookie() {
				return this.$store.state.cookie
			},
			playInfo() {
				return this.$store.state.playInfo
			},
			height(){
				let height = this.CustomBar / (uni.upx2px(this.CustomBar) / this.CustomBar)+100
				if(this.playInfo){
					height+=110
				}
			     return `calc(100%  - ${height}rpx)`
				
			}
		},
		onShow() {
			if (this.cookie) {
				this.getDayRecommendData()
				this.getDayRecommendMusicData()
			} else {
				uni.showToast({
					title: '未登录,请先登录',
					icon: 'none',
					duration: 3000,
					complete: function() {
						setTimeout(function() {
							uni.navigateTo({
								url: '../login/index',
							});
						}, 3000);
					}
				});
			}

		},

		mounted() {
			this.getData()
		},
		onPullDownRefresh() {
			this.getData()
			this.getDayRecommendData()
			this.getDayRecommendMusicData()
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 500)
		},
		methods: {
			getData() {
				this.getBannerData()
				this.getRecommendData()
				this.getNewSongData()
				this.getSelectionData()
				this.getHotSingerData()
			},
			
			//播放全部 猜你喜欢
			handlePlay(key){
				let list=this[key].map(item=>{
					return{
						name: item.name,
						id: item.id,
						img1v1Url: getImage(item),
						author: getName(item)
					}
				})
				this.$store.dispatch('playAllMUsic',list)
			},
			
			handleNative(val){
				uni.navigateTo({
					url: val,
				});
			},

			// 获取轮播图数据
			async getBannerData() {
				const data = await this.$api.getBanner();
				this.swiperList = data.banners || []
			},

			//获取推荐歌单数据
			async getRecommendData() {
				const data = await this.$api.getRecommendList()
				this.recommendList = data.result.slice(0,8)
			},

			//获取猜你喜欢歌曲
			async getDayRecommendData() {
				const {data} = await this.$api.getDayRecommendList()
				this.dayRecommendList = data.dailySongs
			},

			//获取推荐歌单
			async getDayRecommendMusicData() {
				const data = await this.$api.getDayRecommendMusicList()
				this.dayRecommendMusicList = data.recommend || []
			},

			//获取新歌数据
			async getNewSongData() {
				const data = await this.$api.getNewSongList()
				this.newSongList = data.result.slice(0, 9)
			},
			
			//获取网友精选歌单
			async getSelectionData(){
				const data = await this.$api.getSelectionData()
				this.selectData=data.playlists||[]
			},

			//获取热门歌手数据
			async getHotSingerData() {
				const data = await this.$api.getHotSingerList()
				this.hotSingerList = (data.artists || []).slice(0, 10)

			},

			toSearch(){
				uni.navigateTo({
					url: '../search/index',
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recommend-container {
		position: relative;
		height: 100%;

		.main-container {

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
