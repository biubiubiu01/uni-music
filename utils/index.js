/**
 * 防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
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
