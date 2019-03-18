<template>
	<view>
		<view class="list-item" v-for="(item, index) in [1,2,3,4,5,6,7,8]" :key="index">
			附近页面-{{item}}
		</view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.list-item{
		width: 100%;
		height: 200upx;
		background-color: #ccc;
		margin-top: 2px;
	}
</style>

