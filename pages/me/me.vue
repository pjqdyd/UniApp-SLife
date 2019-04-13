<template>
	<view class="text-font">
		<!-- 用户信息卡 -->
		<user-crad :userInfo="userInfo" :isMe="true"></user-crad>

		<!-- 用户的数据 -->
		<view class="user-data-bar">
			<view class="data-bar">粉丝:<text class="data-bar-num">{{userId == '' ? 0 :userInfo.fans}}</text></view>
			<view class="data-bar">发布:<text class="data-bar-num">{{userId == '' ? 0 :userInfo.createCounts}}</text></view>
			<view class="data-bar">获赞:<text class="data-bar-num">{{userId == '' ? 0 :userInfo.likeCounts}}</text></view>
		</view>

		<!-- 选项 -->
		<view class="list-content">
			<view class="list">
				<view class="li noborder" @click="goNewsList(0)">
					<image class="icon" src="../../static/user/option/news.png"></image>
					<view class="text">发布的动态</view>
					<text class="iconfont">&#xe6ee;</text>
				</view>
			</view>
			<view class="list">
				<view class="li" v-for="(item, index) in option" :key="index" @click="clickOption(index)">
					<image class="icon" :src="item.icon"></image>
					<view class="text">{{item.name}}</view>
					<text class="iconfont">&#xe6ee;</text>
				</view>
			</view>
			<view class="list">
				<view class="li noborder" @click="loginOut">
					<image class="icon" src="../../static/user/option/out.png"></image>
					<view class="text">退出登录</view>
					<text class="iconfont">&#xe6ee;</text>
				</view>
			</view>
		</view>


	</view>
</template>
<script>
	import userCrad from "./component/user-info/user-crad.vue"; //用户信息卡

	export default {
		components: {
			userCrad
		},
		data() {
			return {
				userInfo: {},
				userId: '',
				option: [{
					icon: "../../static/user/option/like.png",
					name: "点赞的动态",
				}, {
					icon: "../../static/user/option/apply.png",
					name: "申请店铺",
				}, {
					icon: "../../static/user/option/issue.png",
					name: "意见反馈",
				}, {
					icon: "../../static/user/option/about.png",
					name: "关于我们",
				}]
			}
		},
		onLoad(params) {
			//从缓存中读取用户信息TODO
			//缓存中存在,已登录
			//this.userInfo = {}//设置缓存的用户信息
			this.userId = "0001";
			//不存在就提示用户登录,跳转到登录界面TODO
			this.getUserInfo("0001");  //这里测试,就手动请求一次数据
		},
		onShow() {
		},
		created() {},
		methods: {	
			//根据userId请求用户数据的方法
			getUserInfo(userId) {
				var url = this.server_Url; //读取在main.js中挂载的vue全局属性
				console.log(url + "/userinfo")
				//请求服务端数据
				uni.request({
					url: url + '/userinfo?userId=' + userId,
					success: (res) => {
						console.log("请求/userinfo?userId=" + userId + "数据成功成功..")
						//console.log(res.data.userInfo)
						this.userInfo = res.data.userInfo;
					}
				});
			},
			//跳转到动态, type标识是发布的动态还是点赞的动态
			goNewsList(type){
				uni.navigateTo({
					url: "/pages/newsList/newsList?userId=" + this.userId + "&type=" + type
				})
			},
			
			//点击了选项,index为选项在option[]的位置
			clickOption(index) {
				if(index == 0){ //点击了点赞的店铺
					this.goNewsList(1);
				}else if (index == 1) { //点击了申请店铺
					console.log("申请店铺")
					//TODO 判断用户是否有店铺在申请中, 是就跳转到申请店铺状态页,否就申请店铺
					uni.navigateTo({
						url: "/pages/applyShop/applyShop"
					});
				} else {
					return;
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
		},
		onHide() {
			console.log("me页面隐藏")
			uni.removeStorage({
				key: 'searchUserId',
				success: function(res) {
					console.log("清除searchUserId成功");
				}
			});
		},
		onUnload() {
			console.log("me页面卸载")
		},
		//监听导航栏的"<"的点击事件
		onNavigationBarButtonTap(e) {
			uni.switchTab({
				url: '/pages/index/index'
			});
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f1f1;
		font-size: 30upx;
	}

	.li:active {
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
				font-size: 30upx;
			}
		}
	}
</style>
