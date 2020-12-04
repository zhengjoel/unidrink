<template>
	<view class="container position-relative">
		<view style="margin-bottom: 130rpx;">
			<view class="section-1">
				<template v-if="store.distance > 0">
					<list-cell class="location">
						<view class="flex-fill d-flex justify-content-between align-items-center">
							<view class="store-name flex-fill">{{ orderType == 'takeout' ? '外卖配送' : '点餐自取' }}</view>
							<u-switch active-color="#00b1b7" :value="orderType == 'takeout'" @change="takout"></u-switch>
						</view>
					</list-cell>
				</template>

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
							<view class="store-name flex-fill">选择收货地址</view>
							<image src="/static/images/navigator-1.png" class="arrow"></image>
						</view>
					</list-cell>
				</template>
			</view>

			<view class="section-1">
				<template>
					<list-cell class="location" @click="goToShop">
						<view class="flex-fill d-flex justify-content-between align-items-center">
							<view class="store-name flex-fill">{{ store.name }}</view>
							<image src="/static/images/navigator-1.png" class="arrow"></image>
						</view>
					</list-cell>
				</template>

				<template>
					<list-cell arrow class="meal-time" v-if="orderType == 'takein'">
						<view class="flex-fill d-flex justify-content-between align-items-center" @click="takeinTIme = !takeinTIme">
							<view class="title">取餐时间</view>
							<view class="time">
								{{ takeinRange[defaultSelector[0]].name }}
								<u-picker
									v-model="takeinTIme"
									:range="takeinRange"
									range-key="name"
									mode="selector"
									@cancel="takeinCancelTime"
									@confirm="takeinConfirmTime"
									:default-selector="defaultSelector"
								></u-picker>
							</view>
						</view>
					</list-cell>
					<list-cell class="contact" last :hover="false" v-if="orderType == 'takein'">
						<view class="flex-fill d-flex justify-content-between align-items-center">
							<view class="title flex-fill">联系电话</view>
							<view class="time"><input class="text-right" placeholder="请输入手机号码" :value="member.mobile" /></view>
							<button class="contact-tip font-size-sm">自动填写</button>
						</view>
					</list-cell>
				</template>
				<template v-if="orderType == 'takeout'">
					<list-cell>
						<!--先不做指定时间送达，因为没有理赔机制，所以不完美。并且用户完全可以想买的时候再下单-->
						<!-- <view class="w-100 d-flex flex-column" @click="takeoutTIme = !takeoutTIme"> -->
						<view class="w-100 d-flex flex-column">
							<view class="d-flex align-items-center font-size-base text-color-base">
								<view class="flex-fill">预计送达时间</view>
								<view class="mr-10">
									{{ defaultTime }}
									<u-picker
										:default-time="defaultTime"
										v-model="takeoutTIme"
										:params="paramsTime"
										mode="time"
										@cancel="cancelTime"
										@confirm="choiceTime"
									></u-picker>
								</view>
								<!-- <image src="/static/images/navigator-1.png" class="arrow"></image> -->
							</view>
							<view class="font-size-base text-color-primary">特殊时期减少接触，请修改下方订单备注</view>
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
								<view class="d-flex flex-fill justify-content-between align-items-center text-color-base font-size-lg">
									<image style="width: 80rpx;height: 80rpx;" mode="aspectFill" :src="item.image"></image>
								</view>
								<view class="name-and-props overflow-hidden">
									<view class="text-color-base font-size-lg">{{ item.name }}</view>
								</view>
								<view class="d-flex flex-fill justify-content-between align-items-center text-color-base font-size-lg">
									<view>x{{ item.number }}</view>
									<view>￥{{ item.sales_price }}</view>
								</view>
							</view>
							<view class="text-truncate font-size-base text-color-assist">{{ item.props_text }}</view>
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
						<view v-if="coupons == 0" class="text-color-base">暂无可用</view>
						<view v-else-if="coupon.title" class="text-color-danger">{{ coupon.title }}(满{{ coupon.least }}减{{ coupon.value }})</view>
						<view v-else class="text-color-primary">可用优惠券{{ coupons }}张</view>
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
						<view>
							总计￥{{ total }}
							<text v-if="orderType == 'takeout'">,配送费￥{{ store.delivery_price }}</text>
							<text v-if="coupon.value">,￥-{{ coupon.value }}</text>
							,实付
						</view>
						<view class="font-size-extra-lg font-weight-bold">￥{{ amount }}</view>
					</view>
				</list-cell>
			</view>
			<!-- 购物车列表 end -->
			<view class="d-flex align-items-center justify-content-start font-size-sm text-color-warning" style="padding: 20rpx 0;">
				<!-- <view class="iconfont iconhelp line-height-100"></view> -->
				<!-- <view>优惠券不与满赠、满减活动共享</view> -->
			</view>
			<!-- 支付方式 begin -->
			<view class="payment">
				<list-cell last :hover="false"><text>支付方式</text></list-cell>
				<list-cell>
					<view class="d-flex align-items-center justify-content-between w-100 disabled" @click="setPayType(5)">
						<view class="iconfont iconbalance line-height-100 payment-icon"></view>
						<view class="flex-fill">余额支付（余额￥{{ member.money }}）</view>
						<view class="font-size-sm" v-if="member.money == 0">余额不足</view>
						<view class="iconfont line-height-100 checkbox checked iconradio-button-on" v-if="payType == 5"></view>
						<view class="iconfont line-height-100 checkbox iconradio-button-off" v-else></view>
					</view>
				</list-cell>
				<!-- <list-cell>
					<view class="d-flex align-items-center justify-content-between w-100" @click="setPayType(4)">
						<view class="iconfont-unidrink icon-alipay line-height-100 payment-icon" style="color:#07b4fd" ></view>
						<view class="flex-fill">支付宝</view>
						<view class="iconfont line-height-100 checkbox checked iconradio-button-on" v-if="payType == 4" ></view>
						<view class="iconfont line-height-100 checkbox iconradio-button-off" v-else ></view>					
					</view>
				</list-cell> -->
				<list-cell last>
					<view class="d-flex align-items-center justify-content-between w-100" @click="setPayType(3)">
						<view class="iconfont iconwxpay line-height-100 payment-icon" style="color: #7EB73A"></view>
						<view class="flex-fill">微信支付</view>
						<view class="iconfont line-height-100 checkbox checked iconradio-button-on" v-if="payType == 3"></view>
						<view class="iconfont line-height-100 checkbox iconradio-button-off" v-else></view>
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
			<view class="bg-primary h-100 d-flex align-items-center just-content-center text-color-white font-size-base" style="padding: 0 60rpx;" @tap="submit">付款</view>
		</view>
		<!-- 付款栏 end -->
		<modal :show="ensureAddressModalVisible" custom :mask-closable="false" :radius="'0rpx'" width="90%">
			<view class="modal-content">
				<view class="d-flex justify-content-end">
					<image src="/static/images/pay/close.png" style="width: 40rpx; height: 40rpx;" @tap="ensureAddressModalVisible = false"></image>
				</view>
				<view class="d-flex just-content-center align-items-center" style="margin-bottom: 40px;">
					<view class="font-size-extra-lg text-color-base">请再次确认下单地址</view>
				</view>
				<view class="d-flex font-size-base text-color-base font-weight-bold align-items-center justify-content-between mb-20">
					<view>{{ address.name }} {{ address.sex ? '女士' : '先生' }}</view>
					<view>{{ address.mobile }}</view>
				</view>
				<view class="d-flex font-size-sm text-color-assist align-items-center justify-content-between mb-40">
					<view style="max-width: 60%;">{{ address.address + address.door_number }}</view>
					<button type="primary" size="mini" plain class="change-address-btn" style="white-space: nowrap;" @click="chooseAddress">修改地址</button>
				</view>
				<button type="primary" class="pay_btn" @tap="pay">确认并付款</button>
			</view>
		</modal>
	</view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import listCell from '@/components/list-cell/list-cell';
