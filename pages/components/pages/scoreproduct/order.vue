<template>
	<view class="container">
		<view class="orders-list d-flex flex-column w-100" style="padding: 20rpx; padding-bottom: 0;">
			<view class="order-item" v-for="(item, index) in orders" :key="index" style="margin-bottom: 30rpx;"
				@tap="detail(item.id)">
				<list-cell :hover="false">
					<view class="w-100 d-flex align-items-center">
						<view class="flex-fill d-flex flex-column">
							<view class="font-size-sm text-color-assist">订单编号：{{ item.id }}</view>
						</view>
						<view class="font-size-lg text-color-primary">
							{{ item.order_status_text }}
						</view>
					</view>
				</list-cell>
				<list-cell :hover="false" last>
					<view class="w-100 d-flex flex-column">
						<view class="w-100 text-truncate font-size-lg text-color-base" style="margin-bottom: 20rpx;">
							{{ item.product.title + ' * ' + item.number}}
						</view>
						<view class="d-flex justify-content-between align-items-center" style="margin-bottom: 30rpx;">
							<view class="font-size-sm text-color-assist">
								{{item.createtime }}
							</view>
							<view class="d-flex font-size-sm text-color-base align-items-center">
								<view style="margin-right: 10rpx;">共{{item.number }}件商品，消耗积分</view>
								<view class="font-size-lg"> {{ item.total_score }}</view>
							</view>
						</view>
						<view class="d-flex align-items-center justify-content-end">
							<view>
								<button v-if="item.have_paid > 0 && item.status == 1 && item.have_received == 0"
									class="left-margin" type="primary" plain size="mini"
									@tap.stop="receive(item)">确认收到货</button>
							</view>
						</view>
					</view>
				</list-cell>
			</view>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell/list-cell'

	export default {
		components: {
			listCell
		},
		data() {
			return {
				page: 1,
				pageSize: 10,
				orders: []
			}
		},
		computed: {

		},
		async onLoad() {
			if (!this.$store.getters.isLogin) {
				uni.navigateTo({
					url: '/pages/components/pages/login/login'
				})
			}
			await this.getOrders(false)
		},
		async onReachBottom() {
			await this.getOrders(false)
		},
		async onPullDownRefresh() {
			await this.getOrders(true)
		},
		methods: {
			async getOrders(isRefresh = false) {
				uni.showLoading({
					title: '加载中'
				})
				if (isRefresh) {
					this.orders = []
					this.page = 1
				}
				let orders = await this.$u.api.scoreShopOrder({
					page: this.page,
					pagesize: this.pageSize
				});
				if (orders.length > 0) {
					this.orders = this.orders.concat(orders)
					this.page += 1
				}
				uni.stopPullDownRefresh();
				uni.hideLoading()
			},
			detail(id) {
				uni.navigateTo({
					url: '/pages/components/pages/scoreproduct/orderDetail?id=' + id
				})
			},
			// 确认收到货
			async receive(order) {
				let data = await this.$u.api.scoreShopReceive({
					id: order.id
				});
				if (data) {
					this.$u.toast('已签收')
					let that = this;
					setTimeout(function() {
						that.getOrders(true)
					}, 1000);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.left-margin {
		margin-left: 10rpx;
	}
</style>
