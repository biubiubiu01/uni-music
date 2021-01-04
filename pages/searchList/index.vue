<template>
	<div class="searchList-container">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true"><block slot="content">搜索结果</block></cu-custom>
		<search :text="text" @handleSearch="handleSearch"></search>
		<div class="musicList">
			<zy-title title="单曲" buttonName="播放" iconName="kaishi2" :right="true" className="searchTitle"></zy-title>
			
			<div class="music-item flex" v-for="item in musicList" :key="item.id" @click="handlePlayMusic(item)">
				<image :src="item.al.picUrl+'?param=60y60'" mode="" class="musicImg"></image>
				<div class="rightInfo">
					<div class="music-info">
						<span style="color:rgb(86,124,166)">{{ item.name }}</span>
						<span v-if="item.alia.length > 0" style="margin-left: 5px;">({{ item.alia[0] }})</span>
					</div>
					<div class="music-info" style="margin-top:6px;">
						<span v-for="(val,i) in item.ar" :key="val.id">{{ val.name }} <span v-if="i!=item.ar.length-1" style="margin:0 3px">/</span></span>
						<span v-if="item.al.name" style="margin-left: 5px;">- {{ item.al.name }}</span>
					</div>
				</div>
			</div>
		    <view class="loading" v-if="status=='loading'||status=='notMore'">{{status=='notMore'?'没有更多了':'努力加载中...'}}</view>
		</div>
		<music-control />
	</div>
</template>

<script>
import search from '@/components/search/index.vue';
import zyTitle from '../index/zy-title.vue';
export default {
	data() {
		return {
			text: '',
			musicList: [],
			offset: 0,
			status:null,
			keywords:'',
			total:0
		};
	},
	components: { search, zyTitle },
	computed: {
		playInfo() {
			return this.$store.state.playInfo;
		}
	},
	onLoad(options) {
		const { keywords } = options;
		this.text = keywords;
		this.keywords=keywords
		this.getMusicList();
	},

	//上拉加载更多
	onReachBottom() {
		this.status='loading'
		if(this.offset>=this.total){
			this.status='notMore'
			return 
		}
		this.offset+=30;
		if(this.offset>this.total){
			this.offset=this.total
		}
		this.getMusicList();
	},
	methods: {
		//点击查询
		handleSearch(val){
			this.keywords=val
			this.offset=0;
			this.musicList=[]
			this.status=null;
			this.getMusicList()
		},
		
		getMusicList() {
			const {keywords,offset}=this
			this.$api.getSearchList({ keywords, offset }).then(res => {
				const list=res.result.songs||[]
				this.musicList.push(...list) 
				this.total=res.result.songCount||0
				this.status=null
			});
		},

		//点击播放
		async handlePlayMusic(val) {
			if (this.playInfo.id == val.id) return;
			this.$store.commit('SET_PLAYING', false);
			let played = {
				url: '',
				name: val.name,
				id: val.id,
				img1v1Url: val.al.picUrl,
				author: val.ar[0].name
			};
			const data = await this.$api.getMusicUrl({
				id: val.id
			});
			played.url = data.data[0].url;
			this.$store.commit('SET_PLAYINFO', played);
			this.$store.commit('SET_PLAYING', true);
		}
	}
};
</script>

<style lang="scss" scoped>
.musicList {
	padding: 0 15px;
	width: 100%;
	position: relative;
	margin-top: 20rpx;
	box-sizing: border-box;
    .loading{
		text-align: center;
		margin-top: 15px;
	}
	.music-item {
		border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
		padding-bottom: 10px;
		margin-top: 15px;
		color: rgb(133, 133, 133);
		align-items: center;
		.musicImg {
			width: 75rpx;
			height: 75rpx;
			border-radius: 6px;
			margin-right: 25rpx;
		}
		.rightInfo {
			width: calc(100% - 90rpx);
		}
		.music-info {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			width: 90%;
		}
	}
}
</style>
