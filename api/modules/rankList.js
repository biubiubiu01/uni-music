import request from '@/utils/request'

/**
 *  首页 歌手单曲
 *  @return {Array}
 */
export const getRankList = () => {
	return request.get('/toplist/detail')
}