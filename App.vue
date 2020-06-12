<script>
	/**
	 * vuex管理登陆状态，具体可以参考官方登陆模板示例
	 */
	import {
		mapMutations,
		mapState
	} from 'vuex';
	export default {
		methods: {
			...mapMutations(['login', 'logout', 'setUserInfo']),
			// #ifdef H5
			// 检查登录状态
			async checkLogin() {
				let user = uni.getStorageSync('userInfo');
				if (user) {
					this.login(user);
				}
				let result = await this.$api.request('/user/status');
				if (!result) {
					// 若没有登录则清空个人信息
					this.logout();
				}
			},
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
			this.$wechatMiniLogin();
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
