<template>
	<view>
		<list-cell arrow=true class="list" v-for="(item,index) in services" :key='index' @tap="serv(item)">
			<view>{{item.name}}</view>
		</list-cell>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell/list-cell'
	export default {
		components:{
			listCell
		},
		data(){
			return {
				services: []
			}
		},
		onLoad(option) {
			if (option.name) {
				uni.setNavigationBarTitle({
					title:option.name
				});
			}
			if (option.id) {
				this.getService(option.id);
			}
		},
		methods:{
			async getService(id) {
				let data = await this.$api.request('/mine/service?pid='+id);
				if (data) {
					this.services = data;
				}
			},
			serv(item) {
				switch(item.type) {
					case 'pages':
						if(!this.isLogin) {
							this.login()
							return
						}
						uni.navigateTo({
							url: item.pages
						})
						break;
					case 'miniprogram':
						uni.navigateToMiniProgram({
							appId: item.app_id
						})
						break;
					case 'menu':
						uni.navigateTo({
							url:'/pages/mine/service?id='+item.id+'&name='+item.name
						})
						break;
					case 'content':
						uni.navigateTo({
							url:'/pages/mine/content?id='+item.id+'&name='+item.name
						})
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
