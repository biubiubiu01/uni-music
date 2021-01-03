<template>
	<view class="cu-bar search">
		<view class="search-form round">
			<text class="cuIcon-search"></text>
			<input type="text" class="input-wrapper relative" :placeholder="defaultKeywords" confirm-type="search" v-model="keywords" @input="debounceSuggest" @confirm="handleSearch" @blur="blurInput" @focus="getSuggestList" >
			   <text class="cuIcon-close closeIcon" v-show="keywords" @click="keywords=''" ></text>
			</input>
		</view>
		<view class="suggestList" v-show="keywords&&suggetShow">
			<view class="suggest-item" style="color:rgb(86,124,166)" @click="searchMusic(keywords)">
				搜索 " {{keywords}} "
			</view>
			<view class="suggest-item" v-for="(item,index) in suggestList" :key="index">
				 <text class="cuIcon-search" style="margin-right: 25rpx;"></text>
				 {{item.keyword}}
			</view>
		</view>
	</view>
</template>

<script>
	import {debounce} from "@/utils/index.js"
	export default{
		props:{
			text:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				keywords:'',
				defaultKeywords:'',
				debounceSuggest:null,
				suggestList:[], //搜索建议list
				suggetShow:false
			}
	    },
		created(){
			this.debounceSuggest=debounce(() => {
			    this.getSuggestList()
			}, 250)
			this.getDefaultSearch()
		},
		methods:{
			//获取默认搜索关键词
			getDefaultSearch(){
				this.$api.getDefaultSearch().then(res=>{
					this.defaultKeywords=res.data.realkeyword||''
				})
			},
			
			//失去焦点
			blurInput(){
			  this.suggestList=[]
			  this.suggetShow=false
			},
			
			
			//获取搜索建议
			getSuggestList(){
				if(!this.keywords.trim()){
				  return 
				}
				this.suggetShow=true
				this.$api.getSuggestList({keywords:this.keywords.trim()}).then(res=>{
					 this.suggestList=res.result.allMatch||[]
				})
			},
			
			//点击搜索建议
			searchMusic(val){
				console.log(val);
				return
				this.keywords=val
				this.suggetShow=false
				this.handleSearch()
				
			},
			
			//点击搜索
			handleSearch(){
				if(!this.keywords.trim()){
				   this.keywords=this.defaultKeywords
				} 
				this.$store.dispatch('addHistoryList',this.keywords)
				this.$emit('handleSearch',this.keywords)
			}
		},
		watch:{
			text(nl){
				this.keywords=nl
			}
		}
	}
</script>

<style lang="scss" scoped>

	.closeIcon{
		position: absolute;
		right: 20px;
		top:9px;
		font-size: 36rpx;
		z-index: 20;
	}
	.suggestList{
		background-color: #fff;
		z-index: 99;
		position: fixed;
		left: 25px;
		right: 25px;
		top: 210rpx;
		border: 1px solid #bebebe;
		border-radius: 4px;
		box-shadow: 0 4px 7px #aaa;
		text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);
		box-sizing: border-box;
		padding: 0 20rpx;
		.suggest-item{
			padding: 24rpx 0;
			border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			box-sizing: border-box;
			width: 95%;
		}
	}
</style>
