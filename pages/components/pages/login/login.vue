<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录uniDrink</view>
			
			<input class="u-border-bottom" type="number" v-model="mobile" placeholder="请输入手机号" />
			<view class="tips">未注册的手机号验证后自动创建uniDrink账号</view>
			
			<input v-if="type == 'pass' || changePass" class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<view v-if="type == 'pass' || changePass" class="tips">密码支持英文大小写数字符号</view>
			
			<view style="display: flex;" v-if="type == 'message' || changePass">
				<view style="width: 50%;">
					<input style="height: 100rpx;"  class="u-border-bottom" type="number" v-model="captcha" placeholder="请输入验证码" />
					<!-- <view v-if="type == 'message' || changePass" class="tips">必须填对手机号才能收到验证码</view> -->
				</view>
				<view style="width: 50%;">
					<button style="height: 100rpx;" @tap="getCaptcha" :style="[captchaStyle]" class="getCaptcha">
						{{captchaText}}
						<u-verification-code :seconds="seconds" @end="endCaptcha" @change="changeCapcha" @start="startCaptcha" ref="uCode" ></u-verification-code>
					</button>
				</view>
			</view>
			
			<button @tap="submit" :style="[submitStyle]" class="login">{{changePass ? '修改' : '登录'}}</button>
			
			<view class="alternative">
				<view v-if="!changePass" class="password" @tap="changeType">{{type == 'message' ? '密码登录' : '短信登录'}}</view>
				
				<view v-if="changePass" class="password" @tap="changePass = !changePass">返回登录</view>
				
				<view v-if="!changePass" class="issue" @tap="changePass = !changePass">修改密码</view>
			</view>
		</view>
		<view class="buttom">
			<view class="loginType">
				<!-- #ifdef MP-WEIXIN -->
				<button type="primary" size="default" class="login-btn" open-type="getPhoneNumber" @getphonenumber="loginForWechatMini">
					<image src="/static/images/mine/wechat.png"></image>
					微信一键登录
				</button>
				<!-- #endif -->
			</view>
			<view class="hint">
				登录代表同意
				<text class="link">uniDrink点评用户协议、隐私政策，</text>
				并授权使用您的uniDrink点评账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			mobile:'13888888888',
			captcha: '',
			captchaText: '获取验证码',
			password: '123456',
			type: 'pass' ,// 登录类型:message=短信登录,pass=密码登录
			changePass: false  ,// 是否修改密码
			seconds:60 // 验证码倒计时
		};
	},
	computed:{
		captchaStyle() {
			let style = {};
			if(this.mobile && this.captchaText == '获取验证码') {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		},
		submitStyle() {
			let style = {};
			if(true) {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		},
		event() {
			if (this.changePass) {
				// 修改密码
				return 'resetpwd' 
			} else {
				// 登录
				return 'register'
			}
		}
	},
	methods: {
		...mapMutations(['SET_MEMBER']),
		// #ifdef MP-WEIXIN
		async loginForWechatMini(e) {
			if (e.detail.encryptedData && e.detail.iv) {
				let data = await this.$api.request('/user/loginForWechatMini', 'POST', {
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv
				});
				if (data) {
					this.SET_MEMBER(data);
					this.$refs.uToast.show({
						title: '登录成功',
						type: 'success'
					});
					setTimeout(function() {
						uni.navigateBack();
					}, 2000);
				}
			}
		},
		// #endif
		
		// 更换登录类型
		changeType() {
			this.type = this.type == 'message' ? 'pass' : 'message'
		},
		// 获取验证码
		async getCaptcha() {
			
			if (this.$u.test.mobile(this.mobile) == false) {
				this.$refs.uToast.show({
					title: '手机号码格式不对',
					type: 'error'
				});
				return
			}
			
			let data = await this.$api.request('/sms/send', 'POST', {
				mobile: this.mobile,
				event: this.event
			});		
			if (data) {
				this.$refs.uCode.start();
				
			}
		},
		// 验证码开始计时
		startCaptcha() {
			console.log('start')
		},
		// 验证码结束
		endCaptcha() {
			console.log('end')
			this.captchaText = '获取验证码';
		},
		changeCapcha(text) {
			console.log('change:' + text)
			this.captchaText = text;
		},
		// 提交
		submit() {
			
			if (this.$u.test.mobile(this.mobile) == false) {
				this.$refs.uToast.show({
					title: '手机号码格式不对',
					type: 'error'
				});
				return
			}
			
			if (this.changePass) {
				this.repass()
			} else {
				this.login()
			}
		},
		// 登录
		async login() {
			let data = await this.$api.request('/user/login', 'POST', {
				mobile: this.mobile,
				password: this.type == 'pass' ? this.password : '',
				captcha: this.captcha
			})
			if (data) {
				this.SET_MEMBER(data);
				this.$refs.uToast.show({
					title: '登录成功',
					type: 'success'
				});
				setTimeout(function() {
					uni.navigateBack();
				}, 2000);
			}
		},
		// 修改密码
		async repass() {
			let data = await this.$api.request('/user/resetpwd', 'POST', {
				mobile:this.mobile,
				captcha: this.captcha,
				password: this.password
			})
			if (data) {
				this.$refs.uToast.show({
					title: '修改密码成功',
					type: 'success'
				});
				this.changePass = false;
				this.type = 'pass'
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	background-color: #ffffff;
	font-size: 28rpx;
	position: relative;
	height: 100%;
	.content {
		width: 600rpx;
		margin: 0 auto;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(253, 243, 208);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		.login {
			background-color: rgb(253, 243, 208);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			margin-top: 40rpx;
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
	.buttom {
		position: absolute;
		bottom: 0;
		.loginType {
			padding: 80rpx;
			//justify-content:space-between;
			
			.login-btn {
				width: 100%;
				border-radius: 50rem !important;
				//display: flex;
				align-items: center;
				justify-content: center;
				padding: 10rpx 0;
				text-align: center;
				image {
					width: 36rpx;
					height: 30rpx;
					margin-right: 10rpx;
					vertical-align: middle;
				}
			}
		}
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
			
			.link {
				color: $u-type-warning;
			}
		}
	}
}
</style>
