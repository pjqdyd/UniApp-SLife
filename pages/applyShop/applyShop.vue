<template>
	<view class="page">
		
		 <view class='shop-title'>
		    <text>店铺图片(至少1张,5张总大小10M以下)</text>
		</view>
		<view class="shop-body shop-uploader">
		    <view class="uni-uploader">
		        <view class="uni-uploader-head">
		            <view class="uni-uploader-title">第一张选中的图片为店铺门面</view>
		            <view class="uni-uploader-info">{{imageList.length}}/5</view>
		        </view>
		        <view class="uni-uploader-body">
		            <view class="uni-uploader__files">
		                <block v-for="(image,index) in imageList" :key="index">
		                    <view class="uni-uploader__file" style="position: relative;">
		                        <image class="uni-uploader__img" :src="image" @tap="previewImage"></image>
		                        <view class="close-view" @click="close(index)">x</view>
		                    </view>
		                </block>
		                <view class="uni-uploader__input-box" v-show="imageList.length < 5">
		                	<view class="uni-uploader__input" @tap="chooseImg"></view>
		                </view>
		            </view>
		        </view>
		    </view>
		</view>
		
		<view class='shop-title'>
			<text>店铺名称</text>		
		</view>
		<view class="shop-body">
			<textarea placeholder="请输入店铺名称..." v-model="sendDate.content" maxlength="7" class="shop-textare" />
		</view>
		
		<view class='shop-body shop-cate' @tap="chooseMsg">
			<text class="shop-quick">{{sendDate.shopCategory == '生活街' ? '请选择店铺分类' : sendDate.shopCategory}}</text>
		</view>
		
		<view class='shop-body shop-cate' @tap="chooseLocaltion">
			<text>{{sendDate.shopAddr == '' ? '请选择店铺位置' : sendDate.shopAddr}}</text>
			<text class="iconfont">&#xe611;</text>
		</view>
       
        <button type="" class="shop-submit" @tap="send">提交申请</button>
        <view class='shop-title'>
            <text>小提示: 已申请的店铺可以在系统通知中查看</text>
        </view>
    </view>
</template>

