<template>
	<view class="container position-relative w-100 h-100 overflow-hidden">
		<scroll-view scroll-y class="coupon-list">
			<view class="wrapper">
				<view class="coupon" v-for="(item, index) in coupons" :key="index" @tap="openDetailModal(item, index)">
					<view class="taobao">
						<view class="ticket" :style="{border: item.id == coupon_id ? '1rpx solid red':''}">
							<view class="left">
								<image class="picture" :src="item.image" mode="aspectFill"></image>
								<view class="introduce">
									<view class="top">
										￥
										<text class="big">{{ item.value }}</text>
										<view>满{{ item.least }}减{{ item.value }}</view>
									</view>
									<view class="type">{{ item.title }}</view>
									<view class="date u-line-1">{{ item.starttime_text }}-{{ item.endtime_text }}</view>
								</view>
							</view>
							<view class="right" @click.stop="" v-if="activeTabIndex == 0">
								<view v-if="item.id != coupon_id" class="use immediate-use" :round="true" @tap="useCouponWith(item)">立即使用</view>
								<view v-else class="use immediate-use" :round="true" @tap="cancelCoupon(item)">取消使用</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<modal custom :show="detailModalVisible" @cancel="closeDetailModal" width="90%">
			<view class="modal-content">
				<view class="d-flex font-size-extra-lg text-color-base just-content-center mb-20">{{ coupon.title }}</view>
				<view class="d-flex font-size-sm text-color-base mb-20">有效期：{{ coupon.starttime_text }}至{{ coupon.endtime_text }}</view>
				<view class="d-flex font-size-sm text-color-base mb-20">领取时间：{{ coupon.createtime_text }}</view>
				<view class="d-flex font-size-sm text-color-base mb-20">卷价值：满{{ coupon.least }}减{{ coupon.value }}</view>
				<view class="d-flex font-size-sm text-color-base mb-20" v-if="coupon.score > 0">需要积分：{{ coupon.score }}</view>
				<view class="d-flex font-size-sm text-color-base mb-20">适用范围：{{ typeInfo(coupon.type) }}</view>
				<view class="d-flex font-size-sm text-color-base mb-20">适用店铺：{{ coupon.shop_name }}</view>
				<pre class="pre-line font-size-sm text-color-assist mb-30" style="max-height: 600rpx;overflow: auto;">
					<jyf-parser ref="couponExplain"></jyf-parser>
				</pre>
				<view class="d-flex align-items-center just-content-center" v-if="activeTabIndex == 0">
					<button type="primary" @tap="useCoupon" class="use-coupon-btn">立即使用</button>
				</view>
			</view>
		</modal>

		<!--轻提示-->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import modal from '@/components/modal/modal';
import jyfParser from '@/components/jyf-parser/jyf-parser';

export default {
	components: {
		modal,
		jyfParser
	},
	data() {
		return {
			activeTabIndex: '',
			detailModalVisible: false,
			coupon: {},
			couponIndex: 0, //当前选中的第几行
			coupons: [],
			amount: 0 ,// 订单金额
			buttonLock: false,
			coupon_id: 0 // 前一页已选择的coupon
		};
	},
	onShow() {
		
	},
	onLoad(options) {
		
		if (options.amount) {
			this.amount = options.amount;
		}
		if (options.coupon_id) {
			this.coupon_id = options.coupon_id
		}
		if (options.shop_id) {
			this.shop_id = options.shop_id;
		}
		if (options.type) {
			this.type = options.type;
		}
		this.activeTabIndex = 0;
		this.getCoupons();
		
	},
	onPullDownRefresh() {
		this.getCoupons();
	},
	watch: {
		
	},
	methods: {
		// 使用范围
		typeInfo(type) {
			if (type == 0) {
				return '外卖和自取';
			}
			if (type == 1) {
				return '自取';
			}
			if (type == 2) {
				return '外卖';
			}
		},
		async getCoupons() {
			let data = await this.$api.request('/coupon/mine', 'POST', { shop_id: this.shop_id, type: this.type, page:1, pagesize:10000});
			uni.stopPullDownRefresh();
			if (data) {
				this.coupons = data;
			}
		},
		openDetailModal(coupon, index) {
			this.couponIndex = index;
			this.coupon = coupon;
			this.$refs['couponExplain'].setContent(this.coupon.instructions || '');
			this.detailModalVisible = true;
		},
		// 使用优惠券
		useCouponWith(coupon) {
			this.coupon = coupon;
			this.useCoupon();
		},
		// 取消优惠券
		cancelCoupon() {
			this.coupon = {}
			this.coupon_id = 0
			this.$api.prePage().coupon = {}
		},
		closeDetailModal() {
			this.detailModalVisible = false;
			this.coupon = {};
		},
		// 使用优惠及
		useCoupon() {
			if (this.buttonLock == true) {
				return;
			}
			this.buttonLock = true
			
			if (parseFloat(this.coupon.least) > parseFloat(this.amount)) {
				this.$refs.uToast.show({
					title: '订单金额满'+this.coupon.least+'才能使用',
					type: 'error'
				});
				this.buttonLock = false
			} else {
				
				this.$api.prePage().coupon = this.coupon;
				this.$api.prePage().coupons = 1; // 哨兵
				
				uni.navigateBack({
					
				})
				
			}
			
		}
	}
};
</script>

