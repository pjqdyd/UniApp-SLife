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


#### 如何运行:
    
 * 1.点击菜单栏【运行】: 
   * 运行到浏览器 > Chrome (提示:确认你已在【工具】-[设置]-[运行配置]中配置好了Chrome浏览器的安装位置), 运行成功后按F12进入调试模式,F5刷新一次
   * 运行到小程序模拟器 > 微信开发者工具 (同上配置微信开发者工具的安装位置).
   * 运行到真机测试 > 选择运行的设备 准备好数据线[看官方文档](https://uniapp.dcloud.io/quickstart?id=%E8%BF%90%E8%A1%8Cuni-app).
 
#### 注意:
  1. 目前后端未完成, 当前dev分支的项目的请求后端资源的url接口地址也未替换,仍是模拟json数据,之后接口写好后会替换.
 
#### 提示:

> 1. 运行到真机测试,微信QQ登录授权的appid/高德地图的SDK都是使用调试基座的, 在联调后端完成后,将会在manifest.json中配置自己申请的第三方SDK,打开项目的manifest.json通过可视化界面配置App SDK和App权限模块,之后可以通过自定义制作基座或App打包来使用自己的SDK.
>
> 2. 因为这款App我打算是以安卓为主, 所以多是在安卓上测试开发, H5和小程序也能运行,但在安卓上有更完善的功能和体验.

#### 补充:
 
   当前项目如果发现可优化,欢迎大家提issue改进.
   
   
   
