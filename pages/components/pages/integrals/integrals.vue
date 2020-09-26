<template>
	<view class="container">
		<navbar-back-button></navbar-back-button>
		<view class="header">
			<image src="/static/images/integrals/bg.png" mode="scaleToFill"></image>
			<view class="sign-in-info">
				<view class="left">
					<view class="d-flex align-items-baseline" @tap="flow">
						<image class="integral-icon" src="/static/images/integrals/integral.png"></image>
						<view class="number">{{ member.score }}</view>
						<view class="font-size-base">积分</view>
						<view class="iconfont iconarrow-right line-height-100"></view>
					</view>
				</view>
				<view class="right"  @tap="flow">
					积分记录
				</view>
			</view>
		</view>
		<view style="padding: 0 30rpx;">
			<view class="sign-in-box">
				<view class="text-color-base font-weight-bold font-size-lg" style="margin: 20rpx 0;">连续签到赚积分</view>
				<uni-steps :active="activeDay" :options="stepsOption"></uni-steps>
				<view class="d-flex flex-column align-items-center just-content-center" style="margin: 20rpx 0;">
					<button type="primary" class="sign-in-btn" @click="signin">{{scoreInfo.signin == 1 ? '今日已签到' : '签到'}}</button>
					<view class="font-size-base text-color-primary" style="margin-top: 20rpx;" @tap="attendance">查看签到日历</view>
				</view>
			</view>
			
			<!-- <view class="banner">
				<image src="https://images.qmai.cn/s23107/2020/04/30/aed6cdb1db4712f87e.png" mode="widthFix"></image>
			</view> -->
			<!-- 积分商品列表 begin -->
			<view clas="d-flex flex-column">
				<view class="d-flex justify-content-between align-items-center mb-30">
					<view class="font-size-lg text-color-base">积分兑换好卷</view>
					<image src="/static/images/navigator.png" style="width: 40rpx; height: 40rpx;" @tap="goCoupon"></image>
				</view>
				<view class="d-flex flex-wrap justify-content-between">
					<block v-for="(item, key) in pointsMall" :key="key">
						<view class="d-flex bg-white flex-column align-items-stretch point-box" @tap="detail(item, key)">
							<image :src="item.image ? item.image : '/static/images/integrals/ticket.png'" class="w-100" mode="widthFix"></image>
							<view class="d-flex flex-column overflow-hidden">
								<view class="font-size-lg text-color-base text-truncate font-weight-bold" style="margin-bottom: 10rpx;">{{ item.title }}</view>
								<view class="d-flex align-items-center">
									<view class="d-flex align-items-baseline">
										<view class="font-size-base text-color-primary mr-10">{{ item.score }}</view>
										<view class="font-size-sm text-color-assist">积分</view>
									</view>
									<view v-if="item.value > 0" class="d-flex align-items-center font-size-sm text-color-assist" style="margin: 0 10rpx;">+</view>
									<view  v-if="item.value > 0" class="d-flex align-items-baseline">
										<view class="font-size-base text-color-primary mr-10">{{ parseFloat(item.value) }}</view>
										<view class="font-size-sm text-color-assist">元</view>
									</view>
								</view>
								<view class="font-size-sm text-color-assist">剩余{{ remains(item.distribute,item.receive) }}件</view>
							</view>
						</view>						
					</block>
				</view>
			</view>
			<!-- 积分商品列表 end -->
		</view>
		
		<modal custom :show="detailModalVisible" @cancel="closeDetailModal" width="90%">
			<view class="modal-content">
				<view class="d-flex font-size-extra-lg text-color-base just-content-center mb-20">{{ coupon.title }}</view>
				<view class="d-flex font-size-sm text-color-base mb-20">
					有效期：{{ coupon.starttime_text }}至{{ coupon.endtime_text }}
				</view>
				<view class="d-flex font-size-sm text-color-base mb-20">
					领取时间：{{ coupon.createtime_text }}
				</view>
				<view class="d-flex font-size-sm text-color-base mb-20">
					卷价值：满{{ coupon.least }}减{{ coupon.value }}
				</view>
				<view class="d-flex font-size-sm text-color-base mb-20">
					每人限领：{{ coupon.limit }} 张 {{ coupon.my_receive > 0 ? '(已领'+coupon.my_receive+'张)':''}}
				</view>
				<view class="d-flex font-size-sm text-color-base mb-20" v-if="coupon.score > 0">
					需要积分：{{ coupon.score }} 
				</view>
				<view class="d-flex font-size-sm text-color-base mb-20">
					适用范围：{{typeInfo(coupon.type)}}
				</view>
				<view class="d-flex font-size-sm text-color-base mb-20">
					适用店铺：{{coupon.shop_name}}
				</view>
				<pre class="pre-line font-size-sm text-color-assist mb-30" style="max-height: 600rpx;overflow: auto;">
					<jyf-parser ref="couponExplain"></jyf-parser>
				</pre>
				<view class="d-flex align-items-center just-content-center">
					<button type="primary" @tap="receive(coupon, couponIndex)" class="use-coupon-btn">立即领取</button>
					<button type="primary" v-if="coupon.my_receive > 0" @tap="useCoupon" class="use-coupon-btn">立即使用</button>
				</view>
			</view>
		</modal>
		
		<!--轻提示-->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import navbarBackButton from '@/components/navbar-back-button'
	import uniSteps from '@/components/uni-steps/uni-steps'
	import {mapState, mapMutations} from 'vuex';
	import modal from '@/components/modal/modal'
	import jyfParser from "@/components/jyf-parser/jyf-parser"
	
	export default {
		components: {
			navbarBackButton,
			uniSteps,
			modal,
			jyfParser
		},
		data() {
			return {
				stepsOption: [],
				activeDay: -1,
				pointsMall: [],
				scoreInfo: {},
				couponIndex: 0,
				coupon: {},
				detailModalVisible:false
			}
		},
		computed:{
			...mapState(['member'])
		},
		onLoad() {
			//this.getScore();
		},
		onShow() {
			this.getScore();
			this.getPointsMall()
		},
		methods: {
			...mapMutations(['SET_MEMBER']),
			// 使用范围
			typeInfo(type) {
				if (type == 0) {
					return '外卖和自取'
				}
				if (type == 1) {
					return '自取'
				}
				if (type == 2) {
					return '外卖'
				}
			},
			async getScore() {
				let data = await this.$api.request('/score/index');
				if (data) {
					this.scoreInfo = data;
					if (data.successions > 7) {
						this.activeDay = 7;
					}
					data.signinscore.forEach((item, index) => {
						if(data.successions - 1 == index) {
							this.activeDay = index
						}
						if(index == data.signinscore.length - 1) {
							item.circle = '/static/images/integrals/goal.png'
							item.circleStyle = 'width: 47rpx; height: 39rpx;'
						}
					});
					this.stepsOption = data.signinscore;
				}
			},
			// 签到
			async signin() {
				let data = await this.$api.request('/score/dosign', 'POST');
				if (data) {
					this.member.score = parseInt(this.member.score) + parseInt(this.scoreInfo.score);
					if (this.activeDay < 7) {
						this.activeDay++;
					}
					this.scoreInfo.signin = 1;
				}
			},
			async getPointsMall() {
				let data = await this.$api.request('/coupon/index', 'POST', {score:1, pagesize: 6});
				if (data) {
					this.pointsMall = data;
				}
				
				return 
				this.pointsMall = await this.$api('pointsMall')
			},
			attendance() {
				uni.navigateTo({
					url: '/pages/components/pages/attendance/attendance'
				})
			},
			flow() {
				uni.navigateTo({
					url: '/pages/components/pages/integrals/flow'
				})
			},
			goCoupon() {
				uni.navigateTo({
					url: '/pages/components/pages/coupons/coupons'
				})
			},
			// 开的详情
			detail(coupon,index) {
				this.couponIndex = index;
				this.coupon = coupon
				this.$refs['couponExplain'].setContent(this.coupon.instructions || '')
				this.detailModalVisible = true
			
			},
			/**
			 * 剩余数量
			 * @param {Object} distribute 发行量
			 * @param {Object} receive 已兑换
			 */
			remains(distribute, receive) {
				let remains = distribute - receive
				return remains > 0 ? remains : 0
			},
			closeDetailModal() {
				this.detailModalVisible = false
				this.coupon = {}
			},
			// 领取优惠券
			async receive(coupon,index) {
				let data = await this.$api.request('/coupon/receive','POST',{id:coupon.id});
				if (data) {
					this.$refs.uToast.show({
						title: '领取成功',
						type: 'success'
					});
					let coupon = this.pointsMall[index];
					// 我领取加一
					coupon.my_receive++;
					if (coupon.limit == coupon.my_receive) {
						this.pointsMall.splice(index,1);
					}
					if (coupon.score > 0) {
						let member = this.member;
						member.score = member.score - coupon.score;
						this.SET_MEMBER(member)
					}
				}
			},
			useCoupon() {
				uni.switchTab({
					url: '/pages/menu/menu'
				})
			}
		}
	}
