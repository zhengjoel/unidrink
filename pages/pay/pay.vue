<template>
	<view class="container position-relative">
		<view style="margin-bottom: 130rpx;">
			<view class="section-1">
				<list-cell class="location">
					<view class="flex-fill d-flex justify-content-between align-items-center">
						<view class="store-name flex-fill">
							外卖配送
						</view>
						<u-switch active-color="#00b1b7" :value="orderType == 'takeout'" @change="takout"></u-switch>
					</view>
				</list-cell>

				<template v-if="orderType == 'takeout'">
					<list-cell @click="chooseAddress">
						<view v-if="address.name" class="w-100 d-flex flex-column">
							<view class="d-flex align-items-center justify-content-between mb-10">
								<view class="font-size-lg text-color-base">{{ address.address + ' ' + address.door_number }}</view>
								<image src="/static/images/navigator-1.png" class="arrow"></image>
							</view>
							<view class="d-flex text-color-assist font-size-sm align-items-center">
								<view class="mr-10">{{ address.name }}</view>
								<view class="mr-10">{{ !address.sex ? '先生' : '女士' }}</view>
								<view>{{ address.mobile }}</view>
							</view>
						</view>
						<view v-else class="flex-fill d-flex justify-content-between align-items-center">
							<view class="store-name flex-fill">
								选择收货地址
							</view>
							<image src="/static/images/navigator-1.png" class="arrow"></image>
						</view>
					</list-cell>
				</template>
			</view>

			<view class="section-1">
				<template v-if="orderType == 'takein'">
					<list-cell class="location" @click="goToShop">
						<view class="flex-fill d-flex justify-content-between align-items-center">
							<view class="store-name flex-fill">
								{{ store.name }}
							</view>
							<image src="/static/images/navigator-1.png" class="arrow"></image>
						</view>
					</list-cell>
				</template>


				<template v-if="orderType == 'takein'">
					<list-cell arrow class="meal-time">
						<view class="flex-fill d-flex justify-content-between align-items-center">
							<view class="title">取餐时间</view>
							<view class="time">立即用餐</view>
						</view>
					</list-cell>
					<list-cell class="contact" last :hover="false">
						<view class="flex-fill d-flex justify-content-between align-items-center">
							<view class="title flex-fill">联系电话</view>
							<view class="time">
								<input class="text-right" placeholder="请输入手机号码" :value="member.mobile" />
							</view>
							<button class="contact-tip font-size-sm">自动填写</button>
						</view>
					</list-cell>
				</template>
				<template v-else>
					<list-cell>
						<view class="w-100 d-flex flex-column" @click="showTime = !showTime">
							<view class="d-flex align-items-center font-size-base text-color-base">
								<view class="flex-fill">预计送达时间</view>
								<view class="mr-10">{{defaultTime}}
									<u-picker 
									:default-time="defaultTime"
									v-model="showTime" 
									:params="paramsTime" 
									mode="time" 
									@cancel="cancelTime" 
									@confirm="choiceTime"
									></u-picker>
								</view>
								<image src="/static/images/navigator-1.png" class="arrow"></image>
							</view>
							<view class="font-size-base text-color-primary">
								特殊时期减少接触，请修改下方订单备注
							</view>
						</view>
					</list-cell>
				</template>
			</view>
			<!-- 购物车列表 begin -->
			<view class="section-2">
				<view class="cart d-flex flex-column">
					<list-cell last v-for="(item, index) in cart" :key="index">
						<view class="w-100 d-flex flex-column">
							<view class="d-flex align-items-center mb-10">
								<view class="name-and-props overflow-hidden">
									<view class="text-color-base font-size-lg">
										{{ item.name }}
									</view>
								</view>
								<view class="d-flex flex-fill justify-content-between align-items-center text-color-base font-size-lg">
									<view>x{{ item.number }}</view>
									<view>￥{{ item.sales_price }}</view>
								</view>
							</view>
							<view class="text-truncate font-size-base text-color-assist">
								{{ item.props_text }}
							</view>
						</view>
					</list-cell>
					<template v-if="orderType == 'takeout'">
						<list-cell last v-if="store.packing_fee > 0">
							<view class="w-100 d-flex font-size-base align-items-center justify-content-between">
								<view>包装费</view>
								<view>￥{{ parseFloat(store.packing_fee) }}</view>
							</view>
						</list-cell>
						<list-cell last v-if="store.delivery_cost > 0">
							<view class="w-100 d-flex font-size-base align-items-center justify-content-between">
								<view>配送费</view>
								<view>￥{{ parseFloat(store.delivery_cost) }}</view>
							</view>
						</list-cell>
					</template>
				</view>
				<list-cell arrow @click="goToPackages">
					<view class="flex-fill d-flex justify-content-between align-items-center">
						<view class="text-color-base">优惠券</view>
						<view class="text-color-primary">超值购买优惠券大礼包</view>
					</view>
				</list-cell>
				<!-- <list-cell arrow>
					<view class="flex-fill d-flex justify-content-between align-items-center">
						<view class="text-color-base">礼品卡</view>
						<view class="text-color-primary">请选择</view>
					</view>
				</list-cell> -->
				<list-cell last>
					<view class="flex-fill d-flex justify-content-end align-items-center">
						<view>总计￥{{ total }},实付</view>
						<view class="font-size-extra-lg font-weight-bold">￥{{ amount }}</view>
					</view>
				</list-cell>
			</view>
			<!-- 购物车列表 end -->
			<view class="d-flex align-items-center justify-content-start font-size-sm text-color-warning" style="padding: 20rpx 0;">
				<view class="iconfont iconhelp line-height-100"></view>
				<view>优惠券不与满赠、满减活动共享</view>
			</view>
			<!-- 支付方式 begin -->
			<view class="payment">
				<list-cell last :hover="false">
					<text>支付方式</text>
				</list-cell>
				<list-cell>
					<view class="d-flex align-items-center justify-content-between w-100 disabled">
						<view class="iconfont iconbalance line-height-100 payment-icon"></view>
						<view class="flex-fill">余额支付（余额￥0）</view>
						<view class="font-size-sm">余额不足</view>
						<view class="iconfont iconradio-button-off line-height-100 checkbox"></view>
					</view>
				</list-cell>
				<list-cell last>
					<view class="d-flex align-items-center justify-content-between w-100">
						<view class="iconfont iconwxpay line-height-100 payment-icon" style="color: #7EB73A;"></view>
						<view class="flex-fill">微信支付</view>
						<view class="iconfont iconradio-button-on line-height-100 checkbox checked"></view>
					</view>
				</list-cell>
			</view>
			<!-- 支付方式 end -->
			<!-- 备注 begin -->
			<list-cell arrow last @click="goToRemark">
				<view class="d-flex flex-fill align-items-center justify-content-between overflow-hidden">
					<view class="flex-shrink-0 mr-20">备注</view>
					<view class="text-color-primary flex-fill text-truncate text-right">{{ form.remark || '点击填写备注' }}</view>
				</view>
			</list-cell>
			<!-- 备注 end -->
		</view>
		<!-- 付款栏 begin -->
		<view style="z-index: 1;" class="w-100 pay-box position-fixed fixed-bottom d-flex align-items-center justify-content-between bg-white">
			<view class="font-size-sm" style="margin-left: 20rpx;">合计：</view>
			<view class="font-size-lg flex-fill">￥{{ amount }}</view>
			<view class="bg-primary h-100 d-flex align-items-center just-content-center text-color-white font-size-base" style="padding: 0 60rpx;"
			 @tap="submit">
				付款
			</view>
		</view>
		<!-- 付款栏 end -->
		<modal :show="ensureAddressModalVisible" custom :mask-closable="false" :radius="0" width="90%">
			<view class="modal-content">
				<view class="d-flex justify-content-end">
					<image src="/static/images/pay/close.png" style="width: 40rpx; height: 40rpx;" @tap="ensureAddressModalVisible=false"></image>
				</view>
				<view class="d-flex just-content-center align-items-center" style="margin-bottom: 40px;">
					<view class="font-size-extra-lg text-color-base">请再次确认下单地址</view>
				</view>
				<view class="d-flex font-size-base text-color-base font-weight-bold align-items-center justify-content-between mb-20">
					<view>{{ address.name }} {{ address.sex ? '女士' : '先生' }}</view>
					<view>{{ address.mobile }}</view>
				</view>
				<view class="d-flex font-size-sm text-color-assist align-items-center justify-content-between mb-40">
					<view>{{ address.address + address.door_number }}</view>
					<button type="primary" size="mini" plain class="change-address-btn">修改地址</button>
				</view>
				<button type="primary" class="pay_btn" @tap="pay">确认并付款</button>
			</view>
		</modal>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	import listCell from '@/components/list-cell/list-cell'
	import modal from '@/components/modal/modal'
	import orders from '@/api/orders'

	export default {
		components: {
			listCell,
			modal
		},
		data() {
			return {
				cart: [],
				form: {
					remark: ''
				},
				ensureAddressModalVisible: false,
				showTime: false,
				paramsTime: {
					year: false,
					month: false,
					day: false,
					hour: true,
					minute: true,
					second: false
				},
				defaultTime: '00:00'
			}
		},
		computed: {
			...mapState(['orderType', 'address', 'store', 'member']),
			total() {
				return this.cart.reduce((acc, cur) => acc + cur.number * cur.sales_price, 0)
			},
			amount() {
				return this.cart.reduce((acc, cur) => acc + cur.number * cur.sales_price, 0)
			}
		},
		onShow() {
			let date = new Date((new Date).getTime() + 3600000); // 一个小时后
			let hour = date.getHours();
			let minute = date.getMinutes();
			if (hour < 10) { hour = '0' + hour}
			if (minute < 10) {minute = '0' + minute}
			this.defaultTime = hour +':' + minute;
		},
		onLoad(option) {
			const {
				remark
			} = option
			this.cart = uni.getStorageSync('cart')
			remark && this.$set(this.form, 'remark', remark)
		},
		methods: {
			...mapMutations(['SET_ORDER', 'SET_ORDER_TYPE']),
			...mapGetters(['isLogin']),
			// 选择时间
			choiceTime(value) {
				let hour = value.hour;
				let minute = value.minute;
				
				let date = new Date((new Date).getTime() + 3600000); // 一个小时后
				let nowhour = date.getHours();
				let nowminute = date.getMinutes();
				
				if (((hour*60*60 + minute*60) * 1000 - 3600000) < ((nowhour*60*60 + nowminute*60) * 1000)) {
					this.$api.msg('请至少选择一个小时之后');
					return;
				}
				
				if (hour < 10) { hour = '0' + hour}
				if (minute < 10) {minute = '0' + minute}
				this.defaultTime = hour + ':' + minute;
				this.showTime = false;
			},
			cancelTime(value) {
				this.showTime = false;
			},
			// 是否外卖开关
			takout(value) {
				let type = 'takeout';
				if (value == true) {
					type = 'takein';
				}
				this.SET_ORDER_TYPE(type);
			},
			goToRemark() {
				uni.navigateTo({
					url: '/pages/remark/remark?remark=' + this.form.remark
				})
			},
			chooseAddress() {
				uni.navigateTo({
					url: '/pages/address/address?is_choose=true&scene=pay'
				})
			},
			goToPackages() {
				uni.navigateTo({
					url: '/pages/packages/index'
				})
			},
			goToShop() {
				uni.navigateTo({
					url: `/pages/shop/shop`
				})
			},
			submit() {
				if (this.orderType == 'takeout') {
					this.ensureAddressModalVisible = true
				} else {
					this.pay()
				}
			},
			pay() {
				uni.showLoading({
					title: '加载中'
				})
				//测试订单
				let order = this.orderType == 'takein' ? orders[0] : orders[1]
				order = Object.assign(order, {
					status: 1
				})
				this.SET_ORDER(order)
				uni.removeStorageSync('cart')
				uni.reLaunch({
					url: '/pages/take-foods/take-foods'
				})
				uni.hideLoading()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 30rpx;
	}

	.arrow {
		width: 50rpx;
		height: 50rpx;
		position: relative;
		margin-right: -10rpx;
	}

	.location {
		.store-name {
			font-size: $font-size-lg;
		}

		.iconfont {
			font-size: 50rpx;
			line-height: 100%;
			color: $color-primary;
		}
	}

	.section-1 {
		margin-bottom: 30rpx;

		.contact {
			.contact-tip {
				margin-left: 10rpx;
				border: 2rpx solid $color-primary;
				padding: 6rpx 10rpx;
				color: $color-primary;
			}
		}
	}

	.section-2 {
		.name-and-props {
			width: 65%;
		}
	}

	.payment {
		margin-bottom: 30rpx;

		.disabled {
			color: $text-color-grey;
		}

		.payment-icon {
			font-size: 44rpx;
			margin-right: 10rpx;
		}

		.checkbox {
			font-size: 36rpx;
			margin-left: 10rpx;
		}

		.checked {
			color: $color-primary;
		}
	}

	.pay-box {
		box-shadow: 0 0 20rpx rgba(0, 0, 0, .1);
		height: 100rpx;
	}

	.modal-content {
		.change-address-btn {
			line-height: 2;
			padding: 0 1em;
		}

		.pay_btn {
			width: 100%;
			border-radius: 50rem !important;
			line-height: 3;
		}
	}

	.choice {
		background-color: $bg-color-grey;
		border-radius: 38rpx;
		display: flex;
		align-items: center;
		font-size: $font-size-sm;
		padding: 0 38rpx;
		color: $text-color-assist;

		.dinein,
		.takeout {
			width: 50%;
			position: relative;
			display: flex;
			align-items: center;

			&.active {
				padding: 14rpx 38rpx;
				color: #ffffff;
				background-color: $color-primary;
				border-radius: 38rpx;
			}
		}

		.takeout {
			margin-left: 20rpx;
			height: 100%;
			flex: 1;
			padding: 14rpx 0;
		}

		.dinein.active {
			//margin-left: -38rpx;
		}

		.takeout.active {
			//margin-right: -38rpx;
		}
	}
</style>
