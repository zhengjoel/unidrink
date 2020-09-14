<template>
	<view class="container position-relative w-100 h-100 overflow-hidden">
		<view class="exchange-box">
			<view class="input-box">
				<input type="text" v-model="exchange_code" placeholder="请输入兑换码" placeholder-class="text-color-assist font-size-base" />
				<button type="primary" @click="exchange">兑换</button>
			</view>
			<!-- <view class="font-size-sm text-color-primary line-height-2">查看兑换规则</view> -->
		</view>
		<view class="tabbar">
			<view class="tab" :class="{active: activeTabIndex == index}" 
				v-for="(item, index) in tabs" :key="index" @tap="handleTab(index)">
				<view class="title">{{ item.title }}</view>
			</view>
		</view>
		<view class="flex-fill">
			<scroll-view scroll-y class="coupon-list" @scrolltolower="getCoupons(activeTabIndex)">
				<view class="wrapper" v-for="(itemT, indexT) in tabs" :key="indexT" v-if="indexT == activeTabIndex">
					<view class="coupon" v-for="(item, index) in itemT.coupons" :key="index" @tap="openDetailModal(item,index)">
						<!-- <view class="d-flex align-items-center detail">
							<image :src="item.image" mode="aspectFill" class="coupon-img"></image>
							<view class="flex-fill d-flex flex-column just-content-center overflow-hidden">
								<view class="font-size-lg text-color-base text-truncate mb-10">{{ item.title }}</view>
								<view class="font-size-sm text-color-base">有效期至{{ item.endtime_text }}</view>
							</view>
						</view>
						<view v-if="activeTabIndex != 1" class="d-flex align-items-center justify-content-end" style="height: 80rpx;">
							<view class="font-size-sm text-color-primary">查看详情</view>
						</view>
						<view v-else class="d-flex align-items-center" style="height: 80rpx;position:relative">
							<view class="font-size-sm text-color-primary">查看详情</view>
							<view style="position:absolute;right:0">
								<u-button
								:loading="false"
								type="warning"
								size="mini"
								@click="receive(item, index)"
								>立即领取</u-button>
							</view>
						</view> -->
						
						<view class="taobao">
							<view class="ticket">
								<view class="left">
									<image
										class="picture"
										:src="item.image"
										mode="aspectFill"
									></image>
									<view class="introduce">
										<view class="top">
											￥
											<text class="big">{{item.value}}</text>
											<view>
												满{{item.least}}减{{item.value}}
											</view>
										</view>
										<view class="type">{{ item.title }}</view>
										<view class="date u-line-1">{{item.starttime_text}}-{{item.endtime_text}}</view>
									</view>
								</view>
								<view class="right_log" v-if="activeTabIndex == 2">
									<view>兑换时间</view>
									<view style="font-size: 22rpx;">{{item.createtime_text}}</view>
								</view>
								<view class="right" @click.stop="" v-if="activeTabIndex == 1">
									<view class="use immediate-use" :round="true" @tap="receive(item, index)" >立即领取</view>
								</view>
								<view class="right" @click.stop="" v-if="activeTabIndex == 0">
									<view v-if="item.status == 0" class="use immediate-use" :round="true" @tap="useCouponWith(item)" >立即使用</view>
									<view v-else class="used">已使用</view>
								</view>
								
							</view>
						</view>
					</view>
				</view>
				<!-- <u-loadmore :status="'nomore'" icon-type="iconType" /> -->
			</scroll-view>
		</view>
		<!-- <view class="bottom-box d-flex align-items-center just-content-center font-size-sm text-color-primary">
			<view class="item">已过期的</view>
			<view class="item">兑换记录</view>
			<view class="item" @tap="showTip1">赠送记录</view>
			<view class="item" @tap="showTip2">第三方权益</view>
		</view> -->
		<modal custom :show="detailModalVisible" @cancel="closeDetailModal" width="90%">
			<view class="modal-content">
				<view class="d-flex font-size-extra-lg text-color-base just-content-center mb-20">{{ coupon.title }}</view>
				<view class="d-flex font-size-sm text-color-base mb-20">
					有效期：{{ coupon.starttime_text }}至{{ coupon.endtime_text }}
				</view>
				<view class="d-flex font-size-sm text-color-base mb-20">
					领取时间：{{ coupon.createtime_text }}
				</view>
				<view class="d-flex font-size-sm text-color-base mb-20">
					卷价值：满{{ coupon.least }}减{{ coupon.value }}
				</view>
				<view class="d-flex font-size-sm text-color-base mb-20" v-if="activeTabIndex == 1">
					每人限领：{{ coupon.limit }} 张 {{ coupon.my_receive > 0 ? '(已领'+coupon.my_receive+'张)':''}}
				</view>
				<view class="d-flex font-size-sm text-color-base mb-20" v-if="coupon.score > 0">
					需要积分：{{ coupon.score }} 
				</view>
				<view class="d-flex font-size-sm text-color-base mb-20">
					适用范围：{{typeInfo(coupon.type)}}
				</view>
				<view class="d-flex font-size-sm text-color-base mb-20">
					适用店铺：{{coupon.shop_name}}
				</view>
				<pre class="pre-line font-size-sm text-color-assist mb-30" style="max-height: 600rpx;overflow: auto;">
					<jyf-parser ref="couponExplain"></jyf-parser>
				</pre>
				<view class="d-flex align-items-center just-content-center" v-if="activeTabIndex == 0">
					<button type="primary" @tap="useCoupon" class="use-coupon-btn">立即使用</button>
				</view>
				<view class="d-flex align-items-center just-content-center" v-if="activeTabIndex == 1">
					<button type="primary" @tap="receive(coupon, couponIndex)" class="use-coupon-btn">立即领取</button>
				</view>
			</view>
		</modal>
		
		<!--轻提示-->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import modal from '@/components/modal/modal'
