<template>
	<view class="top">
		<button type="primary" size="default" class="login-btn" @click="logout">
			确定退出登录
		</button>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import  {mapMutations}  from 'vuex';
	export default { 
		data() {
			return {}
		},
		methods:{
			...mapMutations(['SET_MEMBER']),
			logout() {
				this.SET_MEMBER({});
				this.$refs.uToast.show({
					title: '已退出',
					type: 'success'
				});
				setTimeout(function() {
					uni.navigateBack();
				}, 2000);
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.top {
		display: flex; 
		height: 100%;
	}
	button{
		 margin: auto;
	}
</style>
