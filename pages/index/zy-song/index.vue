<template>
	<scroll-view class="zy-list" style="margin-top: 5px;">
		<swiper style="margin-top:8px;height:190px" next-margin="30px" v-if="currentList.length>0">
			<swiper-item class="music-swiper-item" v-for="(item,index) in songList" :key="index">
                 <zy-item :currentItem="k" v-for="(k,i) in item" :key="k.id"></zy-item>
			</swiper-item>
		</swiper>
	</scroll-view>
</template>

<script>
	import zyItem from "./zy-item.vue"
	export default {
		props: {
			currentList: {
				type: Array
			}
		},
		computed: {
			songList() {
				let list = []
				for (let i = 0; i < this.currentList.length; i += 3) {
					let endVal = i + 3;
					if (endVal > this.currentList.length) {
						endVal = this.currentList.length
					}
					list.push(this.currentList.slice(i, endVal))
				}
				return list
			}
		},
		components: {
			zyItem
		}
	}
</script>

<style lang="scss" scoped>
	.music-swiper-item {
		padding-left: 6px;
		box-sizing: border-box;
	}
</style>
