<template>
	<view class="local-page">

		<!-- <uni-collapse @change="change"> -->
		<!-- 折叠面板 -->
		<uni-collapse>
			<!--轮播图 name用于标识该标题的icon样式 -->
			<uni-collapse-item title="店铺推荐" open="true" name="1">
				<!-- 使用轮播图组件 -->
				<local-swiper></local-swiper>
			</uni-collapse-item>

			<!-- 分类 open是是否展开分类-->
			<uni-collapse-item title="分类" :open="isShowCate" name="2" :currentName="currentCateName" @onIsOpen="handIsOpen">

				<view class="category-box" v-for="(item, index) in categroyList" :key="index" @click="changeCategory(index)">
					<view class="iconfont category-icon" v-html="item.icon"></view>
					<view>{{item.cateName}}</view>
				</view>

			</uni-collapse-item>

		</uni-collapse>

		<!-- 附近商铺列表 -->
		<view v-for="(item, index) in localList" :key="index">
			<local-item :shopItem="item"></local-item>
		</view>

	</view>
</template>

<script>
	import conf from '../../common/config.js'; //全局的一些配置信息
	import utils from '../../common/utils.js'; //一些工具方法
	import amap from '../../common/amap-wx.js'; //地图工具

	import localSwiper from "./component/local-swiper.vue";
	import uniCollapse from './component/collapse/uni-collapse.vue';
	import uniCollapseItem from './component/collapse/uni-collapse-item.vue';
	import localItem from './component/local-item.vue';


	export default {
		components: {
			localSwiper,
			uniCollapse,
			uniCollapseItem,
			localItem
		},
		data() {
			return {
				amapPlugin: null,
				key: '2c4146676963fc2442e9aeaf6dea6c97',

				localList: [],
				
				addressName: '',
				weather: {
					hasData: false,
					data: []
				},
				isShowCate: false, //是否显示分类
				currentCateName: '默认', //当前分类的名字

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
			//高德小程序 SDK 的实例对象
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			});
		},
		created() {
			var url = conf.serverUrl;
			console.log(url + "/locallist")
			//请求服务端数据
			uni.request({
				url: url + '/locallist',
				success: (res) => {
					console.log("请求locallist数据成功成功..")
					let list = res.data.localList
					this.localList = this.localList.concat(list);
				}
			});

			//获取经纬度
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
				},
				fail: function() {
					console.log("uni.getLocation获取位置信息失败")
				}
			});
		},
		mounted() {
			this.getRegeo()
		},
		methods: {
			//点击了分类
			changeCategory(index) {
				this.currentCateName = this.categroyList[index].cateName;
				this.isShowCate = false //点击后收起分类栏
			},
			//监听子组件的点击展开收起事件(设置当前组件的isShowCate值,保证isShowCate的值与子组件的isOpen一致)
			handIsOpen(isopen){
				this.isShowCate = isopen
			},
			//获取位置信息
			getRegeo() {
				this.amapPlugin.getRegeo({
					success: (data) => {
						console.log(data)
						this.addressName = data[0].name;
						console.log(this.addressName)
					},
					fail: function() {
						console.log("this.amapPlugin获取位置信息失败")
					}
				});
			},
			//选择位置信息
			getLocationInfo() {
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
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
</style>
