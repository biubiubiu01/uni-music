<template>
	<view class="zy-title" :class="className">
		<text class="title-wrapper">{{ title }}</text>
		<text class="more" @click="$emit('handlePlay')" v-if="iconName">
			<text v-if="right">{{ buttonName }}</text>
			<text :class="['iconfont icon-' + iconName, right ? 'icon-right-title' : 'icon-left-title']" v-if="iconName"></text>
			<text v-if="!right">{{ buttonName }}</text>
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
		right: {
			type: Boolean,
			default: false
		},
		className: {
			type: String,
			default:''
		}
	}
};
</script>

