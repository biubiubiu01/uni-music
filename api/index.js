const home=require('./modules/home')
const user=require('./modules/user')
const search=require('./modules/search')
const playList=require('./modules/playList')
const qq=require('./modules/qq')
const songList=require('./modules/songList')
const rankList=require('./modules/rankList')
const singer=require('./modules/singer')

export default{
	...home,
	...user,
	...search,
	...playList,
	...qq,
	...songList,
	...rankList,
	...singer
}


