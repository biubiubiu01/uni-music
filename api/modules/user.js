import request from '@/utils/request'

/**
 *  登录
 *  @param  {Number} phone 
 *  @param  {Number} password 
 *  @return {Array}
 */
export const login = params => {
	return request.get('/login/cellphone', params)
}

/**
 *  获取登录状态
 */
export const getLoginStatus = params => {
	return request.get('/login/status', params)
}

/**
 *  喜欢音乐 或取消喜欢
 */
export const likeMusic = params => {
	return request.get('/like', params)
}

/**
 *  喜欢音乐列表
 */
export const likeData = params => {
	return request.get('/likelist', params)
}

/**
 *  获取用户喜欢的歌单
 */
export const getUserInfo = params => {
	return request.get('/user/playlist', params)
}

/**
 *  获取用户最近播放记录
 */
export const getUserHistory = params => {
	return request.get('/user/record', params)
}




