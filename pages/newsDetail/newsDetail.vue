<template>
	<view>
		<view class="page-box">
			<!-- 动态的顶部用户信息, 头像,昵称,动态标题  280upx-->
			<view class="userInfo-box">
				<image class="face" :src="serverUrl + newsItem.faceUrl" @click.stop="goUserInfo"></image> <!-- 用户头像 -->

				<!-- 用户昵称,性别, 身份 -->
				<view class="nickname-sex-idStatus-box">
					<text class="nickname">{{newsItem.nickname}}</text> <!-- 用户昵称 -->
					<!-- 身份 -->
					<text class="id-status-text">-{{isIdStatus}}-</text>
				</view>
				<!-- 动态分类 -->
				<text class="news-category">/{{newsItem.newsCategory}}</text>
			</view>

			<!-- 动态有关的店铺的信息 -->
			<view class="shop-info" v-if="newsItem.newsShopId != '' && newsItem.newsShopId != undefined" @click="goShopDetail">

				<image class="shop-icon" src="../../static/news/shop.png"></image>
				<view class="shop-name-local">
					<view class="shop-name">{{'[' + newsItem.newsShopName + ']'}}</view>
					<view class="iconfont shop-local"><text style="color: #EA5455;">&#xe611;</text>{{newsItem.newsShopAddr}}</view>
				</view>
				<view class="iconfont shop-next">&#xe6ee;</view>
			</view>
			<!-- 动态描述标题 -->
			<view class="texts-box">
				<text class="texts" space="emsp">{{newsItem.newsTitle}}</text>
			</view>

			<!-- 动态图片 -->
			<view v-for="(item, index) in newsItem.newsImageList" :key="index" style="background-color: #fff;">
				<image class="news-image" mode="widthFix" :src="serverUrl + item.imageUrl"></image>
			</view>

			<!-- 底部的点赞,举报图标和时间 -->
			<view class="icon-box" id="comm">
				<image class="icon" @click.stop="clickLike" :src="isLike ? '../../static/news/click/like1.png': '../../static/news/like.png' ">
				</image>
				<text class="count">{{likeCount}}</text>

				<image class="icon" @click.stop="clickMore" src="../../static/news/more.png"></image>
				<text class="date">{{newsItem.dateTime}}</text>
			</view>

			<!-- 评论区块 -->
			<view class="comment-box">
				<news-comment ref="comment" @inputFocus="handInputFoucs"></news-comment>
			</view>

		</view>
	</view>
</template>

