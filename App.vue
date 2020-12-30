<script>
import Vue from 'vue';

export default {
	onLaunch: function() {
		wx.getSystemInfo({
			success: e => {
				// #ifndef MP
				Vue.prototype.StatusBar = e.statusBarHeight;
				if (e.platform == 'android') {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 45;
				}
				// #endif

				// #ifdef MP-WEIXIN || MP-QQ
				Vue.prototype.StatusBar = e.statusBarHeight;
				let capsule = wx.getMenuButtonBoundingClientRect();
				if (capsule) {
					Vue.prototype.Custom = capsule;
					Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				}
				// #endif

				// #ifdef MP-ALIPAY
				Vue.prototype.StatusBar = e.statusBarHeight;
				Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
				// #endif
			},
			fail(err) {
				console.log(err);
			}
		});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
	
	}
};
</script>

<style lang="scss">
@import '@/common/App.scss';
@import '@/common/icon.css';
@import '@/colorui/main.css';
@import '@/colorui/icon.css';
</style>
