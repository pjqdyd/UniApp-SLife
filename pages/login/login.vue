<template>
	<view>
		<!-- 使用自定义的顶部栏组件 -->
		<top-bar topTitle="登录"></top-bar>
		
		<!-- 登录的图标区块 -->
		<view class="icon-box">
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
</template>

<script>
	//导入使用顶部栏组件
	import TopBar from '../../components/topBar/topBar.vue'
	
	export default {
		data() {
			return {
			};
		},
		components:{
			TopBar: TopBar
		},
		methods:{
			qqLogin: function(){
				console.log("QQ登录")
			},
			weixinLogin: function(){
				console.log("微信登录")
			}
		}
	}
</script>

<style lang="scss">
	@import "../../common/style/global.scss";

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
	
	.iconsize{
		font-size: 35upx;
	}
</style>
