// const audio = uni.createInnerAudioContext();
// audio.obeyMuteSwitch = false;

// audio.onPlay(() => {
// 	console.log('开始播放了');
// })

// audio.onCanplay(() => {
// 	console.log('播放开始获取时间');
// 	audio.duration;
// 	setTimeout(() => {
// 		console.log(audio.duration);
// 	}, 30)
// })

const audio = uni.getBackgroundAudioManager();

module.exports = {
	audio
}
