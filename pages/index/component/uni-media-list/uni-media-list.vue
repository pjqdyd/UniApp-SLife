<template>
	<div>
		<div class="list-cell" @click="bindClick">

			<!-- 动态的顶部用户信息, 头像,昵称,性别,动态标题  280upx-->
			<div class="info-box">
				<div class="userInfo-box">
					<image class="face" :src="itemData.userInfo.faceUrl"></image> <!-- 用户头像 -->

					<!-- 用户昵称,性别, 身份 -->
					<div class="nickname-sex-idStatus-box">
						<text class="nickname">{{itemData.userInfo.nickname}}</text> <!-- 用户昵称 -->
						<!-- 性别 -->
						<image class="sex" v-if="isBoy == 1" src="../../static/sex/boy.png"></image>
						<image class="sex" v-if="isBoy == 2" src="../../static/sex/girl.png"></image>
						<!-- 身份 -->
						<text class="id-status">-{{isIdStatus}}</text>
					</div>
					<!-- 动态分类 -->
					<text class="news-category">/{{itemData.newsCategory}}</text>
				</div>
				<!-- 动态描述标题 -->
				<div class="text-box">
					<div class="text">{{itemData.newsTitle}}</div>
				</div>
			</div>

			<!-- 动态的图片 盒子高度分别为 400 340 500 660 upx-->
			<image  class="image-1" v-if="imgListSize == 1" resize="cover" :src="imageList[0].imageUrl"></image>

			<div class="image-2-box" v-if="imgListSize == 2">
				<image class="image-2" resize="cover" :src="imageList[0].imageUrl"></image>
				<image class="image-2" resize="cover" :src="imageList[1].imageUrl"></image>
			</div>

			<div class="image-3-box" v-if="imgListSize == 3">
				<image class="image-3-0" resize="cover" :src="imageList[0].imageUrl"></image>
				<image class="image-3-1" resize="cover" :src="imageList[1].imageUrl"></image>
				<image class="image-3-2" resize="cover" :src="imageList[2].imageUrl"></image>
			</div>

			<div class="image-4-box" v-if="imgListSize == 4">
				<image class="image-1" resize="cover" :src="imageList[0].imageUrl"></image>
				<div class="image4">
					<image v-for="(i, index) in [1,2,3]" class="image-4" resize="cover" :src="imageList[i].imageUrl" :key="index"></image>
				</div>
			</div>

			<!-- 底部的点赞,评论,举报图标和时间 -->
			<div class="icon-box">
				<image class="icon" @click="clickLike" :src="isLike? '../../static/news/like.png': '../../static/news/click/like1.png' ">
				</image>
				<text class="count">{{likeCount}}</text>
				
				<image class="icon" @click="clickComment" src="../../static/news/comment.png">
				</image>
				<text class="count">{{commentCount}}</text>

				<image class="icon" src="../../static/news/more.png"></image>
				<text class="date">{{itemData.dateTime}}</text>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		//这里的data属性是接收父组件传过来的 单条动态数据对象
		props: {
			itemData: {
				type: Object,
				default: function(e) {
					return {}
				}
			}
		},
		data() {
			return {
				imageList: [], //主页动态的图片列表
				isLike: '', //是否点赞
				likeCount: 0 ,//点赞数
				commentCount: 0 //评论数
			}
		},
		created() {
			var data = this.itemData;
			//console.log(JSON.stringify(this.itemData.newsImage[0].imageUrl))
			this.imageList = data.newsImage; //主页动态的图片列表
			this.isLike = data.isLike;
			this.likeCount = data.likeCount;
			this.commentCount = data.commentCount;
		},
		computed: {
			isBoy() {
				return this.itemData.userInfo.sex;
			},
			isIdStatus() {
				let idStatus = this.itemData.userInfo.idStatus;
				if (idStatus == 1) {
					return "顾客"
				} else if (idStatus == 0) {
					return "店主"
				} else {
					return ''
				}
			},
			imgListSize() {
				return this.imageList.length;
			}
		},
		methods: {
			close(e) {
				this.$emit('close');
				e.stopPropagation();
			},
			bindClick() {
				this.$emit('click');
			},
			//点击了点赞/取消点赞
			clickLike() {
				if (this.isLike == 0) {
					//TODO
					this.isLike = 1
					this.likeCount++;				
				} else {
					//TODO	
					this.isLike = 0
					this.likeCount--;
				}
			},
			//点击了评论按钮
			clickComment() {
				console.log("评论")
			}
		}
	}
</script>

<style>
	.list-cell {
		width: 750upx;
		height: 100%;
		margin-top: 20upx;
		box-sizing: border-box;
		background-color: #F5F5F5;
	}

	.list-cell:active {
		background-color: #eeeeee;
	}

	.info-box {
		width: 750upx;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
	}

	.userInfo-box {
		width: 750upx;
		height: 110upx;
		padding: 5upx;
		box-sizing: border-box;
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
		line-height: 60upx;
	}

	.sex {
		width: 28upx;
		height: 28upx;
		margin: 0 10upx;
	}

	.id-status {
		position: absolute;
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
		font-size: 28upx;
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

	.icon-box:active {
		background-color: #eeeeee;
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
	.count{
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
		margin-bottom: 3upx;
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
		width: 248upx;
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
		position: relative;
		width: 750upx;
		height: 660upx;
	}

	.image4 {
		width: 750upx;
		height: 240upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.image-4 {
		width: 248upx;
		height: 240upx;
	}
</style>
