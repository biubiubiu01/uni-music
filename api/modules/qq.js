import request from '@/utils/qqRequest'

/**
 *  搜索音乐
 *  @param  {Number}  key
 *  @return {Array}
 */
export const searchQQMusic = (params) => {
	return request.get('/search', params)
}

/**
 *  获取音乐Url地址
 *  @param  {Number}  key
 *  @return {Array}
 */
export const searchQQMusicUrl = (params) => {
	return request.get('/song/urls', params)
}

/**
 *  获取音乐歌词
 *  @param  {Number}  key
 *  @return {Array}
 */
export const searchQQMusicLyric = (params) => {
	return request.get('/lyric', params)
}

