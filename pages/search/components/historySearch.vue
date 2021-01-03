<template>
	<div class="history-container flex" v-if="tagList.length > 0">
		<div class="title-wrapper historyTitle">历史</div>
			
		<scroll-view scroll-x class="historyList" scroll-with-animation scroll-left="0">
			<view class="cu-tag round" style="padding:0 24rpx" v-for="(item, index) in tagList" :key="index" @click="handleClick(item)">{{ item }}</view>
		</scroll-view>

		<text class="cuIcon-delete closeIcon" @click="clearHistory"></text>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {
		tagList() {
			return this.$store.state.historyList;
		}
	},
	methods: {
		handleClick(val) {
			this.$store.dispatch('addHistoryList', val);
			this.$emit('chooseMusic', val);
		},

		//清空
		clearHistory() {
			this.$store.dispatch('clearHistoryList');
		}
	}
};
</script>

<style lang="scss">
.history-container {
	height: 35px;
	width: 100%;
	position: relative;
	align-items: center;
	.historyTitle {
		width: 85rpx;
		font-size: 28rpx;
	}
	.historyList {
	   width: calc(100% - 160rpx);
		white-space: nowrap;
	}
	.closeIcon {
		font-size: 38rpx;
		width: 75rpx;
		text-align: right;
	}
}
</style>
