import {
	getCache
} from "@/utils/cache.js"

// const baseURL = 'http://localhost:3000'
const baseURL = 'https://autumnfish.cn'
// const baseURL = 'http://www.lidaqing.plus:1901/'
// const baseURL = 'https://aqueous-retreat-34523.herokuapp.com/'
// const baseURL='https://nicemusic-api.lxhcool.cn/'
// const baseURL='http://124.71.236.165:3000/'

/**
 * baseURL随时可能会挂，保险起见，可以去下载NeteaseCloudMusicApi，然后本地启动
 * 由于这个baseUrl不是所有接口都能用，所以部分api里面可能存在其他baseUrl
 */




const request = {
	get(url, data) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: url.indexOf('http') != -1 ? url : baseURL +
					url,
				data: {
					...data,
					cookie: getCache('COOKIE')
				},
				header: {
					'Accept': 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
	
				},

				method: "GET",
				success: (response) => {
					let res = response.data
					if (res.code === 200 || url == '/check/music') {
						resolve(res)
					} else {
						reject(res)
						showError(res);
					}
				},
				fail: (error) => {
					if (error && error.response) {
						reject(error.response)
						showError(error.response);
					}
				},


			});
		})

	},
	post(url, data) {

		return new Promise((resolve, reject) => {
			uni.request({
				url: baseURL + url,
				data: data,
				header: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				method: "POST",
				success: (response) => {
					let res = response.data
					if (res.code === 200) {
						resolve(res)
					} else {
						reject(res)
						showError(res);

					}
				},
				fail: (error) => {
					if (error && error.response) {
						reject(error.response)
						showError(error.response);
					}
				},
			});
		})
	},
}

const showError = error => {
	let errorMsg = ''
	if (error.message) {
		errorMsg = error.message
	} else {
		switch (error.code) {
			case 400:
				errorMsg = '请求参数错误'
				break
			case 301:
				errorMsg = '未授权，请登录'
				break
			case 403:
				errorMsg = '跨域拒绝访问'
				break
			case 404:
				errorMsg = '请求地址不存在'
				break
			case 408:
				errorMsg = '请求超时'
				break
			case 500:
				errorMsg = '服务器内部错误'
				break
			case 501:
				errorMsg = '服务未实现'
				break
			case 502:
				errorMsg = '网关错误'
				break
			case 503:
				errorMsg = '服务不可用'
				break
			case 504:
				errorMsg = '网关超时'
				break
			case 505:
				errorMsg = 'HTTP版本不受支持'
				break
			default:
				errorMsg = "请求失败"
				break
		}
	}

	uni.showToast({
		title: errorMsg,
		icon: 'none',
		duration: 3000,
		complete: function() {
			setTimeout(function() {
				if (error.code == 301) {
					uni.navigateTo({
						url: '../login/index'
					});
				}
				uni.hideToast();
			}, 3000);
		}
	});
}

export default request
