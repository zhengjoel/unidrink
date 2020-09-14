<template>
	<view class="container" style="padding:20rpx;">
		<view style="padding-bottom: 100rpx;">
			<view class="bg-white">
				<view class="section">
					<!-- store info begin -->
					<list-cell :hover="false">
						<view class="w-100 d-flex align-items-center">
							<view class="d-flex flex-column w-60">
								<view class="w-100 font-size-lg text-color-base text-truncate mb-10">{{ order.shop.name }}</view>
								<view class="w-100 d-flex align-items-center overflow-hidden" v-if="order.type == 2">
									<!-- <image src="/static/images/order/location.png" class="flex-shrink-0" style="width: 30rpx; height: 30rpx;"></image> -->
									<view class="font-size-sm text-color-assist">{{ order.address.address + order.address.door_number + ' ' + order.address.name + ' ' + order.address.mobile }}</view>
								</view> 
							</view>
							<view class="d-flex justify-content-end align-items-center w-40">
								<!-- <image src="/static/images/order/mobile.png" @click="makePhoneCall" style="width: 60rpx; height: 60rpx;margin-right: 30rpx;"></image>
								<image src="/static/images/order/navigation.png" @click="openLocation" style="width: 60rpx; height: 60rpx;"></image> -->
								<view class="iconfont-unidrink icon-mobile"  @click="makePhoneCall" style="font-size: 45rpx;margin-right: 40rpx;"></view>
								<view class="iconfont-unidrink icon-location"  @click="openLocation" style="font-size: 45rpx;"></view>
							</view>
						</view> 
					</list-cell>
					<!-- store info end -->
					<!-- goods begin -->
					<list-cell :hover="false" padding="50rpx 30rpx">
						<view class="w-100 d-flex flex-column position-relative" style="margin-bottom: -40rpx;">
							<view class="w-100 d-flex align-items-center mb-40" v-for="(good, index) in order.products" :key="index">
								<view class="d-flex flex-column w-60 overflow-hidden">
									<view class="font-size-lg text-color-base mb-10 text-truncate">{{ good.title }}</view>
									<view class="font-size-sm text-color-assist text-truncate">{{ good.spec }}</view>
								</view>
								<view class="d-flex w-40 align-items-center justify-content-between pl-30">
									<view class="font-size-base text-color-base">x{{ good.number }}</view>
									<view class="font-size-base text-color-base font-weight-bold">￥{{ good.price }}</view>
								</view>
							</view>
						</view>
					</list-cell>
					<!-- goods end -->
				</view>
				<view class="section">
					<!-- payment and amount begin -->
					<list-cell :hover="false" padding="50rpx 30rpx">
						<view class="w-100 d-flex flex-column">
							<view class="pay-cell">
								<view>支付方式</view>
								<view class="font-weight-bold">{{ order.pay_type_text }}</view>
							</view>
							<view class="pay-cell" v-if="order.type == 2">
								<view>配送费</view>
								<view class="font-weight-bold">￥{{ order.delivery_price }}</view>
							</view>
							<view class="pay-cell">
								<view>订单金额</view>
								<view class="font-weight-bold">￥{{ order.order_price }}</view>
							</view>
							<view class="pay-cell">
								<view>优惠金额</view>
								<view class="font-weight-bold">￥{{ order.discount_price }}</view>
							</view>
							<view class="pay-cell">
								<view>实付金额</view>
								<view class="font-weight-bold">￥{{ order.total_price }}</view>
							</view>
						</view>
					</list-cell>
					<!-- payment and amount end -->
				</view>
				<view class="section">
					<!-- order info begin -->
					<list-cell :hover="false" padding="50rpx 30rpx">
						<view class="w-100 d-flex flex-column">
							<view class="pay-cell">
								<view>订单状态</view>
								<view class="font-weight-bold">{{order.order_status_text }}</view>
							</view>
							<view class="pay-cell">
								<view>下单时间</view>
								<view class="font-weight-bold">{{order.createtime }}</view>
							</view>
							<view class="pay-cell">
								<view>订单号</view>
								<view class="font-weight-bold">{{ order.out_trade_no }}</view>
							</view>
						</view>
					</list-cell>
					<!-- order info end -->
				</view>
				<!-- order other info begin -->
				<list-cell :hover="false" padding="50rpx 30rpx 20rpx" last>
					<view class="w-100 d-flex flex-column">
						<view class="pay-cell">
							<view>取单号</view>
							<view class="font-weight-bold">{{ order.number_id }}</view>
						</view>
						<view class="pay-cell">
							<view>享用方式</view>
							<view class="font-weight-bold">{{order.type_text}}</view>
						</view>
						<view class="pay-cell">
							<view>取餐时间</view>
							<view class="font-weight-bold">{{order.gettime_text}}</view>
						</view>
						<view class="pay-cell">
							<view>完成制作时间</view>
							<view class="font-weight-bold">{{ $util.formatDateTime(order.have_made) }}</view>
						</view>
						<view class="pay-cell">
							<view>备注</view>
							<view class="font-weight-bold">{{ order.remark }}</view>
						</view>
					</view>
				</list-cell>
				<!-- order other info end -->
			</view>
			<!-- <view class="position-relative w-100">
				<image src="/static/images/order/bottom.png" mode="widthFix" class="w-100"></image>
				<view class="invote-box" v-if="!order.invoice_status">
					<view class="font-size-base text-color-primary">去开发票</view>
					<image src="/static/images/order/right.png"></image>
				</view>
			</view> -->
		</view>
		<!-- <view class="btn-box">
			<view class="item" v-if="order.invoice_status > 0"><button type="primary">查看发票</button></view>
			<view class="item"><button type="primary" plain @tap="review">去评价</button></view>
			<view class="item"><button type="primary">再来一单</button></view>
		</view> -->
	</view>
