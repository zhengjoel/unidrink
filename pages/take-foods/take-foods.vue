<template>
	<view class="container">
		<view v-if="!Object.keys(foodsOrders).length" class="d-flex w-100 h-100 flex-column just-content-center align-items-center">
			<!-- <image src="/static/images/loading.gif" class="drinks-img"></image> -->
			<ourLoading active background-color="" color="#00b1b7" text=" " />
			<view class="tips d-flex flex-column align-items-center font-size-base text-color-assist">
				<view>您还没有点单</view>
				<view>快去犒劳一下自己吧~</view>
			</view>
			<button type="primary" class="drink-btn" style="z-index: 3001;" size="default" @tap="menu">去点餐</button>
			<view class="font-size-sm text-color-primary" style="z-index: 3001;" @tap="orders">查看历史订单</view>
		</view>
		<template v-else>
			<view class="order-box" v-for="(order, index) in foodsOrders" :key='index'>
				<view class="bg-white">
					<view class="section">
						<!-- store info begin -->
						<list-cell :hover="false">
							<view class="w-100 d-flex align-items-center">
								<view class="d-flex flex-column w-60">
									<view class="w-100 font-size-lg text-color-base text-truncate">{{ order.shop.name }}</view>
								</view>
								<view class="d-flex justify-content-end align-items-center w-40">
									<view class="iconfont-unidrink icon-mobile"  @click="makePhoneCall(order.shop)" style="font-size: 45rpx;margin-right: 40rpx;"></view>
									<view class="iconfont-unidrink icon-location"  @click="openLocation(order.shop)" style="font-size: 45rpx;"></view>
									<!-- <image src="/static/images/order/mobile.png" @click="makePhoneCall(order.shop)" style="width: 60rpx; height: 60rpx;margin-right: 30rpx;"></image>
									<image src="/static/images/order/navigation.png" @click="openLocation(order.shop)" style="width: 60rpx; height: 60rpx;"></image> -->
								</view>
							</view>
						</list-cell>
						<!-- store info end -->
						<list-cell :hover="false" padding="50rpx 30rpx">
							<view class="w-100 d-flex flex-column">
								<view class="d-flex align-items-center just-content-center">
									<view class="sort-num">{{ order.number_id }}</view>
								</view>
								<!-- steps begin -->
								<view class="d-flex just-content-center">
									<!-- <view class="steps d-flex flex-column" :class="{'w-80': order.type == 1, 'w-100': order.type == 2}"> -->
									<view class="steps d-flex flex-column w-80">
										<view class="steps__img-column">
											<view class="steps__img-column-item">
												<view class="iconfont-unidrink icon-lamp"></view>
												<!-- <image src="/static/images/order/ordered_selected.png"></image> -->
											</view>
											<view class="steps__img-column-item">
												<!-- <image src="/static/images/order/production_selected.png" v-if="order.prev_num < numForMading || order.have_made > 0"></image>
												<image src="/static/images/order/production.png" v-else></image> -->
												<view class="iconfont-unidrink icon-daojishi" v-if="order.prev_num < numForMading || order.have_made > 0"></view>
												<view class="iconfont-unidrink icon-daojishi unactive" v-else></view>
											</view>
											<view class="steps__img-column-item" v-if="order.type == 2">
												<!-- <image src="/static/images/order/delivery_selected.png" v-if="order.have_made > 0"></image>
												<image src="/static/images/order/delivered.png" v-else></image> -->
												<view class="iconfont-unidrink icon-takeout" v-if="order.have_made > 0"></view>
												<view class="iconfont-unidrink icon-takeout unactive" v-else></view>
											</view>
											<view class="steps__img-column-item" v-if="order.type == 1">
												<!-- <image src="/static/images/order/delivered_selected.png" v-if="order.have_made > 0"></image>
												<image src="/static/images/order/delivered.png" v-else></image> -->
												<view class="iconfont-unidrink icon-doorbell" v-if="order.have_made > 0"></view>
												<view class="iconfont-unidrink icon-doorbell unactive" v-else></view>
											</view>
										</view>
										<view class="steps__text-column">
											<view class="steps__text-column-item active">
												<view class="steps__column-item-line bg-transparent"></view>
												<view class="steps__text-column-item-text">已下单</view>
												<view class="steps__column-item-line"></view>
											</view>
											<view class="steps__text-column-item activ" :class="{active: order.prev_num < numForMading || order.have_made > 0}">
												<view class="steps__column-item-line"></view>
												<view class="steps__text-column-item-text">制作中</view>
												<view class="steps__column-item-line"></view>
											</view>
											<view class="steps__text-column-item" :class="{active: order.have_made > 0}" v-if="order.type == 2">
												<view class="steps__column-item-line"></view>
												<view class="steps__text-column-item-text">配送中</view>
												<view class="steps__column-item-line bg-transparent"></view>
											</view>
											<view class="steps__text-column-item" :class="{active: order.have_made > 0}" v-if="order.type == 1">
												<view class="steps__column-item-line"></view>
												<view class="steps__text-column-item-text">
													{{ order.type == 2 ? '已送达' : '请取餐' }}
												</view>
												<view class="steps__column-item-line bg-transparent"></view>
											</view>
										</view>
									</view>
								</view>
								<!-- steps end -->
								<view v-if="order.status==1 && order.have_paid > 0 && order.have_made == 0" class="d-flex just-content-center align-items-center font-size-base text-color-assist mb-40">
									您前面还有 <text class="text-color-primary mr-10 ml-10">{{order.prev_num}}</text> 单待制作
								</view>
								<!-- goods begin -->
								<view class="w-100 d-flex flex-column position-relative mt-30" style="margin-bottom: -40rpx;">
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
								<!-- goods end -->
							</view>
						</list-cell>
					</view>
					<view class="section">
						<!-- payment and amount begin -->
						<list-cell :hover="false" padding="50rpx 30rpx">
							<view class="w-100 d-flex flex-column">
								<view class="pay-cell">
									<view>支付方式</view>
									<view class="font-weight-bold">{{ order.pay_type_text }}</view>
								</view>
								<view class="pay-cell">
									<view>订单金额</view>
									<view class="font-weight-bold">￥{{ order.order_price }}</view>
								</view>
								<view class="pay-cell" v-if="order.type == 2">
									<view>配送费</view>
									<view class="font-weight-bold">￥{{ order.delivery_price }}</view>
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
									<view>下单时间</view>
									<view class="font-weight-bold">{{ order.createtime }}</view>
								</view>
								<view class="pay-cell">
									<view>下单门店</view>
									<view class="font-weight-bold">{{ order.shop.name }}</view>
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
							<!-- <view class="pay-cell">
								<view>取单号</view>
								<view class="font-weight-bold">{{ order.number_id }}</view>
							</view> -->
							<view class="pay-cell">
								<view>享用方式</view>
								<view class="font-weight-bold">{{order.type_text}}</view>
							</view>
							<view class="pay-cell">
								<view>取餐时间</view>
								<view class="font-weight-bold">{{order.gettime_text}}</view>
							</view>
							<view class="pay-cell">
								<view>制作完成时间</view>
								<view class="font-weight-bold">{{ order.madetime }}</view>
							</view>
							<view class="pay-cell">
								<view>备注</view>
								<view class="font-weight-bold">{{ order.remark }}</view>
							</view>
						</view>
					</list-cell>
					<!-- order other info end -->
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell/list-cell'
	import {mapState, mapMutations, mapGetters} from 'vuex'
	import ourLoading from '@/components/our-loading/our-loading.vue'
	
	export default {
		components: {
			listCell,
			ourLoading
		},
		data() {
			return {
				foodsOrders:[],
				numForMading:5 // 前5个代表正在制作中
			}
		},
		computed: {
			
			...mapGetters(['isLogin'])
		},
		onPullDownRefresh() {
			this.takeFoods();
		},
		onLoad() {
			// let order = this.orderType == 'takein' ? orders[0] : orders[1]
			// order = Object.assign(order, {
			// 	status: 1
			// })
			
			
			//this.takeFoods();
		},
		onShow() {
			this.takeFoods();
		},
		methods: {
			
			// 取餐数据
			async takeFoods() {
				if (!this.isLogin) {
					return;
				}
				let data = await this.$api.request('/order/takeFoods', 'POST');
				uni.stopPullDownRefresh();
				this.foodsOrders = [];
				if (data) {
					this.numForMading = data.concurrent; 
					for(var i in data.list) {
						this.foodsOrders.unshift(data.list[i]);
					}
					//console.log(this.foodsOrders);
				}
			},
			orders() {
				if(!this.$store.getters.isLogin) {
					uni.navigateTo({url: '/pages/components/pages/login/login'})
					return
				}
				uni.navigateTo({
					url: '/pages/components/pages/orders/orders'
				})
			},
			menu() {
				uni.switchTab({
					url: '/pages/menu/menu'
				})
			},
			openLocation(shop){
				uni.openLocation({
					address: shop.address_map + shop.address + " " + shop.name,
					latitude: parseFloat(shop.lat),
					longitude: parseFloat(shop.lng),
					fail(res) {
						console.log(res);
					}
				});
			},
			makePhoneCall(shop) {
				uni.makePhoneCall({
					phoneNumber: shop.mobile,
					fail(res) {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifdef H5 */
	page {
		min-height: 100%;
		background-color: $bg-color;
	}
	/* #endif */
	.order-box {
		padding: 20rpx;
		/* #ifdef H5 */
		margin-bottom: 100rpx;
		/* #endif */
	}
	
	.drinks-img {
		width: 260rpx;
		height: 260rpx;
	}
	
	.tips {
		margin: 60rpx 0 80rpx;
		line-height: 48rpx;
	}
	
	.drink-btn {
		width: 320rpx;
		border-radius: 50rem !important;
		margin-bottom: 40rpx;
		font-size: $font-size-base;
		line-height: 3.0;
	}
	
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
	
	.sort-num {
		font-size: 64rpx;
		font-weight: bold;
		color: $text-color-base;
		line-height: 2;
	}
	
	.steps__img-column {
		display: flex;
		margin: 30rpx 0;
		
		.steps__img-column-item {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			
			image {
				width: 80rpx;
				height: 80rpx;
			}
			.unactive {
				color: #919293;
			}
		}
	}
	
	.steps__text-column {
		display: flex;
		margin-bottom: 40rpx;
		
		.steps__text-column-item {
			flex: 1;
			display: inline-flex;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: $font-size-base;
			color: $text-color-assist;
			
			&.active {
				color: $text-color-base;
				font-weight: bold;
				
				.steps__column-item-line {
					background-color: $text-color-base;
				}
			}
			
			.steps__column-item-line{
				flex: 1;
				height: 2rpx;
				background-color: #919293;
				transform: scaleY(0.5);
			}
			
			.steps__text-column-item-text {
				margin: 0 8px;
			}
		}
	}
	.icon-lamp, .icon-daojishi, .icon-takeout, .icon-doorbell{
		font-size: 60rpx;
	}
</style>
