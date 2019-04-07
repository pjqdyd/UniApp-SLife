<template>
	<view class="send-message">
		<view class="input-wrapper"><input type="text" cursor-spacing ="0" adjust-position="true"></view>
		<view class="iconfont send">&#xe634; 发送</view>
	</view>
</template>

<script>
	export default {
		name: 'send-message',
		props: {
			data: String,//聊天内容
			time: String,//提取名称的一个字
		}
	}
</script>

<style lang="scss" scoped="true">
	.send-message{
		box-sizing: border-box;
		padding: 0 15upx;
		height: 100upx;
		width: 100%;
		background:#ea5455;
		line-height: 100upx;
		display: flex;
		flex-wrap: nowrap;
		.input-wrapper{
			flex:1;
			padding: 15upx;
			input{
				box-sizing: border-box;
				padding: 0 15upx;
				width: 100%;
				height: 100%;
				border-radius: 10upx;
				background: #fff;
			}
		}
		.send{
			color: #fff;
		}
	}
</style>