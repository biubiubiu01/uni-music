import request from '@/utils/request'

/**
 *  默认搜索关键词
 *  @return {Object}
 */
export const getDefaultSearch = (params) => {
  return request.get('/search/default', params)
}

/**
 *  热门搜索 详细
 *  @return {Array}
 */
export const getHotDetailSearch = (params) => {
  return request.get('/search/hot/detail', params)
}

/**
 *  搜索建议
 *  @param {String} keywords
 *  @param {String} type
 *  @return {Array}
 */
export const getSuggestList = (params) => {
  let data = {
    ...params,
    type: 'mobile',
  }
  return request.get('/search/suggest', data)
}

/**
 *  搜索
 *  @param {String} keywords
 *  @return {Array}
 */
export const getSearchList = (params) => {
  return request.get('/cloudsearch', params)
}

/**
 *  根据id去获取音乐url
 *  @param  {Number} id
 *  @return {Array}
 */
export const getMusicUrl = (params) => {
  return request.get('/song/url', params)
}

/**
 *  判断是否有版权
 *  @param  {Number} id
 *  @return {Array}
 */
export const checkMusicUrl = (params) => {
  return request.get('/check/music', params)
}

/**
 *  根据id去获取歌词
 *  @param  {Number} id
 *  @return {Array}
 */
export const getLyric = (params) => {
  return request.get('/lyric', params)
}
