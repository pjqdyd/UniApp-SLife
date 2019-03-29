<template>
	<view>
		<view class="page-box">
			<!-- 动态的顶部用户信息, 头像,昵称,动态标题  280upx-->
			<view class="userInfo-box">
				<image class="face" src="https://upload-images.jianshu.io/upload_images/14511997-f98df143a7bb5a83.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
				 @click.stop="goUserInfo"></image> <!-- 用户头像 -->

				<!-- 用户昵称,性别, 身份 -->
				<view class="nickname-sex-idStatus-box">
					<text class="nickname">刺猬的拥抱</text> <!-- 用户昵称 -->
					<!-- 身份 -->
					<text class="id-status-text">-顾客-</text>
				</view>
				<!-- 动态分类 -->
				<text class="news-category">/超市</text>
			</view>

			<!-- 动态有关的店铺的信息 -->
			<view class="shop-info">
				<image class="shop-icon" src="../../static/news/shop.png"></image>
				<view class="shop-name-local">
					<view class="shop-name">[生活街店铺]</view>
					<view class="iconfont shop-local"><text style="color: #EA5455;">&#xe611;</text>位置风飞沙收到的s的东方航空沙发撒范德萨发送是后端数呼呼大睡设计方法</view>
				</view>
				<view class="iconfont shop-next">&#xe6ee;</view>
			</view>
			<!-- 动态描述标题 -->
			<view class="texts-box">
				<text class="texts">{{text}}</text>
			</view>

			<!-- 动态图片 -->
			<view v-for="(i, index) in [1,2,3]" :key="index">
				<image class="news-image" src="https://upload-images.jianshu.io/upload_images/14511997-6b7bdd51ef601f2f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"></image>
			</view>
			
			<!-- 底部的点赞,举报图标和时间 -->
			<view class="icon-box">
				<image class="icon" @click.stop="clickLike" :src="isLike? '../../static/news/click/like1.png': '../../static/news/like.png' ">
				</image>
				<text class="count">32</text>
			
				<image class="icon" @click.stop="clickMore" src="../../static/news/more.png"></image>
				<text class="date">2019:13:13</text>
			</view>
			
			<!-- 评论区块 -->
			<view class="comment-box">
				评论
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		created() {

		},
		data() {
			return {
				text: "撒旦解放打算离开房间啊是的时候就是第三方啥叫好的 始动画好几个军事大国",
				isLike: true
			}
		},
		methods: {
			goUserInfo() {

			}
		}
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
	}

	.shop-icon {
		width: 65upx;
		height: 65upx;
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
		margin-top: 20upx;
	}
	
	.icon-box {
		width: 750upx;
		height: 100upx;
		margin-top: 30upx;
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
	.comment-box{
		width: 100%;
		height: 500upx;
		background-color: #999999;
	}
</style>
