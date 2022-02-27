<template>
	<block v-if="init">
		<scroll-view class="lee-logistics-scroll" :style="{ height }" scroll-y="true" v-if="result">
			<view class="lee-logistics">
				<!-- 物流公司与送达状态面板 -->
				<view class="lee-logistics-caption">
					<!-- <image class="lee-logistics-caption-logo" :src="result.img" mode="widthFix" /> -->
					<view class="lee-logistics-caption-info">
						<!-- <view class="lee-logistics-caption-status">{{ result.status }}</view> -->
						<view class="lee-logistics-caption-nu">
							<text>{{ result.company }}：</text>
							<text>{{ expresssn }}</text>
							<text class="copy" @click="copy()">复制</text>
						</view>
					</view>
				</view>
				<!-- 物流公司与送达状态面板END -->
				
				<!-- 物流信息列表 --> 
				<view class="lee-logistics-list">
					<view class="lee-logistics-msg" v-for="(v, k) of result.message" :key="k">
						<view class="lee-logistics-msg-time">
							<view>{{ v.time.split(' ')[1] }}</view>
							<view>{{ v.time.split(' ')[0] }}</view>
						</view>
						<view class="lee-logistics-msg-context">
							<rich-text :nodes="v.step | contextFormatter"></rich-text>
						</view>
					</view>
				</view>
				<!-- 物流信息列表END -->
			</view>
		</scroll-view>
		<view class="lee-logistics-defults" :style="{ height }" v-else>
			<view class="lee-logistics-defults-icon leeIcon-empty"></view>
			<view class="lee-logistics-defults-title">暂无查询结果</view>
			<view class="lee-logistics-defults-intro">单号输入错误或暂未寄出</view>
		</view>
	</block>
</template>

<script>
	export default {
		props: {
			expresssn: {
				type: String,
				required: true
			},
			height: {
				type: String,
				default: '100%'
			}
		},
		data() {
			return {
				init: false,
				result: null
			}
		},
		filters: {
			// 格式化物流信息
			contextFormatter(v) {
				return v.replace(/\d{11}/, re => `<span class="phoneText">${re}</span>`)
			}
		},
		created() {
			// this.search()
		},
		methods: {
			// 查询快递信息
			async search(express, expresssn) {
				let list = await this.$u.api.scoreShopExpress({
					express: express,
					expresssn: expresssn
				});				 
				if (list) {
					this.init = true
					this.result = list;
				}
			},
			
			// 查询到数据后的处理函数
			dataHandler(res) {
				this.init = true
				this.result = res.status === 1 && res.data.status ? res.data : null
			},
			
			copy() {
				uni.setClipboardData({
					data: this.expresssn
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './icon.scss';
	
	.copy {
		color: #1296db;
		margin-left: 10rpx;
	}
	
	.lee-logistics-defults {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: $uni-text-color-grey;
		
		&-icon {
			font-size: 200rpx;
			font-weight: 600;
		}
		
		&-title {
			font-size: 40rpx;
			margin-bottom: 10rpx;
		}
		
		&-intro {
			font-size: 32rpx;
		}
	}
	
	.lee-logistics {
		padding: 30rpx;
		
		&-list {
			padding: 30rpx;
			background-color: $uni-bg-color;
			border-radius: 8rpx;
			box-shadow: 0 0 2rpx rgba(0, 0, 0, .15);
			padding-top: 50rpx;
		}
	}
	
	.lee-logistics-caption {
		padding: 30rpx;
		background-color: $uni-bg-color;
		border-radius: 8rpx;
		box-shadow: 0 0 2rpx rgba(0, 0, 0, .15);
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	
		&-logo {
			$size: 120rpx;
			width: $size;
			height: $size;
		}
		
		&-info {
			flex: 1;
			width: 0;
			margin-left: 30rpx;
		}
		
		&-status {
			font-size: 36rpx;
			font-weight: 400;
			margin-bottom: 10rpx;
		}
		
		&-nu {
			font-size: 32rpx;
		}
	}
	
	.lee-logistics-msg {
		display: flex;
	
		&-time {
			width: 162rpx;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			padding-right: 30rpx;
			font-size: 24rpx;
		}
		
		&-context {
			flex: 1;
			width: 0;
			padding-left: 30rpx;
			padding-bottom: 50rpx;
			border-left: 2rpx solid $uni-border-color;
			position: relative;
			font-size: 32rpx;
			
			&::before {
				--size: 20rpx;
				content: '';
				position: absolute;
				width: var(--size);
				height: var(--size);
				top: calc(-1 * var(--size) / 2);
				left: calc(-1 * var(--size) / 2);
				background-color: $uni-border-color;
				border-radius: 50%;
			}
			
		}
		
		&:last-child > &-context {
			border: none;
		}
		&:first-child > &-context {
			border-color: $uni-color-primary;
			border-left-style: dashed;
			
			&::before {
				--size: 30rpx;
				background-color: $uni-color-primary;
			}
		}
	}
	
	.phoneText {
		color: $uni-color-primary;
		font-weight: 600;
	}
</style>
