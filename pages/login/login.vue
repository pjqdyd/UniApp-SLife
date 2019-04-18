<template>
	<view>

		<!-- 自定义的顶部栏组件 已弃用-->
		<!-- <top-bar topTitle="登录"></top-bar> -->
		<view class="login-page">
			<!-- 登录的图标区块 -->
			<view class="icon-login-box">
				<image class="slife-icon" src="../../static/login/Slife-icon.png"></image>
				<view class="slife-text">快来登录你的生活小助手</view>
			</view>


			<!-- 登录的按钮区块 -->
			<view class="login-box">
				<view class="login-button" style="background-color: rgb(20,143,238);">
					<view class="iconfont iconsize" v-on:click="qqLogin">&#xe60f; QQ登录</view>
				</view>
				<view class="login-button" style="background-color: rgb(0,209,5);">
					<view class="iconfont iconsize" v-on:click="weixinLogin">&#xe615; 微信登录</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		onLoad() {
			console.log("进入login页面")
		},
		data() {
			return {}
		},
		components: {
			//TopBar: TopBar
		},
		methods: {
			qqLogin: function() {
				var that = this;
				console.log("QQ登录")
				uni.login({
					provider: 'qq',
					success: function(loginRes) {
						console.log(JSON.stringify(loginRes));
						let url = that.server_Url;
						let openid = loginRes.authResult.openid;
						let access_token = loginRes.authResult.access_token;
						//TODO把openid 和access_token传入后端验证用户的合法性
						uni.request({
							url: url + "/slife/user/login?openId=" + openid + "&access_token=" + access_token,
							method: "POST",
							success: (res) => {
								var result = res.data;
								console.log(JSON.stringify(result))
								if (result.code == 200) {
									//保存用户信息到缓存,result.data表示是后端返回的用户信息
									uni.setStorage({
										key: "userInfo",
										data: result.data
									});
									uni.showToast({
										title: "登录成功",
										icon: "success",
										success() {
											//跳转到主页
											setTimeout(() => {
												uni.reLaunch({
													url: '../index/index'
												});
											}, 1500)
										}
									});
								} else {
									uni.showToast({
										title: '登录失败',
										icon: "none"
									});
								}
							},
							fail: () => {
								uni.showToast({
									title: '请求登录失败',
									icon: "none"
								});
							}
						});
					}
				})
			},
			weixinLogin: function() {
				console.log("微信登录")
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {

						//由于个人开发者无法申请微信appid,此方法无效

						// 获取用户信息
						uni.showToast({
							title: '微信登录暂未开放',
							icon: "none",
							duration: 2000
						});
					},
					fail: () => {
						uni.showToast({
							title: '微信登录暂未开放',
							icon: "none",
							duration: 2000
						});
					}
				});
			}
		},
		mounted() {

		}
	}
</script>

<style lang="scss">
	@import "../../common/style/global.scss";

	.login-page {
		position: fixed;
		height: 100%;
		width: 750upx;
	}

	.icon-login-box {
		width: 100%;
		padding: 20% 0 5% 0;
		background-color: whitesmoke;
		text-align: center;
	}

	.slife-icon {
		width: 200upx;
		height: 200upx;
	}

	.slife-text {
		margin-top: 5%;
		font-size: 30upx;
		color: $appColor;
	}

	.login-box {
		width: 100%;
		height: 200upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0 15% 0 15%;
		margin-top: 40%;
	}

	.login-button {
		width: 70%;
		height: 90upx;
		text-align: center;
		border-radius: 45upx;
		color: #fff;
		line-height: 90upx;
	}

	.iconsize {
		font-size: 35upx;
	}
</style>
