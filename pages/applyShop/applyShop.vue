<template>
	<view class="page">
		<image class="top-banner" mode="aspectFit" src="../../static/local/applyShop.png"></image>

		<!-- 图片选择 -->
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

		<!-- 店铺名称选择 -->
		<view class='shop-title'>
			<text>店铺名称</text>
		</view>
		<view class="shop-body">
			<textarea placeholder="请输入店铺名称..." v-model="sendDate.shopName" maxlength="7" class="shop-textare" />
			</view>
		
		<!-- 店铺分类选择 -->
		<view class='shop-body shop-cate' @tap="chooseMsg">
			<text class="shop-quick">{{sendDate.shopCategory == '生活街' ? '请选择店铺分类' : sendDate.shopCategory}}</text>
		</view>
		
		<!-- 选择位置 -->
		<view class='shop-body shop-cate' @tap="chooseLocaltion">
			<text>{{sendDate.shopAddr == '' ? '请选择店铺位置' : sendDate.shopAddr}}</text>
			<text class="iconfont" style="color: #EA5455;">&#xe611;</text>
		</view>
		
		<!-- 支持的服务 -->
		<view class="shop-server">
			<view class="shop-server-text">服务支持</view>
			<view class="shop-server-checkbox">
				<!-- 多选框 -->
				<checkbox-group @change="handCheckBox">				
					<label v-for="(item, index1) in shopServers" :key="index1">
						<view class="server-checkbox">
							<view style="float: left; line-height: 90upx;"><checkbox :value="item.value" color="#ea5455"/></view>	
							<text class="iconfont server-icon" v-html="item.icon"></text>{{item.name}}
						</view>  
					</label>
                </checkbox-group>
			</view>
		</view>
		
		<!-- 选择营业时间 -->	
		<view class='time-picker-box'>	
			<view style="margin-right: 65upx;">营业时间</view>
			<!-- 起始时间 -->
			<view class="time-picker">
				 <picker id="1" mode="time" :value="time1" start="00:00" end="24:00" @change="bindTimeChange">
					{{time1}}  --
				</picker>
			</view>
			<!-- 结束时间 -->
			<view class="time-picker">
				 <picker id="2" mode="time" :value="time2" start="00:00" end="24:00" @change="bindTimeChange">
					{{time2}}
				</picker>
			</view>	   
       </view>
	   
	   <!-- 店铺的主营信息 -->
	   <view class="shop-sell-info">
		   <textarea placeholder="请输入店铺简介,主营范围等信息..." v-model="sendDate.mainInfo" maxlength="100" class="shop-sell-textarea" />
	   </view>
	   
	   <!-- 入住店铺费用 -->
	   <view class='shop-body shop-cate'>
	   	<text style="float: left;">上线费用</text><text style="float: right; margin-right: 20upx;">免费</text>
	   </view>
	   
	   <!-- 提交申请的按钮 -->
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
				shopServers: [{
					value: "wifi",
					name: "Wifi",
					icon: "&#xe6b7; "
				},{
					value: "cash",
					name: "现金",
					icon: "&#xe621; "
				},{
					value: "alipay",
					name: "支付宝",
					icon: "&#xe666; "
				},{
					value: "wechatpay",
					name: "微信支付",
					icon: "&#xe61d; "
				}],
				
				time1: '08:00', //营业起始时间
				time2: '23:00', //营业结束时间
				
                imageList: [],
                sendDate: {
					applyerId: "",          //申请者id
					shopName: "",			//店铺的名称
					shopLatitude: "",		//店铺的纬度
					shopLongitude: "",		//店铺的经度
					shopCategory: "生活街",  //店铺分类,默认是生活街
					mainInfo: "",           //店铺的主营介绍信息
					shopAddr: "",           //店铺的位置
					openTime: "",			//营业时间 
					supportServer: []		//支持的服务数组
                }
            }
        },
		//params为上个页面跳转过来的参数
        onLoad(params) {	
			//TODO读取VUE根实例属性用户信息并设置申请者id
			this.sendDate.applyerId = "0001";
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
				//手动选择位置信息,并设置店铺的位置信息(手动选择的位置比较准确)
				var that = this;
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						that.sendDate.shopLatitude = res.latitude;
						that.sendDate.shopLongitude = res.longitude;
						that.sendDate.shopAddr = res.address;
					}
				});    
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
			//获取多选框数据,设置支持的服务
			handCheckBox(e){
				//e.detail.value为选中的数组
				console.log(e.detail.value)
				this.sendDate.supportServer = e.detail.value;
			},
			//选择了时间,设置营业时间
			bindTimeChange(e) {
				if(e.target.id == 1){
					this.time1 = e.detail.value
					this.sendDate.openTime = this.time1 + "-" + this.time2;
				}else if(e.target.id == 2){
					this.time2 = e.detail.value
					this.sendDate.openTime = this.time1 + "-" + this.time2;
				}else{
					return;
				}
			},
            send() { //发送反馈
                console.log(JSON.stringify(this.sendDate));
				
				//验证信息完整性
				var sendDate = this.sendDate;
				if(sendDate.applyerId == '' || sendDate.shopName == '' ||
				   sendDate.mainInfo == '' || sendDate.shopAddr == '' ||
				   sendDate.supportServer.length == 0 || this.imageList.length == 0){
					   
					   uni.showToast({
					   	title: "您还有信息未填写完整哦",
						icon: "none"
					   });
					   return;
				   }
				
                let imgs = this.imageList.map((value, index) => {
                    return {
                        name: "image" + index,
                        uri: value
                    }
                })
				var url = this.server_Url;
                uni.uploadFile({
                    url: url + "/applyShop",
                    files: imgs,
                    formData: this.sendDate,
                    success: (res) => {
                        if (res.statusCode === 200) {
                            uni.showToast({
                                title: "提交成功!"
                            });
                            this.imageList = [];
                            this.sendDate = {
                               applyerId: "",          
                               shopName: "",
                               shopLatitude: "",
                               shopLongitude: "",
                               shopCategory: "生活街",
                               mainInfo: "",
                               shopAddr: "",
                               openTime: "",
                               supportServer: []
                            }
                        }
                    },
                    fail: (res) => {
                        uni.showToast({
                            title: "提交失败",
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
		width: 100%;
    	height: 80upx;
    	font-size: 32upx;
    	line-height: 40upx;
    	box-sizing: border-box;
    	padding: 20upx 0 20upx 20upx;
    }
	.shop-cate{
		height: 80upx;
		width: 100%;
		font-size: 33upx;
		box-sizing: border-box;
		color: #707070;
		margin: 20upx 0 20upx 0;
		line-height: 80upx;
		padding-left: 20upx;
	}
	
	.shop-server{
		width: 100%;
		height: 200upx;
		padding: 0 20upx 0 20upx;
		box-sizing: border-box;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
	}
	.shop-server-text{
		width: 25%;
		height: 200upx;
		line-height: 100upx;
		font-size: 32upx;
		color: #707070;
	}
	.shop-server-checkbox{
		width: 75%;
		height: 200upx;
	}
	.server-icon {
		font-size: 34upx;
		float: left;
		margin-right: 10upx;
		color: #707070;
	}
	.server-checkbox{
		width: 45%;
		height: 100upx;
		float: left;
		line-height: 100upx;
		color: #707070;
		font-size: 30upx;
	}
	
	.time-picker-box{
		width: 100%;
		height: 80upx;
		margin: 20upx 0 20upx 0;
		box-sizing: border-box;
		padding-left: 20upx;
		background-color: #fff;
		line-height: 80upx;
		display: flex;
		justify-content: left;
		font-size: 32upx;
		color: #707070;
	}
	.time-picker{
		width: 120upx;
		height: 80upx;
	}
	
	.shop-sell-info{
		background: #fff;
	}
	.shop-sell-textarea{
		height: 160upx;
		font-size: 32upx;
		line-height: 50upx;
		width: 100%;
		box-sizing: border-box;
		padding: 15upx 30upx 0 20upx;
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
