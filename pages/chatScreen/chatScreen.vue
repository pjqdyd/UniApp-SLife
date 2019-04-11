<template>
	<view class="page" id="chat">
		<view class="message-height">
			<view v-for="(it,i) in messageData" :key="i">
				<left-message v-if="it.type == -1" :data="it.message" :faceUrl="friendFaceUrl" :time="it.time"></left-message>
				<right-message v-if="it.type == 1" :data="it.message" :faceUrl="userFaceUrl" :time="it.time"></right-message>
			</view>
		</view>
		<view class="footer">
			<sendMessage @messageSend="handMessageSend"></sendMessage>
		</view>
	</view>
</template>


<script>
	var messageDate = require("@/common/message/message.js"); //模拟消息的js数组对象
	import leftMessage from "./component/left-message.vue";
	import rightMessage from "./component/right-message.vue";
	import sendMessage from "./component/send-message.vue";
	export default {
		components: {
			leftMessage,
			rightMessage,
			sendMessage
		},
		data() {
			return {
				messageData: [],
				userFaceUrl: '', //用户头像
				friendFaceUrl: '', //好友头像
				
				chatObject: {} //新聊天对象
			};
		},
		onReady() {

		},
		onLoad(params) {
			
			//注意: messageDate.messagelist是用户和单个好友的历史消息数据集合
			//	而messageList是存放所有的好友聊天对象集合
			
			console.log(params.id) //id为聊天好友的单个对象id
			//根据id读取缓存中的消息字符串列表,设置给messageData,值类似messageDate.messagelist, 所以在保存聊天消息到缓存时, key为好友id, data是消息数据字符串列表
			this.messageData = messageDate.messagelist; //测试设置默认的历史消息

			//如果未读到,就创建缓存(创建新聊天),key为好友id, data是消息数据字符串列表(空), 
			//再创建一个对象,设置给chatObject: (并保存缓存chatObject新聊天对象进messageList聊天对象集合的第一位置)
			// 					{
			// 						title: params.name,//新好友名字
			// 						id: params.id,//新好友id
			// 						faceUrl: params.faceUrl, //新好友头像
			// 						message: "",
			// 						time: "",
			// 						count: 0,
			// 						stick: false,
			// 						disabled: true
			// 					}

			//TODO读取挂载在vue实例上的全局用户对象属性
			//设置自己的聊天头像
			this.userFaceUrl = "https://upload-images.jianshu.io/upload_images/14511997-f98df143a7bb5a83.png";
			//设置好友的头像
			this.friendFaceUrl = params.faceUrl;
			//设置标题为好友的昵称
			uni.setNavigationBarTitle({
				title: params.name
			});

		},
		mounted() {
			setTimeout(() => {
				this.setScrollPosition(); //设置页面滚动到底部的位置
			}, 200)
		},
		methods: {
			//设置页面滚动到的位置
			setScrollPosition() {
				//获取聊天框节点的信息, 并设置页面滚动到聊天框底部的位置
				var query = uni.createSelectorQuery();
				query.select("#chat").boundingClientRect(function(res) {
					uni.pageScrollTo({
						scrollTop: res.height,
						duration: 200
					});
				}).exec();
			},
			//消息发送,e为单条消息对象
			handMessageSend(e) {

				var msgData = this.messageData; //原消息数组
				//this.messageData = [].concat(JSON.parse(JSON.stringify(msgData.concat(e))));
				this.messageData = msgData.concat(JSON.parse(JSON.stringify(e))); //拷贝数组,注意是深拷贝方法

				//TODO新的消息数组,保存到缓存中,key为好友id, data是新的this.messageData

				//TODO通过webSocket, 将userId + firendId + time + message一起发送到后端, 后端根据firendId找到好友的session,通过session将消息转发给好友
				//好友端在Vue根实例中,webSocket监听消息, 播放提示铃声/推送新消息通知, 将新消息拼接历史消息存入缓存, 缓存key = userId, data = messagelist数组

				setTimeout(() => {
					this.setScrollPosition(); //重新设置页面滚动到底部的位置
				}, 200)
				console.log(e)
			}
		},
		//聊天页面隐藏了,(关闭了聊天/或者返回了chat页)
		onHide() {
			//TODO读取缓存中的messageList消息用户对象数组(在chat页的数据), 将本次聊天的对象chatObject移动到数组第一, 且消息是最后发的一条, 时间是最新
		}

	}
</script>

<style lang="scss" scoped="true">
	.page {
		box-sizing: border-box;
		width: 100%;
		background: #f6fbff;
		overflow: hidden;
		padding-bottom: 100upx;
	}

	.messagelist {
		.message-height {
			padding: 30upx 0 130upx 0;
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100upx;
	}
</style>
