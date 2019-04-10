<template>
  <view class="page">
    <view class="message-height">
      <view v-for="(it,i) in messageData" :key="i">
        <left-message v-if="it.type == -1" :data="it.message" :faceUrl="friendFaceUrl" :time="it.time"></left-message>
        <right-message v-if="it.type == 1" :data="it.message" :faceUrl="userFaceUrl" :time="it.time"></right-message>
      </view>
    </view>
    <view class="footer">
      <sendMessage></sendMessage>
    </view>
  </view>
</template>


<script>
var messageDate = require("@/common/message/message.js"); //模拟消息的js数组对象
import leftMessage from "./component/left-message.vue";
import rightMessage from "./component/right-message.vue";
import sendMessage from "./component/send-message.vue";
export default {
  components: { leftMessage, rightMessage, sendMessage },
  data() {
    return {
      messageData: messageDate.messagelist,
			userFaceUrl: '', //用户头像
			friendFaceUrl: '', //好友头像
      pageHeight: 0,
      windowHeight: 0
    };
  },
  onReady() {  
  },
  onLoad(params) {
		console.log(params.id) //id为聊天好友的单个对象id
		//根据id读取缓存中的消息字符串列表,类似messagelist, 所以在保存聊天消息到缓存时, key为好友id, data是消息数据字符串列表
		
		//TODO读取挂载在vue实例上的全局用户对象属性
		//设置自己的聊天头像
		this.userFaceUrl = "https://upload-images.jianshu.io/upload_images/14511997-f98df143a7bb5a83.png";
		//设置好友的头像
		this.friendFaceUrl = params.faceUrl;
		
    let _this = this;
    uni.getSystemInfo({
      success: function(res) {
        _this.windowHeight = res.windowHeight;
      }
    });
    uni.onWindowResize(res => {
      uni.pageScrollTo({
        scrollTop: _this.pageHeight - res.size.windowHeight,
        duration: 300
      });
    });
  },
	mounted() {
		setTimeout(()=>{
			this.setScrollPosition(); //设置页面滚动到的位置
		},500)
	},
  methods: {
		//设置页面滚动到的位置
		setScrollPosition(){
			let _this = this;
			uni
			  .createSelectorQuery()
			  .selectAll(".page")
			  .boundingClientRect(function(rects) {
			    _this.pageHeight = rects[0].height;
			    uni.pageScrollTo({
			      scrollTop: rects[0].height - _this.windowHeight,
			      duration: 0
			    });
			  })
			  .exec();
		}
	}
};
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
