<template>
	<view class="container">
		<navbar-back-button></navbar-back-button>
		<view class="header">
			<image src="/static/images/attendance/bg.png" mode="scaleToFill"></image>
			<view class="user-box">
				<view class="avatar">
					<image :src="member.avatar"></image>
				</view>
				<view class="nickname">
					{{ member.username }}
				</view>
				<!-- <view class="rule">
					签到规则
				</view> -->
			</view>
		</view>
		<view style="padding: 0 30rpx;">
			<view class="integral-box">
				<view class="title">当前积分</view>
				<view class="value">{{ member.score }}</view>
				<button type="primary" class="btn" @tap="signin">{{scoreInfo.signin == 1 ? '今日已签到' : '签到'}}</button>
			</view>
			<!-- 为了方便演示，这里设置了startDate和enddate属性 -->
			<uni-calendar :show-month="true" startDate="2020-05-01" endDate="2020-07-31" 
						  :selected="attendanceList"
						  :continuous="scoreInfo.successions"
						  @monthSwitch="monthSwitch"
						  >
			</uni-calendar>
		</view>
		
		<modal custom :show="attendanceModalVisible">
			<view class="attendance-modal">
				<view class="modal-header">
					<image src="/static/images/attendance/cup.png" mode="aspectFill"></image>
				</view>
				<view class="modal-content d-flex align-items-center just-content-center flex-column font-size-sm text-color-base">
					<view>{{atendanceMsg}}</view>
				</view>
				<view class="d-flex align-items-center just-content-center">
					<button type="primary" class="btn" @tap="attendanceModalVisible=false">我知道了</button>
				</view>
			</view>
		</modal>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import navbarBackButton from '@/components/navbar-back-button'
	import uniCalendar from '@/pages/components/pages/attendance/uni-calendar/uni-calendar'
	import modal from '@/components/modal/modal'
	
	export default {
		components: {
			navbarBackButton,
			uniCalendar,
			modal
		},
		data() {
			return {
				
				attendanceModalVisible: false,
				attendanceList: [],
				
				atendanceMsg: '签到成功',
				activeDay:0, // 当前连续到那一天 
				stepsOption: [],
				scoreInfo:{},
				date: '', // 当前时间
			}
		},
		async onLoad() {
			
			let timestamp = new Date().getTime();
			this.date = this.$u.timeFormat(timestamp, 'yyyy-mm-dd');
			this.getScore(this.date);

		},
		computed: {
			...mapState(['member'])
		}, 
		methods: {
			async getScore(date) {
				let data = await this.$api.request('/score/index', 'POST', {date:date});
				if (data) {
					this.scoreInfo = data;
					if (data.successions > 7) {
						this.activeDay = 7;
					}
					this.stepsOption = data.signinscore;
					this.attendanceList = data.list;
				}
			},
			async signin() {
				let data = await this.$api.request('/score/dosign', 'POST');
				if (data) {
					this.atendanceMsg = data.msg;
					this.attendanceList.push({date: data.date})
					this.attendanceModalVisible = true
					this.scoreInfo.successions++;
					this.scoreInfo.signin = 1; // 今日已签到
					this.member.score = parseInt(this.member.score) + parseInt(this.scoreInfo.score);
				}
			},
			monthSwitch(e) {
				let date = e.year + '-' + e.month + '-01';
				this.getScore(date);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		height: 33.333vh;
		position: relative;
		
		image {
			width: 100%;
			height: 100%;
		}
		
		.user-box {
			position: absolute;
			width: 100%;
			top: var(--status-bar-height);
			bottom: 0;
			left: 0;
			display: flex;
			align-items: center;
			color: #FFFFFF;
			
			.avatar {
				margin-left: 30rpx;
				background-color: #FFFFFF;
				padding: 6rpx;
				border-radius: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 20rpx;
				
				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 100%;
				}
			}
			
			.nickname {
				font-size: $font-size-lg;
				flex: 1;
			}
			
			.rule {
				font-size: $font-size-sm;
				border-radius: 50rem 0 0 50rem;
				background-color: rgba($color: #ffffff, $alpha: 0.3);
				padding: 10rpx 30rpx;
			}
		}
	}
	
	.integral-box {
		position: relative;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: -70rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 0 20rpx rgba($color: #000000, $alpha: 0.1);
		
		.title {
			font-size: $font-size-sm;
			color: $text-color-base;
			margin: 20rpx 0 30rpx;
		}
		
		.value {
			font-size: 46rpx;
			font-weight: bold;
			margin-bottom: 30rpx;
		}
		
		.btn {
			font-size: $font-size-lg;
			color: #FFFFFF;
			border-radius: 50rem !important;
			width: 70%;
		}
	}
	
	/deep/.uni-calendar {
		margin-bottom: 30rpx;
		border-radius: 8rpx;
		box-shadow: 0 0 20rpx rgba($color: #000000, $alpha: 0.1);
	}
	
	.attendance-modal {
		.modal-header {
			width: 100%;
			margin-top: -180rpx;
			position: relative;
			
			image {
				width: 100%;
			}
		}
		
		.modal-content {
			height: 200rpx;
		}
		
		.btn {
			width: 100%;
			border-radius: 50rem;
			font-size: $font-size-lg;
		}
	}
</style>
