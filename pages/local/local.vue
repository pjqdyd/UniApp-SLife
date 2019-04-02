<template>
	<view class="local-page">

		<view class="category-box"><text class="iconfont category-icon">&#xe614;</text>推荐店铺
			<!--  #ifdef MP-WEIXIN  -->
			<text class="iconfont category-icon-wx" @click="wxChooseLocal">&#xe611;定位</text>
			<!--  #endif -->
		</view>

		<!-- 3d轮播图 -->
		<local-swiper></local-swiper>

		<!-- 分类图标icon的滑动区块 -->
		<swiper class="swiper">
			<swiper-item v-for="(page,index1) of Pages" :key="index1">

				<view class="icon-cate-box" v-for="item of page" :key="item.id" @click="changeCategory(item.id)">
					<view class="icon-image">
						<image class="icon-image-content" :src="item.icon"></image>
						<text class="icon-desc">{{item.cateName}}</text>
					</view>
				</view>

			</swiper-item>
		</swiper>

		<view class="category-box">
			<text class="iconfont category-icon">&#xe610;</text>
			分类店铺
			<text class="current-cate">当前分类: {{currentCateName}}</text>
		</view>

		<!-- 附近商铺列表 -->
		<view v-for="(item, index) in localList" :key="index">
			<local-item :shopItem="item"></local-item>
		</view>

		<uni-load-more status="loading"></uni-load-more>
	</view>
</template>

<script>
	import conf from '../../common/config.js'; //全局的一些配置信息
	import utils from '../../common/utils.js'; //一些工具方法
	import amap from '../../common/amap-wx.js'; //地图工具

	import localSwiper from "./component/local-swiper.vue"; //3d轮播图组件
	import localItem from '@/components/local/local-item.vue'; //附近商铺列表item组件
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"; //加载更多组件


	export default {
		components: {
			localSwiper,
			localItem,
			uniLoadMore
		},
		data() {
			return {
				amapPlugin: null,
				key: '2c4146676963fc2442e9aeaf6dea6c97',
				//位置信息对象
				localInfo: {
					longitude: '',
					latitude: '',
					addressName: ''
				},

				localList: [],

				currentCateName: '默认', //当前分类的名字

				categroyList: [{
					id: "0",
					cateName: "超市",
					icon: "../../static/local/shop.png"
				}, {
					id: "1",
					cateName: "文具",
					icon: "../../static/local/pencil.png"
				}, {
					id: "2",
					cateName: "餐馆",
					icon: "../../static/local/eat.png"
				}, {
					id: "3",
					cateName: "诊所",
					icon: "../../static/local/clinic.png"
				}, {
					id: "4",
					cateName: "水果店",
					icon: "../../static/local/fruit.png"
				}, {
					id: "5",
					cateName: "奶茶店",
					icon: "../../static/local/drink.png",
					color: ""
				}, {
					id: "6",
					cateName: "电影院",
					icon: "../../static/local/movie.png"
				}, {
					id: "7",
					cateName: "理发店",
					icon: "../../static/local/hair.png"
				}, {
					id: "8",
					cateName: "KTV",
					icon: "../../static/local/ktv.png"
				}, {
					id: "9",
					cateName: "电子产品",
					icon: "../../static/local/mobil.png"
				}]
			}
		},
		onLoad() {
			var that = this;
			//高德小程序 SDK 的实例对象
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			});
			//读取缓存中的位置信息localInfo
			uni.getStorage({
				key: 'localInfo',
				success(res) {
					console.log("附近页的缓存的位置信息:" + JSON.stringify(res.data))
					if (res.data == null || res.data == undefined || res.data == '') {
						that.getRegeo(); //如果缓存没有位置信息,就获取并保存位置信息(高德)
					} else {
						that.getLocalShopList(); //TODO根据位置信息加载附近的店铺
					}
				},
				fail() {
					that.getRegeo(); //获取并保存位置信息(高德)
				}
			});
		},
		created() {},
		updated() {},
		//页面下拉刷新
		onPullDownRefresh() {
			console.log('附近页refresh');

			this.getLocalShopList(); //重新获取附近商铺列表数据
			
// 			setTimeout(function() {
// 				uni.stopPullDownRefresh();
// 			}, 1000);
		},
		//页面上拉触底
		onReachBottom() {
			//TODO
			console.log('附近页refresh-触底,加载更多附近商铺');
		},
		mounted() {},
		computed: {
			//计算icon在轮播图的分页
			Pages() {
				const pages = []
				this.categroyList.forEach((item, index) => {
					const page = Math.floor(index / 8)
					if (!pages[page]) {
						pages[page] = []
					}
					pages[page].push(item)
				})
				return pages
			}
		},
		methods: {
			//点击了分类
			changeCategory(index) {
				this.currentCateName = this.categroyList[index].cateName;
			},
			//请求后端数据,获取附近商店列表TODO
			getLocalShopList() {
				let url = conf.serverUrl;
				console.log(url + "/locallist")
				//请求服务端数据
				uni.request({
					url: url + '/locallist',
					success: (res) => {
						uni.stopPullDownRefresh();//停止下拉刷新
						console.log("请求locallist数据成功成功..")
						let list = res.data.localList
						this.localList = this.localList.concat(list);
					}
				});
			},
	
			// #ifdef  MP-WEIXIN
			wxChooseLocal() {
				console.log("微信-手动获取位置信息")
				this.chooseLocalInfo();
			},
			// #endif
			
			//获取位置信息(使用高德地图sdk的api),并更新保存地址对象到缓存中
			getRegeo() {
				this.amapPlugin.getRegeo({
					success: (data) => {
						console.log(data)
						this.localInfo = {
							addressName: data[0].name,
							longitude: data[0].longitude,
							latitude: data[0].latitude
						}
						console.log(this.localInfo.addressName)
						uni.showModal({
							title: "提示",
							content: "当前位置' " + this.localInfo.addressName + " '如不准确请右上角手动定位",
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})
						uni.setStorage({
							key: 'localInfo',
							data: this.localInfo,
							success: function() {
								console.log('更新保存地址信息对象localtionInfo成功(高德小程序API)');
							}
						});
					},
					fail: function() {
						uni.showModal({
							title: "提示",
							content: "未获取到位置信息,请右上角手动定位"
						})
						console.log("this.amapPlugin获取位置信息失败(高德小程序API)")
					}
				});
			},
			//手动选择位置信息,并保存到缓存中(手动选择的位置比较准确,所以覆盖高德api的地址信息)
			chooseLocalInfo() {
				var that = this;
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						that.localInfo = {
							addressName: res.address,
							longitude: res.longitude,
							latitude: res.latitude
						}
						uni.setStorage({
							key: 'localInfo',
							data: that.localInfo,
							success: function() {
								console.log('更新保存地址信息对象localtionInfo成功(手动选择的地址)');
							}
						});
					}
				});
			}
		},
		//监听导航栏的"<"或"O"的点击事件
		onNavigationBarButtonTap(e) {
			console.log(e.index)
			if (e.index == 1) {
				uni.switchTab({
					url: '/pages/index/index'
				});
			} else if (e.index == 0) {
				this.chooseLocalInfo();
				console.log("点击了手动重新定位")
			} else {
				return;
			}
		}
	}
