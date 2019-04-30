## _![app](https://github.com/pjqdyd/UniApp-SLife/blob/dev/appInfo/appIcon/icon40.png)_ UniApp-SLife  生活街(Street Life App) dev分支

#### 当前dev分支作为联调后端的版本,后端目前正在开发中: [生活街App后端](https://github.com/pjqdyd/SLife-Dev).

#### 项目目录:
```
 ├─appInfo               存放应用的一些介绍信息,演示,截图等
 ├─components            公用组件目录
 ├─common                存放全局的一些js变量配置, 在common/config.js中配置全局连接后端的serverUrl
 ├─pages                 业务页面文件存放的目录
 ├─static                存放应用引用静态资源（如图片等）的地方
 ├─main.js               Vue初始化入口文件
 ├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
 ├─manifest.json         配置应用名称、appid、logo、启动图、版本,权限等打包信息
 ├─pages.json            配置页面路由、导航条、选项卡等页面类信息
 └─uni.scss              uni-app内置的常用scss样式变量
```
#### APP平台适配:

 |       选项 \ 平台     |      ![](https://github.com/pjqdyd/UniApp-SLife/blob/master/appInfo/demoIcon/android.png) Android 安卓    |   
                               ![](https://github.com/pjqdyd/UniApp-SLife/blob/master/appInfo/demoIcon/wx.png) WxApp 小程序          |
                               ![](https://github.com/pjqdyd/UniApp-SLife/blob/master/appInfo/demoIcon/H5.png) H5 网页版             | 
                               ![](https://github.com/pjqdyd/UniApp-SLife/blob/master/appInfo/demoIcon/IOS.png) Ios 苹果             |
 |:-------------------- |:--------------------:|:-------------------:|:----------------------:|:-------------------:|
 |        编译     |      √通过            |    √通过                           |       √通过     |   （未测试)    |
 |        运行     |      √通过            |    √通过                           |       √通过     |   （未测试)    |
 |    登录功能     |   将支持QQ弹窗授权(微信授权不支持,个人无法申请appid)| 不支持   |      不支持     |  （未测试)     |
 |    定位功能     |      支持             |    支持                             |   需要手动定位   |  （未测试)     |
 |   功能完善性    |    较完善  | 不完善(需要验证用户身份的功能都不行,如评论,点赞,发布动态,上线店铺等)|不完善   |(--------未测试--------)|


#### 如何联调后端测试运行:
 (待更新..)
 
#### 注意:
  1. 目前后端未完成, 当前dev分支的项目的部分请求后端url接口地址也未替换,仍是模拟json数据,之后接口写好后会替换.
 
#### 补充:
 
   当前项目如果发现可优化,欢迎大家提issue改进.
   
   
   
