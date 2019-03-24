<template>
	<view>
		<!-- 用户信息组件 -->
		<user-info :userInfo="userInfo"></user-info>

		<!-- 分段选项卡 -->
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#ea5455"></uni-segmented-control>

		<!-- 对应的内容 -->
		<view class="content">
			<view v-show="current === 0">
				<!-- 关注的附近商铺列表 -->
				<view v-for="(item, index) in followLocalList" :key="index">
					<local-item :shopItem="item"></local-item>
				</view>
				<uni-load-more :loadingType="1"></uni-load-more>
			</view>
			
			<view v-show="current === 1" class="like-news-box">
				<!-- 点赞的动态的列表 -->
				<view v-for="(item,index1) in likeNewsList" :key="index1">
					<uni-media-list :itemData="item" @close="close(index)" @click="goDetail(item)"></uni-media-list>
				</view>
				<uni-load-more :loadingType="1"></uni-load-more>
			</view>
			
			<view v-show="current === 2">
				<!-- 发布的动态的列表 -->
				<view v-for="(item,index1) in createNewsList" :key="index1">
					<uni-media-list :itemData="item" @close="close(index)" @click="goDetail(item)"></uni-media-list>
				</view>
				<uni-load-more :loadingType="1"></uni-load-more>
			</view>
		</view>

	</view>
</template>

<script>
	import conf from '../../common/config.js'; //全局的一些配置信息
	import utils from '../../common/utils.js'; //一些工具方法

	import userInfo from "./component/user-info/user-info.vue"; //用户信息组件
	import uniSegmentedControl from "./component/segmented/uni-segmented-control.vue"; //分段器组件
	import localItem from "../local/component/local-item.vue"; //附近的商铺组件
	import uniMediaList from "../index/component/uni-media-list/uni-media-list.vue"; //动态组件
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"; //加载更多组件

	export default {
		components: {
			userInfo,
			uniSegmentedControl,
			localItem,
			uniMediaList,
			uniLoadMore
		},
		data() {
			return {
				userInfo: {},

				items: ['关注', '点赞', '发布'],
				current: 1,

				followLocalList: [], //关注的店铺的列表
				followLocalPage: 0,
				followLocalTotal: 0,

				likeNewsList: [], //点赞的动态列表
				likeNewsPage: 0,
				likeNewsTotal: 0,

				createNewsList: [], //发布的动态列表
				createNewsPage: 0,
				createNewsTotal: 0

			};
		},
		onLoad() {},
		created() {
			var url = conf.serverUrl;
			console.log(url + "/userinfo")
			//请求服务端数据
			uni.request({
				url: url + '/userinfo',
				success: (res) => {
					console.log("请求userinfo数据成功成功..")
					//console.log(res.data.userInfo)
					this.userInfo = res.data.userInfo
				}
			});

			if (this.likeNewsPage == 0) {
				this.getLikeNewsData();
				this.likeNewsPage = 1 //先设置当前页为1
			}

			uni.getStorage({
				key: "SystemInfo",
				success: function(res) {
					console.log(res)
				}
			})
		},
		updated() {},
		watch: {},
		methods: {
			//监听选项卡的点击,切换选项卡,加载数据
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
					if (index == 0 && this.followLocalPage == 0) {
						this.getFollowLocalList();
						this.followLocalPage = 1 //先设置当前页为1
					} else if (index == 1 && this.likeNewsPage == 0) {
						this.getLikeNewsData();
					} else if (index == 2 && this.createNewsPage == 0) {
						this.getCreateNewsData();
						this.createNewsPage = 1 //先设置当前页为1
					} else {
						return
					}
				}
			},

			// 获取关注的商铺信息
			getFollowLocalList() {
				//请求关注的商铺
				var url = conf.serverUrl;
				//请求服务端数据
				uni.request({
					url: url + '/locallist',
					success: (res) => {
						console.log("请求关注的locallist数据成功成功..")
						let list = res.data.localList
						this.followLocalList = this.followLocalList.concat(list);
					}
				});
			},

			//获取点赞的动态
			getLikeNewsData() {
				console.log("获取点赞的动态")
				var url = conf.serverUrl;
				var list = [] //动态数据
				//请求服务端数据
				uni.request({
					url: url + '/newsdata',
					success: (res) => {
						console.log("请求newsdata数据成功成功..")
						list = res.data.newsList
						this.likeNewsList = this.likeNewsList.concat(list)
					}
				})
			},

			getCreateNewsData() {
				console.log("获取发布的动态")
				var url = conf.serverUrl;
				var list = [] //动态数据
				//请求服务端数据
				uni.request({
					url: url + '/newsdata',
					success: (res) => {
						console.log("请求newsdata数据成功成功..")
						list = res.data.newsList
						this.createNewsList = this.createNewsList.concat(list)
					}
				})
			},

			//动态详情
			goDetail(item) {}
		},
		computed: {},
		//监听导航栏的"<"的点击事件
		onNavigationBarButtonTap(e) {
			uni.switchTab({
				url: '/pages/index/index'
			});
		},
		//页面上拉触底
		onReachBottom() {
			console.log('refresh-触底');
		},
	}
</script>

<style lang="scss">
	.content {
		width: 750upx;
		height: 100%;
	}

	.like-news-box {
		width: 750upx;
		overflow: hidden;
	}
</style>
