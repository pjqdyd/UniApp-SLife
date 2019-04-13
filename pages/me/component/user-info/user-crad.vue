<template>
	<view>
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd">
						<view class="avator">
							<img :src="isFaceImage">
						</view>
						<view class="user-nickname">{{userInfo.nickname == null ? "未登录": userInfo.nickname}}</view>
						<view class="id-status-sex-box">-{{isIdStatus}}-<text class="iconfont" v-html="isBoy"></text></view>
					</view>

					<view class="box-bd">
						<view class="item" @click="goChat">
							<image class="icon-me" src="../../static/user/chat.png"></image>
							<view class="text">{{isMe ? "进入聊天" : "发起聊天"}}</view>
						</view>
						<view class="item" @click="clickFollow">
							<image class="icon-me" src="../../static/user/follow.png"></image>
							<view class="text">{{isMe ? "我的关注" : (userInfo.isFollow ? "取消关注" : "关注" + isIdStatus)}}</view>
						</view>
						<view class="item" @click="clickShopInfo" v-if="userInfo.idStatus == 1">
							<image class="icon-me" src="../../static/user/shop.png"></image>
							<view class="text">访问店铺</view>
						</view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			userInfo: Object,
			isMe: Boolean //是否是自己的个人信息
		},
		mounted() {
		},
		methods: {
			//点击了进入聊天(自己), 发起聊天(其他用户)
			goChat() {
				if (this.isMe) { //进入聊天
					uni.switchTab({
						url: '/pages/chat/chat'
					});
				}else{ //发起聊天
					let user = this.userInfo;
					console.log('创建聊天界面' + user.userId)
					uni.navigateTo({
						url: "/pages/chatScreen/chatScreen?id=" + user.userId + "&faceUrl=" + user.faceImage + "&name=" + user.nickname
					})
				}
			},

			//点击了访问店铺
			clickShopInfo() {
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetail?shoperId=' + this.userInfo.userId
				});
			},
			//在me页点击了我的关注 或在userInfo页点击了关注,取消关注用户
			clickFollow() {
				if(this.isMe){//如果是自己,就跳转到互动页展开我的关注
					uni.switchTab({
						url: "/pages/chat/chat"
					})
				}else{ //否则是好友, 就关注/取消关注
					this.userInfo.isFollow = !this.userInfo.isFollow;
					
					//TODO请求后端,跟上userId, firentId,建立关注关系或取消关注
				}
				
			}
		},
		computed: {
			isIdStatus() {
				if (this.userInfo == null || this.userInfo == undefined) {
					return
				}
				let idStatus = this.userInfo.idStatus;
				if (idStatus == 1) {
					return "店主"
				} else if (idStatus == 0) {
					return "顾客"
				} else {
					return ''
				}
			},
			isBoy() {
				if (this.userInfo == null || this.userInfo == undefined) {
					return
				}
				let sex = this.userInfo.sex;
				if (sex == 1) {
					return "&#xe661;" //男
				} else if (sex == 2) {
					return "&#xe616;" //女
				} else {
					return ''
				}
			},
			isFaceImage() {
				let user = this.userInfo;
				if (user == null || user.faceImage == undefined || user.faceImage == '') {
					return "../../../../static/user/noface.png"
				} else {
					return user.faceImage
				}

			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f1f1;
		font-size: 30upx;
	}

	.item:active {
		background-color: #eeeeee;
	}

	.header {
		background: #fff;
		height: 310upx;
		padding-bottom: 110upx;

		.bg {
			width: 100%;
			height: 200upx;
			padding-top: 100upx;
			background-color: #ea5455;
		}
	}

	.box {
		width: 650upx;
		height: 300upx;
		border-radius: 20upx;
		margin: 0 auto;
		background: #fff;
		box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2);

		.box-hd {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;

			.avator {
				width: 160upx;
				height: 160upx;
				background: #fff;
				border: 5upx solid #fff;
				border-radius: 50%;
				margin-top: -80upx;
				overflow: hidden;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.user-nickname {
				width: 100%;
				text-align: center;
				font-size: 34upx;
			}

			.id-status-sex-box {
				width: 100%;
				text-align: center;
				font-size: 28upx;
				color: #707070;
				display: flex;
				justify-content: center;
			}
		}

		.box-bd {
			display: flex;
			flex-wrap: nowrap;
			flex-direction: row;
			justify-content: center;

			.item {
				flex: 1 1 auto;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: center;
				border-right: 1upx solid #f1f1f1;
				margin: 15upx 0;

				&:last-child {
					border: none;
				}

				.icon-me {
					width: 50upx;
					height: 50upx;
				}

				.text {
					width: 100%;
					text-align: center;
					margin-top: 10upx;
				}
			}
		}
	}
</style>
