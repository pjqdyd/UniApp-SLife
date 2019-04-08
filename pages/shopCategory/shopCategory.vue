<template>
	<view>
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

		<!-- 附近分类商铺列表 -->
		<view v-for="(item, index) in localList" :key="index" @click="goShopInfo(item.shopId)">
			<local-item :shopItem="item"></local-item>
		</view>


	</view>
</template>

<script>
	
	import uniCollapse from '@/components/collapse/uni-collapse.vue'; //折叠面板组件
	import uniCollapseItem from '@/components/collapse/uni-collapse-item.vue';	
	import localItem from '@/components/local/local-item.vue'; //附近商铺列表item组件

	export default {
		onLoad(params) {
			console.log(params.categoryName);
			this.currentCateName = params.categoryName; //设置上个页面传入的分类
			
			//设置导航栏标题
			uni.setNavigationBarTitle({
				title: this.currentCateName
			});
		},
		components: {
			uniCollapse,
			uniCollapseItem,
			localItem
		},
		updated() {
		},
		watch:{
			//监听当前分类值的变化,根据分类查询符合该分类的店铺列表TODO
			'currentCateName': function(value) {
				
				this.localList = [];
				this.getCateShopList();//重新根据分类请求一次数据
				
				//重新设置导航栏标题
				uni.setNavigationBarTitle({
					title: this.currentCateName
				});
			}
		},
		data() {
			return {
				cateIcon: "../../static/local/category.png", //分类图标
				isShowCate: false, //是否显示分类
				currentCateName: '默认', //当前分类的名字
				
				localList: [], //附近商铺列表,用来存放每一页的list

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
		methods: {
			//监听子组件的点击展开收起事件(设置当前组件的isShowCate值,保证isShowCate的值与子组件的isOpen一致)
			handIsOpen(isopen) {
				this.isShowCate = isopen
			},
			//点击了分类
			changeCategory(index) {
				this.currentCateName = this.categroyList[index].cateName;
				this.isShowCate = false //点击后收起分类栏
			},
			//跳转到店铺详情页
			goShopInfo(shopId) {
				console.log("跳转到店铺详情页, 店铺Id=" + shopId)
				uni.navigateTo({
					url: '../shopDetail/shopDetail?shopId=' + shopId
				});
			},
			//请求后端数据,获取分类的商店列表TODO
			getCateShopList() {
				var url = this.server_Url; //读取在main.js中挂载的vue全局属性server_Url
				console.log(url + "/locallist")
				//请求服务端数据
				uni.request({
					url: url + '/locallist?category='  + this.currentCateName,
					success: (res) => {
						console.log("请求分类" + this.currentCateName +"的locallist数据成功..")
						var list = res.data.localList; //新的数据列表	
						this.localList = this.localList.concat(list);	
					}
				});
			},
		}
	}
</script>

<style>
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
