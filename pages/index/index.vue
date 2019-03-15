<template>
	<view>
		<!-- 使用侧边栏组件 -->
		<uni-drawer :visible="isShowDrawer" :mask="true" @close="handDrawerClose">
			<view style="padding:30upx;">
				<view class="uni-title">抽屉式导航</view>
			</view>
		</uni-drawer>

		<!--    顶部分类栏组件   -->	
		<switch-bar></switch-bar>

		<!-- 首页内容 -->
		<view class="content">
			<view>
				<text class="title">{{title}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	import uniDrawer from "./component/uni-drawer/uni-drawer.vue" //导入主页侧边抽屉组件
	import switchBar from "./component/switch-bar/switch-bar.vue" //导入顶部分类栏组件

	export default {
		data() {
			return {
				title: 'Hello',
				isShowDrawer: false
			}
		},
		components: {
			uniDrawer,
			switchBar
		},
		onLoad() {
			console.log("进入页面开始刷新")
		},
		methods: {
			//侧边栏的关闭事件
			handDrawerClose: function() {
				this.isShowDrawer = false
				console.log("侧边栏关闭")
			}

		},
		//监听导航栏的"..."的点击事件(展开/关闭侧边栏)
		onNavigationBarButtonTap: function() {
			if (this.isShowDrawer == false) {
				this.isShowDrawer = true
				console.log("展开侧边栏")
			} else {
				this.isShowDrawer = false
				console.log("关闭侧边栏")
			}

		}

	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}

</style>
