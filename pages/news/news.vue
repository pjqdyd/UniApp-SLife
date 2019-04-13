<template>
	<view>
		<!-- 顶部分类栏 -->
		<view class='category-box'>
			<view class="category-item" :class="[currentItem==0 ? 'active' : '']" data-item='0' @click='handTapItem'>最新</view>
			<view class="category-item" :class="[currentItem==1 ? 'active' : '']" data-item='1' @click='handTapItem'>推荐</view>
			<view class="category-item" :class="[currentItem==2 ? 'active' : '']" data-item='2' @click='handTapItem'>热门</view>
		</view>

		<!-- 左右滑动组件,对应顶部分类栏,swiper组件的current属性用于控制当前显示什么类 -->
		<swiper class='swiper-box' :current='currentItem' @change='switchPage' :style="{height: listHeight + 'px'}">

			<!-- 分别对应3个分类页 -->
			<swiper-item v-for="i in [0,1,2]" :key="i">
				<view :id="'swiperList' + i" style="background-color: #eeeeee; overflow: hidden;">
					<view v-for="(item,index1) in homeList[i].list" :key="index1">
						<uni-media-list :itemData="item" @click="goDetail(item , 0)" @clickComment="goDetail(item, 1)"></uni-media-list>
					</view>
				</view>
				<uni-load-more :status="loadingStatus"></uni-load-more>
			</swiper-item>

		</swiper>

		<!-- 悬浮的发布按钮 -->
		<div>
			<image class="create-icon" src="../../static/news/create.png" @click="handCreateCilck"></image>
		</div>
	</view>
</template>

