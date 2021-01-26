<template>
	<div class="playList-container">
		<div class="list-description">
			<div class="mask">
				<div class="album-cover bgImg" :style="{ 'background-image': 'url(' + dayRecommendList[0].al.picUrl + 'param?300y300' + ')' }"></div>
				<div class="cover-mask" style="opacity:0.6;"></div>
			</div>
			<cu-custom style="color:#fff" bgColor="unset" :isBack="true"></cu-custom>
		</div>
		<div class="music-all-list" :class="{ hasControl: playInfo }">
			<div class="music-title" @click="handlePlayAllMusic">
				<text class="iconfont icon-kaishi3 playIcon"></text>
				播放全部
			</div>
			<scroll-view scroll-y scroll-with-animation style="height: calc(100% - 40px);margin-top: 10px;">
				<div
					class="music-item flex"
					:class="{ lastMusic: index == musicList.length - 1 }"
					v-for="(item, index) in dayRecommendList"
					:key="item.id"
					@click="handlePlayMusic(item)"
				>
					<span class="index">{{ index + 1 }}</span>
					<image :src="item.al.picUrl + '?param=60y60'" mode="" class="musicImg"></image>
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
			dayRecommendList: []
		};
	},
	computed: {
		playInfo() {
			return this.$store.state.playInfo;
		},
		playing() {
			return this.$store.state.playing;
		}
	},
	created() {
		this.getDayRecommendData();
	},
	methods: {
		//获取猜你喜欢歌曲
		async getDayRecommendData() {
			const { data } = await this.$api.getDayRecommendList();
			this.dayRecommendList = data.dailySongs;
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
				img1v1Url: getImage(val),
				author: getName(val)
			};
			this.$store.dispatch('playMusic', currentPlay);
		},

		//播放全部
		handlePlayAllMusic() {
			let list = this.dayRecommendList.map(item => {
				return {
					name: item.name,
					id: item.id,
					img1v1Url: getImage(item),
					author: getName(item)
				};
			});
			this.$store.dispatch('playAllMUsic', list);
		}
	}
};
</script>

<style lang="scss" scoped>
.playList-container {
	width: 100%;
	height: 100%;
	.lastMusic {
		border-bottom: unset !important;
	}
	.bgImg {
		background-size: contain !important;
		filter: blur(0px) !important;
	}
	.date {
		position: absolute;
		left: 15px;
		top: 50%;
		color: #fff;
		transform: translateY(-50%);
	}
}
</style>
