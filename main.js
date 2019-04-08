import Vue from 'vue'
import App from './App'
import './common/style/iconfont.css' //导入使用iconfont图库的样式

import conf from './common/config.js' //全局的一些配置信息

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

//挂载vue组件的全局的server地址属性
Vue.prototype.server_Url = conf.serverUrl; 
//注意 Vue 上挂载属性，不能在 .nvue 中使用