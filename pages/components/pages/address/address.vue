<template>
	<view class="container">
		<view class="main">
			<view v-if="!addresses.length" class="no-address-tips">
				<view class="mb-30">暂无地址信息</view>
				<view>请点击底部按钮添加地址信息</view>
			</view>
			<template v-else>
				<uni-swipe-action>
					<uni-swipe-action-item class="address-wrapper" :options="swipeOption" @click="handleSwipeClick(address.id)" v-for="(address, index) in addresses"
					 :key="index">
						<view class="address" @tap="chooseAddress(address)">
							<view class="left flex-fill overflow-hidden mr-20">
								<view class="font-size-lg font-weight-bold text-truncate" style="margin-bottom: 10rpx;white-space:normal;">{{ address.address + ' ' + address.door_number }}</view>
								<view class="font-size-sm text-color-assist">
									{{ address.name }} {{ !address.sex ? '先生' : '女士' }} {{ address.mobile }}
								</view>
							</view>
							<image src="/static/images/edit.png" class="edit-icon" @tap.stop="edit(address.id)"></image>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</template>
		</view>
		<view class="btn-box">
			<button type="primary" size="default" @tap="add">新增地址</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item'

	export default {
		components: {
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				scene: 'menu',
				is_choose: false, //是否选择地址
				swipeOption: [{
					text: '删除',
					style: {
						backgroundColor: '#D12E32'
					}
				}]
			}
		},
		computed: {
			...mapState(['addresses', 'store'])
		},
		async onLoad({
			is_choose,
			scene
		}) {
			this.is_choose = is_choose || false
			this.scene = scene || 'menu'
		},
		onShow() {
			this.init();
		},
		methods: {
			...mapMutations(['SET_ADDRESS', 'SET_ADDRESSES', 'SET_ORDER_TYPE', 'SET_STORE', 'SET_LOCATION']),
			async init() {
				let data = await this.$api.request('/address/all');
				if (data) {
					this.SET_ADDRESSES(data);
				}
			},
			add() {
				uni.navigateTo({
					url: '/pages/components/pages/address/add'
				})
			},
			edit(id) {
				uni.navigateTo({
					url: '/pages/components/pages/address/add?id=' + id
				})
			},
			async handleSwipeClick(id) {
				let [error, res] = await uni.showModal({
					title: '提示',
					content: '确定要删除？'
				});
				if (res && res.confirm) {
					let data = await this.$api.request('/address/delete', 'POST', {id:id});
					if (data) {
						const index = this.addresses.findIndex(item => item.id == id)
						const addresses = JSON.parse(JSON.stringify(this.addresses))
						addresses.splice(index, 1)
						this.SET_ADDRESSES(addresses)
						uni.showToast({
							title: '删除成功！',
							icon: 'success'
						})
					}
					
				}

			},
			async chooseAddress(address) {
				if (!this.is_choose) return
				
				console.log('已选中的店铺')
				console.log(this.store);
				
				let data = await this.$api.request('/shop/getDistanceFromLocation', 'POST',{
					lat: address.lat,
					lng: address.lng,
					lat2: this.store.lat,
					lng2: this.store.lng
				});
				if (!data) {
					return;
				}
				if (data > this.store.distance) {
					this.$api.msg('不在配送范围');
					return;
				}
				this.SET_ADDRESS(address)
				this.SET_ORDER_TYPE('takeout')
				this.store.far = data
				this.store.far_text = data + 'km'
				this.SET_STORE(this.store)
				this.SET_LOCATION({
					latitude: address.lat,
					longitude: address.lng
				});
				
				if (this.scene == 'menu') {
					
					uni.switchTab({
						url: '/pages/menu/menu'
					})
				} else if (this.scene == 'pay') {
					uni.navigateBack();
					// uni.navigateTo({
					// 	url: '/pages/pay/pay'
					// })
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
	}

	.main {
		width: 100%;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		padding-bottom: 100rpx;

		.address-wrapper {
			margin-bottom: 30rpx;
		}

		.address {
			width: 100%;
			padding: 40rpx 30rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.right {
				flex: 1;
				overflow: hidden;
				display: flex;
				flex-direction: column;
			}

			.edit-icon {
				width: 50rpx;
				height: 50rpx;
				flex-shrink: 0;
			}
		}
	}

	.btn-box {
		height: 100rpx;
		background-color: #FFFFFF;
		box-shadow: 0 0 20rpx rgba($color: $text-color-assist, $alpha: 0.1);
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 10rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;

		button {
			height: 80rpx;
			width: 80%;
			border-radius: 50rem !important;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
