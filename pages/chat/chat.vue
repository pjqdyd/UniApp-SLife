<template>
	<view>
		<!-- 折叠面板 -->
		<uni-collapse>

			<!--消息分类 -->
			<block v-for="(item, index) in msgCategory" :key="index">
				<uni-collapse-item :title="item.name" :open="false" :icon="item.icon" :key="index">
					<view>{{index}}</view>
					<!-- 默认 暂无信息-->
					<cmd-result-page text="暂无数据"></cmd-result-page>
				</uni-collapse-item>
				<view class="list"></view>
			</block>

			<!-- 好友消息, name值用于标识这个是好友消息 -->
			<uni-collapse-item title="好友消息" open="true" icon="../../static/chat/firend.png" name="5">
				<!-- 好友消息列表 -->
				<view class="content" @click="handCilck">
					<uni-swipe-action :options="options" :messagesList="messages">
					</uni-swipe-action>
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
				focus: false,
				isShowView: true,
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
				messages: [{
						title: "马云",
						url: "http://img1.3lian.com/gif/more/11/201212/0d1252b54be4f2d240b6b7fe4ed35054.jpg",
						message: "什么鬼，我有支付宝",
						time: "15:15",
						count: 5,
						stick: false, //是否为置顶状态
						disabled: true //是否禁止滑动

					},
					{
						title: "马化腾",
						url: "http://img1.3lian.com/gif/more/11/201212/cd1d745ed855bef27f47c8aff0786067.jpg",
						message: "哈哈哈，我要一统江湖啦",
						time: "15:15",
						count: 22,
						stick: true,
						disabled: false

					},
					{
						title: "李彦宏",
						url: "http://img1.3lian.com/gif/more/11/201212/c011f2b2ab1a10d79fe931a786503d03.jpg",
						message: "抄袭我的吧，我早都做过了",
						time: "12:13",
						count: 1,
						stick: false,
						disabled: false
					},
					{
						title: "雷军",
						url: "http://img1.3lian.com/gif/more/11/201212/cf9d56d05c0cbc1edbf21cf64ad9c341.jpg",
						message: "微信给你下线，看你还嘚瑟",
						time: "12:11",
						count: 0,
						stick: false,
						disabled: false
					},
					{
						title: "前端开发者",
						url: "http://img1.3lian.com/gif/more/11/201212/04b335ead07530a6188a27549fad1a68.jpg",
						message: "我们的春天来啦，哈哈哈",
						time: "11:35",
						count: 0,
						stick: false,
						disabled: false
					},
					{
						title: "微信小程序",
						url: "http://img1.3lian.com/gif/more/11/201212/e10e8faa201671b5a2e8a6146f80d99e.jpg",
						message: "谁有内测资格啊啊，300万买一个",
						time: "08:23",
						count: 0,
						stick: false,
						disabled: false
					},
					{
						title: "小程序",
						url: "http://img1.3lian.com/gif/more/11/201212/3fab6379b6ef53e7c17a1cc772eed0d6.jpg",
						message: "这个IDE方便都不要配置了",
						time: "03:21",
						count: 5,
						stick: false,
						disabled: false
					},
					{
						title: "微信应用号开发群",
						url: "http://img1.3lian.com/gif/more/11/201212/8f3762fb4d791410ec970baa2641344d.jpg",
						message: "开发的局限性太大了",
						time: "03:08",
						count: 99,
						stick: false,
						disabled: false
					},
					{
						title: "后台",
						url: "http://img1.3lian.com/gif/more/11/201212/411cffabcd6e4474b48f1ecac76e1b3f.jpg",
						message: "不看好小程序",
						time: "02:45",
						count: 0,
						stick: false,
						disabled: false
					},
					{
						title: "闯天下",
						url: "http://img1.3lian.com/gif/more/11/201212/04378257474004fcdd62f619d724db0c.jpg",
						message: "微信太强大了",
						time: "01:09",
						count: 0,
						stick: false,
						disabled: false
					},
					{
						title: "小程序",
						url: "http://img1.3lian.com/gif/more/11/201212/58ec7c89b16c529fc9d0dc440a72e14d.jpg",
						message: "有快来看直播啦，学习开始啦",
						time: "00:24",
						count: 2,
						stick: false,
						disabled: false
					}
				]
			};
		},
		onLoad() {},
		created() {},
		onShow() {
			//隐藏红点
			uni.hideTabBarRedDot({
				index: 2
			})
		},
		methods: {
			handCilck() {
				console.log("点击")
			}
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
		border-bottom: 8upx solid #f1f1f1;
		background: #fff;
	}
</style>
