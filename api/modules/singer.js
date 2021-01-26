import request from '@/utils/request'

/**
 *  获取所有 热门歌手
 *  @return {Array}
 */
export const getSingerList = () => {
	return request.get('/toplist/artist')
}


/**
 *  获取 歌手基本信息
 *  @param {String}  id
 *  @return {Array}
 */
export const getSingerInfo = (params) => {
	return request.get('/artists', params)
}

/**
 *  歌手 全部歌曲
 *  @param {String}  id
 *  @return {Array}
 */
export const getSingerAllMusic = (params) => {
	return request.get('/artist/songs', params)
}