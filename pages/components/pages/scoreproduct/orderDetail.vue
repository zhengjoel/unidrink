<template>
	<view class="container" style="padding:20rpx;">
		<view style="padding-bottom: 100rpx;">
			<view class="bg-white">
				<view class="section">
					
					<list-cell :hover="false" padding="50rpx 30rpx">
						<view class="w-100 d-flex flex-column position-relative" style="margin-bottom: -40rpx;">
							<view class="w-100 d-flex align-items-center mb-40">
								<view class="d-flex flex-column w-60 overflow-hidden">
									<image class="product-image" src="https://img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg" mode="aspectFill"></image>
								</view>
								<view class="d-flex flex-column w-60 overflow-hidden">
									<view class="font-size-lg text-color-base mb-10 text-truncate">{{ order.product.title }}</view>
								</view>
								<view class="d-flex w-40 align-items-center justify-content-between pl-30">
									<view class="font-size-base text-color-base">x{{ order.number }}</view>
									<view class="font-size-base text-color-base font-weight-bold">{{ order.total_score }}</view>
								</view>
							</view>
						</view>
					</list-cell>
				</view>
				<view class="section">
					<list-cell :hover="false" padding="50rpx 30rpx">
						<view class="w-100 d-flex flex-column">
				
							<view class="pay-cell">
								<view>消耗积分</view>
								<view class="font-weight-bold">{{ order.total_score }}</view>
							</view>
						</view>
					</list-cell>
				</view>
				<view class="section">
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
								<view class="font-weight-bold">{{ order.id }}</view>
							</view>
						</view>
					</list-cell>
					
					<list-cell :hover="false">
						<view class="w-100 d-flex align-items-center">
							<view class="pay-cell">
								<view>收货地址</view>
							</view>
							<view class="d-flex flex-column">
								<view class="w-100 d-flex align-items-center overflow-hidden">
									<view class="font-size-sm text-color-assist">{{ order.customer_address + ' ' + order.customer_name + ' ' + order.customer_phone }}</view>
								</view> 
							</view>
						</view> 
					</list-cell>
					
					<list-cell :hover="false" padding="50rpx 30rpx" v-if="order.express_company">
						<view class="w-100 d-flex flex-column">
							<view class="pay-cell">
								<view>快递公司</view>
								<view class="font-weight-bold">{{order.express_company }}</view>
							</view>
						</view>
					</list-cell>
					
					<lee-logistics ref="lee" :expresssn="expresssn" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import listCell from '@/components/list-cell/list-cell';
import LeeLogistics from '@/components/lee-logistics/lee-logistics.vue'

export default {
	components: {
		listCell,
		LeeLogistics
	},
	data() {
		return {
			order: {},
			id: 0,
			expresssn: ""
		};
	},
	onLoad({ id }) {
		this.id = id;
		this.detail(id);
	},
	methods: {
		async detail(id) {
			let data = await this.$u.api.scoreShopOrderDetail({id:id});
			uni.stopPullDownRefresh();
			if (data) {
				this.order = data;
				
				if (data.express_number) {
					this.expresssn = data.express_number;
					var ref = await this.$refs;
					ref.lee.search(data.express, this.expresssn);
				}
			}
		}
	},
	onPullDownRefresh() {
		this.detail(this.id)
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
.product-image {
	width: 140rpx;
	height: 140rpx;
}
</style>
