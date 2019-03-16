import Vue from 'vue'
import App from './App'
import './common/style/iconfont.css' //导入使用iconfont图库的样式

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

//vue组件的全局的server地址
Vue.prototype.server_Url = 'http://www.mockhttp.cn/mock'; 