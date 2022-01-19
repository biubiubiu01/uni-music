<template>
	<view class="cu-modal bottom-modal" :class="{ show: value }" @click.self="$emit('input', false)" :key="number">
		<view class="cu-dialog play-list-dialog">
			<view class="cu-bar bg-white list-title">
				播放列表
				<text class="light-text">(共{{ playList.length }}首)</text>
			</view>
			<scroll-view class="bg-white play-list " scroll-y style="height:65vh">
				<view class="music-item flex" :class="{ active: item.id == playInfo.id }" v-for="(item, index) in playList" :key="item.id" @click="startPlayInfo(item)">
					<image :src="item.coverImgUrl" class="music-img"></image>
					<view class="music-info">
						<view class="music-name text-overflow">{{ item.title }}</view>
						<view class="music-singer text-overflow flex">{{ item.singer }}</view>
					</view>
					<text class="lg basic-icon-color cuIcon-deletefill" style="font-size: 18px;" @click.stop="removePlayList(item)"></text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { getCache } from '@/utils/cache.js';
import { mapState } from 'vuex';
export default {
	props: {
		value: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			playList: this.$audio.audiolist,
			number:Math.random()*100000
		};
	},
	created() {
		this.$audio.on('setAudio', 'event-a', list => {
			this.playList = list;
			this.number=Math.random()*100000
		});
	},
	computed: mapState({
		playInfo: state => state.playInfo,
		paused: state => state.paused
	}),
	methods: {
		async removePlayList(val) {
			if (this.playList.length == 1) {
				this.$audio.stop();
				//如果是音乐详情页，那就返回首页
				this.$emit('backHome');
			} else {
				//如果删除的歌曲是正在播放的歌曲
				if (this.playInfo.id == val.id) {
					this.$store.dispatch('changePlay', 1);
				}
			}
			this.$store.dispatch('removeMusic', val);
		},

		async startPlayInfo(item) {
			if (item.id == this.playInfo.id) return;
			this.$store.dispatch('playMusic', item);
		}
	},
	destroyed() {
		this.$audio.off('setAudio', 'event-a');
	}
};
</script>

<style lang="scss" scoped>
.play-list-dialog {
	border-top-left-radius: 26px !important;
	border-top-right-radius: 26px !important;
	.list-title {
		font-size: 32rpx;
		color: #000;
		justify-content: center;
		.light-text {
			font-size: 24rpx;
			margin-left: 6px;
			color: rgba(0, 0, 0, 0.5);
		}
	}
	.play-list {
		.music-item {
			height: 60px;
			box-sizing: border-box;
			padding: 0 20px;
			align-items: center;
			margin-bottom: 5px;
			position: relative;
		
			&.active {
				background-image: linear-gradient(to right, rgba(247, 73, 79, 0.1), rgba(247, 73, 79, 0.05));
				.music-info {
					.music-name,
					.music-singer {
						color: #f84e51 !important;
					}
					&::before {
						content: '';
						width: 4px;
						height: 55px;
						background-image: linear-gradient(to bottom, rgb(253, 117, 102), rgb(247, 73, 79));
						position: absolute;
						left: 0px;
						top: 3px;
					}
				}
			}
			&:last-of-type {
				margin-bottom: 0;
			}
			.music-img {
				width: 45px !important;
				height: 45px !important;
				border-radius: 6px;
			}
			.music-info {
				margin-right: 15px;
				margin-left: 15px;
				width: calc(100vw - 135px);
				text-align: left;
				.music-name {
					font-size: 30rpx;
					margin-bottom: 5px;
					color: #000;
				}
				.music-singer {
					color: rgba(0, 0, 0, 0.5);
					font-size: 24rpx;
					align-items: center;
				}
			}
		}
	}
}
</style>
