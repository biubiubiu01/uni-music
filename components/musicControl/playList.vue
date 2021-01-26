<template>
	<view class="cu-modal bottom-modal" :class="{ show: modelShow }" @click.self="$emit('handleClose')">
		<view class="dialog-container">
			<div class="title">
				<span style="font-weight: 600;font-size: 32rpx;">播放列表</span>
				({{ playList.length }})
			</div>
			<scroll-view scroll-y style="height:calc(100% - 40px);text-align: left;">
				<div
					class="play-item"
					v-for="(item, index) in playList"
					:key="item.id"
					:class="{ active: item.id == playInfo.id, lastMusic: index == playList.length - 1 }"
					@click="startPlayInfo(item)"
				>
					<view class="musicBox">
						<span class="musicName">{{ item.name }}</span>
						<span class="musicAuthor">- {{ item.author }}</span>
					</view>
					<text class="cuIcon-close" @click.stop="removePlayList(item)"></text>
				</div>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		modelShow: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		playList() {
			return this.$store.state.playList;
		},
		playing() {
			return this.$store.state.playing;
		},
		playInfo() {
			return this.$store.state.playInfo;
		}
	},
	methods: {
		async removePlayList(val) {
			if (this.playList.length == 1) {
				this.$audio.stop();
				this.$store.commit('REMOVE_MUSIC_PLAY', val);
				//如果是音乐详情页，那就返回首页
				this.$emit('backHome');
				return;
			}
			//如果删除的歌曲是正在播放的歌曲
			if (this.playInfo.id == val.id) {
				//切换下一首播放
				this.$store.dispatch('changePlay', 'next');
			}
			this.$store.commit('REMOVE_MUSIC_PLAY', val);
		},
		async startPlayInfo(item) {
			if (item.id == this.playInfo.id) return;
			this.$store.dispatch('playMusic', item);
		}
	}
};
</script>

<style lang="scss" scoped>
.dialog-container {
	width: 92%;
	height: 63%;
	background: #f8f8f8;
	border-radius: 15px;
	position: absolute;
	bottom: 15px;
	left: 4%;
	box-sizing: border-box;
	padding: 10px 20px;

	.musicBox {
		width: calc(100% - 60px);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.title {
		height: 40px;
	}
	.play-item {
		padding: 12px 0;
		border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
		&.lastMusic {
			border-bottom: unset !important;
		}
		&.active {
			.musicName,
			.musicAuthor {
				color: #ff9700;
			}
		}
		.musicName {
			color: #000;
			font-size: 30rpx;
			margin-right: 5px;
		}
		.musicAuthor {
			font-size: 12px;
			color: #666;
		}
	}
}
</style>
