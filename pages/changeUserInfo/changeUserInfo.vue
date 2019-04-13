<template>
	<view>
		<view class="padding-wrap">
			<view>
				<view class="upload-face">上传新头像:</view>
				<view class="face-box">
					<image v-if="tempFilePath == ''" class="uploader-input" src="../../static/user/upload.png" @tap="chooseImg"></image>
					<image v-if="tempFilePath != ''" class="uploader-input-face" mode="aspectFill" :src="tempFilePath" @tap="chooseImg"></image>
				</view>

			</view>

			<view>
				<view class="name">新的昵称:</view>
				<input class="input-name" v-model="sendData.nickname" maxlength="7" placeholder="请填写您的昵称" />
			</view>
			<view>
				<view class="name">选择性别:</view>
				<radio-group class="sex-radio" @change="handRadioChange">
					<label class="sex-label">
						<radio value="1" color="#EA5455" />男生</label>
					<label>
						<radio value="2" color="#EA5455" />女生</label>
				</radio-group>
			</view>
			<view>
				<button class="btn" @click="send">确认修改</button>
				<button class="btn btn-cancel" @click="reset">取消重置</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				tempFilePath: '',
				sendData: {
					userId: '',
					nickname: '',
					sex: 3
				}
			}
		},
		onLoad() {
			//TODO读取挂载根实例的用户信息,设置用户id
			this.sendData.userId = "0001";
		},
		methods: {
			//选择图片
			chooseImg() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'],
					success: (res) => {
						console.log(JSON.stringify(res.tempFilePaths));
						this.tempFilePath = res.tempFilePaths[0];
					}
				});
			},
			//选择性别
			handRadioChange(res) {
				this.sendData.sex = res.detail.value;
			},
			//点击了确认修改
			send() {
				var sendData = this.sendData;
				var url = this.server_Url; //读取vue根实例属性
				if (sendData.userId == '' || sendData.nickname == '' || this.tempFilePath == '') {
					uni.showToast({
						title: "您还有信息未填写完哦",
						icon: "none"
					});
					return;
				} else {
					console.log(JSON.stringify(this.sendData));	
					uni.uploadFile({
						url: url + "/update/userInfo", //仅为示例，非真实的接口地址
						filePath: this.tempFilePath,
						name: 'file',
						formData: this.sendData,
						success: (uploadFileRes) => {
							console.log(uploadFileRes.data);
							// if(uploadFileRes.data.status == 200){
								uni.showToast({
								    title: "修改成功!",
									success() {
										//TODO 延时跳转回主页
									}
								});
							//}	
						},
						fail() {
							uni.showToast({
								title: "修改失败",
								icon: "error"
							});
						}
					});
				}

			},
			//点击了重置
			reset(){
				this.tempFilePath = '',
				this.sendData = {
					userId: this.sendData.userId,
					nickname: "",
					sex: 3
				}
			}
		}
	}
</script>

<style lang="scss">
	.padding-wrap {
		color: #707070;

		.upload-face {
			width: 100%;
			height: 70upx;
			line-height: 70upx;
			font-size: 30upx;
			background-color: #eeeeee;
			padding-left: 20upx;
		}

		.face-box {
			width: 100%;
			height: 260upx;
			padding: 20upx;
			box-sizing: border-box;
			text-align: center;
			background-color: #fff;
			.uploader-input {
				width: 220upx;
				height: 220upx;
			}

			.uploader-input-face {
				width: 220upx;
				height: 220upx;
				border-radius: 50%;
			}
		}

		.name {
			width: 100%;
			height: 70upx;
			line-height: 70upx;
			padding-left: 20upx;
			font-size: 30upx;
			background-color: #eeeeee;
		}

		.input-name {
			width: 100%;
			height: 80upx;
			padding-left: 20upx;
			background-color: #fff;
		}

		.sex-radio {
			height: 80upx;
			box-sizing: border-box;
			padding: 15upx 0 15upx 20upx;
			border-bottom: 2upx solid #eeeeee;
			margin-bottom: 100upx;
			background-color: #fff;
			.sex-label {
				margin-right: 15upx;
			}
		}

		.btn {
			width: 80%;
			height: 85upx;
			margin-top: 30upx;
			color: #fff;
			background-color: #ea5455;
		}

		.btn-cancel {
			color: #707070;
			background-color: #eeeeee;
		}
	}
</style>
