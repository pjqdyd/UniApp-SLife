<template>
	<view class="my-plan-style">
		<!-- 3D轮播 -->
		<view>
			<swiper class="imageContainer" @change="handleChange" indicator-active-color="#ea5455" circular  autoplay indicator-dots>
				<block v-for="(item,index) in imgList" :key="index">
					<swiper-item class="swiperitem">
						<image class="itemImg" :class="currentIndex == index ? 'swiperactive': ''" :src="item" mode="scaleToFill">
						</image>
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
				'https://upload-images.jianshu.io/upload_images/14511997-6b7bdd51ef601f2f.jpg',
				'https://upload-images.jianshu.io/upload_images/14511997-161603db93a6d5c4.jpg',
				'https://upload-images.jianshu.io/upload_images/14511997-a93407f6cf335716.jpg'
				]
			}
		},
		methods:{
			handleChange(e){
				this.currentIndex = e.detail.current
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