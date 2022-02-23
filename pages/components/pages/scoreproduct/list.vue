<template>
	<view>
		<!--商品区-->
		<u-waterfall v-model="flowList" add-time="0" ref="uWaterfall">
			<template v-slot:left="{leftList}">
				<view class="demo-warter" v-for="(item, index) in leftList" :key="index" @click="goDetail(item)">
					<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
					<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
					<u-lazy-load threshold="300" duration="0" :is-effect="false" border-radius="10" :image="item.image"
						:index="index"></u-lazy-load>
					<view class="demo-title">
						{{item.title}}
					</view>
					<view class="demo-price">
						消耗积分:{{item.score}}
					</view>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="demo-warter" v-for="(item, index) in rightList" :key="index" @click="goDetail(item)">
					<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
					<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
					<u-lazy-load threshold="300" duration="0" :is-effect="false" border-radius="10" :image="item.image"
						:index="index"></u-lazy-load>
					<view class="demo-title">
						{{item.title}}
					</view>
					<view class="demo-price">
						消耗积分:{{item.score}}
					</view>
				</view>
			</template>
		</u-waterfall>
		<u-loadmore :status="status" />

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flowList: [],
				page: 1,
				pageLimit: 1,
				status: 'loadmore',
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.getProduct()
		},
		async onReachBottom() {
			if (this.status == 'loading') {
				return;
			}
			this.page++
			this.status = 'loading'; // 'nomore'
			let res = await this.$u.api.scoreShopIndex({
				page: this.page
			});
			if (res.code == 1) {
				this.flowList = this.flowList.concat(res.data);
				if (res.data.length == 0) {
					this.page--;
					this.status = 'nomore'
				} else {
					this.status = 'loadmore'
				}
			} else {
				this.status = 'loadmore'
			}
		},
		methods: {
			goDetail(item) {
				this.$u.route({
					url: '/pages/components/pages/scoreproduct/detail?id=' + item.id
				})
			},
			async getProduct() {
				this.$refs.uWaterfall.clear();
				let res = await this.$u.api.scoreShopIndex({
					page: this.page
				});
				uni.stopPullDownRefresh();
				if (res.code == 1) {
					this.flowList = res.data;
				} else {
					this.$refs.uToast.show({
						title: res.msg,
					})
				}
			}
		},
		onPullDownRefresh() {
			this.page = 1;
			this.getProduct()
		}
	}
</script>

<style lang="scss">
	.search {
		margin: 10rpx !important;
	}

	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #5A5B5C;
		padding: 8px;
		position: relative;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: #ffffff;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: $bg-color;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 32rpx;
		color: #cdad73;
		margin-top: 5px;
	}

	.page {
		padding: 10px 0;

		.demo-layout {
			text-align: center;
			background-color: #c6caca;
			border-radius: 20rpx;
			margin: 5px 0;
			padding: 3px;
		}

		.select {
			background-color: #eea13c;
			color: #ffffff;
		}
	}
</style>
