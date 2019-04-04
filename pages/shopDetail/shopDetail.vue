<template>
	<view>
		店铺详情
	</view>
</template>

<script>
	export default{
		data(){
			return{
				shopId: ''
			}
		},
		//res为上个页面传入的参数
		onLoad(res) {
			console.log(res.shopId)
			this.shopId = res.shopId
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
</style>
