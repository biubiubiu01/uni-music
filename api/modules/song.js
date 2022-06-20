import request from '@/utils/request'

/**
 *  歌单 获取歌单分类标签
 *  @return {Array}
 */
export const getSongTagList = (params) => {
	return request.get('/playlist/catlist', params)
}

/**
 *  歌单  所有歌单
 *  @return {Array}
 */
export const getSongList = (params) => {
	return request.get('/top/playlist', params)
}

/**
 *  首页 歌单详情
 *  @param  {string} id
 *  @return {Array}
 */
export const getPlayListData = (params) => {
	return request.get('/playlist/detail', params)
}

/**
 *  首页 通过id获取歌曲详情  
 *  @param  {string} ids
 *  @return {Array}
 */
export const getPlayDetail = (params) => {
	return request.get('/song/detail', params)
}