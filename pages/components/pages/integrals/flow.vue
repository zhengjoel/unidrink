<template>
	<view class="container">
		<view class="masthead d-flex flex-column just-content-center align-items-center">
			<view class="point-num">{{ pointNum }}</view>
			<view class="font-size-sm text-color-primary">我的积分</view>
		</view>
		<view>
			<list-cell v-for="(item, index) in pointsFlow" :key="index" :hover="false" bgcolor="#F5F9FB">
				<view class="w-100 d-flex align-items-center">
					<view class="flex-fill d-flex flex-column">
						<view class="font-size-lg text-color-base mb-10">{{ item.memo }}</view>
						<view class="font-size-base text-color-assist">{{ item.createtime_text }}</view>
					</view>
					<view class="d-flex flex-column align-items-center">
						<view class="font-size-lg text-color-base font-weight-bold score-right">
							{{ item.score > 0 ? '+' : '' }}{{ item.score }}
						</view>
						<view class="font-size-sm text-color-assist">变更前:{{ item.before }},变更后:{{ item.after }}</view>
					</view>
				</view>
			</list-cell>
			<u-loadmore :status="status" icon-type="iconType" />
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
				pointNum: 0,
				pointsFlow: [],
				page:1,
				pagesize:20,
				status: 'loadmore'
			}
		},
		onLoad() {
			const member = this.$store.state.member
			this.pointNum = member.score
			
			this.getScoreLog();
		},
		onReachBottom() {
			this.getScoreLog()
		},
		methods:{
			async getScoreLog() {
				if (this.status == 'nomore') {
					return;
				}
				this.status = 'loading'
				let data = await this.$api.request('/score/log','POST',{page:this.page, pagesize:this.pagesize})
				if (data) {
					for(let i in data) {
						this.pointsFlow.push(data[i])
					}
					if (data.length > 0) {
						this.page++;
						this.status = 'loadmore'
					} else {
						this.status = 'nomore'
					}
				} else {
					this.status = 'nomore'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.masthead {
		height: 300rpx;
		position: relative;
		
		.point-num {
			font-size: 72rpx;
			color: $text-color-base;
		}
		
		&::after {
			content: '';
			position: absolute;
			border-bottom: 2rpx solid #e2e2e2;
			transform: scaleY(0.8);
			bottom: 0;
			right: 0;
			left: 0;
		}
	}
	
	/deep/.tui-list-cell:after{
		transform: scaleY(0.8);
	}
	
	.score-right {
		display: block;
		width: 100%;
		text-align: right;
	}
</style>