<script>
	import conf from '@/common/config.js'; //全局的一些配置信息

	import newsComment from "./component/news-comment.vue"; //导入评论组件

	export default {
		components: {
			newsComment
		},
		data() {
			return {
				newsItem: {}, //动态数据对象
 				likeCount: 0, //点赞的数量
				isLike: 0,
				
				userId: '',
				serverUrl: '',
				userToken: ''
			}
		},
		onLoad(params) {
			var that = this;
			//获取在主页缓存的单条动态数据对象信息
			uni.getStorage({
				key: 'newsItem',
				success: function(res) {
					console.log("获取数据成功")
					//因为index.nvue跳转过来时,将单条news动态数据转换成了json,所以需要转换js对象回来
					//如果拿到的是json字符串,说明是从index.nvue跳转的, 否则是从index.vue跳转的,无需转换
					let newsItem = typeof res.data == 'string' ? JSON.parse(res.data) : res.data;
					that.newsItem = newsItem;
					that.isLike = newsItem.isLike;
					that.likeCount = newsItem.newsLikeCounts;
				}
			});
			this.serverUrl = this.server_Url; //读取挂载的全局服务地址
			
			uni.getStorage({ //读取用户id
				key: "userInfo",
				success(res) {
					let userId = res.data.userId;
					if(userId != undefined || userId != ''){
						that.userId = userId;
						that.userToken = res.data.userToken;
					}
				}
			});
			
			//根据params.flag判断是否是从评论按钮点击进入的,如果是,页面就滑动到评论位置
			if(params.flag == 1){
				//获取元素节点的信息, 设置页面滚动到评论的位置
				setTimeout(() => {
					this.getElemCommAndSetTop();
				}, 400)
			}
		},
		onShow() {},
		created() {},
		mounted() {},
		//页面下拉刷新
		onPullDownRefresh() {
			console.log('refresh刷新动态详情');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//页面上拉触底
		onReachBottom() {
			this.$refs.comment.loadMoreComment(); //调用子组件加载更多评论
		},
		methods: {
			//跳转到用户详情页,带入要查询的userId
			goUserInfo() {		
				//判断是不是自己的id,是就跳转到个人信息页TODO
				if(this.newsItem.publisherId == this.userId){
					uni.switchTab({
						url: "/pages/me/me"
					});
				}else{
					uni.navigateTo({
						url: "/pages/userInfo/userInfo?id=" + this.newsItem.publisherId
					})
				}
				
			},
			//跳转到店铺详情页
			goShopDetail() {
				uni.navigateTo({
					url: "/pages/shopDetail/shopDetail?shopId=" + this.newsItem.newsShopId
				})
			},
			//点击了点赞/取消点赞
			clickLike() {
				var that = this;
				if (that.userId == '' || that.userId == undefined || that.userId == null) {
					that.showIsLogin();
					return;
				}else{
					if (that.isLike == 0) { //点赞
						uni.request({
							url: that.serverUrl + "/slife/news/userLikeNews?userId=" + this.userId + "&newsId=" + this.newsItem.newsId +
								"&publisherId=" + that.newsItem.publisherId,
							method: "POST",
							header: {
								userId: that.userId,
								userToken: that.userToken
							},
							success(res) {
								if(res.data.code == 200) {
									that.isLike = 1
									that.likeCount++;
								}else if(res.data.code == 204){
									that.showIsLogin();
								}else{
									uni.showToast({
										title: "点赞失败",
										icon: "none"
									})
								}
							}
						});
					} else if (that.isLike == 1) { //取消点赞
						//TODO	
						uni.request({
							url: that.serverUrl + "/slife/news/userCancelLikeNews?userId=" + that.userId + "&newsId=" + that.newsItem.newsId +
								"&publisherId=" + this.newsItem.publisherId,
							method: "POST",
							header: {
								userId: that.userId,
								userToken: that.userToken
							},
							success(res) {
								if(res.data.code == 200) {
									that.isLike = 0
									that.likeCount--;
								}else if(res.data.code == 204){
									that.showIsLogin();
								}else{
									uni.showToast({
										title: "取消点赞失败",
										icon: "none"
									})
								}
							}
						});
					} else {
						return;
					}
				}
			},
			//点击了更多
			clickMore() {
				console.log("更多")
				uni.showActionSheet({
					itemList: ["举报"],
					success: (res) => {
						//TODO
						console.log("举报动态: Id = " + this.newsItem.newsId)
					}
				})
			},
			//输入框激活了
			handInputFoucs(){
				//获取评论节点的信息, 设置页面滚动到评论的位置
				//this.getElemCommAndSetTop();
			},
			//获取节点的信息,设置页面的滚动位置
			getElemCommAndSetTop() {
				//获取id=comm元素节点的信息, 并设置页面滚动到评论元素的位置
				var query = uni.createSelectorQuery();
				query.select("#comm").boundingClientRect(function(res) {
					uni.pageScrollTo({
						scrollTop: res.top - 320,
						duration: 1000
					});
				}).exec();
			},
			//提示是否登录
			showIsLogin() {
				uni.showModal({
					title: '提示',
					content: '您还未登录,是否需要登录',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
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
		computed: {
			isIdStatus() {
				let idStatus = this.newsItem.idStatus;
				if (idStatus == 1) {
					return "店主"
				} else if (idStatus == 0) {
					return "顾客"
				} else {
					return ''
				}
			}
		},

		onUnload() {
			//页面卸载后,清除缓存的动态对象
			uni.removeStorage({
				key: 'newsItem',
				success: function(res) {
					console.log('清除缓存的动态对象成功');
				}
			});
		},
	}
</script>

<style lang="scss">
	.page-box {
		width: 750upx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.userInfo-box {
		width: 750upx;
		height: 160upx;
		padding: 20upx 10upx 20upx 10upx;
		box-sizing: border-box;
		background-color: whitesmoke;
		display: flex;
		flex-direction: row;
	}

	.userInfo-box:active {
		background-color: #eeeeee;
	}

	.face {
		width: 120upx;
		height: 120upx;
		margin-right: 10upx;
		border-radius: 50%;
	}

	.nickname-sex-idStatus-box {
		width: 450upx;
		height: 120upx;
		position: relative;
	}

	.nickname {
		font-size: 37upx;
		height: 60upx;
		line-height: 60upx;
	}

	.id-status-text {
		position: absolute;
		height: 40upx;
		width: 100%;
		bottom: 10upx;
		left: 40upx;
		color: #707070;
		font-size: 28upx;
	}

	.news-category {
		width: 150upx;
		height: 100upx;
		font-weight: bold;
		line-height: 100upx;
		text-align: center;
		font-size: 32upx;
		color: #707070;
	}

	.shop-info {
		width: 100%;
		height: 110upx;
		padding: 20upx 40upx 10upx 40upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
	}

	.shop-icon {
		padding-top: 10upx;
		width: 60upx;
		height: 60upx;
	}

	.shop-name-local {
		width: 500upx;
		height: 70upx;
		color: #555555;
		display: flex;
		flex-direction: column;
	}

	.shop-name {
		font-size: 30upx;
		width: 500upx;
		height: 40upx;
	}

	.shop-local {
		font-size: 25upx;
		width: 500upx;
		height: 30upx;
		line-height: 30upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.shop-next {
		width: 90upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
	}

	.texts-box {
		width: 750upx;
		padding: 20upx 20upx 30upx 20upx;
		box-sizing: border-box;
		background-color: whitesmoke;
		border-top: 2upx solid #fff;
	}

	.texts {
		font-size: 30upx;
		color: #555555;
	}

	.news-image {
		width: 100%;
		height: 400upx;
		margin-bottom: 15upx;
	}

	.icon-box {
		width: 750upx;
		height: 100upx;
		padding: 10upx 0 10upx 0;
		background-color: #fff;
		display: flex;
		box-sizing: border-box;
		flex-direction: row;
	}

	.icon {
		width: 80upx;
		height: 80upx;
		border-width: 10upx;
		border-color: #FFFFFF;
		margin-left: 25upx;
	}

	.icon:active {
		background-color: #eeeeee;
	}

	.count {
		font-size: 22upx;
		color: #707070;
		margin-top: 40upx;
	}

	.date {
		font-size: 30upx;
		color: #999999;
		position: absolute;
		right: 30upx;
		line-height: 80upx;
	}

	.comment-box {
		width: 100%;
	}
</style>
