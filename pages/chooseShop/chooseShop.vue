<template>
	<view class="local-page">

		<!-- <uni-collapse @change="change"> -->
		<!-- 折叠面板 -->
		<uni-collapse>
			<!-- 分类 open是是否展开分类-->
			<uni-collapse-item title="分类" :open="isShowCate" :icon="cateIcon" @onIsOpen="handIsOpen">

				<view class="category-box" v-for="(item, index1) in categroyList" :key="index1" @click="changeCategory(index1)">
					<view class="iconfont category-icon" v-html="item.icon"></view>
					<view>{{item.cateName}}</view>
				</view>

			</uni-collapse-item>
		</uni-collapse>

		<radio-group @change="changeRadio">
			<!-- 附近商铺列表选框 -->
			<view v-for="(item, index) in localList" :key="index">

				<!-- 单个选框 -->
				<view class="local-shop-box">
					<image class="shop-image" :src="serverUrl + item.imageUrl"></image>
					<view class="shop-info">
						<!-- 商店名称 -->
						<view class="name-box">{{item.shopName}}</view>
						<!-- 地址距离信息 -->
						<view class="local-addr-box">
							<view class="local-box">
								<text class="iconfont text">&#xe611; {{item.shopAddr}} </text>
							</view>
							<!-- <view class="distance-box">距离: {{item.distance}}</view> -->
							<shop-distance :shopLat="item.shopLatitude" :shopLon="item.shopLongitude" :localInfo="localInfo"></shop-distance>
						</view>
					</view>
					<view class="shop-radio">
						<radio :value=" index + '' "></radio>
					</view>
				</view>

			</view>

		</radio-group>

		<!-- 底部的确定按钮 -->
		<view class="cate-butt-box">
			<view class="cate-text">当前分类: {{currentCateName}}</view>
			<button class="cate-button" @click="handConfim">确认</button>
		</view>

	</view>
</template>

