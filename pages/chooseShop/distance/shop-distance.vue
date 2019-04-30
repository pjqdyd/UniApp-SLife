<template>
	<view>
		<view class="distance-box">距离: {{distance}}</view>
	</view>
</template>

<script>
	import utils from "@/common/utils.js";  //常用的工具方法
	
	export default {
		props:{
			shopLat: {
				type: Number,
				default: 0
			},
			shopLon: {
				type: Number,
				default: 0
			},
			localInfo: {
				type: Object,
				default: function(e) {
					return {}
				}
			}
		},
		computed:{
			distance(){	
				var dis = utils.getDistance(this.localInfo.latitude, this.localInfo.longitude,
				this.shopLat,this.shopLon);		
				return dis;			
			}
		}
	}
</script>

<style>
	.distance-box {
		width: 150upx;
		height: 52upx;
		line-height: 52upx;
		font-size: 24upx;
		text-align: left;
		margin-left: 10upx;
	}
</style>
