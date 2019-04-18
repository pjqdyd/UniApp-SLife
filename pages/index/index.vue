<template>
	<view class="local-page">
		<!-- 使用侧边栏组件 -->
		<uni-drawer :visible="isShowDrawer" :mask="true" @close="handDrawerClose">
			<view style="padding:20upx;">
				<drawer-list></drawer-list>
			</view>
		</uni-drawer>

		<!--  #ifdef APP-PLUS || H5  -->
		<view class="category-box"><text class="iconfont category-icon">&#xe614;</text>热门店铺
		</view>
		<!--  #endif -->

		<!--  #ifdef MP-WEIXIN  -->
		<view class="category-box" style="height: 55upx;">
			<text class="iconfont category-icon" @click="handWxOpenDrawer" style="font-size: 34upx;">&#xe622;<text style="color: black;margin-left: 10upx;">展开</text></text>
			<text class="iconfont category-icon-wx" @click="wxChooseLocal">&#xe611;定位</text>
		</view>
		<!--  #endif -->

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
			推荐店铺
			<text class="current-cate">当前分类: 推荐</text>
		</view>

		<!-- 附近商铺列表 -->
		<view v-for="(item, index) in localList" :key="index" @click="goShopInfo(item.shopId)">
			<local-item :shopItem="item"></local-item>
		</view>

		<!-- 底部的加载更多组件 -->
		<uni-load-more :status="loadMoreStatus"></uni-load-more>

	</view>
</template>

<script>
	import amap from '../../common/amap-wx.js'; //地图工具

	import uniDrawer from "./component/uni-drawer/uni-drawer.vue"; //导入侧边抽屉组件
	import drawerList from "./component/drawer-list/drawer-list.vue"; //导入侧边栏的列表内容

	import localSwiper from "./component/local-swiper.vue"; //3d轮播图组件
	import localItem from '@/components/local/local-item.vue'; //附近商铺列表item组件
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"; //加载更多组件

	export default {
		components: {
			uniDrawer,
			drawerList,
			localSwiper,
			localItem,
			uniLoadMore
		},
		data() {
			return {
				amapPlugin: null,
				key: 'c34874146676f455454f646g963fc',
				//位置信息对象
				localInfo: {
					longitude: '',
					latitude: '',
					addressName: ''
				},
				loadMoreStatus: "more", //加载的状态
				isShowDrawer: false, //是否显示侧边栏

				localList: [], //附近商铺列表,用来存放每一页的list
				page: 1, //当前页
				total: 0, //总元素数
				totalPage: 0, //总页数

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
		created() {
			uni.startPullDownRefresh({});
		},
		//updated() {},
		//页面下拉刷新
		onPullDownRefresh() {
			console.log('附近页refresh');

			this.getLocalShopList(); //重新获取附近商铺列表数据
		},
		//页面上拉触底,加载更多(仅在H5有效)
		onReachBottom() {
			//TODO
			var currentPage = this.page;
			var totalPage = this.totalPage;
			this.loadMoreStatus = "loading";
			//判断当前页数和总页数是否相等,(没有更多了)
			if (currentPage == totalPage) {
				this.loadMoreStatus = "noMore";
				return;
			}
			this.page++;
			this.getLocalShopList(); //获取更多一页数据 TODO
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
			//侧边栏的关闭事件
			handDrawerClose: function() {
				this.isShowDrawer = false
				console.log("侧边栏关闭")
			},
			//点击了icon分类
			changeCategory(index) {
				let currentCateName = this.categroyList[index].cateName; //获取点击分类的名字
				//跳转到分类的店铺列表页
				uni.navigateTo({
					url: "/pages/shopCategory/shopCategory?categoryName=" + currentCateName
				})
			},
			//跳转到店铺详情页
			goShopInfo(shopId) {
				console.log("跳转到店铺详情页, 店铺Id=" + shopId)
				uni.navigateTo({
					url: '../shopDetail/shopDetail?shopId=' + shopId
				});
			},
			//请求后端数据,获取附近商店列表TODO
			getLocalShopList() {
				var url = this.server_Url; //读取在main.js中挂载的vue全局属性server_Url
				console.log(url + "/locallist")
				//请求服务端数据
				uni.request({
					url: url + '/locallist',
					success: (res) => {
						setTimeout(() => {
							uni.stopPullDownRefresh(); //停止下拉刷新
						}, 500)

						console.log("请求locallist数据成功成功..")
						//判断当前page是否是第一页,如果是就设置localList为空
						if (this.page == 1) {
							this.localList = []
						}
						var list = res.data.localList; //新的数据列表	

						this.localList = this.localList.concat(list);
						this.totalPage = res.data.totalPage;
						this.total = res.data.total;
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
			},
			// #ifdef MP-WEIXIN
			//在微信上点击了展开
			handWxOpenDrawer(){
				this.isShowDrawer = true
			}
			// #endif
		},
		//监听导航栏的"三"或"O"的点击事件(展开/关闭侧边栏)(手动定位)
		onNavigationBarButtonTap(e) {
			if (e.index == 1) {
				if (this.isShowDrawer == false) {
					this.isShowDrawer = true
					console.log("展开侧边栏")
				} else {
					this.isShowDrawer = false
					console.log("关闭侧边栏")
				}
			} else if (e.index == 0) {
				this.chooseLocalInfo();
				console.log("点击了手动重新定位")
			} else {
				return;
			}
		},
		//监听导航栏的搜索框的输入确认事件
		onNavigationBarSearchInputConfirmed(res) {
			//跳转到分类店铺页,跟上搜索文本的参数res.text
			uni.navigateTo({
				url: "/pages/shopCategory/shopCategory?categoryName=" + res.text
			})
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
