<template>
	<view class="page">
		<image class="top-banner" mode="aspectFit" src="../../static/news/createNews.png"></image>

		<view class='news-title'>
			<text>动态描述</text>
			<text class="news-quick" @tap="chooseMsg">{{sendDate.newsCategory == '生活街' ? '请选择动态分类' : sendDate.newsCategory}}</text>
		</view>
		<view class="news-body">
			<textarea placeholder="这里描述你的动态信息..." v-model="sendDate.content" maxlength="70" class="news-textare" />
			</view>
        <view class='news-title'>
            <text>动态图片(至少1张,4张总大小10M以下)</text>
        </view>
        <view class="news-body news-uploader">
            <view class="uni-uploader">
                <view class="uni-uploader-head">
                    <view class="uni-uploader-title">点击预览图片</view>
                    <view class="uni-uploader-info">{{imageList.length}}/4</view>
                </view>
                <view class="uni-uploader-body">
                    <view class="uni-uploader__files">
                        <block v-for="(image,index) in imageList" :key="index">
                            <view class="uni-uploader__file" style="position: relative;">
                                <image class="uni-uploader__img" :src="image" @tap="previewImage"></image>
                                <view class="close-view" @click="close(index)">x</view>
                            </view>
                        </block>
                        <view class="uni-uploader__input-box" v-show="imageList.length < 4">
                        	<view class="uni-uploader__input" @tap="chooseImg"></view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class='news-title'>
            <text>动态有关的店铺</text>
        </view>
        <view class="news-body">
            <!-- <input class="news-input" v-model="sendDate.contact" placeholder="(选填,方便动态展示 )" /> -->
			<view class="news-shop" @click="choseShop">请选择店铺<text class="iconfont icon-next">&#xe6ee;</text></view>
        </view>
		
		<!-- 选中的商铺 -->
		<view v-if="isShowShop">
			<view class="shop-box" @click="handShopTap"></view> <!-- 覆盖在商铺上,阻止商铺的点击事件 -->
			<local-item :shopItem="chooseShop"></local-item> <!-- 商铺 -->
		</view>
			
        <view class='news-title news-star-view' v-show="isShowShop">
            <text>店铺评分</text>
            <view class="news-star-view">
                <text class="news-star" v-for="(value,key) in stars" :key="key" :class="key < sendDate.score ? 'active' : ''" @tap="chooseStar(value)"></text>
            </view>
        </view>
        <button type="" class="news-submit" @tap="send">发布</button>
        <view class='news-title'>
            <text>小提示: 已发布的动态可在个人信息页的"发布的动态"中查看</text>
        </view>
    </view>
</template>

