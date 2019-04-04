<template>
	<view>

		<!-- 用户信息卡 -->
		<user-crad :userInfo="userInfo"></user-crad>

		<!-- 用户的数据 -->
		<view class="user-data-bar">
			<view class="data-bar">粉丝:<text class="data-bar-num">{{userInfo == null ? 0 :userInfo.fans}}</text></view>
			<view class="data-bar">发布:<text class="data-bar-num">{{userInfo == null ? 0 :userInfo.createCounts}}</text></view>
			<view class="data-bar">获赞:<text class="data-bar-num">{{userInfo == null ? 0 :userInfo.likeCounts}}</text></view>
		</view>

		<!-- 选项 -->
		<view class="list-content">
			<view class="list">
				<view class="li noborder">
					<image class="icon" src="../../static/user/option/news.png"></image>
					<view class="text">发布的动态</view>
					<text class="iconfont">&#xe6ee;</text>
				</view>
			</view>
			<view class="list">
				<view class="li" v-for="(item, index) in option" :key="index">
					<image class="icon" :src="item.icon"></image>
					<view class="text">{{item.name}}</view>
					<text class="iconfont">&#xe6ee;</text>
				</view>
			</view>
			<view class="list">
				<view class="li noborder">
					<image class="icon" src="../../static/user/option/out.png"></image>
					<view class="text">退出登录</view>
					<text class="iconfont">&#xe6ee;</text>
				</view>
			</view>
		</view>


	</view>
</template>
<script>
	
	import conf from '../../common/config.js'; //全局的一些配置信息
	import utils from '../../common/utils.js'; //一些工具方法
	
	import userCrad from "./component/user-info/user-crad.vue"; //用户信息卡

	export default {
		components: {
			userCrad
		},
		data() {
			return {
				userInfo: {},
				option: [{
					icon: "../../static/user/option/like.png",
					name: "点赞的动态",
				},{
					icon: "../../static/user/option/apply.png",
					name: "发布的动态",
				},{
					icon: "../../static/user/option/about.png",
					name: "关于我们",
				},{
					icon: "../../static/user/option/issue.png",
					name: "意见反馈",
				}]
			}
		},
		onLoad() {},
		created() {
			
			var url = conf.serverUrl;
			console.log(url + "/userinfo")
			//请求服务端数据
			uni.request({
				url: url + '/userinfo',
				success: (res) => {
					console.log("请求userinfo数据成功成功..")
					//console.log(res.data.userInfo)
					this.userInfo = res.data.userInfo
				}
			});
			
		},
		methods: {},
		//监听导航栏的"<"的点击事件
		onNavigationBarButtonTap(e) {
			uni.switchTab({
				url: '/pages/news/news'
			});
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f1f1;
		font-size: 30upx;
	}
	
	.li:active{
		background-color: #eeeeee;
	}

	.user-data-bar {
		width: 100%;
		height: 70upx;
		background-color: whitesmoke;
		border: 1upx solid #eeeeee;
		display: flex;
		padding: 0 80upx 0 80upx;
		box-sizing: border-box;
		justify-content: space-between;

		.data-bar {
			line-height: 70upx;
			font-size: 28upx;
			color: #707070;

			.data-bar-num {
				color: #E96D71;
				font-size: 26upx;
				margin-left: 10upx;
			}
		}
	}

	.list-content {
		background: #fff;
	}

	.list {
		width: 100%;
		border-bottom: 15upx solid #f1f1f1;
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

			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;

				image {
					width: 50upx;
					height: 50upx;
				}
			}

			.text {
				padding-left: 20upx;
				width: 100%;
				color: #666;
			}
		}
	}
</style>