<script>
	import uniMediaList from "./component/uni-media-list/uni-media-list.vue";
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"

	import utils from '../../common/utils.js'; //一些工具方法

	export default {
		components: {
			uniMediaList,
			uniLoadMore
		},
		data() {
			return {
				loadingStatus: "more", //加载状态
				isShowDrawer: false,
				currentItem: 1, //当前的分类序号
				categoryList: ["最新", "推荐", "热门"],

				//位置信息对象
				localInfo: {
					longitude: '',
					latitude: '',
					addressName: ''
				},
				
				//用来存储动态页的3个tab分类页list数据对象
				homeList: [
					{	//最新页的数据
						page: 1,
						total: 0,
						totalPage: 0,
						list: []
					},{	//推荐页的数据
						page: 1,
						total: 0,
						totalPage: 0,
						list: []
					},{	//热门页的数据
						page: 1,
						total: 0,
						totalPage: 0,
						list: []
					}
				],

				listHeight: 0
			}
		},
		onLoad() {
			console.log("动态页面加载");
			this.setTabbarReddot(); //设置红点
		},
		created() {
			//查询默认的推荐分类的第1页数据
			this.getNewsList(1, this.currentItem);
		},
		mounted() {
			//获取并设置列表的高度信息(延迟是防止微信小程序节点还未挂载)
			//this.currentItem用于区分设置3个中哪个列表页的高度
			setTimeout(() => {
				this.getListHeight(this.currentItem);
			}, 200);
		},
		updated() {},
		//页面下拉刷新
		onPullDownRefresh() {
			console.log('refresh');
			let currentItem = this.currentItem;	
			this.homeList[currentItem].page = 1;
			this.homeList[currentItem].list = []; //清空数据	
			//重新获取当前分类的第1页数据
			this.getNewsList(1, currentItem);
			setTimeout(()=>{
				this.getListHeight(currentItem); //重新设置当前分类页面高度
			},200)
		},
		//页面上拉触底
		onReachBottom() {
			this.loadingStatus = "loading";
			console.log('refresh-触底');
			let currentItem = this.currentItem;
			let page = this.homeList[currentItem].page + 1;
			let totalPage = this.homeList[currentItem].totalPage;
			if(page > totalPage){ //没有更多数据了
				this.loadingStatus = "noMore";
				return;
			}else{
				//加一页后,重新获取当前分类的数据
				this.getNewsList(page, currentItem);
				setTimeout(()=>{
					this.getListHeight(currentItem); //重新设置当前分类页面高度
				},200)		
			}		
		},
		methods: {
			//获取对应分类的动态数据(index为动态的分类下标)
			getNewsList(page, index) {
				var url = this.server_Url; //读取在main.js中挂载的vue全局属性server_Url
				var objectItem = this.homeList[index]; //要操作的分类的数据对象
				console.log(url)
				//请求服务端数据
				uni.request({
					url: url + '/newsdata?category=' + this.categoryList[index] + "&page=" + page,
					success: (res) => {
						console.log("请求分类" + this.categoryList[index] + "的第" + page + "页数据");
						let result = res.data;
						//拼接数据到对应分类的list中,且设置分页信息
						objectItem.list = objectItem.list.concat(result.newsList);
						//objectItem.page = result.page;
						objectItem.page = page;
						objectItem.total = result.total;
						objectItem.totalPage = result.totalPage;
						//覆盖原有的数据
						this.homeList[index] = objectItem; 	
						uni.stopPullDownRefresh();
					}
				});
			},

			//监听分类栏点击事件, 完成顶部分类栏切换
			handTapItem: function(e) {
				var itemNum = e.currentTarget.dataset.item //获取点击的分类item序号
				console.log("点击了顶部栏" + itemNum)
				//设置currentItem为当前的点击item数, 完成class的激活
				if (this.currentItem == itemNum) {
					return false;
				} else {
					this.currentItem = itemNum
				}
			},
			//左右滑动更改当前页currentItem, 或者点击改变了currentItem也会触发此函数
			switchPage: function(e) {
				console.log("切换页面")
				let currentItem = e.detail.current;
				let objectItem = this.homeList[currentItem];
				//如果当前分类页没有数据,就加载第一页数据
				if (objectItem.list.length  == 0) {
					console.log("没有数据,加载一页数据")
					this.getNewsList(1, currentItem)
				}
				this.currentItem = currentItem;
				uni.pageScrollTo({//页面重定向到顶部
                    scrollTop: 0,
                    duration: 0
                });
			},
			//点击了发布按钮
			handCreateCilck() {
				uni.navigateTo({
					url: '../createNews/createNews'
				});
			},
			//设置红点
			setTabbarReddot() {
				//延时获取uni的api,防止调用不到,设置红点
				setTimeout(() => {
					uni.showTabBarRedDot({
						index: 2,
					})
				}, 200)
			},
			//跳转到详情页
			goDetail(e, flag) {
				//这里的e是,单条动态数据对象, 我们在跳转前保存e进缓存,方便在详情页获取
				//flag是标识是否点击了评论才跳转到详情页, 0和1
				console.log(e)
				uni.setStorage({
					key: 'newsItem',
					data: e,
					success: function() {
						console.log('保存当前点击的动态对象成功');
						console.log("跳转到详情页")
						uni.navigateTo({
							url: '../newsDetail/newsDetail?flag=' + flag
						});
					}
				});
			},
			//获取列表的高度信息,设置给swiper,以免无法左右滑动
			getListHeight(index) {
				var that = this;
				//获取列表元素的的高度
				var query = uni.createSelectorQuery();
				query.select("#swiperList" + index).boundingClientRect(function(res) {
					//保证swiper至少有550px的高度
					//默认的底部上拉加载框的高度60px
					res.height < 550 || res.height == undefined ? that.listHeight = 550 : that.listHeight = res.height + 60
				}).exec();
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
		watch: {
			//监听当前的分类是否切换
			'currentItem': function(val) {
				//console.log(val)
				setTimeout(()=>{
					this.getListHeight(val); //重新设置当前分类页面高度
				},200)	
			}
		},
		//监听导航栏的"<"或"O"的点击事件(返回)(手动定位)
		onNavigationBarButtonTap(e) {
			console.log(e.index)
			if (e.index == 0) {
				uni.switchTab({
					url: '/pages/index/index'
				});
			} else if (e.index == 1) {
				this.chooseLocalInfo();
				console.log("点击了手动定位按钮")
			} else {
				return;
			}
		}
	}
</script>

<style>
	.swiper-box {
		width: 100%;
		margin-top: 50upx;
		position: relative;
	}

	.swiper-box swiper-item {
		width: 100%;
		height: 100%;
		/* background-color: #ccc; */
		display: inline-block;
	}

	/* --------分类栏-------- */
	.category-box {
		width: 100%;
		height: 50rpx;
		line-height: 50rpx;
		background-color: whitesmoke;
		padding: 0 20% 0 20%;
		box-sizing: border-box;
		overflow: hidden;
		font-size: 14px;
		white-space: nowrap;
		position: fixed;
		/* #ifdef H5 */
		top: 88upx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		top: 0;
		/* #endif */
		z-index: 9;
	}

	.category-item {
		width: 85rpx;
		margin: 0 15px;
		text-align: center;
		display: inline-block;
	}

	.category-item.active {
		color: #ea5455;
		position: relative;
	}

	/* 表示category-item激活后,加入后面元素的样式-分类底部条 */
	.category-item.active:after {
		content: "";
		display: block;
		height: 4rpx;
		width: 85rpx;
		background: #ea5455;
		position: absolute;
		bottom: 0;
		border-radius: 16rpx;
	}

	.create-icon {
		width: 110upx;
		height: 110upx;
		background-color: #FFFFFF;
		border-radius: 50upx;
		padding: 25upx;
		box-sizing: border-box;
		position: fixed;
		/* #ifdef H5*/
		bottom: 140upx;
		/* #endif */

		/* #ifdef MP-WEIXIN*/
		bottom: 70upx;
		/* #endif */
		right: 70upx;
		opacity: .9;
		box-shadow: 0 5upx 7upx 0 #707070;
	}
</style>
