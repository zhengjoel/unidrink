<template>
	<view>
		<block v-for="(item,index) in services" :key='index'>
			<list-cell v-if="item.pages == '/pages/components/pages/login/logout'" v-show="isLogin" arrow=true class="list" @tap="serv(item)">
				<view>{{item.name}}</view>
			</list-cell>
			<list-cell v-else arrow=true class="list" @tap="serv(item)">
				<view>{{item.name}}</view>
			</list-cell>
		</block>
		
	</view>
</template>

<script>
	import listCell from '@/components/list-cell/list-cell'
	import {mapGetters} from 'vuex'
	
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
		computed:{
			...mapGetters(['isLogin'])
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
							url:'/pages/components/pages/mine/service?id='+item.id+'&name='+item.name
						})
						break;
					case 'content':
						uni.navigateTo({
							url:'/pages/components/pages/mine/content?id='+item.id+'&name='+item.name
						})
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
