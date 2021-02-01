import Vue from 'vue'
import Vuex from 'vuex'
import audio from '@/utils/audio.js'
import { getCache, setCache } from '@/utils/cache.js'
import { login } from '@/api/modules/user.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    playInfo: getCache('PLAY_INFO'),
    playing: false, //播放状态
    userInfo: getCache('USER_INFO'),
    cookie: getCache('COOKIE'),
    historyList: getCache('HISTORY') || [],
    playList: getCache('PLAY_LIST') || [],
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
      state.userInfo = val
      setCache('USER_INFO', val)
    },
    SET_COOKIE(state, cookie) {
      state.cookie = cookie
    },
    SET_HISROTY(state, val) {
      if (state.historyList.indexOf(val) == -1) {
        state.historyList.unshift(val)
        setCache('HISTORY', state.historyList)
      }
    },
    CLEAR_HISTORY(state) {
      state.historyList = []
      setCache('HISTORY', [])
    },

    //从对应歌曲列表中删除 当前歌曲
    REMOVE_MUSIC_PLAY(state, list) {
      let index = state.playList.findIndex((item) => item.id == list.id)
      if (index != -1) {
        state.playList.splice(index, 1)
        setCache('PLAY_LIST', state.playList)
      }
      if (state.playList.length == 0) {
        this.commit('SET_PLAYING', false)
        this.commit('SET_PLAYINFO', null)
      }
    },

    //添加歌曲到播放列表
    ADD_MUSIC_PLAY(state, list) {
      let index = state.playList.findIndex((item) => item.id == list.id)
      if (index == -1) {
        if (state.playInfo) {
          const temp = state.playList.findIndex(
            (item) => item.id == state.playInfo.id
          )
          state.playList.splice(temp, 0, list)
          setCache('PLAY_LIST', state.playList)
        }
      }
    },
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((res) => {
            commit('SET_USERINFO', res.account)
            setCache('COOKIE', res.cookie)
            commit('SET_COOKIE', res.cookie)
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    addHistoryList({ commit }, val) {
      commit('SET_HISROTY', val)
    },
    clearHistoryList({ commit }) {
      commit('CLEAR_HISTORY')
    },

    //播放全部
    playAllMUsic({ state, commit }, list) {
      state.playList = list
      commit('SET_PLAYING', true)
      commit('SET_PLAYINFO', list[0])
      setCache('PLAY_LIST', list)
    },

    //切换歌曲  上一首或者下一首
    changePlay({ state, commit }, status) {
      let index = state.playList.findIndex(
        (item) => item.id == state.playInfo.id
      )
      if (index != -1) {
        let temp = -1
        if (status == 'next') {
          if (index == state.playList.length - 1) {
            temp = 0
          } else {
            temp = index + 1
          }
        } else {
          if (index == 0) {
            temp = state.playList.length - 1
          } else {
            temp = index - 1
          }
        }
        commit('SET_PLAYING', true)
        commit('SET_PLAYINFO', state.playList[temp])
      }
    },

    //点击播放
    playMusic({ state, commit }, val) {
      commit('SET_PLAYINFO', val)
      commit('ADD_MUSIC_PLAY', val)
      commit('SET_PLAYING', true)
    },
  },
})
export default store
