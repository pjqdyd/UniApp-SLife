<template>
	<view>

		<!-- 店铺的图片 -->
		<swiper class="shopImge-swiper" indicator-dots autoplay indicator-active-color="#ea5455" interval="3000">
			<swiper-item v-for="(item,index) of shopInfo.shopImageList" :key="index">
				<image mode="aspectFill" class="shop-image" :src="item.shopImage"></image>
			</swiper-item>
		</swiper>

		<!-- 店铺名和评分 -->
		<view class="shop-name-rate">
			<view class="iconfont recommend-icon">&#xe69a;</view>
			<view class="shop-name">{{shopInfo.shopName}}</view>
			<view class="shop-rate">
				<uni-rate size="19" disabled="true" :value='shopInfo.rate'></uni-rate>
				<text class="rate-num">{{shopInfo.rate}}</text>
			</view>
		</view>

		<!-- 位置信息 -->
		<view class="local-info-box" @click="showShopLocaltion">
			<text class="iconfont addr-text">&#xe611; {{shopInfo.localAddr}}</text>
			<text class="iconfont next-icon">&#xe618;</text>
		</view>

		<!-- 店主信息 -->
		<view class="shoper-info-box">
			<image class="shoper-face" :src="faceUrl" @click="goUserInfo"></image>
			<view class="shoper-info">
				<view class="shop-title">欢迎光临店铺,我是店主</view>
				<view class="shoper-name">{{nickname}}</view>
			</view>
			<view class="iconfont shoper-chat" @click="goChat">&#xe739;</view>
		</view>

		<!-- 店铺介绍 -->
		<view class="shop-introduce">—店铺介绍—</view>
		<view class="shop-info">
			<view class="shop-icon">
				<text class="iconfont icon" v-if="shopInfo.wifi">&#xe6b7; Wifi</text>
				<text class="iconfont icon" v-if="shopInfo.cash">&#xe621; 支持现金</text>
				<text class="iconfont icon" v-if="shopInfo.alipay">&#xe666; 支付宝</text>
				<text class="iconfont icon" v-if="shopInfo.wechatpay">&#xe63c; 微信支付</text>
			</view>
			<view class="shop-open-time">营业时间: {{shopInfo.openTime}}</view>
			<view class="shop-desc">{{shopInfo.mainInfo}}</view>
		</view>

		<!-- 底部的店铺按钮 -->
		<view class="shop-button">
			<view class="iconfont icon-butt" @click="shareShop" style="border-right: 1upx solid #707070;">&#xe613; 分享微信</view>
			<view class="iconfont icon-butt" @click="goNewsList(0)">&#xe64b; 店铺动态</view>
		</view>

	</view>
</template>

<script>
	import uniRate from "@/components/rate/uni-rate.vue"; //星星评分组件

	export default {
		components: {
			uniRate
		},
		data() {
			return {
				shopId: '', //店铺Id
				shoperId: '', //店主Id
				shopInfo: {},
				faceUrl: '',
				nickname: ''
			}
		},
		//res为上个页面传入的参数
		onLoad(res) {
			var url = this.server_Url; //读取在main.js中挂载的vue全局属性server_Url
			if (res.shopId != undefined || res.shopId != null) {
				this.shopId = res.shopId;
				let requestUrl = url + "/shopinfo?shopId=" + res.shopId;
				this.getShopInfo(requestUrl); //根据shopId获取店铺信息
			} else if (res.shoperId != undefined || res.shoperId != null) {
				this.shoperId = res.shoperId;
				let requestUrl = url + "/shopinfo?shoperId=" + res.shoperId;
				this.getShopInfo(requestUrl); //根据shoperId获取店铺信息
			} else {
				return;
			}
		},
		mounted() {
			this.rate = 5;
		},
		methods: {
			//获取店铺信息
			getShopInfo(requestUrl) {
				console.log(requestUrl)
				//请求服务端数据
				uni.request({
					url: requestUrl,
					success: (res) => {
						this.shopInfo = res.data;
						this.faceUrl = res.data.userInfo.faceImage;
						this.nickname = res.data.userInfo.nickname;
					}
				});
			},
			//跳转到用户详情页,将需要查询的userId存入缓存
			goUserInfo() {
				//console.log(this.newsItem.userInfo.id)
				uni.navigateTo({
					url: "/pages/userInfo/userInfo?userId=" + this.shopInfo.userInfo.userId
				})
			},
			//跳转到与店主聊天的界面
			goChat() {
				console.log("跳转到聊天界面")
				let user = this.shopInfo.userInfo;
				console.log('创建聊天界面' + user.userId)
				uni.navigateTo({
					url: "/pages/chatScreen/chatScreen?id=" + user.userId + "&faceUrl=" + user.faceImage + "&name=" + user.nickname
				})
			},
			//跳转到动态, type标识是发布的动态还是点赞的动态
			goNewsList(type) {
				uni.navigateTo({
					url: "/pages/newsList/newsList?userId=" + this.shoperId + "&type=" + type
				})
			},
			//分享店铺到微信()
			shareShop() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: "http://uniapp.dcloud.io/", //点击跳转链接
					title: "生活街分享",
					summary: "我在生活街APP发现了优质店铺,赶紧跟我一起来体验吧！",
					imageUrl: this.shopInfo.shopImageList[0].shopImage, //图片
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			//显示店铺的位置信息
			showShopLocaltion() {
				uni.openLocation({
					latitude: this.shopInfo.latitude,
					longitude: this.shopInfo.longitude,
					name: this.shopInfo.shopName,
					address: this.shopInfo.localAddr,
					success: function() {
						console.log('success');
					},
					fail() {
						uni.showToast({
							title: "获取店铺位置失败",
							icon: "error"
						})
					}
				});
			}
		},
		computed: {}
	}
