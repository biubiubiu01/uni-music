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