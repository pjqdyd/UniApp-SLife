<script>
	export default {
		onLaunch: function() {
			var that = this;
			console.log('App Launch')
			//读取本地缓存的设备信息
			uni.getStorage({
				key: 'SystemInfo',
				success(res) {
					if (res.data == null || res.data == undefined || res.data == '') {
						that.getAndSaveSysInfo(); //获取并保存设备信息
					}
				},
				fail() {
					that.getAndSaveSysInfo(); //获取并保存设备信息
				}
			});

			//读取本地缓存的位置信息对象localInfo
			uni.getStorage({
				key: 'localInfo',
				success(res) {
					if (res.data == null || res.data == undefined || res.data == '') {
						that.getAndSaveLocalInfo(); //获取并保存位置信息
					}
				},
				fail() {
					that.getAndSaveLocalInfo();
				}
			});

		},
		onLoad() {},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		mounted() {},
		data() {
			return {
				//位置信息对象
				localInfo: {
					longitude: '',
					latitude: '',
					addressName: ''
				}
			}
		},
		methods: {
			//获取并保存设备的信息
			getAndSaveSysInfo() {
				uni.getSystemInfo({
					success(res) {
						console.log(res)
						//保存设备信息
						uni.setStorage({
							key: 'SystemInfo',
							data: res,
							success: function() {
								console.log('保存设备信息成功');
							}
						})
					}
				})
			},
			//获取并保存位置信息(这一步只保存基本的经纬度信息)
			getAndSaveLocalInfo() {
				var that = this;
				//获取经纬度,并保位置对象进缓存中
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						that.localInfo = {
							longitude: res.longitude,
							latitude: res.latitude,
							addressName: ''
						}
						uni.setStorage({
							key: 'localInfo',
							data: that.localInfo,
							success: function() {
								console.log('保存经纬度信息对象localtionInfo成功(uniapp的getLocaltion方法API)');
							}
						});
					},
					fail: function() {
						console.log("uni.getLocation获取位置信息失败");
						uni.showModal({
							title: "提示",
							content: "未获取到位置信息,请右上角手动定位"
						})
					}
				});
			}

		}
	}
</script>

<style>
	/*每个页面公共css */


	/*评分星标的样式*/
	.news-star {
		font-family: uniicons;
		font-size: 40upx;
		margin-left: 0;
	}

	.news-star-view {
		margin-left: 0;
	}

	.news-star:after {
		content: '\e408';
	}

	.news-star.active {
		color: #FFB400;
	}

	.news-star.active:after {
		content: '\e438';
	}
</style>
