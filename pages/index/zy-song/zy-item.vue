<template>
	<view class="zy-song-item flex align-center" @click="addPlayed">
		<image :src="imgUrl+'?param=60y60'" mode="scaleToFill" class="music-song-item-image"></image>
		<view class="music-text">
			<text class="music-song-item-name">{{currentItem.name}}</text>
			<text class="music-song-item-author"> - {{author}}</text>
		</view>
		<text class="iconfont startIcon icon-kaishi3"></text>
	</view>
</template>

<script>
	export default {
		props: {
			currentItem: {
				type: Object
			},
			playInfo() {
				return this.$store.state.playInfo
			}
		},
		computed: {
			author() {
				if (this.currentItem.song) {
					return this.currentItem.song.artists[0].name
				}
				if (this.currentItem.artists) {
					return this.currentItem.artists[0].name
				}
				if (this.currentItem.ar) {
					return this.currentItem.ar[0].name
				}
			},
			imgUrl() {
				if (this.currentItem.picUrl) {
					return this.currentItem.picUrl
				}
				if (this.currentItem.album) {
					return this.currentItem.album.picUrl
				}
				if (this.currentItem.al) {
					return this.currentItem.al.picUrl
				}
			}
		},
		methods: {
			async addPlayed() {
				let played = {
					url: '',
					name: this.currentItem.name,
					id: this.currentItem.id,
					img1v1Url: this.imgUrl + '?param=60y60',
					author: this.author
				}
				const data = await this.$api.getMusicUrl({
					id: this.currentItem.id
				})
				played.url = data.data[0].url
				this.$store.commit('SET_PLAYINFO', played)
				this.$store.commit('SET_PLAYING', true)
			}
		}
	}
</script>

<style lang="scss" scoped>
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
