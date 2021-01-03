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
