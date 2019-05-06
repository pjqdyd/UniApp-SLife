<template>
	<view>
		<!-- 用户信息卡 -->
		<user-crad :userInfo="userInfo" :isMe="false"></user-crad>

		<!-- 用户的数据 -->
		<view class="user-data-bar">
			<view class="data-bar">粉丝:<text class="data-bar-num">{{userId == '' || userId == null ? 0 :userInfo.fansCounts}}</text></view>
			<view class="data-bar">发布:<text class="data-bar-num">{{userId == '' || userId == null ? 0 :userInfo.createCounts}}</text></view>
			<view class="data-bar">获赞:<text class="data-bar-num">{{userId == '' || userId == null ? 0 :userInfo.likeCounts}}</text></view>
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
				<view class="li noborder" @click="goNewsList(1)">
					<image class="icon" src="../../static/user/option/like.png"></image>
					<view class="text">点赞的动态</view>
					<text class="iconfont">&#xe6ee;</text>
				</view>
				<!-- 折叠面板 -->
				<uni-collapse>
					<uni-collapse-item title="Ta的粉丝" open="false" @onIsOpen="handFansOpen" icon="../../static/chat/fans.png">
						<cmd-result-page text="暂无数据"></cmd-result-page>
					</uni-collapse-item>

					<uni-collapse-item title="Ta的关注" open="false" @onIsOpen="handFollowOpen" icon="../../static/chat/follow.png">
						<cmd-result-page text="暂无数据"></cmd-result-page>
					</uni-collapse-item>
				</uni-collapse>

				<view class="li noborder" @click="aboutUs">
					<image class="icon" src="../../static/user/option/issue.png"></image>
					<view class="text">意见反馈</view>
					<text class="iconfont">&#xe6ee;</text>
				</view>
			</view>

			<view class="list">
				<view class="li noborder" @click="aboutUs">
					<image class="icon" src="../../static/user/option/about.png"></image>
					<view class="text">关于我们</view>
					<text class="iconfont">&#xe6ee;</text>
				</view>
			</view>
		</view>


	</view>
</template>
<script>
	import userCrad from "../me/component/user-info/user-crad.vue"; //用户信息卡

	import uniCollapse from '@/components/collapse/uni-collapse.vue'; //折叠面板组件
	import uniCollapseItem from '@/components/collapse/uni-collapse-item.vue';

	import cmdResultPage from "@/components/cmd-result-page/cmd-result-page.vue"; //页面结果组件


	export default {
		components: {
			userCrad,
			uniCollapse,
			uniCollapseItem,
			cmdResultPage
		},
		data() {
			return {
				userInfo: {},
				userId: '', //用户id
				id: ''      //要查询信息的好友id
			}
		},
		onLoad(params) {
			//从跳转的params中获取用户id
			this.userId = params.userId;

			this.id = params.id; //获取要查询的好友id

			//根据跳转的id查询好友信息
			this.getUserInfo(params.userId, params.id); //这里测试,就手动请求一次数据
		},
		onShow() {},
		created() {},
		methods: {
			//根据id请求好友数据的方法
			getUserInfo(userId, id) {
				var url = this.server_Url; //读取在main.js中挂载的vue全局属性
				//请求服务端数据
				uni.request({
					url: url + '/slife/user/userInfo?userId=' + userId + "&id=" + id,
					success: (res) => {
						var result = res.data;
						if(result.code == 200){
							console.log("请用户数据成功成功..")
							this.userInfo = res.data.data;
						}else{
							uni.showToast({
								title: "获取用户信息失败",
								icon: "none"
							})
						}
											
					},
					fail() {
						uni.showToast({
							title: "获取用户信息失败",
							icon: "none"
						})
					}
				});
			},
			//跳转到动态, type标识是发布的动态还是点赞的动态
			goNewsList(type) {
				uni.navigateTo({
					url: "/pages/newsList/newsList?userId=" + this.id + "&type=" + type
				})
			},
			//点击展开了用户的粉丝
			handFansOpen(isopen) {
				console.log( isopen ?"展开了用户的粉丝":"收起了用户的粉丝")
			},
			//点击展开了用户的关注
			handFollowOpen(isopen) {
				console.log( isopen ?"展开了用户的关注":"收起了用户的关注")
			},
			//关于我们
			aboutUs() {

			}
		},
		onHide() {
			console.log("userInfo页面隐藏")
		},
		onUnload() {
			console.log("userInfo页面卸载")
		},
		//监听导航栏的"<"的点击事件
		onNavigationBarButtonTap(e) {},
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
				margin-right: 25upx;

				image {
					width: 50upx;
					height: 50upx;
				}
			}

			.text {
				width: 100%;
				font-size: 32upx;
				color: #666;
			}
		}
	}
</style>
