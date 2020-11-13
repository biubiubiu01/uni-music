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
			url: 'http://m7.music.126.net/20201008131144/ef15054ac6ac6d915bebe219d718c2f8/ymusic/060c/070e/5308/1f312982340d1a484d7adb3599a54fe0.mp3',
			name: '最近 (正式版)',
			id: 347230,
			img1v1Url: "http://p4.music.126.net/dq9DaZxPNDYg0B2sWKJnig==/109951163988596212.jpg?param=100y100",
			author: '王小帅'
		}, //当前播放歌曲的信息
		playing: false, //播放状态
	},
	mutations: {
		SET_PLAYING(state,bool){
			state.playing=bool
		},
		SET_PLAYINFO(state,val){
			state.playInfo=val
			setCache('PLAY_INFO',val)
		}
		
	}
})
export default store
