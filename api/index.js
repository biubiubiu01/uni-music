const home=require('./modules/home')
const user=require('./modules/user')
const search=require('./modules/search')

export default{
	...home,
	...user,
	...search
}


