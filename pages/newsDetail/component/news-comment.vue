<template>
	<view>
		<!-- 评论板块 -->
		<!-- <block wx:for="{{commentsList}}"> -->
		<!-- <view class='comments-all' bindtap='replyFocus' data-fatherCommentId='{{item.id}}' data-toUserId='{{item.fromUserId}}'
		 data-toNickname='{{item.nickname}}'> -->

		<view class="comment-count">评论<text class="comment-num">25</text></view>

		<block v-for="(i, index) in [1, 2, 3, 4, 5]" :key="index">
			<view class='container-comments'>
				<!-- <image class="face-comments" src='{{serverUrl}}{{item.faceImage}}'></image> -->
				<image class="face-comments" src='https://upload-images.jianshu.io/upload_images/14511997-161603db93a6d5c4.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'></image>
				<view class='nickname-comments'>
					<!-- <label class='nickname-lbl'>@{{item.nickname}}</label> -->
					<text class='nickname-lbl'>刺猬的拥抱</text>
					于
					<text class='date-lbl'>2小时前</text>
					<!-- 留言： -->
					<!-- <block wx:if="{{item.toNickname != null}}"> -->
					<block v-if="false">
						回复
						<!-- <label class='nickname-lbl'>@{{item.toNickname}}</label> -->
						<text class='nickname-lbl'>刺猬</text>
					</block>
					<!-- <block wx:else> -->
					<block v-if="true">
						留言：
					</block>

					<view class='comments-content'>留言的内阿斯顿发大水和士大夫发生商店换行地方萨芬第三方</view>
				</view>

			</view>
		</block>
		<!-- <view class='comments-content'>留言的内容地方萨芬第三方</view> -->
		<!-- </view> -->
		<!-- </block> -->
	</view>
</template>

<script>
	export default {

	}
</script>

<style lang="scss">
	.comment-count {
		width: 100%;
		height: 60upx;
		padding: 20upx;
		font-size: 35upx;
		font-weight: 700;
		color: #707070;
	}
	.comment-num{
		font-size: 32upx;
		margin-left: 10upx;
	}

	.container-comments {
		width: 100%;
		padding: 20upx;
		box-sizing: border-box;
		font-size: 38upx;
		display: flex;
		margin-bottom: 30upx;
	}

	.face-comments {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		margin-left: 10upx;
		margin-top: 6upx;
		float: left;
	}

	.nickname-comments {
		margin-left: 20upx;
		height: 50upx;
		float: left;
	}

	.nickname-lbl {
		font-size: 36upx;
		color: #666;
	}

	.date-lbl {
		font-size: 36upx;
		color: #707070;
	}

	.comments-content {
		width: 500upx;
		margin-left: 30upx;
		margin-right: 5upx;
		border-bottom: solid 1upx #707070;
		font-size: 32upx;
	}
</style>
