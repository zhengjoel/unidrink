<template>
	<view class="container bg-white w-100 h-100">
		<!--协议弹出框-->
		<u-popup mode="bottom" :closeable="true" v-model="show">
			<view class="pre-line font-size-sm text-color-assist" style="margin-bottom: 200rpx;padding: 30rpx;">{{ agreement }}</view>
		</u-popup>

		<!--轻提示-->
		<u-toast ref="uToast"></u-toast>

		<view style="padding-bottom: 220rpx;">
			<view class="balance-info d-flex justify-content-between">
				<view class="flex-fill d-flex flex-column align-items-between justify-content-between">
					<view class="font-size-sm text-color-base">账户余额（元）</view>
					<view class="font-size-extra-lg text-color-base font-weight-bold">{{ member.money }}</view>
					<view class="font-size-sm text-color-primary" @click="goBill">交易记录</view>
				</view>
				<image src="/static/images/balance.png" mode="widthFix"></image>
			</view>

			<view class="font-size-lg text-color-base font-weight-bold" style="margin-bottom: 20rpx;">储值金额</view>

			<u-grid :col="3" @click="handleSelected" class="amounts">
				<block v-for="(item, index) in amounts" :key="index" >
					<u-grid-item :index="index" :bg-color="item.selected ? '#00b1b7' : '#F1F8FA'" :class="{'bg-primary text-color-white': item.selected}">
						<view class="font-size-extra-lg font-weight-bold" style="text-align: center;">
							<view style="font-size: 36rpx;">{{ item.value }}元</view>
							<view style="font-size: 24rpx;">售价 {{ item.sell_price }} 元</view>
						</view>
					</u-grid-item>
				</block>
			</u-grid>

			<template>
				<view class="font-size-lg text-color-base font-weight-bold" style="margin-bottom: 20rpx;">储值协议</view>
				<view class="pre-line font-size-sm text-color-assist">{{ agreement }}</view>
			</template>

			<!-- bottom box begin -->
			<view class="bottom-box position-fixed fixed-bottom w-100 d-flex flex-column bg-white">
				<view class="protocol font-size-sm d-flex justify-content-start align-items-center">
					<view
						class="iconfont line-height-100"
						@tap="agree = !agree"
						:class="{ 'iconradio-button-on text-color-primary': agree, 'iconradio-button-off text-color-base': !agree }"
					></view>
					<view class="text-color-base">我已阅读并同意</view>
					<view class="text-color-primary" @click="popup">《储值协议》</view>
				</view>
				<button type="primary" class="b" @click="buy">购买</button>
			</view>
			<!-- bottom box end -->
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			agree: false,
			amounts: [],
			show: false, // 是否显示协议
			agreement:
				'1. 储值成功后，不可退款，请根据自己的消费情况充值。\n2. 储值余额不可提现，不可转移、转赠。\n3. 储值金额按国家法律、法规开具符合规定的发票，后续凭储值余额消费时，不再开具发票。如需发票请至个人中心联系客服。\n4. 储值不累计会员积分，订单消费时以实际订单支付金额累计会员积分。\n5. 储值余额可在内地线下门店、点餐小程序在线支付使用。'
		};
	},
	onLoad() {
		this.getManeyList();
	},
	computed: {
		...mapState(['member'])
	},
	methods: {
		...mapMutations(['SET_MEMBER']),
		async getManeyList() {
			let amounts = await this.$api.request('/balance/getMoneyList');
			if (amounts) {
				this.amounts = amounts;
			}
		},
		handleSelected(index) {
			this.amounts.forEach(item => this.$set(item, 'selected', false));
			this.$set(this.amounts[index], 'selected', true);
		},
		async buy() {
			if (this.agree == false) {
				this.$refs.uToast.show({
					title: '请点击同意储存协议',
					type: 'success'
				});
				return;
			}
			let selected = false;
			let recharge = 0;
			this.amounts.forEach(item => {
				if (item.selected == true) {
					selected = true;
					recharge = item;
				}
			});
			if (selected == false) {
				this.$refs.uToast.show({
					title: '请选择充值金额',
					type: 'error'
				});
				return;
			}

			let data = await this.$api.request('/balance/recharge', 'POST', {
				recharge_id: recharge.id
			});
			if (!data) {
				return;
			}
			let pay = await this.$api.request('/pay/unify?out_trade_no=' + data.out_trade_no);
			if (pay) {
				let that = this;
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: pay.timeStamp,
					nonceStr: pay.nonce_str,
					package: 'prepay_id=' + pay.prepay_id,
					signType: 'MD5',
					paySign: pay.paySign,
					success: async function(res) {
						that.$refs.uToast.show({
							title: '充值成功',
							type: 'success'
						});
						that.member.money = (parseFloat(that.member.money) + parseFloat(recharge.value)).toFixed(2);

						// let data = await that.$api.request('/user/getUserInfo');
						// if (data) {
						// 	console.log(data);
						// 	that.$store.commit('SET_MEMBER', data);
						// }
					},
					fail: function(err) {
						//console.log('fail:' + JSON.stringify(err));
						//that.$api.msg('fail:' + JSON.stringify(err))
						that.$refs.uToast.show({
							title: '支付失败',
							type: 'error'
						});
					}
				});
			}
		},
		// 弹出层
		popup() {
			this.show = true;
		},
		goBill() {
			uni.navigateTo({
				url: '/pages/components/pages/balance/bill'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 0 40rpx;
}

.balance-info {
	padding: 50rpx 10rpx;

	view {
		height: calc(366 / 638 * 340);
		padding: 10rpx 0;
	}
	image {
		width: 340rpx;
	}
}

.amounts {
	margin-bottom: 40rpx;
}

.bottom-box {
	padding: 0 40rpx;
	box-shadow: 0 0 20rpx rgba(6, 6, 6, 0.1);

	.protocol {
		padding: 36rpx 0;
		height: 100rpx;
		view {
			margin-right: 10rpx;
		}
	}

	button {
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 50rem !important;
		margin-bottom: 30rpx;
	}
}
</style>
