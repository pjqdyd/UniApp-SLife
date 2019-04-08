<template>
	<view>
		<view class="list-item">
			<!-- 商店图片 -->
			<view class="image-box">
				<image class="image-box" :src="shopItem.imageUrl"></image>
			</view>
			<!-- 商店信息 -->
			<view class="info-box">
				<!-- 商店名称 -->
				<view class="name-box">{{shopItem.shopName}}</view>
				<!-- 星星评分/商店类目 -->
				<view class="rate-cate-box">
					<view class="rate-box">
						<!-- 星星评分 -->
						
						<!-- 仅在H5使用uni提供的星标组件 因为此组件在app和小程序创建多了就卡顿-->
						<!-- #ifdef H5 -->
						<uni-rate size="18" disabled="true" :value="shopItem.rate"></uni-rate>
						<!-- #endif -->
						
						<!-- 在app端和小程序使用text绘制星标 流畅-->
						<!-- #ifdef APP-PLUS || MP-WEIXIN-->
						<view class="news-star-view">
							<text class="news-star" v-for="(value,key) in stars" :key="key" :class="key < shopItem.rate ? 'active' : ''"></text>
						</view>
						<!-- #endif -->
						
						<view class="rate-text">{{shopItem.rate}}</view>
					</view>
					
					<view class="cate-box">
						<!-- 所属类目标签 -->
						<uni-badge type="warning" :text="shopItem.category"></uni-badge>
					</view>
				</view>
				<!-- 地址距离信息 -->
				<view class="local-addr-box">
					<view class="local-box">
						<text class="iconfont text">&#xe611; {{shopItem.localAddr}} </text>
					</view>
					<view class="distance-box">距离: {{shopItem.distance}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from "@/components/uni-badge/uni-badge.vue";
	import uniRate from "@/components/rate/uni-rate.vue";
	export default {
		props: {
			shopItem: {
				type: Object,
				default: function(e) {
					return {}
				}
			}
		},
		components: {
			uniRate,
			uniBadge
		},
		data() {
			return {
				stars: [1, 2, 3, 4, 5]
			}
		},
		created() {},
		mounted() {}
	}
</script>

<style lang="scss">
	.list-item {
		width: 750upx;
		height: 170upx;
		background-color: #fff;
		border-bottom: 4upx solid #eeeeee;
		padding: 5upx 10upx 5upx 10upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.list-item:active {
		background-color: #eeeeee;
	}

	.image-box {
		width: 160upx;
		height: 160upx;
		border-radius: 10upx;
	}

	.info-box {
		width: 580upx;
		height: 160upx;
		padding: 10upx;
		box-sizing: border-box;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.name-box {
		width: 560upx;
		height: 60upx;
		font-size: 34upx;
		line-height: 60upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.rate-cate-box {
		width: 560upx;
		height: 46upx;
		padding-bottom: 10upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.rate-box {
		width: 380upx;
		height: 36upx;
		line-height: 36upx;
		position: relative;
	}
	.rate-text {
		width: 180upx;
		height: 40upx;
		color: #707070;
		font-size: 26upx;
		line-height: 40upx;
		position: absolute;
		top: 5upx;
		right: 0;
	}

	.cate-box {
		width: 170upx;
		height: 40upx;
		position: absolute;
		right: 0;
		top: 60upx;
	}

	.local-addr-box {
		width: 560upx;
		height: 45upx;
		display: flex;
		justify-content: space-between;
	}

	.local-box {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		width: 370upx;
		height: 45upx;
		overflow: hidden;
	}

	.text {
		line-height: 45upx;
		font-size: 25upx;
		color: #707070;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.distance-box {
		width: 160upx;
		height: 45upx;
		line-height: 45upx;
		font-size: 26upx;
		text-align: left;
	}
</style>
