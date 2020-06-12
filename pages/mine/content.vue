<template>
	<view>
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				content: ''
			}
		},
		onLoad(option) {
			if (option.name) {
				uni.setNavigationBarTitle({
					title:option.name
				});
			}
			if (option.id) {
				this.getContent(option.id);
			}
		},
		methods:{
			async getContent(id) {
				let data = await this.$api.request('/mine/serviceContent?id='+id);
				if (data) {
					this.content = data.content;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
