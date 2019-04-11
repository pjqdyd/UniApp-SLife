<template>
	<view class="send-message">
		<view class="input-wrapper"><input type="text" cursor-spacing ="0" :value="text" @input="onInput"></view>
		<view class="iconfont send" @click="sendMessage">&#xe634; 发送</view>
	</view>
</template>

<script>
	export default {
		name: 'send-message',
		data(){
			return{
				//输入的消息对象
				messageItem: {
					type: 1,
					time: "",
					message: ""
				},
				text: "" //输入的内容
			}
		},
		methods:{
			//正在输入
			onInput(e){		
				this.text = e.detail.value;
			},
			//点击了发送
			sendMessage(){	
				var date = new Date();
				var m = date.getMinutes() < 10? ("0" + date.getMinutes()): date.getMinutes();
				 this.messageItem.time =  date.getHours() + ":" + m; //设置当前时间
				 this.messageItem.message = this.text; //设置消息
				 
				 this.$emit("messageSend", this.messageItem) //向外触发发送函数,带上输入的消息对象
				 
				 this.text = ''; //清空输入框
			}
		}
	}
</script>

<style lang="scss" scoped="true">
	.send-message{
		box-sizing: border-box;
		padding: 0 15upx;
		height: 100upx;
		width: 100%;
		background:#ea5455;
		line-height: 100upx;
		display: flex;
		flex-wrap: nowrap;
		.input-wrapper{
			flex:1;
			padding: 15upx;
			input{
				box-sizing: border-box;
				padding: 0 15upx;
				width: 100%;
				height: 100%;
				border-radius: 10upx;
				background: #fff;
			}
		}
		.send{
			color: #fff;
		}
	}
</style>