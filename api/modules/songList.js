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