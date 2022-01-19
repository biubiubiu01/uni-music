<template>
	<scroll-view class="music-list-wrapper">
		<swiper class="swiper-list" next-margin="30px">
			<swiper-item class="music-swiper-item" v-for="(item, index) in songList" :key="index">
				<view class="song-item flex align-center" @click="addPlayed(k)" v-for="(k, i) in item" :key="k.id">
					<image :src="getImgUrl(k)" mode="scaleToFill" class="music-song-item-image"></image>
					<view class="music-text" :class="{ active: k.id == playInfo.id }">
						<text class="music-song-item-name">{{ k.name }}</text>
						<text class="music-song-item-author">- {{ getAuthor(k) }}</text>
					</view>
					<text class="iconfont startIcon" :class="!paused && playInfo.id == k.id ? 'icon-stop' : 'icon-kaishi3'"></text>
				</view>
			</swiper-item>
		</swiper>
	</scroll-view>
</template>

<script>
import { getImage, getName } from '@/utils/index.js';
import { mapState } from 'vuex';
export default {
	props: {
		currentList: {
			type: Array
		}
	},
	data() {
		return {
		};
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
		...mapState({
			playInfo: state => state.playInfo,
			paused: state => state.paused
		})
	},
	methods: {
		getImgUrl(val) {
			return getImage(val);
		},
		getAuthor(val) {
			return getName(val);
		},
		//点击播放
		async addPlayed(val) {
			//如果当前播放 重复点击，就跳转到歌曲播放页面
			if (this.playInfo.id == val.id) {
				uni.navigateTo({
					url: '../play/index'
				});
				return;
			}
			this.$store.dispatch('playMusic', {
				src: '',
				title: val.name,
				singer: this.getAuthor(val),
				coverImgUrl: this.getImgUrl(val),
				id: val.id
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.music-list-wrapper {
	margin-top: 6px;
	width: 100%;
	.swiper-list {
		margin-top: 4px;
		height: 190px;
		.music-swiper-item {
			padding-left: 5px;
			box-sizing: border-box;
			.song-item {
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
					&.active {
						.music-song-item-name {
							color: #f84e51;
						}
						.music-song-item-author {
							color: #f84e51;
						}
					}

					.music-song-item-name {
						color: #000;
						font-size: 30rpx;
						margin-right: 5px;
					}

					.music-song-item-author {
						font-size: 12px;
						color: rgba(0, 0, 0, 0.5);
					}
				}

				.startIcon {
					margin-left: 15px;
					font-size: 40rpx;
					color: #f84e51;
				}
			}
		}
	}
}
</style>
