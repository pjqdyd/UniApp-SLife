<template>
	<view class="my-plan-style">
		<!-- 3D轮播 -->
		<view>
			<swiper class="imageContainer" @change="handleChange" indicator-active-color="#ea5455" circular  autoplay indicator-dots>
				<block v-for="(item,index) in imgList" :key="index">
					<swiper-item class="swiperitem">
						<view @click="handImageClick">
							<image class="itemImg" :class="currentIndex == index ? 'swiperactive': ''" :src="serverUrl + item" mode="scaleToFill">
							</image>
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
	</view>
</template>
<script>
	export default {
		data(){
			return {
				currentIndex: 0,
				imgList:[
				'/hot-shop/shopImage/shop1.jpg',
				'/hot-shop/shopImage/shop2.jpg',
				'/hot-shop/shopImage/shop3.jpg'
				],
				hotShopId:[
					"s-19042226064334",
					"s-19042337283395",
					"s-19042580607008"
				],
				serverUrl: ''
			}
		},
		created() {
			this.serverUrl = this.server_Url;
		},
		methods:{
			handleChange(e){
				this.currentIndex = e.detail.current
			},
			handImageClick(){
				console.log(this.currentIndex);
				uni.navigateTo({
					url: "/pages/shopDetail/shopDetail?shopId=" + this.hotShopId[this.currentIndex]
				})
			}
		}
	}	
</script>
<style lang="scss">
	
	.my-plan-style{
		margin-top: 10upx 0 0 5upx;
		height: 290upx;
	}
	
	// 3D轮播样式
	.imageContainer {
		width: 100%;
		height: 290upx;
		background-color: #fff;
	}
	
	.swiperitem {
		height: 255upx;
		padding: 0 10upx 0 10upx;
		box-sizing: border-box;
		position: relative;
	}
	
	.itemImg {
		position: absolute;
		width: 100%;
		height: 255upx;
		border-radius: 10upx;
		z-index: 5;
		opacity: 0.8;
		top: 5%;
		box-shadow:0px 4upx 15upx 0px rgba(153,153,153,0.24);
	}
	
	.swiperactive {
		width: 735upx;
		opacity: 1;
		z-index: 10;
		/* height: 430rpx; */
		height: 287upx;
		top: 0%;
		transition: all .2s ease-in 0s;
	}
</style>