</template>

<script>
import listCell from '@/components/list-cell/list-cell';

export default {
	components: {
		listCell
	},
	data() {
		return {
			order: {}
		};
	},
	onLoad({ id }) {
		this.detail(id);
	},
	methods: {
		async detail(id) {
			let data = await this.$api.request('/order/detail?id='+ id);
			if (data) {
				this.order = data;
			}
		},
		review() {
			const date = this.order.completed_time.split(' ')[0]
			uni.navigateTo({
				url: '/pages/components/pages/review/review?storename=' + this.order.store.name + '&typeCate=' + this.order.typeCate + '&date=' + date
			})
		},
		openLocation(){
			let shop = this.order.shop;
			uni.openLocation({
				address: shop.address_map + shop.address + " " + shop.name,
				latitude: parseFloat(shop.lat),
				longitude: parseFloat(shop.lng),
				fail(res) {
					console.log(res);
				}
			});
		},
		makePhoneCall() {
			let shop = this.order.shop;
			uni.makePhoneCall({
				phoneNumber: shop.mobile,
				fail(res) {
					console.log(res)
				}
			})
		}
	}
};
</script>

<style lang="scss" scoped>
@mixin arch {
	content: "";
	position: absolute;
	background-color: $bg-color;
	width: 30rpx;
	height: 30rpx;
	bottom: -15rpx;
	z-index: 10;
	border-radius: 100%;
}

.section {
	position: relative;
	
	&::before {
		@include arch;
		left: -15rpx;
	}
	
	&::after {
		@include arch;
		right: -15rpx;
	}
}

.pay-cell {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: $font-size-base;
	color: $text-color-base;
	margin-bottom: 40rpx;

	&:nth-last-child(1) {
		margin-bottom: 0;
	}
}

.invote-box {
	position: absolute;
	width: 100%;
	left: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	
	image {
		width: 30rpx;
		height: 30rpx;
	}
}

.btn-box {
	background-color: #ffffff;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 120rpx;
	box-shadow: 0 0 20rpx rgba($color: #000000, $alpha: 0.1);
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	z-index: 11;
	
	.item {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20rpx 10rpx;
		flex: 1;
		flex-shrink: 0;
		
		button {
			width: 100%;
			border-radius: 50rem !important;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
		}
	}
}
</style>
