import request from '@/utils/request'

/**
 *  登录
 *  @param  {Number} phone 
 *  @param  {Number} password 
 *  @return {Array}
 */
export const login = params => {
	return request.post('/login/cellphone', params)
}

/**
 *  获取登录状态
 */
export const getLoginStatus = params => {
	return request.post('/login/status', params)
}