<template>
	<view class="left-message">
		<view class="avator-wrapper">
			<view class="avator">
				<image class="img" :src="faceUrl"></image>
			</view>
		</view>
		<view class="bubble-wrapper">
			<div class="bubble">
				<rich-text :nodes="data"></rich-text>
			</div>
			<view class="time">{{time}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'left-message',
		props: {
			data: String,//聊天内容
			time: String,//时间
			faceUrl: String //聊天头像
		}
	}
</script>

<style lang="scss" scoped="true">
	.left-message{
		display:flex;
		padding-left: 20upx;
	}
	.avator-wrapper{
		flex: 0 0 auto;
	}
	.bubble-wrapper{
		padding-left: 30upx;
		flex: 1;
		padding-right: 135upx;
		.bubble{
			padding: 22upx;
			background: #fad9d7;
			border-radius:15upx;
			position: relative;
			&::before{
				position:absolute;
				left: -20upx;
				top: 0upx;
				content: "";
				width: 0; 
				height: 0; 
				border-top: 20px solid transparent; 
				border-right: 20px solid #fad9d7; 
				border-bottom: 20px solid transparent; 
			}
		}
	}
	.avator{
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		overflow: hiideen;
		background: #f1f1f1;
		.img{
			width:100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	.time{
		line-height: 50upx;
		color:#b7b7b7;
		font-size: 24upx;
		text-align: right;
	}
	
</style>