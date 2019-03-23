<template>
	<view>
		<view class="user-info" :style="{backgroundImage:'url(' + userInfo.backImage + ')'}">
			<!-- 头像 -->
			<view class="face-box">
				<image class="face-image" :src="userInfo.faceImage"></image>
				<view class="upload-back" @click="uploadBackImage">上传背景</view>
			</view>
			<!-- 昵称 -->
			<view class="nickname-box">
				<view class="nickname">{{userInfo.nickname}}</view>
			</view>
			<!--身份,性别 -->
			<view class="idStatus-sex">
				<!-- 身份 -->
				<text class="id-status">-{{isIdStatus}}-</text>
				<!-- 性别 -->
				<text class="iconfont sex" v-if="isBoy == 1">&#xe661;</text>
				<text class="iconfont sex" v-if="isBoy == 2">&#xe616;</text>
			</view>
			<!-- 发起聊天/访问店铺 -->
			<view class="chat-shop-box">
				<view class="iconfont chat-shop">&#xe689; 发起聊天</view>
				<view v-if="isIdStatus == '店主'" class="iconfont chat-shop" 
				style="border-left: 2upx solid #C7C6CD;">&#xe617; 访问店铺</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			userInfo: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {};
		},
		created() {},
		methods: {
			uploadBackImage() {
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
		background-color: rgba($color: #000000, $alpha: 0.4);
	}

	.face-box {
		width: 100%;
		height: 266upx;
		padding: 85upx 0 5upx 0;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		//background-color: #ccc;
		position: relative;
	}

	.face-image {
		width: 180upx;
		height: 180upx;
		border: 4upx solid #eeeeee;
		border-radius: 50%;
	}

	.upload-back {
		width: 110upx;
		height: 40upx;
		line-height: 40upx;
		font-size: 26upx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.3);
		border: 2upx solid #fff;
		border-radius: 10upx;
		position: absolute;
		top: 10upx;
		right: 20upx;
	}
	.upload-back:active{
		color: #eeeeee;
		border-color: #707070;
	}

	.nickname-box {
		width: 100%;
		height: 60upx;
		//background-color: yellow;
		display: flex;
		justify-content: center;
	}

	.nickname {
		height: 60upx;
		line-height: 60upx;
		font-size: 40upx;
		color: #ea5455;
	}

	.idStatus-sex {
		width: 100%;
		height: 50upx;
		//background-color: #ccc;
		display: flex;
		justify-content: center;
	}

	,
	.id-status {
		height: 50upx;
		font-size: 35upx;
		line-height: 50upx;
		color: #eeeeee;
	}

	.sex{
		height: 50upx;
		font-size: 35upx;
		line-height: 50upx;
		color: #eeeeee;
		margin-left: 10upx;
	}
	.chat-shop-box{
		width: 100%;
		height: 60upx;
		display: flex;
		justify-content: center;
		//background-color: green;
	}
	.chat-shop{
		width: 40%;
		height: 60upx;
		line-height: 60upx;
		color: #fff;
		text-align: center;
	}
	.chat-shop:active{
		color: #707070;
	}
</style>
