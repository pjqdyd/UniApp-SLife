<template>
	<view>
		<!-- 评论板块 -->
		<view class="comment-count">评论<text class="comment-num">{{commentCount}}</text></view>

		<view class="comment-list-box">
			
			<block v-for="(item, index) in commentList" :key="index">
				<view class='container-comments'>
					<!-- <image class="face-comments" src='{{serverUrl}}{{item.faceImage}}'></image> -->
					<image class="face-comments" :src='item.fromUserFace'></image>
					
					<!-- 评论者昵称, 和是否是回复 -->
					<view class='nickname-comments'>
						<view class='nickname-lbl'>{{item.fromUserName}}
							<text class="nickname-reply" v-if="item.toUserName == null ? false : true">回复 {{item.toUserName}}</text>
						</view>
						
						<!-- 评论/回复的内容 -->
						<view class='comments-content'>{{item.comment}}</view>
						
						<!-- 回复按钮, 日期信息 -->
						<view class="date-comment">
							<text class="reply" @click="clickReply(item)">回复</text><!-- 回复按钮 -->
							<text class='date-lbl'>{{item.dateTime}}
								<text>{{item.toUserId == null ? " 留言" : " 回复"}}</text>
							</text>
						</view>

					</view>

				</view>
			</block>
			<view style="height: 200upx;">
				<uni-load-more  status="noMore"></uni-load-more>
			</view>
		</view>

		<view class="comment-input-box">
			<input class="comment-input" :placeholder="placeholderText"  :focus="isFocus" :value="inputValue" @input="onInput" @blur="loseFoucs" @focus="inputFocus" />
			<view class="iconfont comment-button" @click="createComment">&#xe634; 发表</view>
		</view>

	</view>
</template>

<script>
	import conf from '@/common/config.js'; //全局的一些配置信息
	
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	
	export default {
		components:{
			uniLoadMore
		},	
		data() {
			return {
				commentCount: 0, //评论的数量
				commentList: [], //评论的数据
				
				isFocus: false,
				placeholderText: "请输入评论",
				inputValue: ""
			}
		},
		created() {
			var url = conf.serverUrl;
			var list = [];	
			uni.request({
				url: url + '/commentlist',
				success: (res) => {
					console.log("请求评论commentList数据成功..")
					list = res.data.commentList;
					this.commentCount = res.data.commentCount;
					this.commentList = this.commentList.concat(list);
				}
			})		
		},
		mounted() {
		},
		methods: {
			clickReply(e) {
				//参数e为需要回复的评论对象
				console.log(e)
				this.isFocus = true;
				this.placeholderText = "回复" + e.fromUserName;
				console.log("回复...")
			},
			//输入框获取焦点
			inputFocus(){
				this.$emit('inputFocus'); //向外触发输入框激活事件
			},
			//输入框失去焦点
			loseFoucs(){
				this.isFocus = false
			},
			//正在输入
			onInput(e){
				this.inputValue = e.detail.value
			},
			//点击了发表评论
			createComment(){
				//TODO
				//TODO 保存成功后,重新加载最新评论
				console.log("发布评论" + this.inputValue)
				this.inputValue = ""
			},
			
			loadMoreComment(){
				console.log("加载更多评论")
			}
		},
		computed:{
		}
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
		background-color: #fff;
		border-top: 1upx solid #eeeeee;
	}

	.comment-num {
		font-size: 32upx;
		margin-left: 10upx;
	}
	
	.comment-list-box{
		margin-bottom: 120upx;
		background-color: whitesmoke;
	}

	.container-comments {
		width: 100%;
		padding: 20upx;
		box-sizing: border-box;
		font-size: 34upx;
		display: flex;
		margin-bottom: 10upx;
	}

	.face-comments {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		margin-left: 10upx;
		margin-top: 6upx;
		float: left;
	}

	.nickname-comments {
		margin-left: 20upx;
		height: 100%;
		float: left;
	}

	.nickname-lbl {
		font-size: 35upx;
	}

	.nickname-reply {
		font-size: 30upx;
		color: #707070;
	}

	.date-comment {
		padding-left: 30upx;
		text-align: right;
	}

	.reply {
		float: left;
		color: #EA5455;
		font-size: 28upx;
		font-weight: 600;
	}

	.date-lbl {
		font-size: 28upx;
		color: #707070;
	}

	.comments-content {
		color: #666;
		width: 500upx;
		margin-left: 30upx;
		margin-right: 5upx;
		border-bottom: solid 1upx #eeeeee;
		font-size: 29upx;
	}

	.comment-input-box {
		width: 100%;
		height: 120upx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		padding: 20upx;
		box-sizing: border-box;
	}
	
	.comment-input{
		width: 500upx;
		height: 80upx;
		line-height: 80upx;
		font-size: 34upx;
		background-color: #eeeeee;
		border-radius: 10upx;
	}
	.comment-button{
		width: 200upx;
		height: 80upx;
		line-height: 80upx;
		font-size: 36upx;
		color: #707070;
		text-align: center;
	}
</style>