<style lang="scss" scoped>
/* #ifdef H5 */
page {
	height: 100%;
}
/* #endif */

.container {
	display: flex;
	flex-direction: column;
}

.bottom-box {
	height: 80rpx;
	flex-shrink: 0;
	.item {
		padding: 0 20rpx;
		position: relative;

		&::after {
			content: ' ';
			border-right: 1rpx solid $text-color-assist;
			height: 100%;
			position: absolute;
			right: 0;
			top: 0;
			transform: scaleX(0.5) scaleY(0.8);
		}

		&:nth-last-child(1)::after {
			border-right: 0;
		}
	}
}

.coupon-list {
	margin-top: 30rpx;
	height:calc(100vh - 120rpx); 
	// height: calc(100vh - 120rpx - 200rpx);
	/* #ifdef H5 */
	// height: calc(100vh - 120rpx - 200rpx - 44px);
	/* #endif */
}

.wrapper {
	padding: 0 20rpx;
	display: flex;
	flex-direction: column;

	.coupon {
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
		margin-bottom: 30rpx;
		//padding: 0 30rpx;
		border-radius: 6rpx;
		box-shadow: 0 10rpx 10rpx -10rpx rgba(15, 15, 15, 0.1);
		position: relative;

		&::before {
			content: '';
			position: absolute;
			background-color: $bg-color;
			width: 30rpx;
			height: 30rpx;
			bottom: 65rpx;
			left: -15rpx;
			border-radius: 100%;
		}

		&::after {
			content: '';
			position: absolute;
			background-color: $bg-color;
			width: 30rpx;
			height: 30rpx;
			bottom: 65rpx;
			right: -15rpx;
			border-radius: 100%;
		}

		.detail {
			padding: 20rpx 0;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				border-bottom: 1rpx dashed #c6c6c6;
				transform: scaleY(0.5);
			}

			.coupon-img {
				width: 150rpx;
				height: 150rpx;
				margin-right: 40rpx;
			}
		}
	}
}

.use-coupon-btn {
	width: 95%;
	border-radius: 50rem !important;
}

.taobao {
	background-color: white;
	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
		font-size: 30rpx;
		.left {
			display: flex;
			align-items: center;
		}
		.store {
			font-weight: 500;
		}
		.buddha {
			width: 70rpx;
			height: 70rpx;
			border-radius: 10rpx;
			margin-right: 10rpx;
		}
		.entrance {
			color: $u-type-info;
			border: solid 2rpx $u-type-info;
			line-height: 48rpx;
			padding: 0 30rpx;
			background: none;
			border-radius: 15px;
		}
	}
	.ticket {
		display: flex;
		.left {
			width: 70%;
			padding: 20rpx;
			background-color: white; //rgb(255, 245, 244);
			border-radius: 20rpx;
			border-right: dashed 2rpx rgb(224, 215, 211);
			display: flex;
			.picture {
				//width: 172rpx;
				border-radius: 20rpx;
				width: 190rpx;
				height: 190rpx;
			}
			.introduce {
				margin-left: 10rpx;
				.top {
					color: $u-type-warning;
					font-size: 28rpx;
					.big {
						font-size: 60rpx;
						font-weight: bold;
						margin-right: 10rpx;
					}
				}
				.type {
					font-size: 28rpx;
					color: $u-type-info-dark;
				}
				.date {
					margin-top: 10rpx;
					font-size: 20rpx;
					color: $u-type-info-dark;
				}
			}
		}
		.right {
			width: 30%;
			padding: 40rpx 20rpx;
			background-color: white; //rgb(255, 245, 244);
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			.use {
				height: auto;
				padding: 0 20rpx;
				font-size: 24rpx;
				border-radius: 40rpx;
				color: #ffffff !important;
				background-color: $u-type-warning !important;
				line-height: 40rpx;
				color: rgb(117, 142, 165);
				margin-left: 20rpx;
			}
			.used {
				height: auto;
				padding: 0 20rpx;
				font-size: 24rpx;
				border-radius: 40rpx;
				//color: #ffffff!important;
				//background-color: $u-type-warning!important;
				line-height: 40rpx;
				//color: rgb(117, 142, 165);
				margin-left: 20rpx;
			}
		}
		.right_log {
			text-align: center;
			width: 30%;
			padding: 80rpx 0rpx;
			background-color: white; //rgb(255, 245, 244);
			border-radius: 20rpx;

			align-items: center;
		}
	}
}
</style>