<script>
	import utils from '../../common/utils.js'; //一些工具方法
	import amap from '../../common/amap-wx.js'; //地图工具

	import uniCollapse from '@/components/collapse/uni-collapse.vue';
	import uniCollapseItem from '@/components/collapse/uni-collapse-item.vue';
	import shopDistance from './distance/shop-distance.vue';

	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
			shopDistance
		},
		data() {
			return {
				localList: [],

				serverUrl: '',
				//位置信息对象
				localInfo: {
					longitude: '',
					latitude: '',
					addressName: ''
				},

				cateIcon: "../../static/local/category.png", //分类图标
				isShowCate: false, //是否显示分类
				currentCateName: '默认', //当前分类的名字
				chooseShop: {}, //选中的店铺对象

				categroyList: [{
					id: "0",
					cateName: "超市",
					icon: "&#xe607;"
				}, {
					id: "1",
					cateName: "餐馆",
					icon: "&#xe6be;"
				}, {
					id: "2",
					cateName: "文具",
					icon: "&#xe663;"
				}, {
					id: "3",
					cateName: "诊所",
					icon: "&#xe732;"
				}, {
					id: "4",
					cateName: "水果店",
					icon: "&#xe608;"
				}, {
					id: "5",
					cateName: "奶茶店",
					icon: "&#xe665;",
					color: ""
				}, {
					id: "6",
					cateName: "电影院",
					icon: "&#xe789;"
				}, {
					id: "7",
					cateName: "理发店",
					icon: "&#xe620;"
				}, {
					id: "8",
					cateName: "KTV",
					icon: "&#xe65d;"
				}, {
					id: "9",
					cateName: "电子产品",
					icon: "&#xe767;"
				}]
			}
		},

		onLoad() {
			var that = this;
			//读取缓存中的位置信息localInfo
			uni.getStorage({
				key: 'localInfo',
				success(res) {
					console.log("附近页的缓存的位置信息:" + JSON.stringify(res.data))
					if (res.data == null || res.data == undefined || res.data == '') {
						//如果缓存没有位置信息
						uni.showToast({
							title: "未获取到您的位置信息",
							icon: "none"
						})
					} else {
						that.localInfo = res.data;
						that.getAllLocalShop(); //TODO根据位置信息加载附近的店铺
					}
				},
				fail() {
					uni.showToast({
						title: "未获取到您的位置信息",
						icon: "none"
					})
				}
			});
			
			this.serverUrl = this.server_Url; //设置全局的服务url
		},
		created() {},
		onReachBottom() {},
		mounted() {},
		methods: {
			//请求后端获取所有附近的店铺
			getAllLocalShop() {
				var url = this.server_Url;
				var that = this;
				//请求服务端数据
				uni.request({
					url: url + '/slife/shopList/allLocalShop?latitude=' + this.localInfo.latitude + "&longitude=" + this.localInfo.longitude,
					success: (res) => {
						let result = res.data;
						if(result.code == 200){
							console.log("请求locallist数据成功成功..")
							that.localList = [];
							that.localList = that.localList.concat(result.data);
						}else{
							uni.showToast({
								title: "加载数据失败",
								icon: "none"
							})
						}
					},
					fail() {
						uni.showToast({
							title: "加载数据失败",
							icon: "none"
						})
					}
				});
			},
			//点击了确定,将选中的shop对象保存到缓存
			handConfim() {
				let shopId = this.chooseShop.shopId;
				if (shopId == null || shopId == '' || shopId == undefined) {
					uni.showToast({
						icon: "none",
						title: "您还未选择"
					})
				} else {
					uni.setStorage({
						key: 'chooseShop',
						data: this.chooseShop,
						success: function() {
							console.log('保存选中的商铺对象成功');
						}
					});
					uni.navigateBack({
						delta: 1
					});
				}
			},
			//获取选框的值,设置选中的对象
			changeRadio(e) {
				console.log(JSON.stringify(e.detail))
				let index = e.detail.value;
				console.log(index)
				this.chooseShop = this.localList[index]
			},
			//点击了分类
			changeCategory(index) {
				this.currentCateName = this.categroyList[index].cateName;
				this.isShowCate = false //点击后收起分类栏
			},
			//监听子组件的点击展开收起事件(设置当前组件的isShowCate值,保证isShowCate的值与子组件的isOpen一致)
			handIsOpen(isopen) {
				this.isShowCate = isopen
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
				console.log("点击了重新定位")
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
		padding-bottom: 120upx;
	}

	.category-box {
		padding: 8upx 0 8upx 0;
		border-left: 30upx solid #fff;
		border-right: 30upx solid #fff;
		box-sizing: border-box;
		border-bottom: #eeeeee solid 1upx;
	}

	.category-box:active {
		background-color: #eeeeee;
	}

	.category-icon {
		font-size: 36upx;
		float: left;
		margin-right: 10upx;
		color: #ea5455;
	}

	.local-shop-box {
		width: 750upx;
		height: 160upx;
		padding: 10upx 20upx 10upx 20upx;
		box-sizing: border-box;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		border-bottom: 1upx solid #eeeeee;
	}

	.shop-image {
		border-radius: 10upx;
		width: 140upx;
		height: 140upx;
	}

	.shop-info {
		width: 400upx;
		height: 100%;
		box-sizing: border-box;
		padding: 10upx 0 10upx 10upx;
	}

	.name-box {
		width: 400upx;
		height: 60upx;
		font-size: 34upx;
		line-height: 60upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.shop-radio {
		text-align: center;
		width: 110upx;
		height: 100%;
		box-sizing: border-box;
		padding: 50upx;
	}

	.cate-butt-box {
		width: 100%;
		height: 110upx;
		background-color: whitesmoke;
		border-top: 2upx solid #ccc;
		z-index: 999;
		position: fixed;
		box-sizing: border-box;
		bottom: 0;
		padding: 20upx 20upx 10upx 20upx;
	}

	.cate-text {
		font-size: 36upx;
		color: #707070;
		float: left;
		line-height: 80upx;
	}

	.cate-button {
		width: 200upx;
		height: 70upx;
		float: right;
		color: #fff;
		background-color: #ea5455;
		line-height: 80upx;
	}

	.local-addr-box {
		width: 420upx;
		height: 45upx;
		display: flex;
		justify-content: space-between;
	}

	.local-box {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		width: 280upx;
		height: 40upx;
		overflow: hidden;
	}

	.text {
		line-height: 50upx;
		font-size: 26upx;
		color: #707070;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
