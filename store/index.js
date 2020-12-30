import Vue from 'vue';
import Vuex from 'vuex';
import {
	getCache,
	setCache
} from "@/utils/cache.js"
Vue.use(Vuex)


const store = new Vuex.Store({
	state: {
		playInfo: getCache('PLAY_INFO') || {
			url: 'http://m7.music.126.net/20201228222935/1c324771ea3bda15e5bbee0e13e36d16/ymusic/76e5/ba34/d562/2e95d6640354faee9ef0d6a384d2bc5f.mp3',
			name: '海阔天空',
			id: 33894312,
			img1v1Url: "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
			author: 'Beyond'
		}, //当前播放歌曲的信息
		playing: false, //播放状态
		userInfo: getCache('USER_INFO')||null
	},
	mutations: {
		SET_PLAYING(state, bool) {
			state.playing = bool
		},
		SET_PLAYINFO(state, val) {
			state.playInfo = val
			setCache('PLAY_INFO', val)
		},
		SET_USERINFO(state,val){
			console.log(val)
			state.userInfo=val;
			setCache('USER_INFO',val)
		}

	},
	actions:{
		setUserInfo({commit},userinfo){
			commit('SET_USERINFO',userinfo)
		}
	}
})
export default store
