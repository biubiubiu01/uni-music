/**
 * 函数防抖
 * @param {Function} func
 * @param {number} delay
 * @return {*}
 */

export function debounce(func, delay, immediate = false) {
	let timer,
		context = this;
	return (...args) => {
		if (immediate) {
			func.apply(context, args);
			immediate = false;
			return;
		}
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(context, args);
		}, delay);
	};
}

/**
 * 将数字显示为 xx万或xx亿
 * @param {String} 
 * @return {String}
 */

export function filterPlayCount(val) {
	if (!val || val <= 0) return 0;
	else if (val < 1000) return val;
	else if (val >= 1000 && val < 10000) return Math.ceil(val / 1000) + '千';
	else if (val >= 10000 && val < 100000000) return Math.ceil(val / 10000) + '万';
	return Math.ceil(val / 100000000) + '亿';
}

/**
 * 图片路径
 * @param {Object} 
 * @return {String}
 */

export function getImage(val) {
	let img = '';
	if (val.picUrl) {
		img = val.picUrl;
	} else if (val.album) {
		img = val.album.picUrl;
	} else if (val.al) {
		img = val.al.picUrl;
	}
	return img?img + '?param=300y300':null;
}

/**
 * 作者
 * @param {Object} 
 * @return {String}
 */

export function getName(val) {
	if (val.song) {
		return val.song.artists[0].name;
	}
	if (val.artists) {
		return val.artists[0].name;
	}
	if (val.ar) {
		return val.ar[0].name;
	}
}