<script>
	
    export default {
		components:{
		},
        data() {
            return {
                msgContents: ["超市购物", "美食饮品", "日常生活", "书店文具" , "电子产品", "其他"],
                imageList: [],
                sendDate: {
					publisherId: "",        //发布者id
					content: "",			//动态标题内容
					shopLatitude: "",		//动态发布的纬度
					shopLongitude: "",		//动态发布的经度
					shopCategory: "生活街", //动态分类,默认是生活街
                    score: 0,				//动态有关店铺的评分
					shopShopId: "",			//动态有关店铺的id
					shopShopName: "",       //动态有关店铺的名字
					shopAddr: ""        //店铺的位置
                },
				chooseShop: {} //选中的对象信息
            }
        },
		//params为上个页面跳转过来的参数
        onLoad(params) {		
        },
		onShow() {
		},
		created() {	    
		},
		mounted() {
		},
        methods: {
            close(e){
                this.imageList.splice(e,1);
            },
            chooseMsg() { //分类选择
                uni.showActionSheet({
                    itemList: this.msgContents,
                    success: (res) => {
                        this.sendDate.shopCategory = this.msgContents[res.tapIndex];
                    }
                })
            },
			chooseLocaltion(){//选择位置
				console.log("选择位置")
			},
            chooseImg() { //选择图片
                uni.chooseImage({
                    sourceType: ["camera", "album"],
                    //sizeType: "compressed",
                    count: 5 - this.imageList.length,
                    success: (res) => {
                        this.imageList = this.imageList.concat(res.tempFilePaths);
                    }
                })
            },
            previewImage() { //预览图片
                uni.previewImage({
                    urls: this.imageList
                });
            },
            send() { //发送反馈
                console.log(JSON.stringify(this.sendDate));
                let imgs = this.imageList.map((value, index) => {
                    return {
                        name: "image" + index,
                        uri: value
                    }
                })
                uni.uploadFile({
                    url: "https://service.dcloud.net.cn/new",
                    files: imgs,
                    formData: this.sendDate,
                    success: (res) => {
                        if (res.statusCode === 200) {
                            uni.showToast({
                                title: "发布成功!"
                            });
                            this.imageList = [];
                            this.sendDate = {
                                score: 0,
                                content: "",
								shopLatitude: "",
								shopLongitude: "",
								shopCategory: "生活街", 
								shopShopId: "",	
								shopShopName: "",
								shopShopAddr: "",
								publisherId: ""
                            }
                        }
                    },
                    fail: (res) => {
                        uni.showToast({
                            title: "失败",
                            icon:"none"
                        });
                        console.log(res)
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    @font-face {
    	font-family: uniicons;
    	font-weight: normal;
    	font-style: normal;
    	src: url('../../static/uni.ttf') format('truetype');
    }
    page {
        background-color: #EFEFF4;
    }
    view{
        font-size: 28upx;
    }
    .input-view {
        font-size: 28upx;
    }
    .close-view{
        text-align: center;line-height:14px;height: 16px;width: 16px;border-radius: 50%;background: #FF5053;color: #FFFFFF;position: absolute;top: -6px;right: -4px;font-size: 12px;
    }
    /* 上传 */
    .uni-uploader {
    	flex: 1;
    	flex-direction: column;
    }
    .uni-uploader-head {
    	display: flex;
    	flex-direction: row;
    	justify-content: space-between;
    }
	.uni-uploader-title {
		color: #707070;
	}
    .uni-uploader-info {
    	color: #B2B2B2;
    }
    .uni-uploader-body {
    	margin-top: 16upx;
    }
    .uni-uploader__files {
    	display: flex;
    	flex-direction: row;
    	flex-wrap: wrap;
    }
    .uni-uploader__file {
    	margin: 5upx;
    	width: 170upx;
    	height: 170upx;
    }
    .uni-uploader__img {
    	display: block;
    	width: 170upx;
    	height: 170upx;
    }
    .uni-uploader__input-box {
    	position: relative;
    	margin:10upx;
    	width: 170upx;
    	height: 170upx;
    	border: 2upx solid #D9D9D9;
    }
    .uni-uploader__input-box:before,
    .uni-uploader__input-box:after {
    	content: " ";
    	position: absolute;
    	top: 50%;
    	left: 50%;
    	-webkit-transform: translate(-50%, -50%);
    	transform: translate(-50%, -50%);
    	background-color: #D9D9D9;
    }
    .uni-uploader__input-box:before {
    	width: 4upx;
    	height: 79upx;
    }
    .uni-uploader__input-box:after {
    	width: 79upx;
    	height: 4upx;
    }
    .uni-uploader__input-box:active {
    	border-color: #999999;
    }
    .uni-uploader__input-box:active:before,
    .uni-uploader__input-box:active:after {
    	background-color: #999999;
    }
    .uni-uploader__input {
    	position: absolute;
    	z-index: 1;
    	top: 0;
    	left: 0;
    	width: 100%;
    	height: 100%;
    	opacity: 0;
    }
    
    /*问题反馈*/
    .shop-title {
    	display: flex;
    	flex-direction: row;
    	justify-content: space-between;
    	align-items: center;
    	padding: 20upx;
    	color: #666;
    	font-size: 28upx;
    }
    .shop-star-view.shop-title {
    	justify-content: flex-start;
    	margin: 0;
    }
    .shop-quick {
    	position: relative;
    	padding-right: 40upx;
    }
    .shop-quick:after {
    	font-family: uniicons;
    	font-size: 40upx;
    	content: '\e581';
    	position: absolute;
    	right: 0;
    	top: 50%;
    	color: #bbb;
    	-webkit-transform: translateY(-50%);
    	transform: translateY(-50%);
    }
    .shop-body {
    	background: #fff;
    }
	.shop-body:active{
		background-color: #eeeeee;
	}
    .shop-textare {
    	height: 80upx;
    	font-size: 32upx;
    	line-height: 60upx;
    	width: 100%;
    	box-sizing: border-box;
    	padding: 10upx 0 10upx 20upx;
    }
	.shop-cate{
		height: 80upx;
		width: 100%;
		font-size: 33upx;
		color: #707070;
		margin: 20upx 0 20upx 0;
		line-height: 80upx;
		padding-left: 20upx;
	}
    
    .shop-uploader {
    	padding: 10upx 20upx;
    }
   
    .shop-submit {
    	background: #ea5455;
    	color: #FFFFFF;
    	margin: 20upx;
    }
</style>
