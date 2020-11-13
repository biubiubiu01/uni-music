const baseURL = 'http://api.cloudmusic.pulsating.cn:3000';

const request = {
	get(url, data = null) {
		uni.showLoading({
			title: '加载中'
		});
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseURL + url,
				data: data,
				header: {
					'Accept': 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
				},
				method: "GET",
				success: (response) => {
					uni.hideLoading();
					let res = response.data
					if (res.code === 200) {
						resolve(res)
					} else {
						showError(res);
					}
				},
				fail: (error) => {
					uni.hideLoading();
					if (error && error.response) {
						reject(error.response)
						showError(error.response);
					}
				},
				complete: () => {
					setTimeout(function() {
						uni.hideLoading();
					}, 250);
				}
			});
		})

	},
	post(url, data = null) {
		uni.showLoading({
			title: '加载中'
		});
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
						showError(res);
					}
				},
				fail: (error) => {
					uni.hideLoading();
					if (error && error.response) {
						reject(error.response)
						showError(error.response);
					}
				},
				complete: () => {
					uni.hideLoading();
				}
			});
		})
	},
}

const showError = error => {
	let errorMsg = ''
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

	uni.showToast({
		title: errorMsg,
		icon: 'none',
		duration: 2000,
		complete: function() {
			setTimeout(function() {
				uni.hideToast();
			}, 2000);
		}
	});
}

export default request
