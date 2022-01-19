<template>
	<view class="login-container">
		<image src="../../static/loginBg.png" class="background-img"></image>
		<view class="absolve-wrapper">
			<view class="logo"><image src="../../static/logo.png" class="logo-img"></image></view>
			<view class="text-title">我有故事和歌，你听吗？</view>
			<view class="login-main">
				<view class="input-wrapper">
					<i class="iconfont icon-phone icon"></i>
					<input placeholder="请输入手机号" v-model="userInfo.phone" maxlength="11" />
				</view>
				<view class="input-wrapper">
					<i class="iconfont icon-password icon"></i>
					<input v-if="isText" type="text" placeholder="请输入密码" v-model="userInfo.password" />
					<input v-else type="password" placeholder="请输入密码" v-model="userInfo.password" />
					<i class="iconfont eye" :class="isText ? 'icon-openEye' : 'icon-closeEye'" @click="isText = !isText"></i>
				</view>
				<button class="cu-btn round login-button lg cu-load" :class="{ loading: loading }" @click="getUserInfo">登录</button>
			</view>
			<view class="other-login">
				<view class="other-text">第三方登录</view>
				<view class="login-list">
					<i class="iconfont icon-weixin other-item" @click="handleTest"></i>
					<i class="iconfont icon-qq other-item" @click="handleTest"></i>
					<i class="iconfont icon-weibo other-item" @click="handleTest"></i>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			isText: false,
			userInfo: {
				phone: '13333333333',
				password: '123456'
			}
		};
	},
	methods: {
		getUserInfo() {
			this.loading = true;
			let that = this;
			//测试账号，可以改成你自己的
			const userInfo = this.userInfo;
			that.loading = true;
			that.$store
				.dispatch('login', userInfo)
				.then(res => {
					that.loading = false;
					uni.navigateTo({
						url: '/pages/index/index'
					});
				})
				.catch(err => {
					that.loading = false;
					uni.showToast({
						title: '登录失败',
						icon: 'none',
						duration: 3000,
						complete: function() {
							setTimeout(function() {
								uni.hideToast();
							}, 3000);
						}
					});
				});
		},
		handleTest(){
			 uni.showToast({
			     title: '功能开发中哦...',
				 icon :'none',
			     duration: 2000
			 });
		}
	}
};
</script>

<style lang="scss" scoped>
.login-container {
	width: 100%;
	height: 100vh;
	position: relative;
	overflow: hidden;
	// background: url(../../static/loginBg.png) no-repeat;
	// background-size: contain;
	.absolve-wrapper{
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.background-img{
      width: 100%;
	  height: 100%;
	}
	.logo {
		text-align: center;
		margin-top: 12%;
		.logo-img {
			width: 100px;
			height: 100px;
		}
	}
	.text-title {
		font-size: 48rpx;
		margin-top: 5%;
		text-align: center;
		color: #fffefe;
	}
	.login-main {
		box-sizing: border-box;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 10%;
		right: 10%;
		.input-wrapper {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;
			padding-bottom: 30rpx;
			border-bottom: 1px solid rgb(242, 242, 242);
			position: relative;
			.icon {
				margin-right: 10px;
				font-size: 16px;
			}
			.eye {
				float: right;
				position: absolute;
				right: 5px;
				font-size: 16px;
			}
		}
		.login-button {
			width: 100%;
			color: #fff;
			background-image: linear-gradient(to right, #ffa6b6, #ff7c93);
			letter-spacing: 2px;
			height: 45px;
			margin-top: 75rpx !important;
		}
	}
	.other-login {
		position: absolute;
		bottom: 5%;
		left: 10%;
		right: 10%;
		.other-text {
			text-align: center;
			color: rgba(0, 0, 0, 0.4);
			font-size: 28rpx;
			position: relative;
			&::before,
			&::after {
				position: absolute;
				background: rgba(0, 0, 0, 0.15);
				content: '';
				height: 1px;
				top: 50%;
				width: 100px;
			}
			&::before {
				left: 5px;
			}
			&::after {
				right: 5px;
			}
		}
		.login-list{
			margin-top: 15px;
			display: flex;
			justify-content: center;
			align-items: center;
			.other-item{
				flex: 1;
				font-size: 40px;
				text-align: center;
				&.icon-weixin{
					color: #17d874;
				}
				&.icon-qq{
					color: #32d6f5;
				}
				&.icon-weibo{
					color: rgb(234,93,92);
				}

			}
		}
	}
	/deep/ {
		.input-placeholder {
			color: rgb(194, 194, 194);
			font-size: 30rpx;
		}
	}
}
</style>
