<template>
	<div class="searchList-container">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true"><block slot="content">搜索结果</block></cu-custom>
		<search :text="text" @handleSearch="handleSearch"></search>
		<div class="musicList">
			<view class="toggle">
				搜索来源：
				<view class="cu-tag round" style="padding:0 24rpx" :class="{ active: source == '163' }" @click="toggleSource">网易云音乐</view>
				<view class="cu-tag round" style="padding:0 24rpx" :class="{ active: source == 'qq' }" @click="toggleSource">qq音乐</view>
			</view>
			<box-title title="单曲" buttonName="播放全部" iconName="kaishi2" :right="true" className="searchTitle" @handlePlay="handlePlayAllMusic"></box-title>

			<scroll-view scroll-y scroll-with-animation @scrolltolower="reachBottom()" :style="{ height: height }">
				<div class="music-item flex" v-for="(item, index) in musicList" :key="index" @click="handlePlayMusic(item)">
					<image v-if="item.al.picUrl" :src="item.al.picUrl + '?param=60y60'" mode="" class="musicImg"></image>
					<div class="rightInfo">
						<div class="music-info">
							<span style="color:rgb(86,124,166)">{{ item.name || item.songname }}</span>
							<span v-if="item.alia && item.alia.length > 0" style="margin-left: 5px;">({{ item.alia[0] }})</span>
						</div>
						<div class="music-info" style="margin-top:6px;">
							<template v-if="item.ar && item.ar.length > 0">
								<span v-for="(val, i) in item.ar" :key="i">
									{{ val.name }}
									<span v-if="i != item.ar.length - 1" style="margin:0 3px">/</span>
								</span>
							</template>
							<template v-if="item.singer && item.singer.length > 0">
								<span v-for="(val, i) in item.singer" :key="i">
									{{ val.name }}
									<span v-if="i != item.singer.length - 1" style="margin:0 3px">/</span>
								</span>
							</template>
							<span v-if="item.al.name" style="margin-left: 5px;">- {{ item.al.name }}</span>
							<span v-if="item.albumname" style="margin-left: 5px;">- {{ item.albumname }}</span>
						</div>
					</div>
				</div>
				<view class="loading" v-if="status == 'loading' || status == 'notMore'">{{ status == 'notMore' ? '没有更多了' : '努力加载中...' }}</view>
			</scroll-view>
		</div>
		<music-control />
	</div>
</template>

<script>
import search from '@/components/search/index.vue';
import boxTitle from '@/components/boxTitle/index.vue';
import { getImage, getName } from '@/utils/index.js';
export default {
	data() {
		return {
			text: '',
			musicList: [],
			offset: 0,
			status: null,
			keywords: '',
			total: 0,
			source: '163',
			pageNo: 1
		};
	},
	components: { search, boxTitle },
	computed: {
		playInfo() {
			return this.$store.state.playInfo;
		},
		playing() {
			return this.$store.state.playing;
		},
		height() {
			let height = (this.CustomBar + 60) / (uni.upx2px(this.CustomBar + 60) / (this.CustomBar + 60)) + 120;
			if (this.playInfo) {
				height += 110;
			}
			return `calc(100vh  - ${height}rpx)`;
		}
	},
	onLoad(options) {
		const { keywords } = options;
		this.text = keywords;
		this.keywords = keywords;
		if (this.source == '163') {
			this.getMusicList();
		} else {
			this.getQQMusicList();
		}
	},

	methods: {
		reachBottom() {
			this.status = 'loading';
			if (this.source == '163') {
				if (this.offset >= this.total) {
					this.status = 'notMore';
					return;
				}
				this.offset += 30;
				if (this.offset > this.total) {
					this.offset = this.total;
				}
				this.getMusicList();
			} else {
				if (this.pageNo * 30 >= this.total) {
					this.status = 'notMore';
					return;
				}
				this.pageNo++;
				this.getQQMusicList();
			}
		},
		toggleSource() {
			this.source = this.source == '163' ? 'qq' : '163';
			this.offset = 0;
			this.musicList = [];
			this.pageNo = 1;
			this.status = null;
			if (this.source == '163') {
				this.getMusicList();
			} else {
				this.getQQMusicList();
			}
		},
		//点击查询
		handleSearch(val) {
			this.keywords = val;
			this.offset = 0;
			this.pageNo = 1;
			this.musicList = [];
			this.status = null;
			if (this.source == '163') {
				this.getMusicList();
			} else {
				this.getQQMusicList();
			}
		},

		async getQQMusicList() {
			const key = this.keywords;
			const pageNo = this.pageNo;
			const { data } = await this.$api.searchQQMusic({ key, pageNo, pageSize: 30 });
			this.musicList.push(...data.list);
			this.total = data.total || 0;
			this.status = null;
		},

		getMusicList() {
			const { keywords, offset } = this;
			this.$api.getSearchList({ keywords, offset }).then(res => {
				const list = res.result.songs || [];
				this.musicList.push(...list);
				this.total = res.result.songCount || 0;
				this.status = null;
			});
		},

		//全部加入歌单
		handlePlayAllMusic() {
			let list = [];
			if (this.source == '163') {
				list = this.musicList.map(item => {
					return {
						name: item.name,
						id: item.id,
						img1v1Url: getImage(item),
						author: getName(item)
					};
				});
			} else {
				list = this.musicList.map(item => {
					return {
						name: item.songname,
						id: item.songmid,
						img1v1Url: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg`,
						author: item.singer[0].name,
						source: 'qq'
					};
				});
			}
			this.$store.dispatch('playAllMUsic', list);
		},

		//点击播放
		handlePlayMusic(val) {
			let currentPlay = {};
			if (this.source == '163') {
				if (this.playing && this.playInfo && this.playInfo.id == val.id) {
					uni.navigateTo({
						url: '../play/index'
					});
					return;
				}
				currentPlay = {
					name: val.name,
					id: val.id,
					img1v1Url: getImage(val),
					author: getName(val)
				};
				this.$store.dispatch('playMusic', currentPlay);
			} else {
				if (this.playing && this.playInfo && this.playInfo.id == val.songmid) {
					uni.navigateTo({
						url: '../play/index'
					});
					return;
				}
				currentPlay = {
					name: val.songname,
					id: val.songmid,
					img1v1Url: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${val.albummid}.jpg`,
					author: val.singer[0].name,
					source: 'qq'
				};
				this.$store.dispatch('playMusic', currentPlay);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.musicList {
	padding: 0 15px;
	width: 100%;
	position: relative;
	margin-top: 20rpx;
	box-sizing: border-box;
	.active {
		background: #ff9700;
		color: #fff;
	}
	.music-item {
		border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
		padding-bottom: 10px;
		margin-top: 15px;
		color: rgb(133, 133, 133);
		align-items: center;
		.musicImg {
			width: 75rpx;
			height: 75rpx;
			border-radius: 6px;
			margin-right: 25rpx;
		}
		.rightInfo {
			width: calc(100% - 90rpx);
		}
		.music-info {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			width: 90%;
		}
	}
}
</style>
