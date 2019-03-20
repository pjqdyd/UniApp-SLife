<template>
	<view>
		<!-- 使用侧边栏组件 -->
		<uni-drawer :visible="isShowDrawer" :mask="true" @close="handDrawerClose">
			<view style="padding:30upx;">
				<view class="uni-title">抽屉式导航</view>
			</view>
		</uni-drawer>

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
				<view v-for="(item,index1) in homeList[i]" :key="index1" style="background-color: #eeeeee">
					<uni-media-list :itemData="item" @close="close(index)" @click="goDetail(item)"></uni-media-list>
				</view>
				<uni-load-more :loadingType="1"></uni-load-more>
			</swiper-item>

		</swiper>
	</view>
</template>

<script>
	import uniDrawer from "./component/uni-drawer/uni-drawer.vue" //导入主页侧边抽屉组件
	import uniMediaList from "./component/uni-media-list/uni-media-list.vue";
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"

	import conf from '../../common/config.js'; //全局的一些配置信息
	import utils from '../../common/utils.js'; //一些工具方法

	export default {
		components: {
			uniDrawer,
			uniMediaList,
			uniLoadMore
		},
		data() {
			return {
				isShowDrawer: false,
				currentItem: 1, //当前的分类序号

				homeList: [], //用来存储首页的3个tab页list对象,
				listA: [],
				listB: [], //推荐页的list
				ListC: [],

				listHeight: 0
			}
		},
		onLoad() {
			console.log("主页页面加载")
		},
		//页面下拉刷新
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//页面上拉触底
		onReachBottom() {
			console.log('refresh-触底');
		},
		created() {
			var url = conf.serverUrl;
			console.log(url)
			var recommendList = [] //推荐页的数据
			//请求服务端数据
			uni.request({
				url: url + '/newsdata',
				success: (res) => {
					console.log("请求newsdata数据成功成功..")
					recommendList = res.data.data.newsList

					this.listB = this.listB.concat(recommendList)

					this.homeList.push(this.listB)
					this.homeList.push(this.listB)
					this.homeList.push(this.listB)
					this.getListHeight(this.listB);
				}
			})

		},
		methods: {
			//侧边栏的关闭事件
			handDrawerClose: function() {
				this.isShowDrawer = false
				console.log("侧边栏关闭")
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
				this.listHeight = 0
				this.getListHeight(this.homeList[itemNum]); //重新计算list的高度
			},
			//左右滑动更改当前页currentItem
			switchPage: function(e) {
				console.log("切换页面")
				this.currentItem = e.detail.current
			},
			//跳转到详情页
			goDetail(e) {
				console.log(e)
			},
			//计算List高度的方法
			getListHeight: function(list) {
				for (var i = 0; i < list.length; i++) {
					let imgListLength = list[i].newsImage.length;
					if (imgListLength == 1) {
						this.listHeight = 440;
					} else if (imgListLength == 2) {
						this.listHeight += 380;
					} else if (imgListLength == 3) {
						this.listHeight += 540;
					} else if (imgListLength == 4) {
						this.listHeight += 700;
					} else {
						return;
					}
				}
				this.listHeight += 40 //最后加上底部loadmore的高度
				console.log(this.listHeight)
			}
		},
		//监听导航栏的"..."的点击事件(展开/关闭侧边栏)
		onNavigationBarButtonTap() {
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
	.swiper-box {
		width: 100%;
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
		position: relative;
		
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
</style>
