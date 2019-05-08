<template>
	<div>
		<div class="list-cell" @click="bindClick">

			<!-- 动态的顶部用户信息, 头像,昵称,性别,动态标题  280upx-->
			<div class="info-box">
				<div class="userInfo-box">
					<image class="face" :src="serverUrl + itemData.faceUrl" @click.stop="goUserInfo"></image> <!-- 用户头像 -->

					<!-- 用户昵称,性别, 身份 -->
					<div class="nickname-sex-idStatus-box">
						<text class="nickname">{{itemData.nickname}}</text> <!-- 用户昵称 -->
						<!-- 性别 -->
						<image class="sex-box" v-if="isBoy == 1" src="../../static/sex/boy.png"></image>
						<image class="sex-box" v-if="isBoy == 2" src="../../static/sex/girl.png"></image>
						<!-- 身份 -->
						<text class="id-status-text">-{{isIdStatus}}</text>
					</div>
					<!-- 动态分类 -->
					<text class="news-category">/{{itemData.newsCategory}}</text>
				</div>
				<!-- 动态描述标题 -->
				<div class="text-box">
					<div class="text">{{itemData.content}}</div>
				</div>
			</div>

			<!-- 动态的图片 盒子高度分别为 400 340 500 660 upx-->
			<image class="image-1" v-if="imgListSize == 1" mode="aspectFill" :src="serverUrl + imageList[0].imageUrl"></image>

			<div class="image-2-box" v-if="imgListSize == 2">
				<image class="image-2" mode="aspectFill" :src="serverUrl + imageList[0].imageUrl"></image>
				<image class="image-2" mode="aspectFill" :src="serverUrl + imageList[1].imageUrl"></image>
			</div>

			<div class="image-3-box" v-if="imgListSize == 3">
				<image class="image-3-0" mode="aspectFill" :src="serverUrl + imageList[0].imageUrl"></image>
				<image class="image-3-1" mode="aspectFill" :src="serverUrl + imageList[1].imageUrl"></image>
				<image class="image-3-2" mode="aspectFill" :src="serverUrl + imageList[2].imageUrl"></image>
			</div>

			<div class="image-4-box" v-if="imgListSize == 4">
				<image class="image-1" mode="aspectFill" :src="serverUrl + imageList[0].imageUrl"></image>
				<div class="image4">
					<image v-for="(i, index) in [1,2,3]" class="image-4" mode="aspectFill" :src="serverUrl + imageList[i].imageUrl"
					 :key="index"></image>
				</div>
			</div>

			<!-- 底部的点赞,评论,举报图标和时间 -->
			<div class="icon-box">
				<image class="icon-bottom" @click.stop="clickLike" :src="isLike? '../../static/news/click/like1.png': '../../static/news/like.png' ">
				</image>
				<text class="count">{{likeCount}}</text>

				<image class="icon-bottom" @click.stop="clickComment" src="../../static/news/comment.png">
				</image>
				<text class="count">{{commentCount}}</text>

				<image class="icon-bottom" @click.stop="clickMore" src="../../static/news/more.png"></image>
				<text class="date">{{itemData.dateTime}}</text>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		//这里的itemData属性是接收父组件传过来的 单条动态数据对象
		props: {
			itemData: {
				type: Object,
				default: function(e) {
					return {}
				}
			},
			serverUrl: String,
			userId: String,
			userToken: String
		},
		data() {
			return {
				imageList: [], //主页动态的图片列表
				isLike: 0, //是否点赞 1表示点赞了,0表示未点赞
				likeCount: 0, //点赞数
				commentCount: 0 //评论数
			}
		},
		created() {
			var data = this.itemData;
			this.imageList = data.newsImageList; //主页动态的图片列表
			this.isLike = data.isLike;
			this.likeCount = data.newsLikeCounts;
			this.commentCount = data.newsCommentCounts;
		},
		computed: {
			isBoy() {
				return this.itemData.sex;
			},
			isIdStatus() {
				let idStatus = this.itemData.idStatus;
				if (idStatus == 1) {
					return "店主"
				} else if (idStatus == 0) {
					return "顾客"
				} else {
					return ''
				}
			},
			imgListSize() {
				return this.imageList.length;
			}
		},
		methods: {
			bindClick() {
				console.log("点击进入详情")
				this.$emit('click');
			},
			//跳转到用户详情页,将需要查询的userId带入
			goUserInfo() {
				uni.navigateTo({
					url: "/pages/userInfo/userInfo?id=" + this.itemData.publisherId
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
							url: that.serverUrl + "/slife/news/userLikeNews?userId=" + this.userId + "&newsId=" + this.itemData.newsId +
								"&publisherId=" + that.itemData.publisherId,
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
							url: that.serverUrl + "/slife/news/userCancelLikeNews?userId=" + that.userId + "&newsId=" + that.itemData.newsId +
								"&publisherId=" + this.itemData.publisherId,
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
			//点击了评论按钮
			clickComment() {
				this.$emit('clickComment'); //向外触发评论事件
				console.log("评论")
			},
			//点击了...
			clickMore() {
				uni.showActionSheet({
					itemList: ["举报"],
					success: (res) => {
						//TODO
						console.log("举报动态: Id = " + this.itemData.newsId)
					}
				})
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
		}
	}
</script>

<style>
	.list-cell {
		width: 750upx;
		height: 100%;
		border-bottom: 10upx solid #eeeeee;
		background-color: #F5F5F5;
	}

	.list-cell:active {
		background-color: #eeeeee;
	}

	.info-box {
		width: 750upx;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
		background-color: #fff;
	}

	.userInfo-box {
		width: 750upx;
		height: 110upx;
		padding: 5upx;
		background-color: #fff;
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.userInfo-box:active {
		background-color: #eeeeee;
	}

	.face {
		width: 100upx;
		height: 100upx;
		margin-right: 10upx;
		border-radius: 50%;
	}

	.nickname-sex-idStatus-box {
		width: 450upx;
		height: 100upx;
		position: relative;
	}

	.nickname {
		font-size: 35upx;
		height: 60upx;
		line-height: 60upx;
	}

	.sex-box {
		width: 28upx;
		height: 28upx;
		margin: 0 10upx;
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
		line-height: 100upx;
		text-align: center;
		font-size: 30upx;
		color: #707070;
	}

	.text-box {
		width: 750upx;
		padding: 10upx;
		overflow: hidden;
		box-sizing: border-box;
		background-color: #fff;
	}

	.text {
		box-sizing: border-box;
		overflow: hidden;
		font-size: 30upx;
		color: #555555;
	}

	.icon-box {
		width: 750upx;
		height: 80upx;
		margin-top: 5upx;
		background-color: #fff;
		display: flex;
		box-sizing: border-box;
		flex-direction: row;
	}

	.icon-bottom {
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

	.image-1 {
		width: 750upx;
		height: 400upx;
		/* margin-bottom: 3upx; */
	}

	.image-2-box {
		width: 750upx;
		height: 340upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.image-2 {
		width: 373upx;
		height: 340upx;
	}

	.image-3-box {
		position: relative;
		width: 750upx;
		height: 500upx;
	}

	.image-3-0 {
		width: 500upx;
		height: 500upx;
		position: absolute;
		left: 0;
	}

	.image-3-1 {
		width: 247upx;
		height: 248upx;
		position: absolute;
		right: 0;
	}

	.image-3-2 {
		width: 247upx;
		height: 248upx;
		position: absolute;
		right: 0;
		bottom: 0;
	}

	.image-4-box {
		width: 750upx;
		height: 650upx;
	}

	.image4 {
		width: 750upx;
		height: 240upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.image-4 {
		width: 247upx;
		height: 240upx;
	}
</style>