</script>

<style lang="scss">
	.shopImge-swiper {
		width: 100%;
		height: 400upx;
		background-color: #eeeeee;

		.shop-image {
			width: 100%;
			height: 400upx;
		}
	}

	.shop-name-rate {
		width: 100%;
		height: 120upx;
		box-sizing: border-box;
		border-bottom: 2upx solid #eeeeee;
		background-color: #fff;

		.shop-name {
			height: 60upx;
			line-height: 60upx;
			font-size: 35upx;
			font-weight: 600;
			text-align: center;
			padding-left: 60upx;
			box-sizing: border-box;
			color: #666;
		}

		.shop-rate {
			height: 60upx;
			width: 100%;
			display: flex;
			justify-content: center;

			.rate-num {
				margin-left: 10upx;
				font-size: 32upx;
				color: rgb(255, 202, 65);
			}
		}

		,
		.recommend-icon {
			float: right;
			font-size: 50upx;
			color: rgb(255, 202, 65);
		}
	}

	.local-info-box {
		width: 100%;
		height: 100upx;
		display: flex;
		padding: 10upx 25upx 10upx 25upx;
		box-sizing: border-box;
		justify-content: space-between;
		background-color: #fff;
		.addr-text {
			line-height: 80upx;
			font-size: 35upx;
			color: #707070;
			width: 90%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.next-icon {
			line-height: 80upx;
			width: 10%;
			text-align: center;
			color: #707070;
		}
	}

	.local-info-box:active {
		background-color: #eeeeee;
	}

	.shoper-info-box {
		width: 100%;
		border-top: 15upx solid #eeeeee;
		border-bottom: 15upx solid #eeeeee;
		box-sizing: border-box;
		padding: 20upx 25upx 20upx 25upx;
		height: 180upx;
		display: flex;
		color: #707070;
		justify-content: space-between;
		background-color: #fff;
		.shoper-face {
			width: 110upx;
			height: 110upx;
			border-radius: 10upx;
		}

		.shoper-info {
			width: 460upx;
			height: 110upx;

			.shop-title {
				width: 460upx;
				height: 65upx;
				font-size: 32upx;
				color: #666;
				line-height: 65upx;
			}

			.shoper-name {
				width: 460upx;
				height: 45upx;
				font-size: 28upx;
				line-height: 45upx;
			}
		}

		.shoper-chat {
			width: 90upx;
			height: 110upx;
			line-height: 110upx;
			font-size: 50upx;
			text-align: center;
		}
	}

	.shoper-info-box:active {
		background-color: #eeeeee;
	}

	.shop-introduce {
		width: 100%;
		height: 80upx;
		text-align: center;
		line-height: 80upx;
		font-size: 32upx;
		color: #707070;
		border-bottom: 2upx solid #eeeeee;
		background-color: #fff;
	}

	.shop-info {
		width: 100%;
		height: 220upx;
		box-sizing: border-box;
		padding: 0 25upx 0 25upx;
		color: #707070;
		background-color: #fff;
		.shop-icon {
			width: 100%;
			height: 60upx;
			line-height: 60upx;

			.icon {
				margin-right: 30upx;
				font-size: 26upx;
			}
		}

		.shop-open-time {
			width: 100%;
			height: 60upx;
			font-size: 26upx;
			line-height: 60upx;
		}

		.shop-desc {
			width: 100%;
			height: 300upx;
			font-size: 28upx;
			line-height: 80upx;
		}
	}

	.shop-button {
		width: 100%;
		height: 100upx;
		padding: 20upx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		background-color: whitesmoke;
		border-top: 2upx solid #eeeeee;
		display: flex;
		justify-content: space-between;

		.icon-butt {
			width: 50%;
			color: #707070;
			font-size: 35upx;
			text-align: center;
			line-height: 60upx;
		}
	}
</style>
