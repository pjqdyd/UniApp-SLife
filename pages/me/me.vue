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
	import utils from '../../common/utils.js'; //一些工具方法

	import userCrad from "./component/user-info/user-crad.vue"; //用户信息卡

	export default {
		components: {
			userCrad
		},
		data() {
			return {
				userInfo: {},
				userId: '',
				isSelfId: false, //是否是自己的id用户信息,默认是
				option: [{
					icon: "../../static/user/option/like.png",
					name: "点赞的动态",
				}, {
					icon: "../../static/user/option/apply.png",
					name: "申请店铺",
				}, {
					icon: "../../static/user/option/about.png",
					name: "关于我们",
				}, {
					icon: "../../static/user/option/issue.png",
					name: "意见反馈",
				}]
			}
		},
		onLoad(params) {
			//查询用户信息
			//this.getUserInfo(this.userId);
		},
		onShow() {
			var that = this;
			//由于从非tab页跳转到tab页的url后是不能跟参数的,所以只能从缓存中读取要查询的userId		
			uni.getStorage({
				key: "searchUserId",
				success(res) {
					that.getUserInfo(res.data); //根据缓存的searchUserId查询用户信息
					that.isSelfId = false; //设置当前的用户信息不是自身的
				},
				fail() {
					if(!that.isSelfId){ //如果当前不是自己的信息,就查询,避免重复查询自己的信息
						that.getUserInfo(that.userInfo.userId)
						that.isSelfId = true; //设置当前的用户信息是自身的
					}
				}
			})
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
						this.userInfo = res.data.userInfo
					}
				});
			},

			//点击了选项,index为选项在option[]的位置
			clickOption(index) {
				if (index == 1) { //点击了申请店铺
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
			}
		}
	}
</style>
