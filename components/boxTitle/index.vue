<template>
	<view class="box-tile" :class="className">
		<text class="title-wrapper">{{ title }}</text>
		<text class="more" @click="$emit('handlePlay')" v-if="iconName">
			<text>{{ buttonName }}</text>
			<text :class="['iconfont icon-title icon-' + iconName]"  v-if="iconName"></text>
		</text>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		iconName: {
			type: String,
			default: ''
		},
		buttonName: {
			type: String,
			default: ''
		},
		className: {
			type: String,
			default: ''
		}
	}
};
</script>
<style lang="scss" scoped>
.box-tile {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 3px;
	.title-wrapper {
		font-size: 36rpx;
		font-weight: 600;
		color: #000000;
		position: relative;
		text-indent: 13px;
		&:before {
			content: '';
			width: 4px;
			height: 18px;
			background-image: linear-gradient(to bottom, rgb(253, 117, 102), rgb(247, 73, 79));
			position: absolute;
			left: 0px;
			top: 3px;
		}
	}
	.more {
		border-radius: 20px;
		color:  rgba(0, 0, 0, 0.5);
		padding: 3px 10px 3px 13px;
		font-size: 26rpx;
		border:1px solid rgb(245,245,245)
	}
	.icon-title {
		margin-left: 2px;
		color: #000;
		font-size: 30rpx;
	}
}
</style>
