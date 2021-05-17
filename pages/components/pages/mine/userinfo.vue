<template>
	<view class="container d-flex flex-column">
		<view class="flex-fill form">
			<list-cell :hover="false">
				<view class="form-input w-100 d-flex align-items-center">
					<view class="label">头像</view>
					<view class="input flex-fill">
						<view class="form-input w-100 d-flex align-items-center"  style="position: relative;">
							<view class="u-flex user-box">
								<view class="u-m-r-10">
									<u-avatar :src="member.avatar" size="140"></u-avatar>
								</view>
								<view class="u-flex-1" style="position: absolute;right:0;">
									<u-button size='mini' ripple="true" @click="getUserInfo" type="success">点击更新头像</u-button>
								</view>
							</view>
						</view>
					</view>
				</view>
				
			</list-cell>
			<list-cell :hover="false">
				<view class="form-input w-100 d-flex align-items-center">
					<view class="label">昵称</view>
					<view class="input flex-fill">
						<input type="text" placeholder="请填写昵称" placeholder-class="text-color-assist font-size-base" 
						v-model="member.username">
					</view>
				</view>
			</list-cell>
			<list-cell :hover="false">
				<view class="form-input w-100 d-flex align-items-center" style="position: relative;">
					<view class="label">手机号码</view>
					<view class="input flex-fill">
						<input type="text" v-model="member.mobile" disabled>
						<view style="position: absolute;top: -6rpx;z-index: 100;right: 0;">
							<u-button size='mini' ripple="true" @getphonenumber="getPhoneNumber" open-type="getPhoneNumber" type="success">获取手机号</u-button>
						</view>
					</view>
				</view>
			</list-cell>
			<list-cell :hover="false">
				<view class="form-input w-100 d-flex align-items-center">
					<view class="label">性别</view>
					<view class="input flex-fill">
						<view class="radio-group">
							<view class="radio" :class="{'checked': member.gender == '0'}" style="margin-right: 10rpx;" @tap="member.gender=0">先生</view>
							<view class="radio" :class="{'checked': member.gender == '1'}" @tap="member.gender=1">女士</view>
						</view>
					</view>
				</view>
			</list-cell>
			<list-cell :hover="false" :arrow="!member.birthday">
				<view class="form-input w-100 d-flex align-items-center">
					<view class="label">生日</view>
					<view class="input flex-fill">
						<picker mode="date" :value="member.birthday" :start="startDate" :end="endDate" @change="handleDateChange">
							{{member.birthday ? member.birthday : '无'}}
						</picker>
					</view>
				</view>
			</list-cell>
			<list-cell :hover="false" last>
				<view class="form-input w-100 d-flex align-items-center">
					<view class="label">入会时间</view>
					<view class="input flex-fill">
						<input type="text" v-model="member.jointime" disabled>
					</view>
				</view>
			</list-cell>
		</view>
		<view class="btn-box d-flex align-items-center just-content-center">
			<button type="primary" class="save-btn" @tap="save">保存</button>
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
			const currentDate = this.getDate({format: true})
			return {
				member: {},
				date: currentDate
			}
		},
		computed: {
		   startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad() {
			this.member = this.$store.state.member;
			console.log(this.member);
		},
		methods: {
			getUserInfo() {
				let that = this;
				uni.getUserProfile({
					desc:"获取微信头像",
					async success(res) {
						console.log(res)
						let data = await that.$api.request('/user/decryptData', 'POST',{
							encryptedData: res.encryptedData,
							iv: res.iv
						});
						if (data) {
							that.member.avatar = data.avatarUrl;
						}
					}
				});
			},
			async getPhoneNumber(e) {
				if (e.hasOwnProperty('detail')) {
					let data = await this.$api.request('/user/decryptData', 'POST',{
						encryptedData: e.detail.encryptedData,
						iv: e.detail.iv
					});
					if (data) {
						this.member.mobile = data.phoneNumber;
					}
				}
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			handleDateChange(e) {
				this.member.birthday = e.target.value
			},
			async save() {
				let data = await this.$api.request('/user/edit', 'POST', {
					username: this.member.username,
					mobile: this.member.mobile,
					gender: this.member.gender,
					birthday: this.member.birthday,
					avatar: this.member.avatar
				});
				if (data) {
					const member = Object.assign(this.$store.state.member, this.member)
					this.$store.commit('SET_MEMBER', member)
					uni.navigateBack()
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
page {
	height: 100%;
}

.container {
	padding: 20rpx 30rpx;
}

.form {
	border-radius: 8rpx;
}

.form-input {
	.label {
		width: 160rpx;
		font-size: $font-size-base;
		color: $text-color-base;
	}
	
	.input {
	}
	
	.radio-group {
		display: flex;
		justify-content: flex-start;
		
		.radio {
			padding: 10rpx 30rpx;
			border-radius: 6rpx;
			border: 2rpx solid $text-color-assist;
			color: $text-color-assist;
			font-size: $font-size-base;
			
			&.checked {
				background-color: $color-primary;
				color: $text-color-white;
				border: 2rpx solid $color-primary;
			}
		}
	}
}

.btn-box {
	height: calc((100vh - 40rpx) / 2);
}

.save-btn {
	width: 90%;
	border-radius: 50rem !important;
	font-size: $font-size-lg;
}
</style>
