<template>
	<view>

		<!-- 自定义的顶部栏组件 已弃用-->
		<!-- <top-bar topTitle="登录"></top-bar> -->

		<view class="login-page">
			<!-- 登录的图标区块 -->
			<view class="icon-box">
				<image class="slife-icon" src="../../static/login/Slife-icon.png"></image>
				<view class="slife-text">快来登录你的生活小助手</view>
				<view></view>
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
	//导入使用顶部栏组件
	//import TopBar from '../../components/topBar/topBar.vue'

	export default {
		onLoad() {
			console.log("进入login页面")
			this.getSystemInfo();
		},
		data() {
			return {
				//screenWidth: "750"
			}
		},
		components: {
			//TopBar: TopBar
		},
		methods: {
			qqLogin: function() {
				console.log("QQ登录")
				uni.login({
					provider: 'qq',
					success: function(loginRes) {
						console.log(JSON.stringify(loginRes.authResult));
						// 获取用户信息
						uni.getUserInfo({
							provider: 'qq',
							success: function(infoRes) {
								console.log('用户昵称为：' + infoRes.userInfo.nickName);

								//TODO 保存用户信息	
								uni.reLaunch({
									url: '../local/local'
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
						console.log(JSON.stringify(loginRes.authResult));
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								console.log('用户昵称为：' + infoRes.userInfo.nickName);

								//TODO 保存用户信息								
								uni.reLaunch({
									url: '../local/local'
								});
							}
						});
					}
				});
			},
			getSystemInfo: function() {
				var that = this;
				//获取缓存中设备的基本信息
				uni.getStorage({
					key: "SystemInfo",
					success(res) {
						console.log(res)
						console.log(res.data)
						//设置页面的宽度
						//that.$data.screenWidth = res.data.screenWidth,
					}
				})
			},
		},
		mounted() {

		}
	}
</script>

<style lang="scss">
	@import "../../common/style/global.scss";

	.login-page {
		position: fixed;
		width: 750upx;
	}

	.icon-box {
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
