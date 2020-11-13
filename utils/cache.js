export const setCache = (key, data) => {
	uni.setStorageSync(key, data)
}

export const getCache = (key) => {
	return uni.getStorageSync(key)
}

export const removeCache = (key) => {
	uni.removeStorageSync(key)
}
