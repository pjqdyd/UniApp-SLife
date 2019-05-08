<template>
	<view style="background-color: #fff;">
		<view v-if="total == 0">
			<cmd-result-page type="network" text="暂无动态"></cmd-result-page>
		</view>
		<view v-else class="news-list-page">
			<view v-for="(item,index) in newsList" :key="index">
				<uni-media-list :itemData="item" :serverUrl="serverUrl" @click="goDetail(item , 0)" @clickComment="goDetail(item, 1)"></uni-media-list>
			</view>
			<uni-load-more :status="loadingStatus"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniMediaList from "../news/component/uni-media-list/uni-media-list.vue";
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import cmdResultPage from "@/components/cmd-result-page/cmd-result-page.vue"; //页面结果组件

	export default {
		components: {
			uniMediaList,
			uniLoadMore,
			cmdResultPage
		},
		data() {
			return {
				loadingStatus: "more", //加载状态
				//动态列表数据
				newsList: [],
				page: 1,
				total: 0,
				totalPage: 0,

				serverUrl: '',
				userId: '', //用户id
				type: 0, //动态的类型,0是查询用户发布的动态,1是查询用户点赞的动态, 2是查询店铺有关的动态

				typeName: [{
					name: "发布的动态",
					id: "createNewsList"
				}, {
					name: "点赞的动态",
					id: "likeNewsList"
				}, {
					name: "店铺有关的动态",
					id: "shopNewsList"
				}],

				requestParams: ''
			}
		},
		onLoad(params) {
			//设置用户id
			uni.getStorage({
				key: "userInfo",
				success(res) {
					if (res.data.userId != undefined) {
						this.userId = res.data.userId;
					}
				}
			});

			this.serverUrl = this.server_Url;
			this.type = params.type;
			var requestParams = ''; //请求的参数

			if (params.type == 0) { //查询发布者的动态
				requestParams = "&publisherId=" + params.publisherId;
			} else if (params.type == 1) { //查询好友点赞的动态
				requestParams = "&firendId=" + params.firendId;
			} else if (params.type == 2) {
				requestParams = "&newsShopId=" + params.newsShopId;
			} else {}
			this.requestParams = requestParams;
			this.getNewsList(requestParams, 1); //请求后端获取动态列表数据
		},
		methods: {
			//查询动态
			getNewsList(requestParams, page) {
				let url = this.server_Url;
				console.log(url + "/slife/newsList/" + this.typeName[this.type].id + "?page=" + page + requestParams + "&userId=" +
					this.userId)
				//请求服务端数据
				uni.request({
					url: url + "/slife/newsList/" + this.typeName[this.type].id + "?page=" + page + requestParams + "&userId=" +
						this.userId,
					success: (res) => {
						uni.stopPullDownRefresh();
						let result = res.data;
						if (result.code == 200) {
							if (page == 1) { //先清空第一页
								this.newsList = [];
							}
							//拼接数据到newsList中
							this.newsList = this.newsList.concat(result.data.newsList);
							//设置页数和总元素数量
							this.page = page;
							this.total = result.data.total;
							this.totalPage = result.data.totalPage;
						} else {
							uni.showToast({
								title: "没有相关动态",
								icon: "none"
							});
						}
					},
					fail() {
						uni.showToast({
							title: "没有相关动态",
							icon: "none"
						});
					}
				});

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
		},

		//页面下拉刷新
		onPullDownRefresh() {
			console.log('refresh');
			this.page = 1;
			//重新获取当前的第1页数据
			this.getNewsList(this.requestParams, 1);
		},

		//页面上拉触底
		onReachBottom() {
			this.loadingStatus = "loading";
			console.log('refresh-触底');
			let page = this.page + 1;
			let totalPage = this.totalPage;
			if (page > totalPage) { //没有更多数据了
				this.loadingStatus = "noMore";
				return;
			} else {
				//加一页后,重新获取当前分类的数据
				this.getNewsList(this.requestParams, page);
			}
		},
	}
</script>

<style>
	.news-list-page {
		width: 750upx;
		overflow: hidden;
		box-sizing: border-box;
	}
</style>
