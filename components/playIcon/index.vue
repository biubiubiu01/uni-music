<template>
	<view class="play-list relative" @click.stop="changePlaying"><text :class="['iconfont', playing ? 'icon-playStop' : 'icon-playStart']" style="font-size: 25px;"></text></view>
</template>

<script>
export default {
	props: {
		playInfo: {
			type: Object
		}
	},
	data() {
		return {};
	},
	computed: {
		playing() {
			return this.$store.state.playing;
		}
	},
	mounted() {
		this.initPlay();
	},
	methods: {
		initPlay() {
			if (this.playInfo && this.playInfo.id) {
				this.$audio.init({
					src: this.playInfo.url
				});
				if (this.playing) {
					this.$audio.play();
				} else {
					this.$audio.pause();
				}
			}
		},
		changePlaying() {
			this.$store.commit('SET_PLAYING', !this.playing);
		}
	},
	watch: {
		playInfo: {
			handler(nl, ol) {
				this.$audio.init({
					src: this.playInfo.url
				});
			},
			deep: true
		},
		playing(nl, ol) {
			if (nl) {
				this.$audio.play();
			} else {
				this.$audio.pause();
			}
		}
	}
};
</script>

<style></style>
