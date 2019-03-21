<template>
	<view class="local-page">
		<!-- 使用轮播图组件 -->
		<local-swiper></local-swiper>

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
	import localItem from './component/local-item.vue';


	export default {
		components: {
			localSwiper,
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
				}
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
					let list = res.data.data.localList
					this.localList = this.localList.concat(list);
					console.log(this.localList)
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
		}
	}
</script>

<style lang="scss">
	.local-page {
		width: 750upx;
		height: 100%;
		background-color: #eeeeee;
	}
</style>