<script>
	
	import localItem from '@/components/local/local-item.vue';
	
    export default {
		components:{
			localItem
		},
        data() {
            return {
                msgContents: ["超市购物", "美食饮品", "日常生活", "书店文具" , "电子产品", "其他"],
                stars: [1, 2, 3, 4, 5],
				isShowShop: false,
                imageList: [],
                sendDate: {
					publisherId: "",        //发布者id
					content: "",			//动态标题内容
					newsLatitude: "",		//动态发布的纬度
					newsLongitude: "",		//动态发布的经度
					newsCategory: "生活街", //动态分类,默认是生活街
                    score: 0,				//动态有关店铺的评分
					newsShopId: "",			//动态有关店铺的id
					newsShopName: "",       //动态有关店铺的名字
					newsShopAddr: ""        //动态有关店铺的位置
                },
				chooseShop: {} //选中的对象信息
            }
        },
		//params为上个页面跳转过来的参数
        onLoad(params) {
			var that = this;
			
			//TODO读取VUE根实例属性用户信息并设置发布者id
			
			//读取并设置位置
			uni.getStorage({
				key: "localInfo",
				success(res) {
					var localInfo = res.data;
					that.sendDate.newsLatitude = localInfo.latitude;
					that.sendDate.newsLongitude = localInfo.longitude;
				},
				fail() {
					console.log("未获取到位置信息")
				}
			})
        },
		onShow() {
			var that = this;
			//获取在选择商铺页缓存的选中的商铺信息
			uni.getStorage({
				key: 'chooseShop',
				success: function (res) {
					that.chooseShop = res.data;
					that.isShowShop = true;
					//获取数据后清除缓存
					uni.removeStorage({
						key: 'chooseShop',
						success: function (res) {
							console.log('清除缓存chooseShop成功');
						}
				    });
				}
			});
		},
		created() {	    
		},
		mounted() {
		},
        methods: {
			handShopTap(){ //商铺盒子的点击事件
			},
            close(e){
                this.imageList.splice(e,1);
            },
            chooseMsg() { //分类选择
                uni.showActionSheet({
                    itemList: this.msgContents,
                    success: (res) => {
                        this.sendDate.newsCategory = this.msgContents[res.tapIndex];
                    }
                })
            },
            chooseImg() { //选择图片
                uni.chooseImage({
                    sourceType: ["camera", "album"],
                    //sizeType: "compressed",
                    count: 4 - this.imageList.length,
                    success: (res) => {
                        this.imageList = this.imageList.concat(res.tempFilePaths);
                    }
                })
            },
			choseShop(){ //选择店铺
				console.log("选择店铺")
				uni.navigateTo({
					url: '../chooseShop/chooseShop'
				});
			},
            chooseStar(e) { //点击评星
                this.sendDate.score = e;
            },
            previewImage() { //预览图片
                uni.previewImage({
                    urls: this.imageList
                });
            },
            send() { //发布
                console.log(JSON.stringify(this.sendDate));
				
				//验证信息是否完整
				var sendData = this.sendDate;
				if(sendData.publisherId == '' || sendData.content == '' || this.imageList.length == 0){
					uni.showToast({
						title: "您还有动态信息未写哦",
						icon: "none"
					});
					return;
				}else{
					let imgs = this.imageList.map((value, index) => {
					    return {
					        name: "image" + index,
					        uri: value
					    }
					})
					var url = this.server_Url;
					uni.uploadFile({
					    url: url + "/createNews",
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
									newsLatitude: "",
									newsLongitude: "",
									newsCategory: "生活街", 
									newsShopId: "",	
									newsShopName: "",
									newsShopAddr: "",
									publisherId: ""
					            };
								//TODO返回跳转到动态页
					        }
					    },
					    fail: (res) => {
					        uni.showToast({
					            title: "发布失败",
					            icon:"none"
					        });
					        console.log(res)
					    }
					});
				}           
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
	.top-banner{
		width: 100%;
		height: 190upx;
	},
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
    .news-title {
    	display: flex;
    	flex-direction: row;
    	justify-content: space-between;
    	align-items: center;
    	padding: 20upx;
    	color: #8f8f94;
    	font-size: 28upx;
    }
    .news-star-view.news-title {
    	justify-content: flex-start;
    	margin: 0;
    }
    .news-quick {
    	position: relative;
    	padding-right: 40upx;
    }
    .news-quick:after {
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
    .news-body {
    	background: #fff;
    }
	.news-body:active{
		background-color: #eeeeee;
	}
    .news-textare {
    	height: 120upx;
    	font-size: 34upx;
    	line-height: 50upx;
    	width: 100%;
    	box-sizing: border-box;
    	padding: 15upx 30upx 0;
    }
    .news-shop {
    	font-size: 34upx;
		color: #707070;
    	height: 50upx;
    	min-height: 50upx;
    	padding: 15upx 30upx;
    	line-height: 50upx;
		border-bottom: 1upx solid #eeeeee;
    }
	.shop-box{
		width: 100%;
		height: 180upx;
		position: absolute;
		z-index: 99;
	}
	.icon-next{
		float: right;
	}
    .news-uploader {
    	padding: 10upx 20upx;
    }
    .news-submit {
    	background: #ea5455;
    	color: #FFFFFF;
    	margin: 20upx;
    }
</style>
