<script>
	/**
	 * vuex管理登陆状态，具体可以参考官方登陆模板示例
	 */
	import {
		mapMutations,
	} from 'vuex';
	export default {
		methods: {
			...mapMutations(['SET_MEMBER', 'SET_OPENID']),
			// #ifdef H5
			// 检查登录状态
			async checkLogin() {
				let result = await this.$u.api.userStatus();
				if (!result) {
					// 若没有登录则清空个人信息
					this.SET_MEMBER({});
				}
			},
			// #endif
			// #ifdef MP-WEIXIN
			async wechatMiniLogin() {
				this.$u.toast('登录中');
				let [error, loginRes] = await uni.login({
					provider: 'weixin'
				});
				if (loginRes.hasOwnProperty('code')) {
					let data = await this.$u.api.userAuthSession({
						code: loginRes.code
					});
					if (data) {
						this.SET_OPENID(data.openid)
						if (data.hasOwnProperty('userInfo') && data.userInfo.token && data.userInfo.token != '') {
							Vue.prototype.$store.commit('SET_MEMBER', data.userInfo);	
							this.SET_MEMBER(data.userInfo);
						}
					}
				} else {
					this.$u.toast('登录失败');
				}
			}
			// #endif
		},
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');

			// 检查用户登录情况
			// #ifdef H5
			this.checkLogin();
			// #endif
			// #ifdef MP-WEIXIN
			this.wechatMiniLogin();
			// #endif
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style lang="scss">
	
	@import "uview-ui/index.scss";
	//@import "~@/node_modules/uview-ui/index.scss";
	
	/*每个页面公共css */
	@import '~@/static/style/app.scss';
	

</style>
