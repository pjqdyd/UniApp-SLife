<template>
	<view class="local-page">
		<!-- 使用侧边栏组件 -->
		<uni-drawer :visible="isShowDrawer" :mask="true" @close="handDrawerClose">
			<view style="padding:30upx;">
				<view class="uni-title">抽屉式导航</view>
			</view>
		</uni-drawer>

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
		<view v-for="(item, index) in localList" :key="index" @click="goShopInfo(item.shopId)">
			<local-item :shopItem="item"></local-item>
		</view>

		<!-- 仅在H5显示加载更多 -->
		<!-- #ifdef H5 -->
		<uni-load-more :status="loadMoreStatus"></uni-load-more>
		<!-- #endif -->

		<!-- 在app端和小程序显示分页 -->
		<!-- #ifdef APP-PLUS || MP-WEIXIN-->
		<uni-pagination pageSize="7" :total="total" :current="page" @change="handPageChange"></uni-pagination>
		<!-- #endif -->

	</view>
</template>

<script>
	import conf from '../../common/config.js'; //全局的一些配置信息
	//import utils from '../../common/utils.js'; //一些工具方法
	import amap from '../../common/amap-wx.js'; //地图工具

	import uniDrawer from "./component/uni-drawer/uni-drawer.vue"; //导入侧边抽屉组件
	import localSwiper from "./component/local-swiper.vue"; //3d轮播图组件
	import localItem from '@/components/local/local-item.vue'; //附近商铺列表item组件
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"; //加载更多组件
	import uniPagination from "@/components/uni-pagination/uni-pagination.vue"; //分页组件


	export default {
		components: {
			uniDrawer,
			localSwiper,
			localItem,
			uniLoadMore,
			uniPagination
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
				loadMoreStatus: "more", //加载的状态
				isShowDrawer: false,	//是否显示侧边栏

				localList: [], //附近商铺列表,用来存放每一页的list
				page: 1, //当前页
				total: 0, //总元素数
				totalPage: 0, //总页数

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
		// #ifdef H5
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
			this.page ++;
			this.getLocalShopList(); //获取更多一页数据 TODO
			console.log('附近页refresh-触底,加载更多附近商铺');
		},
		// #endif

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
			//点击了分类
			changeCategory(index) {
				this.currentCateName = this.categroyList[index].cateName;
				var that = this;
				 //重新根据分类查询一次
				uni.startPullDownRefresh({
					success() {
						setTimeout(()=>{
							uni.showToast({
								icon: "none",
								title: "切换店铺: " +  that.currentCateName
							})
						},1000)				
					}
				});
			},
			//跳转到店铺详情页
			goShopInfo(shopId){
				console.log("跳转到店铺详情页, 店铺Id=" + shopId)
				uni.navigateTo({
					url: '../shopDetail/shopDetail?shopId=' + shopId
				});
			},
			//请求后端数据,获取附近商店列表TODO
			getLocalShopList() {
				var url = conf.serverUrl; //后端服务的base url
				console.log(url + "/locallist")
				//请求服务端数据
				uni.request({
					url: url + '/locallist',
					success: (res) => {
						setTimeout(() => {
							uni.stopPullDownRefresh(); //停止下拉刷新
						}, 200)

						console.log("请求locallist数据成功成功..")
						//判断当前page是否是第一页,如果是就设置localList为空
						if (this.page == 1) {
							this.localList = []
						}
						var list = res.data.localList; //新的数据列表	

						// #ifdef H5
						this.localList = this.localList.concat(list);
						this.totalPage = res.data.totalPage;
						this.total = res.data.total;
						// #endif

						// #ifdef APP-PLUS || MP-WEIXIN
						this.localList = list;
						this.totalPage = res.data.totalPage;
						this.total = res.data.total;
						// #endif
					}
				});
			},
			
			// #ifdef APP-PLUS || MP-WEIXIN
				handPageChange(val){
					console.log(val.current) //当前分页页数
					//根据分页的页数,请求后端数据
					if(val.current == this.totalPage){
						console.log("没有更多了")
						return;
					}else{
						this.page = val.current;
						this.getLocalShopList(); //TODO
					}		
				},
			// #endif

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