</script>

<style lang="scss">
	.local-page {
		width: 750upx;
		height: 100%;
		background-color: #eeeeee;
	}

	.category-box {
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		box-sizing: border-box;
		padding-right: 20upx;
		padding-left: 10upx;
		border-bottom: 1upx solid #eeeeee;
		font-size: 30upx;
		background-color: #fff;
	}

	.category-icon {
		height: 50upx;
		font-size: 42upx;
		line-height: 50upx;
		float: left;
		margin-right: 10upx;
		color: #ea5455;
	}

	/*  #ifdef  MP-WEIXIN  */
	.category-icon-wx {
		height: 50upx;
		font-size: 42upx;
		line-height: 50upx;
		float: right;
		margin-right: 10upx;
		font-size: 32upx;
		color: #ea5455;
	}

	/*  #endif  */

	.current-cate {
		float: right;
		font-size: 26upx;
		line-height: 50upx;
		color: #707070;
	}

	.swiper {
		border-top: 5upx solid #eeeeee;
		border-bottom: 5upx solid #eeeeee;
		background-color: #fff;
	}

	.icon-cate-box {
		position: relative;
		overflow: hidden;
		float: left;
		width: 25%;
		height: 50%;
	}

	.icon-cate-box:active {
		background-color: #eeeeee;
	}

	.icon-image {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 40upx;
		box-sizing: border-box;
		padding: 10upx;
	}

	.icon-image-content {
		display: block;
		margin: 0 auto;
		width: 100upx;
		height: 100upx;
	}

	.icon-desc {
		position: absolute;
		left: 0;
		right: 0;
		height: 40upx;
		font-size: 30upx;
		color: #333;
		line-height: 40upx;
		text-align: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
