<template>
	<view>
		<view class="user-info" :style="{backgroundImage:'url(' + userInfo.backImage + ')'}">
			<!-- 头像 -->
			<view class="face-box">
				<image class="face-image" src="https://upload-images.jianshu.io/upload_images/14511997-f98df143a7bb5a83.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"></image>
				<view class="upload-back" @click="uploadBackImage">上传背景</view>
			</view>
			<!-- 昵称 -->
			<view class="nickname-box">
				<view class="nickname">{{userInfo.nickname}}</view>
			</view>
			<!--身份,性别 -->
			<view class="idStatus-sex">		
				<!-- 身份 -->
				<text class="id-status">{{isIdStatus}}-</text>
				<!-- 性别 -->
				<text class="iconfont sex" v-if="isBoy == 1">&#xe661;</text>
				<text class="iconfont sex" v-if="isBoy == 2">&#xe616;</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	
	export default {
		props:{
			userInfo: {
				type: Object,
				default: function(){
					return {}
				}
			}
		},
		data() {
			return {
			};
		},
		created() {
		},
		methods: {
			uploadBackImage(){
				console.log("上传背景图片")
			}
		},
		computed: {
			isBoy() {
				return this.userInfo.sex;
			},
			isIdStatus() {
				let idStatus = this.userInfo.idStatus;
				if (idStatus == 1) {
					return "顾客"
				} else if (idStatus == 0) {
					return "店主"
				} else {
					return ''
				}
			}
		}
	}
</script>

<style lang="scss">
	.user-info {
		width: 100%;
		height: 450upx;
		background-color: whitesmoke;
	}
	
	.face-box{
		width: 100%;
		height: 196upx;
		padding: 4upx 0;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		background-color: #ccc;
		position: relative;
	}

	.face-image {
		width: 180upx;
		height: 180upx;
		border: 4upx solid #eeeeee;
		border-radius: 50%;
	}
	
	.upload-back{
		width: 110upx;
		height: 40upx;
		line-height: 40upx;
		font-size: 26upx;
		color: #fff;
		background-color: rgba(0,0,0,0.3);
		border: 2upx solid #fff;
		border-radius: 10upx;
		position: absolute;
		top: 10upx;
		right: 20upx;		
	}
	.nickname-box{
		width: 100%;
		height: 60upx;
		background-color: yellow;
		display: flex;
		justify-content: center;
	}
	.nickname{
		height: 60upx;
		line-height: 60upx;
		font-size: 40upx;
		color: #ea5455;
	}
	.idStatus-sex{
		width: 100%;
		height: 50upx;
		background-color: #ccc;
		display: flex;
		justify-content: center;
	},
	.id-status{
		height: 50upx;
		font-size: 35upx;
		line-height: 50upx;
		color: #fff;
	}
	.sex{
		height: 50upx;
		font-size: 35upx;
		line-height: 50upx;
		color: #fff;
	}
</style>
