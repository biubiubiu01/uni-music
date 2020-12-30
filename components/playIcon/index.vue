<template>
	<view class='play-list relative' @click.stop="changePlaying">
		<text :class="['iconfont',playing?'icon-playStop':'icon-playStart']" style="font-size: 25px;"></text>
	</view>
</template>

<script>
	export default {
		props: {
			playInfo: {
				type: Object
			}
		},
		data() {
			return {}
		},
		computed: {
			playing() {
				return this.$store.state.playing
			}
		},
		mounted() {
           this.initPlay()
		},
		methods: {
			initPlay() {
				if (this.playInfo && this.playInfo.id) {
					this.player = uni.createInnerAudioContext()
					this.player.src = this.playInfo.url
				}
			},
			changePlaying() {
				if (this.playing) {
					this.player.pause()
					this.$store.commit('SET_PLAYING', false)
				} else {
					this.player.play()
					this.$store.commit('SET_PLAYING', true)
				}

			}
		},
		watch: {
			playInfo: {
				handler(nl, ol) {
					this.player.destroy();
					this.initPlay();
					this.player.play()
				},
				deep: true
			},
		}
	}
</script>

<style>

</style>
