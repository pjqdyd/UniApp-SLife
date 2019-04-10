<template>
	
	<view class="news-list-page">
		<view v-for="(item,index) in newsList" :key="index">
			<uni-media-list :itemData="item" @click="goDetail(item , 0)" @clickComment="goDetail(item, 1)"></uni-media-list>
		</view>
		<uni-load-more :status="loadingStatus"></uni-load-more>
	</view>
	
</template>

<script>
	
	import uniMediaList from "../news/component/uni-media-list/uni-media-list.vue";
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	
	export default {
		components:{
			uniMediaList,
			uniLoadMore
		},
		data() {
			return {
				loadingStatus: "more", //加载状态
				//动态列表数据
				newsList: [],
				page: 1,
				total: 0,
				totalPage: 0,
				
				userId: '', //用户id
				type: 0, ////动态的类型,0是查询用户发布的动态,1是查询用户点赞的动态
				
				typeName: [
					"发布的动态",
					"点赞的动态"
				]
			}
		},
		onLoad(params) {		
			if(params.userId != null && params.userId != undefined){
				this.userId = params.userId;//要查询动态的用户id
				if(params.type != null && params.type != undefined){
					this.type = params.type;//动态的类型,0是查询用户发布的动态,1是查询用户点赞的动态
					//设置导航栏标题
					uni.setNavigationBarTitle({
						title: this.typeName[params.type]
					});
					
					//查询第一页动态数据
					this.getNewsList(this.userId, this.type, 1);
				}
			}		
		},
		methods:{
			
			//根据userId和要查询的动态, type=0是查询用户发布的动态,1是查询用户点赞的动态
			getNewsList(userId, type , page){
				var url = this.server_Url; //读取在main.js中挂载的vue全局属性server_Url
				console.log(url)
				//请求服务端数据
				uni.request({
					url: url + '/newsdata?userId=' + userId + "&type=" + type + "&page=" + page,
					success: (res) => {
						console.log("请求用户" + userId + "的" + this.typeName[type] + "的第"+ page +"页数据");
						let list = res.data.newsList;
						//拼接数据到newsList中
						this.newsList = this.newsList.concat(list);
						//设置页数和总元素数量
						this.page = page;
						this.total = res.data.total;
						this.totalPage = res.data.totalPage;
						
						uni.stopPullDownRefresh();
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
			this.newsList = [],
			//重新获取当前的第1页数据
			this.getNewsList(this.userId, this.type, 1);
		},
		
		//页面上拉触底
		onReachBottom() {
			this.loadingStatus = "loading";
			console.log('refresh-触底');
			let page = this.page + 1;
			let totalPage = this.totalPage;
			console.log(totalPage)
			if(page > totalPage){ //没有更多数据了
				this.loadingStatus = "noMore";
				return;
			}else{
				//加一页后,重新获取当前分类的数据
				this.getNewsList(this.userId , this.type, page);	
			}		
		},
	}
</script>

<style>
	.news-list-page{
		width: 750upx;
		overflow: hidden;
		box-sizing: border-box;
	}
</style>
