<template>
	<div class="search-container">
		<cu-custom bgColor="#fff" :isBack="true"><view slot="content" style="color: #000">搜索</view></cu-custom>
		<search @handleSearch="searchMusic" :text="text"></search>
		<scroll-view scroll-y class="content-list" scroll-with-animation>
			<history-search @chooseMusic="chooseMusic"></history-search>
			<hot-search @chooseMusic="chooseMusic"></hot-search>
		</scroll-view>
		<music-control v-if="playInfo.id" />
	</div>
</template>

<script>
import search from '@/components/search/index.vue';
import historySearch from './components/historySearch.vue';
import hotSearch from './components/hotSearch.vue';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			text: ''
		};
	},
	components: { historySearch, hotSearch, search },
	computed: mapState({
		playInfo: state => state.playInfo
	}),
	methods: {
		//点击搜索
		searchMusic(val) {
			uni.navigateTo({
				url: '../searchList/index?keywords=' + val
			});
		},

		//点击热搜列表
		chooseMusic(val) {
			this.text = val;
			this.searchMusic(val);
		}
	}
};
</script>

<style lang="scss">
.content-list {
	padding: 0 15px;
	box-sizing: border-box;
	width: 100%;
	margin-top: 5px;
}
</style>
