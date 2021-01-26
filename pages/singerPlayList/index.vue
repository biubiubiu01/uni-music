<template>
	<div class="singerInfo-container">
		<div class="list-description">
			<div class="mask">
				<div v-if="singerInfo.picUrl" class="album-cover" :style="{ 'background-image': 'url(' + singerInfo.picUrl + '?param=300y300' + ')', filter: 'blur(0px)' }"></div>
				<div class="cover-mask" style="opacity:0.6;"></div>
			</div>
			<cu-custom style="color:#fff" bgColor="unset" :isBack="true"><block slot="content">歌手详情</block></cu-custom>
			<div class="description-wrapper">
				<p class="title">{{ singerInfo.name }}</p>
				<p class="description" v-if="singerInfo.briefDesc">简介：{{ singerInfo.briefDesc }}</p>
			</div>
		</div>
		<div class="music-all-list" :class="{ hasControl: playInfo }">
			<div class="music-title" @click="handlePlayAllMusic">
				<text class="iconfont icon-kaishi3 playIcon"></text>
				播放全部 ({{ total }})
			</div>
			<scroll-view scroll-y @scrolltolower="reachBottom()" style="height: calc(100% - 40px);margin-top: 10px;">
				<div class="music-item flex" v-for="(item, index) in musicList" :class="{ lastMusic: index == musicList.length - 1 }" :key="index" @click="handlePlayMusic(item)">
					<span class="index">{{ index + 1 }}</span>
					<div class="rightInfo">
						<div class="music-info">
							<span :style="{ color: item.id == playInfo.id ? '#ff9700' : 'rgb(86,124,166)' }">{{ item.name }}</span>
							<span v-if="item.alia.length > 0" style="margin-left: 5px;">({{ item.alia[0] }})</span>
						</div>
						<div class="music-info" style="margin-top:6px;">
							<span v-for="(val, i) in item.ar" :key="val.id">
								{{ val.name }}
								<span v-if="i != item.ar.length - 1" style="margin:0 3px">/</span>
							</span>
							<span v-if="item.al.name" style="margin-left: 5px;">- {{ item.al.name }}</span>
						</div>
					</div>
				</div>
			</scroll-view>
		</div>
		<music-control />
	</div>
</template>

<script>
import { getImage, getName } from '@/utils/index.js';
export default {
	data() {
		return {
			singerInfo: {},
			musicList: [],
			status: null,
			total: 0,
			offset: 0,
			id: ''
		};
	},
	onLoad(val) {
		this.id = val.id;
		this.getDetail();
	},
	computed: {
		playInfo() {
			return this.$store.state.playInfo;
		},
		playing() {
			return this.$store.state.playing;
		}
	},
	methods: {
		async getDetail() {
			const { id, offset } = this;
			uni.showLoading({
				title: '加载中...'
			});
			const data = await this.$api.getSingerInfo({ id });
			this.singerInfo = data.artist || {};

			const list = await this.$api.getSingerAllMusic({ id, order: 'hot', offset});
			this.total = list.total || 0;
			this.musicList.push(...list.songs);
			this.status = null;
			uni.hideLoading();
		},
		reachBottom() {
			this.status = 'loading';
			if (this.offset >= this.total) {
				this.status = 'notMore';
				return;
			}
			this.offset += 50;
			if (this.offset > this.total) {
				this.offset = this.total;
			}
			this.getDetail();
		},
		//点击播放
		handlePlayMusic(val) {
			if (this.playing && this.playInfo && this.playInfo.id == val.id) {
				uni.navigateTo({
					url: '../play/index'
				});
				return;
			}
			let currentPlay = {
				name: val.name,
				id: val.id,
				img1v1Url: getImage(val) || this.singerInfo.picUrl + '?param=300y300',
				author: getName(val)
			};
			this.$store.dispatch('playMusic', currentPlay);
		},
		handlePlayAllMusic() {
			let list = this.musicList.map(item => {
				return {
					name: item.name,
					id: item.id,
					img1v1Url: getImage(item) || this.singerInfo.picUrl + '?param=300y300',
					author: getName(item)
				};
			});
			this.$store.dispatch('playAllMUsic', list);
		}
	}
};
</script>

<style lang="scss" scoped>
.singerInfo-container {
	width: 100%;
	height: 100%;
	.title {
		font-size: 38rpx;
		color: #fff;
		font-weight: 700;
	}
	.description {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
		overflow: hidden;
		color: #f1f1f1;
		margin-top: 8px;
	}
}
</style>
