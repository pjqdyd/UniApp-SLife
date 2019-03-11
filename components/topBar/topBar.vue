<!--自定义的顶部栏组件 dev 已弃用-->
<template>
	<view>
		<view class="topbar" :style="'background-color:' + bgColor" :showFace="showFace">
			
			<view class="iconfont back" v-if="!showFace">&#xe63f;</view> <!-- 返回 -->
			<image class="face" v-if="showFace" src="../../static/login/noFace.png"></image> <!-- 头像 -->
			<view class="title" :title="topTitle">{{topTitle}}</view> <!-- 标题 -->
		
		</view>
	</view>
</template>

<script>
	export default {
		name: "TopBar",
		
		props: {
			//接收父组件的背景颜色值
			bgColor: {
				type: String,
				default: "#ea5455;" //顶部栏的默认bgcolor属性
			},
			//接收顶部栏标题
			topTitle: {
				type: String,
				default: "生活街"
			},
			//是否显示头像图标
			showFace: {
				type: Boolean,
				default: false
			}
		},
		methods: {

		}
	}
</script>

<style>
	.topbar {
		width: 100%;
		height: 65px;
		text-align: center;
	}

	.back {
		position: absolute;
		left: 5px;
		line-height: 65px;
		font-size: 20px;
		color: #fff;
	}

	.face {
		width: 40px;
		height: 40px;
		border: 1px solid #fff;
		border-radius: 100%;
		position: absolute;
		top: 12px;
		left: 5px;
	}

	.title {
		color: #FFFFFF;
		line-height: 65px;
	}
</style>