import modal from '@/components/modal/modal';
// #ifdef H5
var jweixin = require('jweixin-module');
// #endif

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
			takeoutTIme: false, // 外卖取餐时间picker
			paramsTime: {
				year: false,
				month: false,
				day: false,
				hour: true,
				minute: true,
				second: false
			},
			defaultTime: '00:00',
			takeinTIme: false, // 到店自取时间selector
			takeinRange: [
				{
					name: '立即用餐',
					value: 0
				},
				{
					name: '10分钟后',
					value: 10
				},
				{
					name: '20分钟后',
					value: 20
				},
				{
					name: '30分钟后',
					value: 30
				},
				{
					name: '40分钟后',
					value: 40
				},
				{
					name: '50分钟后',
					value: 50
				}
			],
			defaultSelector: [0],
			payType: 3, // 付款方式:5=余额支付,3=微信支付,4=支付宝
			coupons: 0, // 可用优惠券数量
			coupon: {} ,// 选中的
			subscribeMss: {
				'takein' : '',
				'takeout' : '',
				'takein_made' : '',
				'takeout_made' : ''
			} // 微信订阅信息
		};
	},
	computed: {
		...mapState(['orderType', 'address', 'store', 'member']),
		total() {
			return this.cart.reduce((acc, cur) => acc + cur.number * cur.sales_price, 0);
		},
		amount() {
			let amount = this.cart.reduce((acc, cur) => acc + cur.number * cur.sales_price, 0);
			// 加配送费
			if (this.store.distance > 0 && this.orderType == 'takeout') {
				amount += parseFloat(this.store.delivery_price);
			}
			// 减去优惠券
			if (this.coupon.hasOwnProperty('id')) {
				amount -= parseFloat(this.coupon.value);
			}
			return amount.toFixed(2);
		}
	},
	onShow() {
		let date = new Date(new Date().getTime() + 3600000); // 一个小时后
		let hour = date.getHours();
		let minute = date.getMinutes();
		if (hour < 10) {
			hour = '0' + hour;
		}
		if (minute < 10) {
			minute = '0' + minute;
		}
		this.defaultTime = hour + ':' + minute;
		
		this.getCoupons();
	},
	onHide() {
		this.subscribeMss = [];
		this.coupons = 0;
	},
	onLoad(option) {
		const { remark } = option;
		this.cart = uni.getStorageSync('cart');
		remark && this.$set(this.form, 'remark', remark);
		this.getSubscribeMss();
	},
	methods: {
		...mapMutations(['SET_ORDER_TYPE', 'SET_MEMBER']),
		...mapGetters(['isLogin']),
		async getSubscribeMss() {
			let data = await this.$api.request('/sms/subscribeMsg');
			if (data) {
				this.subscribeMss = data;
			}
		},
		// 更改支付方式
		setPayType(paytype) {
			this.payType = 0;
			this.payType = paytype;
		},
		async getCoupons() {
			//0=通用,1=自取,2=外卖
			let type = this.orderType == 'takein' ? 1 : 2;
			let data = await this.$api.request('/coupon/count', 'POST', { shop_id: this.store.id, type: type });
			if (data) {
				this.coupons = data;
			}
		},
		// 选择时间
		choiceTime(value) {
			let hour = value.hour;
			let minute = value.minute;

			let date = new Date(new Date().getTime() + 3600000); // 一个小时后
			let nowhour = date.getHours();
			let nowminute = date.getMinutes();

			if ((hour * 60 * 60 + minute * 60) * 1000 - 3600000 < (nowhour * 60 * 60 + nowminute * 60) * 1000) {
				this.$api.msg('请至少选择一个小时之后');
				return;
			}

			if (hour < 10) {
				hour = '0' + hour;
			}
			if (minute < 10) {
				minute = '0' + minute;
			}
			this.defaultTime = hour + ':' + minute;
			this.takeoutTIme = false;
		},
		cancelTime(value) {
			this.takeoutTIme = false;
		},
		// 到店自取-取消选择取餐时间
		takeinCancelTime(value) {
			this.takeinTIme = false;
		},
		// 到店自取-选择取餐时间
		takeinConfirmTime(value) {
			this.defaultSelector = value;
		},
		// 是否外卖开关
		takout(value) {
			let type = 'takeout';
			if (value == true) {
				type = 'takein';
			}
			this.SET_ORDER_TYPE(type);

			// 如果存在优惠券看看需不需要清除
			if (this.coupon.hasOwnProperty('type')) {
				//0=通用,1=自取,2=外卖
				if (this.coupon.type != 0) {
					if (this.coupon.type == 1 && this.orderType == 'takeout') {
						this.coupon = {};
					}
					if (this.coupon.type == 2 && this.orderType == 'takeint') {
						this.coupon = {};
					}
				}
			}
			this.subscribeMss = [];
			this.coupons = 0;
			this.getCoupons();
		},
		goToRemark() {
			uni.navigateTo({
				url: '/pages/components/pages/remark/remark?remark=' + this.form.remark
			});
		},
		chooseAddress() {
			uni.navigateTo({
				url: '/pages/components/pages/address/address?is_choose=true&scene=pay'
			});
		},
		goToPackages() {
			let amount = this.amount;
			let coupon_id = this.coupon.id ? this.coupon.id : 0;
			let type = this.orderType == 'takein' ? 1 : 2;
			let shop_id = this.store.id;
			uni.navigateTo({
				url: '/pages/components/pages/packages/index?amount=' + amount + '&coupon_id=' + coupon_id + '&shop_id=' + shop_id + '&type=' + type
			});
		},
		goToShop() {
			uni.navigateTo({
				url: `/pages/components/pages/shop/shop`
			});
		},
		submit() {
			if (this.orderType == 'takeout') {
				// 外卖类型
				if (typeof this.address.id == 'undefined') {
					this.$api.msg('请选择收货地址');
					return;
				}
				// 配送范围 
				// ...
				
				// 起送价钱
				if (this.store.min_price > this.total) {
					this.$api.msg('本店外卖起送价为￥'+this.store.min_price);
					return;
				}
				
				this.ensureAddressModalVisible = true;
			} else {
				this.pay();
			}
		},
		async pay() {
			let that = this;
			// #ifdef MP-WEIXIN
			await new Promise(function(revolve) {
				let subscribeMss = [];
				if (that.orderType == 'takeout') {
					subscribeMss.push(that.subscribeMss.takeout);
					subscribeMss.push(that.subscribeMss.takeout_made);
				} else {
					subscribeMss.push(that.subscribeMss.takein);
					subscribeMss.push(that.subscribeMss.takein_made);
				}
				console.log(subscribeMss);
				uni.requestSubscribeMessage({
					tmplIds: subscribeMss,
					complete (res) { 
						revolve(true); 
					}
				});
			});
			// #endif
			uni.showLoading({
				title: '加载中'
			});
			
			let data = {
				type: this.orderType == 'takeout' ? 2 : 1, // 购买类型:1=自取,2=外卖
				address_id: this.orderType == 'takeout' ? this.address.id : 0, // 外卖配送地址
				shop_id: this.store.id, // 店铺id
				mobile: this.member.mobile, // 联系电话
				gettime: this.takeinRange[this.defaultSelector[0]].value, // 取餐时间
				pay_type: this.payType, // 支付类型
				remark: this.form.remark, // 备注
				product_id: [],
				spec: [],
				number: [],
				coupon_id: this.coupon.id ? this.coupon.id : 0 // 优惠券id
			};

			this.cart.forEach((item, index) => {
				data.product_id.push(item.id);
				data.spec.push(item.props_text.replace(/,/g, '|'));
				data.number.push(item.number);
			});

			//console.log(data);
			let order = await this.$api.request('/order/submit', 'POST', data);
			if (!order) {
				uni.hideLoading();
				return;
			}
			
			//console.log('payTYpe:');
			//console.log(this.payType);

			if (this.payType == 3) {
				// 微信支付
				this.weixinPay(order);
			} else if (this.payType == 5) {
				// 余额支付
				this.balancePay(order);
			} else if (this.payType == 4) {
				// 支付宝支付
				this.aliPay(order);
			}
			uni.hideLoading()
			return
		},
		async balancePay(order) {
			let pay = await this.$api.request('/pay/balance?out_trade_no=' + order.out_trade_no);

			uni.hideLoading();
			if (!pay) {
				return;
			}
			
			this.member.money -= this.amount
			this.SET_MEMBER(this.member)
			uni.removeStorageSync('cart');
			uni.switchTab({
				url: '/pages/take-foods/take-foods',
				fail(res) {
					console.log(res);
				}
			});
		},
		async weixinPay(order) {
			let that = this;
			let data = await this.$api.request('/pay/unify?out_trade_no=' + order.out_trade_no);
			if (!data) {
				uni.hideLoading();
				return;
			}
			if (data.trade_type == 'MWEB') {
				// #ifdef H5
				// 微信外的H5
				location.href = data.mweb_url;
				// #endif
			} else if (data.trade_type == 'JSAPI') {
				// #ifdef H5
				// 微信内的H5
				let config = await this.$api.request('/pay/jssdkBuildConfig');
				if (config) {
					
					jweixin.config(config);
					jweixin.ready(function() {
						jweixin.chooseWXPay({
							timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
							nonceStr: data.nonce_str, // 支付签名随机串，不长于 32 位
							package: 'prepay_id=' + data.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
							signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
							paySign: data.paySign, // 支付签名
							success: function(res) {
								// 支付成功后的回调函数
								
								uni.removeStorageSync('cart');
								uni.switchTab({
									url: '/pages/take-foods/take-foods'
								});
							},
							fail: function(err) {
								//console.log('fail:' + JSON.stringify(err));
								//that.$api.msg('fail:' + JSON.stringify(err))
								that.$api.msg('支付失败');
							}
						});
					});
					jweixin.error(function(res) {
						//that.$api.msg(JSON.stringify(res));
						that.$api.msg('支付失败');
					});
				} else {
					that.$api.msg('支付失败');
				}
				// #endif

				// #ifdef MP-WEIXIN
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: data.timeStamp,
					nonceStr: data.nonce_str,
					package: 'prepay_id=' + data.prepay_id,
					signType: 'MD5',
					paySign: data.paySign,
					success: function(res) {
						
						uni.removeStorageSync('cart');
						uni.switchTab({
							url: '/pages/take-foods/take-foods'
						});
					},
					fail: function(err) {
						//console.log('fail:' + JSON.stringify(err));
						//that.$api.msg('fail:' + JSON.stringify(err))
						that.$api.msg('支付失败');
					}
				});
				// #endif
			} else if (data.trade_type == 'APP') {
				//console.log('app支付');
				//console.log(data);
				//App端，微信支付 orderInfo 为 Object 类型。
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: data.orderInfo,
					success(res) {
						//console.log('支付成功');
						//console.log(res);
						
						uni.removeStorageSync('cart');
						uni.switchTab({
							url: '/pages/take-foods/take-foods'
						});
					},
					fail(res) {
						//console.log('支付失败');
						//console.log(res)
						that.$api.msg('支付失败');
					}
				});
			}
		},
		async alipay() {
			
			// #ifdef H5
			window.open(this.$unishow + '/pay/alipay?order_id='+this.orderId);
			
			setTimeout(function() {
				uni.showModal({
					title: '提示',
					content: '是否已支付?',
					cancelText: '否',
					confirmText: '是',
					success: function(res) {
						if (res.confirm) {
							
							uni.removeStorageSync('cart');
							uni.switchTab({
								url: '/pages/take-foods/take-foods'
							});
						} else if (res.cancel) {
							//console.log('用户点击取消');
						}
					},
					fail: function(res) {
						//console.log(res)
					}
				});
			}, 3000);
			// #endif
		
			// #ifdef APP-PLUS
			let orderInfo = await this.$api.request('/pay/alipay', 'POST',{
				order_id : this.orderId
			});
			if (orderInfo) {
				//console.log(orderInfo);
				uni.requestPayment({
					provider: 'alipay',
					orderInfo: orderInfo,
					success: function (res) {
						console.log('success:' + JSON.stringify(res));
						
						uni.removeStorageSync('cart');
						uni.switchTab({
							url: '/pages/take-foods/take-foods'
						});
					},
					fail: function (err) {
						console.log('fail:' + JSON.stringify(err));
						that.$api.msg('支付失败');
					}
				});
			}
			
			// #endif
			
		}
	}
};
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
	box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
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
