<template>
	<view>
		<!-- 折叠面板 -->
		<uni-collapse>

			<!--消息分类 -->
			<block v-for="(item, index) in msgCategory" :key="index">
				<uni-collapse-item :title="item.name" :open="false" :icon="item.icon" :key="index">
					<!-- <view>{{index}}</view> -->
					<!-- 默认 暂无信息-->
					<cmd-result-page text="暂无数据"></cmd-result-page>
				</uni-collapse-item>
				<view class="list"></view>
			</block>

			<!-- 好友消息 -->
			<uni-collapse-item title="好友消息" open="true" icon="../../static/chat/firend.png">
				<!-- 好友消息列表 -->
				<view class="content" v-if="isLogin">
					<uni-swipe-action :options="options" :messagesList="messageList" @clickMessage="handMessageClick"></uni-swipe-action>
				</view>
				<!-- 如果messageList.length = 0, 或未登录,就暂无信息-->
				<view v-if="messageList.length == 0 || !isLogin">
					<cmd-result-page text="暂无数据"></cmd-result-page>
				</view>
			</uni-collapse-item>

		</uni-collapse>

	</view>
</template>

<script>
	import uniCollapse from '@/components/collapse/uni-collapse.vue'; //折叠面板组件
	import uniCollapseItem from '@/components/collapse/uni-collapse-item.vue';

	import uniSwipeAction from "./component/uni-swipe-action.vue"; //好友消息组件
	import cmdResultPage from "@/components/cmd-result-page/cmd-result-page.vue"; //页面结果组件

	import utils from '../../common/utils.js'; //一些工具方法

	export default {
		components: {
			uniSwipeAction,
			uniCollapse,
			uniCollapseItem,
			cmdResultPage
		},
		data() {
			return {
				isLogin: false,
				msgCategory: [{
					icon: "../../static/chat/follow.png",
					name: "我的关注",
				},{
					icon: "../../static/chat/fans.png",
					name: "我的粉丝",
				},{
					icon: "../../static/chat/notify.png",
					name: "系统通知",
				},{
					icon: "../../static/chat/report.png",
					name: "回复我的",
				},{
					icon: "../../static/chat/like.png",
					name: "点赞我的",
				}],
				options: [{
					tag: 1,
					text: '置顶',
					style: {
						backgroundColor: '#C7C6CD'
					}
				}, {
					tag: 0,
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				//将来是从缓存中读取消息集合对象的
				messageList: [
					{
						title: "小猪佩奇",
						id: "0003",
						faceUrl: "https://upload-images.jianshu.io/upload_images/14511997-64fa474ee09cda5e.jpg",
						message: "我是佩奇,你呢",
						time: "12:13",
						count: 1,
						stick: false,
						disabled: false
					},{
						title: "吴彦祖",
						id: "0004",
						faceUrl: "https://upload-images.jianshu.io/upload_images/14511997-3b2b5602699ee5b8.jpg",
						message: "我是吴彦祖,你呢",
						time: "10:13",
						count: 1,
						stick: false,
						disabled: false
					},
					{
						title: "前端开发者",
						id: "0005",
						faceUrl: "https://upload-images.jianshu.io/upload_images/14511997-00f42c82c1fa0b27.jpg",
						message: "你好我是前端",
						time: "11:35",
						count: 0,
						stick: false,
						disabled: false
					},
					{
						title: "后端开发者",
						id: "0006",
						faceUrl: "https://upload-images.jianshu.io/upload_images/14511997-cbb9d12d8f520128.jpg",
						message: "其实我觉得吧,压力也不大",
						time: "08:23",
						count: 0,
						stick: false,
						disabled: false
					},
					{
						title: "小林",
						id: "0007",
						faceUrl: "https://upload-images.jianshu.io/upload_images/14511997-12de3a6a1e55a2c6.jpg",
						message: "太好了",
						time: "03:21",
						count: 5,
						stick: false,
						disabled: false
					},
					{
						title: "产品经理",
						id: "0008",
						faceUrl: "https://upload-images.jianshu.io/upload_images/14511997-02206884de2728b8.jpg",
						message: "我是产品既然追求质量,那就贯彻到底了",
						time: "03:08",
						count: 99,
						stick: false,
						disabled: false
					}
				]
			};
		},
		onLoad(params) {
			var that = this;
			uni.getStorage({
				key: "userInfo",
				success(res) {
					if(res.data.userId != null && res.data.userId != undefined){
						that.isLogin = true;
					}
				}
			});
		},
		created() {},
		onShow() {
			//隐藏红点
			uni.hideTabBarRedDot({
				index: 2
			})
		},
		methods: {
			//点击了单条消息,index为消息对象的下标
			handMessageClick(index){
				var msgObj = this.messageList[index]; //获取点击的消息对象
				
				console.log('进入到聊天界面' + msgObj.id)
				uni.navigateTo({
					url: "/pages/chatScreen/chatScreen?id=" + msgObj.id + "&faceUrl=" + msgObj.faceUrl + "&name=" + msgObj.title
				})
				
				msgObj.count = 0; //设置未读消息数为0
			},
			
			//设置红点
			setTabbarReddot() {
				//延时获取uni的api,防止调用不到,设置红点
				setTimeout(() => {
					uni.showTabBarRedDot({
						index: 2,
					})
				}, 200)
			},
		},
		onHide() {
			this.setTabbarReddot();//设置红点
		},
		
		//监听导航栏的"<"的点击事件
		onNavigationBarButtonTap(e) {
			uni.switchTab({
				url: '/pages/news/news'
			});
		}
	};
</script>

<style lang="scss">
	.content {}

	.list:active {
		background-color: #eeeeee;
	}

	.list {
		width: 100%;
		border-bottom: 4upx solid #f1f1f1;
		background: #fff;
	}
</style>
