<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				
				<swiper-item class="swiper-item" v-for="(item, index) in orderList" :key="index">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view v-if="item.length == 0">
								<view class="centre" v-if="loadStatus[index] != 'loading'">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										您还没有相关的账单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn">
										<navigator open-type="switchTab" url="/pages/menu/menu">随便逛逛</navigator>
									</view>
								</view>
								<view v-else>
									<u-loadmore :status="loadStatus[index]" bgColor="#f2f2f2"></u-loadmore>
								</view>
							</view>
							<view v-else>
								<view class="order" v-for="(res, resIndex) in orderList[index]" :key="resIndex">
									<view class="type">
										<view>{{list[res.type].name}}-{{payTypeList[res.pay_type]}}</view>
										<view>{{res.effecttime_text}}</view>
									</view>
									<view class="total">
										<view>
												{{payTypeList[res.pay_type]}}：{{res.type == 1 ? '—':'＋'}}￥{{res.real_price}}元
										</view>
										<view v-if="res.type != 3">
												支付：{{res.type == 1 ? '—':'＋'}}￥{{res.total_price}}元
										</view>
									</view>
								</view>
								<u-loadmore :status="loadStatus[index]" bgColor="#f2f2f2"></u-loadmore>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderList: [[], [], [], []],
			list: [
				{
					name: '全部'
				},
				{
					name: '消费'
				},
				{
					name: '充值'
				},
				{
					name: '退款'
				}
			],
			payTypeList: {'0': '无', '3':'微信','4':'支付宝', '5': '余额'},
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			dx: 0,
			loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
			page:1,
			pageSize:20
		};
	},
	async onLoad() {
		await this.getBill();
	},
	computed: {
		
	},
	methods: {
		async getBill(){
			if (this.loadStatus[this.swiperCurrent] == 'loading') {
				return;
			}
			this.loadStatus.splice(this.swiperCurrent,1,"loading")
			let data = await this.$api.request('/balance/getBillList', 'POST', {type:this.swiperCurrent,page:this.page,pagesize:this.pageSize});
			if (this.page == 1 ){
				this.orderList[this.swiperCurrent] = [];
			}
			if (data && data.length > 0) {
				this.page++;
				this.orderList[this.swiperCurrent] = this.orderList[this.swiperCurrent].concat(data);
				
				this.loadStatus.splice(this.swiperCurrent,1,"loadmore")
			} else{
				this.loadStatus.splice(this.swiperCurrent,1,"nomore")
			}
		},
		reachBottom() {
			if (this.loadStatus[this.swiperCurrent] == 'nomore') {
				return;
			}
			this.getBill();
		},
		// tab栏切换
		change(index) {
			this.swiperCurrent = index;
			this.page = 1;
			//this.getBill();
		},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
			this.page = 1;
			this.getBill();
		}
	}
};
</script>

<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
.order {
	width: 710rpx;
	background-color: #ffffff;
	margin: 20rpx auto;
	border-radius: 20rpx;
	box-sizing: border-box;
	padding: 20rpx;
	font-size: 28rpx;
	
	.total {
		display: inline-block;
		text-align: right;
		
		.total-price {
			font-size: 36rpx;
		}
		float: right;
	}
	.type {
		display: inline-block;
		
	}
	
}
.centre {
	text-align: center;
	margin: 200rpx auto;
	font-size: 32rpx;
	image {
		width: 164rpx;
		height: 164rpx;
		border-radius: 50%;
		margin-bottom: 20rpx;
	}
	.tips {
		font-size: 24rpx;
		color: #999999;
		margin-top: 20rpx;
	}
	.btn {
		margin: 80rpx auto;
		width: 200rpx;
		border-radius: 32rpx;
		line-height: 64rpx;
		color: #ffffff;
		font-size: 26rpx;
		background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
	}
}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>

