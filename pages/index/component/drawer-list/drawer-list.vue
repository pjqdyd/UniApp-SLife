<template>
	<view class="drawer-box">

		<!-- 用户头像昵称盒子 -->
		<view class="user-box" @click.stop="goUserInfo">
			<image class="face-dr" src="https://upload-images.jianshu.io/upload_images/14511997-f98df143a7bb5a83.png"></image>
			<view class="nickname-text">刺猬的拥抱</view>
		</view>

		<!-- 选项 -->
		<view class="list-content">
			<view class="list">
				<view class="li" v-for="(item, index) in option" :key="index" @click.stop="clickOption(index)">
					<image class="icon-li" :src="item.icon"></image>
					<view class="text">{{item.name}}</view>
					<text class="iconfont size-li">&#xe6ee;</text>
				</view>
			</view>
			<view class="list">
				<view class="li noborder" @click.stop="loginOut">
					<image class="icon-li" src="../../static/user/option/out.png"></image>
					<view class="text">退出登录</view>
					<text class="iconfont size-li">&#xe6ee;</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			userInfo: Object //接收用户信息展示头像和昵称
		},
		data() {
			return {
				option: [{
					icon: "../../static/user/option/change.png",
					name: "修改个人信息",
				}, {
					icon: "../../static/user/option/apply.png",
					name: "申请店铺",
				}, {
					icon: "../../static/user/option/share.png",
					name: "分享应用",
				}, {
					icon: "../../static/user/option/help.png",
					name: "帮助说明",
				}, {
					icon: "../../static/user/option/issue.png",
					name: "意见反馈",
				}, {
					icon: "../../static/user/option/about.png",
					name: "关于我们",
				}]
			}
		},
		methods: {
			//点击了头像/昵称
			goUserInfo() {
				uni.switchTab({
					url: "/pages/me/me"
				})
			},
			//点击了选项
			clickOption(index) {
				switch (index) {
					case 0: //修改用户信息
						//TODO判断用户是否登录,未登录就跳转到登录页
						uni.navigateTo({
							url: "/pages/changeUserInfo/changeUserInfo"
						})
						break;
					case 1: //申请店铺
						//TODO判断用户是否登录,未登录就跳转到登录页
						uni.navigateTo({
							url: "/pages/applyShop/applyShop"
						});
						break;
					case 2: //分享应用
						uni.share({
							provider: "weixin",
							scene: "WXSenceTimeline",
							type: 0,
							href: "https://my-url/.com", //TODO
							title: "生活街APP",
							summary: "我正在使用生活街APP，赶紧跟我一起来体验吧！",
							imageUrl: "../../static/launch/Slife-icon.png",
							success: function(res) {
								console.log("success:" + JSON.stringify(res));
							},
							fail: function(err) {
								console.log("fail:" + JSON.stringify(err));
							}
						});
						break;
					default:
						break;
				}
			},
			//点击了退出登录
			loginOut() {
				console.log("退出登录")
				uni.showModal({
					title: '退出登录',
					content: '您是否要退出',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							//TODO清除用户信息,跳转到登录页
							uni.reLaunch({
								url: '../login/login'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.drawer-box {
		width: 420upx;
		height: 1100upx;

		.user-box {
			width: 420upx;
			height: 108upx;
			padding: 10upx;
			box-sizing: border-box;
			display: flex;

			.face-dr {
				width: 80upx;
				height: 80upx;
				border-radius: 100%;
				border: 4upx solid #ccc;
			}

			.nickname-text {
				width: 310upx;
				height: 80upx;
				line-height: 80upx;
				font-size: 35upx;
				margin-left: 20upx;
			}
		}

		.list-content {
			background: #fff;
		}

		.list {
			width: 80%;
			border-bottom: 15upx solid #f1f1f1;
			border-top: 15upx solid #f1f1f1;
			background: #fff;

			&:last-child {
				border: none;
			}

			.li {
				width: 92%;
				height: 100upx;
				padding: 0 4%;
				border-bottom: 1px solid rgb(243, 243, 243);
				display: flex;
				align-items: center;
				color: #707070;

				&.noborder {
					border-bottom: 0;
				}

				.icon-li {
					flex-shrink: 0;
					width: 50upx;
					height: 50upx;

					image {
						width: 50upx;
						height: 50upx;
					}
				}

				.text {
					padding-left: 10upx;
					width: 80%;
					color: #666;
					text-align: left;
					font-size: 30upx;
				}

				.size-li {
					font-size: 30upx;
				}
			}

			.li:active {
				background-color: #eeeeee;
			}
		}
	}
</style>
