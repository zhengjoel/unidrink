<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in product.images" :key="index">
					<view class="image-wrapper">
						<image :src="item" class="loaded" @click="previewImage(index)" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="introduce-section" v-if="product.id">
			<text class="title">{{product.title}}</text>
			<view class="price-box bot-row">
				<text>积分： {{product.score}}</text>
				<text>销量: {{product.sales}}</text>
				<text>库存: {{product.stock}}</text>
			</view>
		</view>

		<view class="detail-desc" v-if="product.desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<rich-text :nodes="product.desc"></rich-text>
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom" @click="toggleSpec">
			{{buttonText}}
		</view>

		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image v-if="product.image" mode="aspectFill" :src="product.image"></image>
					<view class="right">
						<text class="price">积分:{{product.score}}</text>
						<text class="stock">库存:{{product.stock}}件</text>
					</view>
				</view>

				<u-form :model="form" ref="uForm" label-position="top">
					<u-form-item label="购买数量" labelWidth="150rpx">
						<u-number-box v-model="form.num" :min="1" :max="product.stock" @change="valChange">
						</u-number-box>
					</u-form-item>
					<u-form-item label="收货地址" left-icon="map-fill" right-icon="arrow-right" labelWidth="150rpx">
						<view style="flex-direction: row;width: 100%;">
							<u-input disabled="true" placeholder=""
								:value="form.address.name + '  ' + form.address.mobile" @click="chooseAddress" />
							<u-input disabled="true" placeholder="" v-if="form.address.address != ''"
								:value="form.address.address + form.address.door_number" @click="chooseAddress" />
						</view>
					</u-form-item>
				</u-form>
				<button class="btn" @click="$u.debounce(submit, 500)">{{buttonText}}</button>
			</view>
		</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				buttonText: "立即兑换",
				specClass: 'none',
				product: {},
				id: false,
				form: {
					address: {
						id: 0,
						door_number: "",
						name: "请选择收货地址",
						address: "",
						mobile: "",
					},
					num: 1 // 兑换数量
				},
				lock: false
			};
		},
		onPullDownRefresh() {
			this.getDetail(this.id);
		},
		onLoad(options) {
			this.id = options.id;
			this.getDetail(this.id);
		},
		methods: {
			// 提交
			async submit() {
				if (this.lock == true) {
					return;
				}
				if (this.form.address.id == 0) {
					this.$refs.uToast.show({
						title: '请选择收货地址',
						type: 'warning',
					})
					return
				}
				let data = await this.$u.api.scoreShopExchange({
					id: this.id,
					address_id: this.form.address.id,
					num: this.form.num
				})
				if (data) {
					let that = this;
					that.lock = true;
					setTimeout(function() {
						that.$u.route('/pages/components/pages/scoreproduct/order')
					}, 1000)
				}
			},
			// 选择地址
			chooseAddress() {
				this.$u.route('/pages/components/pages/address/address?is_choose=true&scene=scoreShop')
			},
			// 该表购买数量
			valChange(e) {
				this.form.num = e.value
			},
			// 获取商品详情
			async getDetail(id, flash_id) {
				let product = await this.$u.api.scoreShopDetail({
					id: id
				});
				uni.stopPullDownRefresh();
				this.product = product;
			},
			//规格弹窗开关
			toggleSpec() {
				if (this.specClass === 'show') {
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				} else if (this.specClass === 'none') {
					this.specClass = 'show';
				}
			},
			stopPrevent() {},
			// 查看图片
			previewImage(index) {
				uni.previewImage({
					current: this.product.images_text[index],
					urls: this.product.images_text,
					indicator: "number",
					loop: true
				})
			}
		},

	}
</script>

<style lang='scss'>
	.icon-you {
		color: #888;
	}

	.carousel {
		height: 722upx;
		position: relative;

		swiper {
			height: 100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}

	/* 标题简介 */
	.introduce-section {
		background: #fff;
		padding: 20upx 30upx;

		.title {
			font-size: 32upx;
			color: #555555;
			height: 50upx;
			line-height: 50upx;
		}

		.price-box {
			display: flex;
			align-items: baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 35rpx;
			color: #5A5B5C;
		}

		.price {
			font-size: 35rpx;
		}

		.bot-row {
			display: flex;
			align-items: center;

			text {
				flex: 1;
			}
		}
	}

	/*  详情 */
	.detail-desc {
		background: #fff;
		margin-top: 16upx;
		margin-bottom: 200rpx;

		.d-header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			color: #333333;
			position: relative;

			text {
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}

			&:after {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc;
			}
		}
	}

	/* 规格选择弹窗 */
	.attr-content {
		padding: 10upx 30upx;

		.a-t {
			display: flex;

			image {
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;
				;
			}

			.right {
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				color: #366092;
				line-height: 42upx;

				.price {
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}

			}
		}
	}

	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: #00b1b7;
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;
		color: #ffffff;
		font-size: 40rpx;
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				height: 100rpx;
				line-height: 100rpx;
				border-radius: 100rpx;
				background: #00b1b7;
				font-size: 40rpx;
				color: #fff;
				margin: 30upx auto 20upx;

			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}
</style>
