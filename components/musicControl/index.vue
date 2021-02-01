<template>
	<view class="radius shadow fotter-container" @click.stop="toSongDetail" v-if="playInfo">
		<view class="fixed-container">
			<view class="cu-avatar playImage round" :style="'background-image:url(' + playInfo.img1v1Url + '?param=60y60)'"></view>
			<view class="play-center">
				<view class="music-name">{{ playInfo.name }}</view>
				<view class="music-author">{{ playInfo.author }}</view>
			</view>
			<view class="play-right">
				<view class="play-list relative" @click.stop="changePlaying">
					<text :class="['iconfont', playing ? 'icon-playStop' : 'icon-playStart']" style="font-size: 25px"></text>
				</view>
				<text class="iconfont icon-liebiao play-list" @click.stop="modelShow = true"></text>
			</view>
		</view>

		<play-list :modelShow="modelShow" @handleClose="handleClose"></play-list>
	</view>
</template>

<script>
	import playList from './playList.vue'
	export default {
		data() {
			return {
				modelShow: false,
			}
		},
		components: {
			playList
		},
		computed: {
			playInfo() {
				return this.$store.state.playInfo
			},
			playing() {
				return this.$store.state.playing
			},
			playList() {
				return this.$store.state.playList
			},
		},
		methods: {
			async checkMusic() {
				const bool = await this.$api.checkMusicUrl({
					id: this.playInfo.id,
				})
				if (bool.success) {
					this.initPlay()
				} else {
					let that = this
					uni.showToast({
						title: '很抱歉，没有版权',
						icon: 'none',
						duration: 2500,
						complete: function() {
							setTimeout(() => {
								uni.hideToast()
								that.$store.commit('SET_PLAYING', false)
								that.$store.commit('SET_PLAYINFO', null)
							}, 2500)
						},
					})
				}
			},
			async initPlay() {
				if (this.playInfo && this.playInfo.id) {
					if (this.playInfo.source) {
						const {
							data
						} = await this.$api.searchQQMusicUrl({
							id: this.playInfo.id,
						})
						this.$audio.src = data[this.playInfo.id]
					} else {
						const {
							data
						} = await this.$api.getMusicUrl({
							id: this.playInfo.id,
						})
						this.$audio.src = data[0].url
						this.$audio.title = this.playInfo.name
						this.$audio.singer = this.playInfo.author
						this.$audio.coverImgUrl = this.playInfo.img1v1Url
						this.$audio.onPlay(() => {
							this.$store.commit('SET_PLAYING', true)
						})
						this.$audio.onPause(() => {
							this.$store.commit('SET_PLAYING', false)
						})
						this.$audio.onEnded(() => {
							if (this.playList.length == 1) {
								this.$store.commit('SET_PLAYING', false)
								return
							}
							this.$store.dispatch('changePlay', 'next')
						})
						this.$audio.onPrev(() => {
							if (this.playList.length == 1) {
								return
							}
							this.$store.dispatch('changePlay', 'prev')
						})
						this.$audio.onNext(() => {
							if (this.playList.length == 1) {
								return
							}
							this.$store.dispatch('changePlay', 'next')
						})
					}
				}
			},

			//修改播放状态
			changePlaying() {
				if (this.playing) {
					this.$audio.pause()
				} else {
					this.$audio.play()
				}
				this.$store.commit('SET_PLAYING', !this.playing)
			},

			toSongDetail() {
				if (this.modelShow) return
				uni.navigateTo({
					url: '../play/index',
				})
			},
			handleClose() {
				setTimeout(() => {
					this.modelShow = false
				}, 30)
			},
		},
		watch: {
			playInfo: {
				handler(nl, ol) {
					if (nl && nl.id) {
						if(!nl.source){
							this.checkMusic()
						}else{
							this.initPlay()
						}
						
					} else {
						this.modelShow = false
					}
				},
				deep: true,
			},
		},
	}
</script>

<style lang="scss" scoped>
	.fotter-container {
		height: 110rpx;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 9999;

		.fixed-container {
			position: fixed;
			z-index: 20;
			width: 100%;
			height: 110rpx;
			bottom: 0;
			border-top: 1px solid rgba(0, 0, 0, 0.15);
			display: flex;
			background: #fff;
		}

		.playImage {
			width: 80rpx;
			height: 80rpx;
			margin: auto 12px auto 6px;
		}

		.play-center {
			flex: auto;
			display: flex;
			flex-wrap: wrap;
			align-content: center;
			max-width: calc(100% - 300rpx);

			.music-name {
				color: #000;
				font-size: 30rpx;
				margin-bottom: 3px;
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.music-author {
				font-size: 12px;
				color: #666;
				width: 100%;
			}
		}

		.play-right {
			width: 92px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.play-list {
				font-size: 28px;
				margin-right: 12px;
			}
		}
	}
</style>
