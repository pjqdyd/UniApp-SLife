<template>
	<view>
		<user-info :userInfo="userInfo"></user-info>
	</view>
	
</template>

<script>
	
	import conf from '../../common/config.js'; //全局的一些配置信息
	import utils from '../../common/utils.js'; //一些工具方法
	
	import userInfo from "./component/user-info/user-info.vue"; //用户信息组件
	
	export default {
		components:{
			userInfo
		},
		data() {
			return {
				userInfo: {}
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
			})
		},
		methods: {},
		computed: {},
		//监听导航栏的"<"的点击事件
		onNavigationBarButtonTap(e) {
			uni.switchTab({
				url: '/pages/index/index'
			});
		}
	}
</script>

<style lang="scss">
</style>
