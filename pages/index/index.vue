<template>
	<view class="container">
		<view class="banner">
			<u-swiper class="bg" height="600" :list="listAds" mode="dot" indicator-pos="bottomCenter"></u-swiper>
			<view class="intro">
				<view class="greet">您好，{{ isLogin ? member.username : '游客' }}</view>
				<!-- <view class="note">一杯奶茶，一口软欧包，在奈雪遇见两种美好</view> -->
			</view>
		</view>
		<view class="content">
			<view class="entrance">
				<view class="item" @tap="takein">
					<view class="iconfont-unidrink icon-takein icon"></view>
					<view class="title">自取</view>
				</view>
				<view class="item" @tap="takeout">
					<view class="iconfont-unidrink icon-takeout icon"></view>
					<view class="title">外卖</view>
				</view>
			</view>
			
			<!-- <view class="info">
				<view class="integral_section" @tap="integrals">
					<view class="top">
						<text class="title">我的积分</text>
						<text class="value">{{member.score}}</text>
					</view>
					<view class="bottom">
						可兑换优惠券和积分商品
						<view class="iconfont iconarrow-right"></view>
					</view>
				</view>
				<view class="qrcode_section" @tap="memberCode">
					<image src="/static/images/mine/hym.png"></image>
					<text>会员码</text>
				</view>
			</view> -->
			
			<view class="navigators">
				<view class="left">
					<view class="grid flex-column just-content-center" @click="goShopping">
						<view class="align-items-center">
							<view class="iconfont-unidrink icon-shop" ></view>
							<view class="font-size-sm text-color-base">uniShop商城</view>
						</view>	
						<view class="text-color-assist">进入积分商城兑好物</view>
					</view>
					
				</view>
				<view class="right">
					<view class="tea-activity" @tap="integrals">
						<view>更多积分</view>
					</view>
					<view class="member-gifts" @tap="coupons">
						<view>会员劵包</view>
					</view>
				</view>
			</view>
			
			<!-- <view class="member-news">
				<view class="header">
					<view class="title">会员新鲜事</view>
					<view class="iconfont iconRightbutton"></view>
				</view>
				<view class="list">
					<view class="item">
						<image src="https://img-shop.qmimg.cn/s23107/2020/04/27/0039bf41c9ebd50a2c.jpg"></image>
						<view class="title">"梅"你不行 | 霸气杨梅清爽回归</view>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters} from 'vuex'
	
	export default {
		data() {
			return {
				listAds: []
			}
		},
		computed: {
			...mapState(['member', 'address', 'store']),
			...mapGetters(['isLogin'])
		},
		onShow() {
			this.getAds();
		},
		onShareAppMessage(e) {
			return {
				title: 'uniDrink'
			};
		},
		methods: { 
			async getAds () {
				let shop_id = this.store.id ? this.store.id : 0;
				let data = await this.$api.request('/menu/ads', 'POST', {
					shop_id: shop_id
				});
				if (data) {
					this.listAds = [];
					this.listAds = data;
				}
			},
			takein() {
				this.$store.commit('SET_ORDER_TYPE', 'takein')
				uni.switchTab({
					url: '/pages/menu/menu'
				})
			},
			takeout() {
				this.$store.commit('SET_ORDER_TYPE', 'takeout')
				uni.switchTab({
					url: '/pages/menu/menu'
				}) 
			},
			integrals() {
				if(!this.isLogin) {
					uni.navigateTo({url: '/pages/components/pages/login/login'})
					return
				}
				uni.navigateTo({
					url: '/pages/components/pages/integrals/integrals'
				})
			},
			goShopping() {
				uni.navigateToMiniProgram({
					appId: 'wx73b3aa7f870c7d5c'
				});
			},
			coupons() {
				if(!this.isLogin) {
					uni.navigateTo({url: '/pages/components/pages/login/login'})
					return
				}
				uni.navigateTo({
					url: '/pages/components/pages/coupons/coupons'
				})
			},
			memberCode() {
				if(!this.isLogin) {
					uni.navigateTo({url: '/pages/components/pages/login/login'})
					return
				}
				uni.navigateTo({
					url: '/pages/components/pages/mine/member-code'
				})
			}, 
			invite() {
				uni.navigateTo({
					url: '/pages/components/pages/activities/invite'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
/* #ifdef H5 */
page {
	height: auto;
	min-height: 100%;
}
/* #endif */
page {
	background-color: #ffffff!important;
}
.banner {
	position: relative;
	width: 100%;
	height: 600rpx;
	
	.bg {
		width: 100%;
		height: 600rpx;
	}
	
	.intro {
		position: absolute;
		top: calc(50rpx + var(--status-bar-height));
		left: 40rpx;
		color: #FFFFFF;
		display: flex;
		flex-direction: column;
		
		.greet {
			font-size: $font-size-lg;
			margin-bottom: 10rpx;
		}
		
		.note {
			font-size: $font-size-sm;
		}
	}
}

.content {
	padding: 0 30rpx;
}

.entrance {
	position: relative;
	margin-top: 30rpx;
	margin-bottom: 30rpx;
	border-radius: 10rpx;
	background-color: #ffffff;
	box-shadow: $box-shadow;
	padding: 30rpx 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 200rpx;
	.item {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		
		&:nth-child(1):after {
			content: '';
			position: absolute;
			width: 1rpx;
			background-color: #ddd;
			right: 0;
			height: 100%;
			transform: scaleX(0.5) scaleY(0.8);
		}
		
		.icon {
			font-size: 90rpx;
			color: #5A5B5C;
		}
		
		.title {
			font-size: 30rpx;
			color: $text-color-base;
			font-weight: 600;
		}
	}
}

.info {
	position: relative;
	margin-bottom: 30rpx;
	border-radius: 10rpx;
	background-color: #ffffff;
	box-shadow: $box-shadow;
	padding: 30rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	
	.integral_section {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		
		.top {
			display: flex;
			align-items: center;
			
			.title {
				color: $text-color-base;
				font-size: $font-size-base;
				margin-right: 10rpx;
			}
			.value {
				font-size: 44rpx;
				font-weight: bold;
			}
		}
		
		.bottom {
			font-size: $font-size-sm;
			color: $text-color-assist;
			display: flex;
			align-items: center;
		}
	}
	
	.qrcode_section {
		color: $color-primary;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: $font-size-sm;
		
		image {
			width: 40rpx;
			height: 40rpx;
			margin-bottom: 10rpx;
		}
	}
}

.navigators {
	width: 100%;
	margin-bottom: 20rpx;	
	border-radius: 10rpx;
	background-color: #ffffff;
	box-shadow: $box-shadow;
	padding: 20rpx;
	display: flex;
	align-items: stretch;
	border-radius: 300rpx;
	.left {
		width: 340rpx;
		margin-right: 20rpx;
		display: flex;
		padding: 0 20rpx;
		
		font-size: $font-size-sm;
		color: $text-color-base;
		background-color: #F1F8FA;
		border-radius: 200rpx;
		text-align: center;;
		
		.grid {
			height: 100%;
			width: 100%;
			display: flex;
		}
		.icon-shop {
			font-size: 100rpx;
		}
	}
	
	.right {
		width: 290rpx;
		//display: flex;
		flex-direction: column;
		
		.tea-activity, .member-gifts {
			width: 100%;
			display: flex;
			padding: 20rpx;
			font-size: $font-size-sm;
			color: $text-color-base;
			align-items: center;
			position: relative;
			border-radius: 100rpx;
			height: 150rpx;
			text-align: center;
			view {
				display: block;
				width: 100%;
			}
			padding-right: 60rpx;
		}
		
		.tea-activity {
			//background-color: #FDF3F2;
			margin-bottom: 20rpx;
			
		}
		
		.member-gifts {
			//background-color: #FCF6D4;
		}
		
		.right-img {
			flex: 1;
			position: relative;
			margin-left: 20rpx;
			margin-right: -20rpx;
			margin-bottom: -20rpx;
			display: flex;
			align-items: flex-end;
			
			image {
				width: 100%;
			}
		}
	}
	
	.mark-img {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}
	
	.yzclh-img {
		height: 122.96rpx;
		width: calc(173 / 99 * 122.96rpx);
	}
}

.member-news {
	width: 100%;
	margin-bottom: 30rpx;
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
		
		.title {
			font-size: $font-size-lg;
			font-weight: bold;
		}
		
		.iconfont {
			font-size: 52rpx;
			color: $text-color-assist;
		}
	}
	
	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		
		.item {
			width: 100%;
			height: 240rpx;
			position: relative;
			
			image {
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
			}
			
			.title {
				position: relative;
				font-size: 32rpx;
				font-weight: 500;
				width: 100%;
				top: -70rpx;
				left: 16rpx;
				color: #ffffff;
			}
		}
	}
}
</style>
