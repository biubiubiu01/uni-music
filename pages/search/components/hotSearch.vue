<template>
	<div class="hotSearch-container">
		<zy-title title="热搜榜" buttonName="播放" iconName="kaishi2" :right="true" className="searchTitle"></zy-title>
		<div class="hotList">
			<div class="hot-item flex" v-for="(item, index) in hotList" :key="index" :class="{ topThree: index <= 2 }" @click="handleClick(item.searchWord)">
				<span class="index">{{ index + 1 }}</span>
				<span>{{ item.searchWord }}</span>
				<image v-if="item.iconUrl" :src="item.iconUrl" mode="" class="iconImg" :class="item.iconType == 5 ? 'topImg' : 'hotImg'"></image>
			</div>
		</div>
	</div>
</template>

<script>
import zyTitle from '../../index/zy-title.vue';
export default {
	data() {
		return {
			hotList: []
		};
	},
	components: { zyTitle },
	created() {
		this.getDetailSearch();
	},
	methods: {
		//获取热门搜索详细列表
		getDetailSearch() {
			this.$api.getHotDetailSearch().then(res => {
				this.hotList = res.data || [];
			});
		},
		
		handleClick(val){
			this.$store.dispatch('addHistoryList',val)
			this.$emit('chooseMusic',val);
		}
	}
};
</script>

<style lang="scss">
.hotSearch-container {
	width: 100%;
	position: relative;
	margin-top: 20rpx;
	.hotList {
		margin-top: 15rpx;
		width: 100%;
		flex-wrap: wrap;
		.hot-item {
			width: 50%;
			margin-bottom: 30rpx;
			display: inline-block;
			&.topThree {
				.index {
					color: #ff9700;
				}
				.word {
					font-family: 'Microsoft Yahei', Arial, Helvetica, sans-serif;
					font-weight: 600;
					color: #303030;
				}
			}
			.index {
				width: 44rpx;
				display: inline-block;
			}

			.iconImg {
				margin-left: 15rpx;
				vertical-align: middle;

				&.topImg {
					width: 30rpx;
					height: 32rpx;
					vertical-align: text-bottom;
				}
				&.hotImg {
					width: 60rpx;
					height: 30rpx;
					
				}
			}
		}
	}
}
</style>
