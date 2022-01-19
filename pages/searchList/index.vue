<template>
	<div class="searchList-container">
		<cu-custom bgColor="#fff" :isBack="true"><view slot="content" style="color: #000">搜索结果</view></cu-custom>
		<search :text="keywords" @handleSearch="handleSearch"></search>
		<div class="musicList">
			<box-title title="单曲" buttonName="播放全部" iconName="kaishi2" @handlePlay="handlePlayAllMusic"></box-title>
			<scroll-view scroll-y scroll-with-animation @scrolltolower="reachBottom()" :style="{ height: height, 'margin-top': '10px' }">
				<view class="music-item flex" :class="{ active: item.id == playInfo.id }" v-for="(item, index) in musicList" :key="index" @click="handlePlayMusic(item)">
					<image :src="item.al.picUrl + '?param=60y60'" mode="widthFix" class="music-img"></image>
					<view class="music-info">
						<view class="music-name text-overflow">{{ item.name }}</view>
						<view class="music-singer text-overflow flex">
							<span class="small-icon">{{ item.id % 2 == 0 ? 'SQ' : 'HD' }}</span>
							{{ item.ar ? item.ar.map(item => item.name).join('/') : '' }} - {{ item.al.name }}
						</view>
					</view>
				</view>
				<view class="loading" v-if="status == 'loading' || status == 'notMore'">{{ status == 'notMore' ? '没有更多了' : '努力加载中...' }}</view>
			</scroll-view>
		</div>
		<music-control v-if="playInfo.id"/>
	</div>
</template>

<script>
import search from '@/components/search/index.vue';
import boxTitle from '@/components/boxTitle/index.vue';
import { getImage, getName } from '@/utils/index.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			musicList: [],
			offset: 0,
			status: null,
			keywords: '',
			total: 0
		};
	},
	components: { search, boxTitle },
	computed: {
		...mapState({
			playInfo: state => state.playInfo
		}),
		height() {
			let height = this.CustomBar / (uni.upx2px(this.CustomBar) / this.CustomBar) + 190;
			if (this.playInfo.id) {
				height += 110;
			}
			return `calc(100vh  - ${height}rpx)`;
		}
	},
	onLoad(options) {
		const { keywords } = options;
		this.keywords = keywords;
		this.getMusicList();
	},

	methods: {
		//加载更多
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
			this.getMusicList();
		},

		//点击查询
		handleSearch(val) {
			this.keywords = val;
			this.status = null;
			this.offset = 0;
			this.total=0
			this.musicList = [];
			this.getMusicList();
		},

		getMusicList() {
			const { keywords, offset } = this;
			this.$api.getSearchList({ keywords, offset, type: 1 }).then(res => {
				const list = res.result.songs || [];
				this.musicList.push(...list);
				this.total = res.result.songCount || 0;
				this.status = null;
			});
		},

		//播放全部
		handlePlayAllMusic() {
			const list = this.musicList.map(item => {
				return {
					src: '',
					title: item.name,
					singer: getName(item),
					coverImgUrl: getImage(item),
					id: item.id
				};
			});
			this.$store.dispatch('playAllMUsic', list);
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
				coverImgUrl: getImage(val),
				id: val.id
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.musicList {
	width: 100%;
	position: relative;
	margin-top: 20rpx;
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
			.music-info {
				.music-name,
				.small-icon,
				.music-singer {
					color: #f84e51 !important;
				}
			}
		}
		.music-img {
			width: 58px;
			border-radius: 6px;
		}
		.music-info {
			margin-left: 15px;
			max-width: calc(100% - 80px);
			.music-name {
				font-size: 30rpx;
				margin-bottom: 7px;
				color: #000;
			}
			.music-singer {
				color: rgba(0, 0, 0, 0.5);
				font-size: 24rpx;
				align-items: center;
				width: 100%;
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
</style>