</script>

<style lang="scss" lang="scss">
.header {
	position: relative;
	width: 100%;
	height: 33.333vh;
	
	image {
		width: 100%;
		height: 100%;
	}
}

.sign-in-info {
	position: absolute;
	width: 100%;
	height: 33.333vh;
	display: flex;
	align-items: center;
	top: 0;
	left: 0;
	
	.left {
		color: #FFFFFF;
		margin-left: 40rpx;
		flex: 1;
		display: flex;
		
		.integral-icon {
			width: 64rpx;
			height: 64rpx;
			margin-right: 20rpx;
		}
		
		.number {
			font-size: 80rpx;
			margin-right: 10rpx;
		}
	}
	
	.right {
		background-color: #FFFFFF;
		color: $color-primary;
		font-size: $font-size-base;
		border-radius: 50rem 0 0 50rem;
		padding: 10rpx 30rpx;
	}
}

.sign-in-box {
	position: relative;
	background-color: #FFFFFF;
	margin-top: -90rpx;
	margin-bottom: 30rpx;
	width: 100%;
	border-radius: 8rpx;
	box-shadow: 0 0 20rpx rgba($color: #000000, $alpha: 0.1);
	padding: 20rpx;
	display: flex;
	flex-direction: column;
	
	.sign-in-btn {
		width: 50%;
		border-radius: 50rem !important;
	}
}

.banner {
	width: 100%;
	margin: 30rpx 0;
	border-radius: 8rpx;
	
	image {
		width: 100%;
	}
}

.point-box {
	width: 49%;
	margin-bottom: 30rpx;
	border-radius: 8rpx;
	padding: 20rpx;
}
.use-coupon-btn {
	width: 95%;
	border-radius: 50rem !important;
}
</style>
