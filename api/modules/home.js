import request from '@/utils/request'

/**
 *  首页的轮播图 banner
 *  @param  {Number} 
 *  @return {Array}
 */
export const getBanner = (params) => {
	var num = 0
	switch (uni.getSystemInfoSync().platform) {
		case 'android':
			num = 1
			break;
		case 'ios':
			num = 2
			break;
		default:
			break;
	}
	return request.get(`/banner?type=${num}`, params)
}

/**
 *  首页 发现好歌单  list
 *  @param  {Number} 
 *  @return {Array}
 */
export const getRecommendList = (params) => {
	return request.post('/personalized', params)
}

/**
 *  首页 新歌 list
 *  @return {Array}
 */
export const getNewSongList = () => {
	return request.get('/personalized/newsong')
}


/**
 *  首页 每日推荐歌曲 ---需要登录
 *  @return {Array}
 */
export const getDayRecommendList = () => {
	return request.get('/recommend/songs')
}

/**
 *  首页 每日推荐歌单 ---需要登录
 *  @return {Array}
 */
export const getDayRecommendMusicList = () => {
	return request.get('/recommend/resource')
}

/**
 *  首页 热门歌手 ---需要登录
 *  @return {Array}
 */
export const getHotSingerList = () => {
	return request.post('/top/artists', {
		offset: 0,
		limit: 18
	})
}

/**
 *  网友精选歌单
 *  @return {Array}
 */
export const getSelectionData = () => {
	return request.get('/top/playlist', {
		limit: 10,
		order: 'hot'
	})
}