import jyfParser from "@/components/jyf-parser/jyf-parser"

export default {
	components: {
		modal,
		jyfParser
	},
	data() {
		return {
			tabs: [
				{title: '我的优惠券', page:1, pagesize:10,
					coupons: []
				},
				{title: '未领优惠券', page:1, pagesize:10,
					coupons: []
				},
				{title: '兑换记录', page:1, pagesize:10,
					coupons: []
				}
			],
			activeTabIndex: '',
			detailModalVisible: false,
			coupon: {},
			couponIndex: 0, //当前选中的第几行
			exchange_code: '' 
		}
	},
	onShow() {
		this.activeTabIndex = 0
	},
	onLoad() {
		
	},
	onPullDownRefresh() {
		this.tabs[this.activeTabIndex].coupons = [];
		this.tabs[this.activeTabIndex].page = 1;
		this.getCoupons(this.activeTabIndex)
	},
	watch: {
		activeTabIndex: async function() {
			await this.getCoupons(this.activeTabIndex)
		}
	},
	methods: {
		// 兑换
		async exchange() {
			let data = await this.$api.request('/coupon/receive', 'POST', {code:this.exchange_code});
			if (data) {
				this.$refs.uToast.show({
					title: '兑换成功',
					type: 'success'
				});
				this.tabs[0].coupons = [];
				this.tabs[0].page = 1;
				this.getCoupons(0)
				this.tabs[1].coupons = [];
				this.tabs[1].page = 1;
				this.getCoupons(1)
			}
		},
		// 使用范围
		typeInfo(type) {
			if (type == 0) {
				return '外卖和自取'
			}
			if (type == 1) {
				return '自取'
			}
			if (type == 2) {
				return '外卖'
			}
		},
		handleTab(index) {
			this.activeTabIndex = index
		},
		async getCoupons(type) {
			// const coupons = await this.$api('customerCoupons')
			// if(type == 'all') {
			// 	this.coupons = coupons
			// } else {
			// 	this.coupons = coupons.filter(item => item.couponType == type)
			// }
			
			let page = this.tabs[type].page;
			let pagesize = this.tabs[type].pagesize;
			// 我的优惠券
			let data = false;
			if (type == '0') {
				data = await this.$api.request('/coupon/mine','POST',{page:page,pagesize:pagesize});
			}
			// 未领优惠券
			if (type == '1') {
				data = await this.$api.request('/coupon/index','POST',{page:page,pagesize:pagesize});
			}
			// 兑换记录
			if (type == '2') {
				data = await this.$api.request('/coupon/exchangeLog', 'POST', {page:page,pagesize:pagesize});
			}
			uni.stopPullDownRefresh();
			if (!data || data.length == 0) {
				return;
			}
			if (page == 1) {
				this.tabs[type].coupons = data;
			} else {
				for(let i in data) {
					this.tabs[type].coupons.push(data[i]);
				}
			}
			this.tabs[type].page++;
		},
		openDetailModal(coupon,index) {
			this.couponIndex = index;
			this.coupon = coupon
			this.$refs['couponExplain'].setContent(this.coupon.instructions || '')
			this.detailModalVisible = true
		},
		useCouponWith(coupon) {
			this.coupon = coupon
			this.useCoupon();
		},
		closeDetailModal() {
			this.detailModalVisible = false
			this.coupon = {}
		},
		useCoupon() {
			uni.switchTab({
				url: '/pages/menu/menu'
			})
		},
		showTip1() {
			uni.showToast({
				title: '您暂时还没有赠送中卡券哦~',
				icon: 'none'
			})
		},
		showTip2() {
			uni.showToast({
				title: '您暂时还没有券码哦~',
				icon: 'none'
			})
		},
		// 领取优惠券
		async receive(coupon,index) {
			let data = await this.$api.request('/coupon/receive','POST',{id:coupon.id});
			if (data) {
				this.$refs.uToast.show({
					title: '领取成功',
					type: 'success'
				});
				let coupon = this.tabs[this.activeTabIndex].coupons[index];
				// 我领取加一
				coupon.my_receive++;
				if (coupon.limit == coupon.my_receive) {
					this.tabs[this.activeTabIndex].coupons.splice(index,1);
				}
				this.detailModalVisible = false
			}
		}
	}
}
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

