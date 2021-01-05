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
		playInfo: getCache('PLAY_INFO'),
		playing: false, //播放状态
		userInfo: null,
		cookie: getCache('COOKIE'),
		historyList: getCache('HISTORY') || [],
		musicPlayInfo:getCache('MUSIC_PLAY')
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
		},
		SET_MUSIC_PLAY(state,player){
			state.musicPlayInfo=player
			setCache('MUSIC_PLAY', player)
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
		},
		setMusicPlay({commit},player){
			commit('SET_MUSIC_PLAY',player)
		},
	}
})
export default store
