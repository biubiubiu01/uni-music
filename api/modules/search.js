import request from '@/utils/request'

/**
 *  搜索默认关键词
 *  @return {object}
 */
export const getDefaultSearch = (params) => {
	return request.get('/search/default', params)
}

/**
 *  根据id去获取音乐url
 *  @param  {Number} id
 *  @return {Array}
 */
export const getMusicUrl = (params) => {
	return request.get('/song/url', params)
}