<template>
	<view class="zy-list flex flex-direction">
		<scroll-view scroll-x class="music-list-wrapper" scroll-with-animation>
			<view class="singer-list-item" v-for="item in currentList" :key="item.id" @click="searchDetailSinger(item.id)">
				<image :src="item.picUrl+'?param=100y100'" mode="scaleToFill" class="music-singer-item-image"></image>
				<view class="music-singer-item-text">{{item.name}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			currentList: {
				type: Array
			}
		},
		methods:{
			searchDetailSinger(id){
				uni.navigateTo({
					url: '../singerPlayList/index?id=' + id
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
		.music-list-wrapper {
			width: 100%;
			white-space: nowrap;

			.singer-list-item {
				width: 20%;
				margin: 0 6px;
				display: inline-block;
				overflow: hidden;
				position: relative;
				border-radius: 7px;
				text-align: center;

				.music-singer-item-image {
					width: 70px;
					height: 70px;
					border-radius: 50%;
				}
			}


		}
</style>
