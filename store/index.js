import Vue from 'vue';
import Vuex from 'vuex';
import {
	getCache,
	setCache
} from "@/utils/cache.js"
import {
	login
} from "@/api/modules/user.js"
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
		userInfo: null,
		cookie: getCache('COOKIE') || null,
		historyList: getCache('HISTORY') || [],
	},
	mutations: {
		SET_PLAYING(state, bool) {
			state.playing = bool
		},
		SET_PLAYINFO(state, val) {
			state.playInfo = val
			setCache('PLAY_INFO', val)
		},
		SET_USERINFO(state, val) {
			state.userInfo = val;
		},
		SET_COOKIE(state, cookie) {
			state.cookie = cookie
		},
		SET_HISROTY(state,val){
			if(state.historyList.indexOf(val)==-1){
				state.historyList.unshift(val)
				setCache('HISTORY', state.historyList)
			}
		},
		CLEAR_HISTORY(state){
			state.historyList=[]
			setCache('HISTORY', [])
		}

	},
	actions: {
		login({
			commit
		}, userInfo) {
			return new Promise((resolve, reject) => {
				login(userInfo).then(res => {
					commit('SET_USERINFO',  res.account)
					setCache('COOKIE',  res.cookie)
					commit('SET_COOKIE',  res.cookie)
					resolve()
				}).catch(err => {
					console.log(err)
					reject(err)
				})
			})
		},
		addHistoryList({commit},val){
			commit('SET_HISROTY',val)
		},
		clearHistoryList({commit}){
			commit('CLEAR_HISTORY')
		}
	}
})
export default store
