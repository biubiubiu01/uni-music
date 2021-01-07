export const audio = uni.createInnerAudioContext();

export function init(option) {
	const {
		src,
		autoplay = true
	} = option
	if (!src) {
		uni.showToast({
			title: "音频不存在",
			icon: 'none',
			duration: 2000
		})
	}
	audio.autoplay = autoplay;
	audio.src = src
}

export function play() {
	audio.play();
}

export function pause() {
	audio.pause();
}
