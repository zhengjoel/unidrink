<template>
	<view>
		<view>
			<u-search margin="30rpx" v-model="keywork" @custom="search(keywork)"></u-search>
		</view>
		<view v-for="(item,index) in list" :key="index">
			<u-card @click="choice(item)" :border="item.id == store.id" :title="item.name" :thumb="item.image" :thumb-width="80" :sub-title="item.status_text">
				<view slot="body" class="body">
					<view class="body-left">
						<view>距离您 {{item.far_text}}</view>
						<view v-if="item.distance > 0">配送距离：{{item.distance + 'km '}} & 配送费：{{item.delivery_price}}</view>
						<view v-else>外卖不配送</view>
						<view>{{item.address_map + ' ' + item.address}}</view>
						<view>营业时间 {{item.bussines_time}}</view>
					</view>
					<view class="body-right">
						<u-button @click="openLocation(item)">导航</u-button>
						<u-button @click="call(item.mobile)">致电</u-button>
					</view>
				</view>
			</u-card>
		</view>
	</view>
</template>

<script>
	import {
		mapState, mapMutations
	} from 'vuex'
	export default {
		computed: {
			...mapState(['location', 'store'])
		},
		data() {
			return {
				list: [],
				keywork: '',
				page: 1,
				pagesize: 10
			}
		},
		onLoad() {
			this.getShop();
		},
		methods: {
			...mapMutations(['SET_STORE']),
			async getShop(keywork = '') {
				let data = await this.$api.request('/shop/getList', 'POST', {
					lat: this.location.latitude,
					lng: this.location.longitude,
					kw: keywork,
					page:this.page,
					pagesize:this.pagesize
				});
				if (data) {
					//console.log(data);
					if (this.page == 1) {
						this.list = data;
					} else {
						for(let i in data) {
							this.list.push(data[i]);
						}
					}
				}
			},
			//打开定位
			openLocation(shop) {
				//console.log(shop);
				uni.openLocation({
					latitude: parseFloat(shop.lat),
					longitude: parseFloat(shop.lng),
					name:shop.name,
					address: shop.address_map + shop.address,
					fail: (res) => {
						console.log(res);
					}
				})
			},
			// 打电话
			call(mobile) {
				uni.makePhoneCall({
					phoneNumber:mobile
				})
			},
			// 搜索按钮
			search(keywork) {
				this.page = 1;
				this.getShop(keywork);
			},
			// 选中店铺
			choice(shop) {
				this.SET_STORE(shop);
				uni.setStorageSync('cart', JSON.parse(JSON.stringify(this.$api.prePage(0).cart)));
				this.$api.prePage(0).init();
				uni.switchTab({ 
					url:'/pages/menu/menu',
					fail(res) {
						console.log(res);
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.body {
		
		.body-left {
			display: inline-block;
			width: 77%;
			padding-left: 6rpx;
		}
		.body-right {
			display: inline-block;
			width: 20%;
		}
	}
	
	.u-border {
		border: 1rpx solid #1296db;
	}
</style>
