<template>
	<scroll-view class="zy-list" style="margin-top: 5px;">
		<swiper style="margin-top:8px;height:190px" next-margin="30px" v-if="currentList.length > 0">
			<swiper-item class="music-swiper-item" v-for="(item, index) in songList" :key="index">
				<view class="zy-song-item flex align-center" @click="addPlayed(k)" v-for="(k, i) in item" :key="k.id">
					<image :src="getImgUrl(k)" mode="scaleToFill" class="music-song-item-image"></image>
					<view class="music-text">
						<text class="music-song-item-name" :style="{ color: k.id == playInfo.id ? '#ff9700' : '#000' }">{{ k.name }}</text>
						<text class="music-song-item-author" :style="{ color: k.id == playInfo.id ? '#ff9700' : '#666' }">- {{ getAuthor(k) }}</text>
					</view>
					<text class="iconfont startIcon" :class="playing && playInfo.id == k.id ? 'icon-stop' : 'icon-kaishi3'"></text>
				</view>
			</swiper-item>
		</swiper>
	</scroll-view>
</template>

<script>
import { getImage, getName } from '@/utils/index.js';
export default {
	props: {
		currentList: {
			type: Array
		}
	},
	computed: {
		songList() {
			let list = [];
			for (let i = 0; i < this.currentList.length; i += 3) {
				let endVal = i + 3;
				if (endVal > this.currentList.length) {
					endVal = this.currentList.length;
				}
				list.push(this.currentList.slice(i, endVal));
			}
			return list;
		},
		playing() {
			return this.$store.state.playing;
		},
		playInfo() {
			return this.$store.state.playInfo;
		}
	},

	methods: {
		getImgUrl(val) {
			return getImage(val);
		},
		getAuthor(val) {
			return getName(val);
		},
		async addPlayed(val) {
			//如果当前播放 重复点击，就跳转到歌曲播放页面
			if (this.playing && this.playInfo && this.playInfo.id == val.id) {
				uni.navigateTo({
					url: '../play/index'
				});
				return;
			}
			let currentPlay = {
				name: val.name,
				id: val.id,
				img1v1Url: this.getImgUrl(val),
				author: this.getAuthor(val)
			};
			this.$store.dispatch('playMusic', currentPlay);
		}
	}
};
</script>

<style lang="scss" scoped>
.music-swiper-item {
	padding-left: 6px;
	box-sizing: border-box;
}
.zy-song-item {
	width: 100%;

	.music-song-item-image {
		width: 53px;
		height: 53px;
		border-radius: 7px;
		margin: 7px 10px 0 0;
	}

	.music-text {
		width: calc(100% - 120px);
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		.music-song-item-name {
			color: #000;
			font-size: 30rpx;
			margin-right: 5px;
		}

		.music-song-item-author {
			font-size: 12px;
			color: #666;
		}
	}

	.startIcon {
		margin-left: 15px;
		font-size: 40rpx;
		color: #ff9700;
	}
}
</style>
