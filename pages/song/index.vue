<template>
	<div class="song-container">
		<cu-custom style="color:#fff" :isBack="true">
			<block slot="content" class="musicName">{{ playInfo.name }}</block>
		</cu-custom>
		<view class="author">{{ playInfo.author }}</view>
		<view class="img-container"><image :src="playInfo.img1v1Url" class="authorImg"></image></view>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {
		playInfo() {
			return this.$store.state.playInfo;
		}
	},
	mounted() {
		console.log(this.playInfo);
	}
};
</script>

<style lang="scss" scoped>
.song-container {
	position: relative;
	width: 100%;
	height: 100%;
	background: url(data:image/gif;base64,R0lGODlhOASAB5EAABESF////////wAAACH5BAEHAAIALAAAAAA4BIAHAAL/hI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGCg4SFhoeIiYqLjI2Oj4CBkpOUlZaXmJmam5ydnp+QkaKjpKWmp6ipqqusra6voKGys7S1tre4ubq7vL2+v7CxwsPExcbHyMnKy8zNzs/AwdLT1NXW19jZ2tvc3d7f0NHi4+Tl5ufo6err7O3u7+Dh8vP09fb3+Pn6+/z9/v/w8woMCBBAsaPIgwocKFDBs6fAgxosSJFCtavIgxo8aN/xw7evwIMqTIkSRLmjyJMqXKlSxbunwJM6bMmTRr2ryJM6fOnTx7+vwJNKjQoUSLGj2KNKnSpUybOn0KNarUqVSrWr2KNavWrVy7ev0KNqzYsWTLmj2LNq3atWzbun0LN67cuXTr2r2LN6/evXz7+v0LOLDgwYQLGz6MOLHixYwbO34MObLkyZQrW76MObPmzZw7e/4MOrTo0aRLmz6NOrXq1axbu34NO7bs2bRr276NO7fu3bx7+/4NPLjw4cSLGz+OPLny5cybO38OPbr06dSrW7+OPbv27dy7e/8OPrz48eTLmz+PPr369ezbu38PP778+fTr27+PP7/+/fz7+///D2CAAg5IYIEGHohgggouyGCDDj4IYYQSTkhhhRZeiGGGGm7IYYcefghiiCKOSGKJJp6IYooqrshiiy6+CGOMMs5IY4023ohjjjruyGOPPv4IZJBCDklkkUYeiWSSSi7JZJNOPglllFJOSWWVVl6JZZZabslll15+CWaYYo5JZplmnolmmmquyWabbr4JZ5xyzklnnXbeiWeeeu7JZ59+/glooIIOSmihhh6KaKKKLspoo44+Cmmkkk5KaaWWXopppppuymmnnn4Kaqiijkpqqaaeimqqqq7KaquuvgprrLLOSmuttt6Ka6667sprr77+Cmywwg5LbLHGHotsssr/Lstss84+C2200k5LbbXWXottttpuy2233n4Lbrjijktuueaei2666q7LbrvuvgtvvPLOS2+99t6Lb7767stvv/7+C3DAAg9McMEGH4xwwgovzHDDDj8MccQST0xxxRZfjHHGGm/McccefwxyyCKPTHLJJp+Mcsoqr8xyyy6/DHPMMs9Mc80234xzzjrvzHPPPv8MdNBCD0100UYfjXTSSi/NdNNOPw111FJPTXXVVl+NddZab811115/DXbYYo9Ndtlmn4122mqvzXbbbr8Nd9xyz0133XbfjXfeeu/Nd99+/w144IIPTnjhhh+OeOKKL854444/Dnnkkk9OeeWW/1+Oeeaab855555/Dnrooo9Oeummn4566qqvznrrrr8Oe+yyz0577bbfjnvuuu/Oe+++/w588MIPT3zxxh+PfPLKL898884/D3300k9PffXWX4999tpvz3333n8Pfvjij09++eafj3766q/Pfvvuvw9//PLPT3/99t+Pf/76789///7/D8AACnCABCygAQ+IwAQqcIEMbKADHwjBCEpwghSsoAUviMEManCDHOygBz8IwhCKcIQkLKEJT4jCFKpwhSxsoQtfCMMYynCGNKyhDW+IwxzqcIc87KEPfwjEIApxiEQsohGPiMQkKnGJTGyiE58IxShKcYpUrKIVr4jFLP9qcYtc7KIXvwjGMIpxjGQsoxnPiMY0qnGNbGyjG98IxzjKcY50rKMd74jHPOpxj3zsox//CMhACnKQhCykIQ+JyEQqcpGMbKQjHwnJSEpykpSspCUviclManKTnOykJz8JylCKcpSkLKUpT4nKVKpylaxspStfCctYynKWtKylLW+Jy1zqcpe87KUvfwnMYApzmMQspjGPicxkKnOZzGymM58JzWhKc5rUrKY1r4nNbGpzm9zspje/Cc5winOc5CynOc+JznSqc53sbKc73wnPeMpznvSspz3vic986nOf/OynP/8J0IAKdKAELahBD4rQhCp0oQxtqEMfCtGISnT/ohStqEUvitGManSjHO2oRz8K0pCKdKQkLalJT4rSlKp0pSxtqUtfCtOYynSmNK2pTW+K05zqdKc87alPfwrUoAp1qEQtqlGPitSkKnWpTG2qU58K1ahKdapUrapVr4rVrGp1q1ztqle/CtawinWsZC2rWc+K1rSqda1sbatb3wrXuMp1rnStq13vite86nWvfO2rX/8K2MAKdrCELaxhD4vYxCp2sYxtrGMfC9nISnaylK2sZS+L2cxqdrOc7axnPwva0Ip2tKQtrWlPi9rUqna1rG2ta18L29jKdra0ra1tb4vb3Op2t7ztrW9/C9zgCne4xC2ucY+L3OQqd7nM/22uc58L3ehKd7rUra51r4vd7Gp3u9ztrne/C97wine85C2vec+L3vSqd73sba973wvf+Mp3vvStr33vi9/86ne//O2vf/8L4AALeMAELrCBD4zgBCt4wQxusIMfDOEIS3jCFK6whS+M4QxreMMc7rCHPwziEIt4xCQusYlPjOIUq3jFLG6xi18M4xjLeMY0rrGNb4zjHOt4xzzusY9/DOQgC3nIRC6ykY+M5CQreclMbrKTnwzlKEt5ylSuspWvjOUsa3nLXO6yl78M5jCLecxkLrOZz4zmNKt5zWxus5vfDOc4y3nOdK6zne+M5zzrec987rOf/wzoQAt60IQutP+hD43oRCt60YxutKMfDelIS3rSlK60pS+N6UxretOc7rSnPw3qUIt61KQutalPjepUq3rVrG61q18N61jLeta0rrWtb43rXOt617zuta9/DexgC3vYxC62sY+N7GQre9nMbraznw3taEt72tSutrWvje1sa3vb3O62t78N7nCLe9zkLre5z43udKt73exut7vfDe94y3ve9K63ve+N73zre9/87re//w3wgAt84AQvuMEPjvCEK3zhDG+4wx8O8YhLfOIUr7jFL47xjGt84xzvuMc/DvKQi3zkJC+5yU+O8pSrfOUsb7nLXw7zmMt85jSvuc1vjvOc63znPO+5z3/9DvSgC33oRC+60Y+O9KQrfelMb7rTnw71qEt96lSvutWvjvWsa33rXO+6178O9rCLfexkL7vZz472tKt97Wxvu9vfDve4y33udK+73e+O97zrfe9877vf/w74wAt+8IQvvOEPj/jEK37xjG+84x8P+chLfvKUr7zlL4/5zGt+85zvvOc/D/rQi370pC+96U+P+tSrfvWsb73rXw/72Mt+9rSvve1vj/vc6373vO+9738P/OALf/jEL77xj4/85Ct/+cxvvvOfD/3oS3/61K++9a+P/exrf/vc7773vw/+8It//OQvv/nPj/70q3/97G+/+98P//jLf/70r7/97wRv+wIAADs=);
	background-size: 100% 100%;
	.musicName {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.author {
		width: 100%;
		text-align: center;
		color: #aaa;
		margin-top: -5px;
	}
	.img-container {
		position: absolute;
		top: 35%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 450rpx;
		height: 450rpx;
		background: url(../../static/musicImg.png) no-repeat;
		background-size: 100% 100%;
		.authorImg {
			border-radius: 50%;
			width: 315rpx;
			height:315rpx;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
</style>