.exchange-box {
	flex-shrink: 0;
	height: 200rpx;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.input-box {
		display: flex;
		align-items: stretch;
		width: 70%;
		flex-shrink: 0;
		input {
			flex: 1;
			height: 80rpx;
			border: 1rpx solid #eee;
			border-right: 0;
			border-radius: 8rpx 0 0 8rpx;
			padding: 20rpx;
			font-size: $font-size-base;
			color: $text-color-base;
		}
		button {
			border-radius: 0 8rpx 8rpx 0;
			display: flex;
			align-items: center;
		}
	}
}

.tabbar {
	flex-shrink: 0;
	width: 100%;
	height: 120rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	
	.tab {
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: $font-size-base;
		color: $text-color-base;
		position: relative;
		
		.title {
			padding: 15rpx 0;
		}
		
		&.active {
			color: $color-primary;
			
			.title {
				border-bottom: 5rpx solid $color-primary;
			}
		}
	}
}

.bottom-box {
	height: 80rpx;
	flex-shrink: 0;
	.item {
		padding: 0 20rpx;
		position: relative;
		
		&::after {
			content: " ";
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
	height: calc(100vh - 120rpx - 200rpx);
	/* #ifdef H5 */
	height: calc(100vh - 120rpx - 200rpx - 44px);
	/* #endif */
}

.wrapper {
	padding: 0 20rpx;
	display: flex;
	flex-direction: column;
	
	.coupon {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
		//padding: 0 30rpx;
		border-radius: 6rpx;
		box-shadow: 0 10rpx 10rpx -10rpx rgba(15, 15, 15, 0.1);
		position: relative;
		
		&::before {
			content: "";
			position: absolute;
			background-color: $bg-color;
			width: 30rpx;
			height: 30rpx;
			bottom: 65rpx;
			left: -15rpx;
			border-radius: 100%;
		}
		
		&::after {
			content: "";
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
			background-color: white;//rgb(255, 245, 244);
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
				.top{
					color:$u-type-warning;
					font-size: 28rpx;
					.big{
						font-size: 60rpx;
						font-weight: bold;
						margin-right: 10rpx;
					}
				}
				.type{
					font-size: 28rpx;
					color: $u-type-info-dark;
				}
				.date{
					margin-top: 10rpx;
					font-size: 20rpx;
					color: $u-type-info-dark;
				}
			}
		}
		.right {
			width: 30%;
			padding: 40rpx 20rpx;
			background-color: white;//rgb(255, 245, 244);
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			.use {
				height: auto;
				padding: 0 20rpx;
				font-size: 24rpx;
				border-radius: 40rpx;
				color: #ffffff!important;
				background-color: $u-type-warning!important;
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
			background-color: white;//rgb(255, 245, 244);
			border-radius: 20rpx;
			
			align-items: center;
			
		}
	}
}
</style>
