<template>
	<view>
		<!-- 使用侧边栏组件 -->
		<uni-drawer :visible="isShowDrawer" :mask="true" @close="handDrawerClose">
			<view style="padding:30upx;">
				<view class="uni-title">抽屉式导航</view>
			</view>
		</uni-drawer>
		
		<!-- 首页内容 -->
		<view class="content">
			<view>
				<text class="title">{{title}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	//导入侧边抽屉组件
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"

	export default {
		data() {
			return {
				title: 'Hello',
				isShowDrawer: false
			}
		},
		components: {
			uniDrawer
		},
		onLoad() {

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
