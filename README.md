# _![app](https://github.com/pjqdyd/UniApp-SLife/blob/dev/appInfo/appIcon/icon40.png)_ UniApp-SLife  生活街(Street Life App)

### 简介: 
>生活街(Street Life)是一款O2O(online to offline)模式的,以附近线上实体商店预览交互,线下交易选购的生活服务类APP .<br>[简介详情](https://github.com/pjqdyd/UniApp-SLife/blob/master/appInfo/introduction/slife.md)

#### 项目目录:
```
 ├─appInfo               存放应用的一些介绍信息,演示,截图等
 ├─components            公用组件目录
 ├─mockJson              测试的模拟json数据文件
 ├─common                存放全局的一些js变量配置, /style下存放iconfont字体图标样式
 ├─pages                 业务页面文件存放的目录
 ├─static                存放应用引用静态资源（如图片等）的地方，注意：静态图片只能存放于此
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
 |        编译     |      √通过            |    √通过                                            |       √通过     |   （未测试)    |
 |        运行     |      √通过            |    √通过                                            |       √通过     |   （未测试)    |
 |    流畅性能     |      较流畅           |     一般                                             |       较流畅    |   （未测试)    |
 |    登录功能     |  可用微信/QQ弹窗授权   | 不支持授权弹窗[详情](http://ask.dcloud.net.cn/question/59833)| 不支持   |  （未测试)     |
 |    定位功能     |      支持             |    支持                                              |   需要手动定位  |  （未测试)     |
 |   功能完善性    |     较完善             |    不完善                                        |       不完善 |(--------未测试--------)|


#### 如何运行:

 * 1.项目需要使用DCloud自家的编辑器[HBuilder X](https://www.dcloud.io/hbuilderx.html)打开, 请确保你的HbuildeX已经更新为最新版本,我目前的版本HBuilder X  Version 1.8.2.20190401.
 
 * 2.在编辑器中将整个项目作为一个文件目录打开(不要作为子目录打开),且提前在菜单【工具】-【插件安装】中安装如scss,node.js,uniapp语法编译,app真机运行等插件,否则在编译时控制台会提示××插件未安装.
     
 * 3.点击菜单栏【运行】: 
   * 运行到浏览器 > Chrome (提示:确认你已在【工具】-[设置]-[运行配置]中配置好了Chrome浏览器的安装位置), 运行成功后按F12进入调试模式,F5刷新一次
   * 运行到小程序模拟器 > 微信开发者工具 (同上配置微信开发者工具的安装位置).
   * 运行到真机测试 > 选择运行的设备 准备好数据线[看官方文档](https://uniapp.dcloud.io/quickstart?id=%E8%BF%90%E8%A1%8Cuni-app).
 
 ---
 
#### 提示:

> 1. 运行到真机测试HbuildeX会自动在你的手机上安装HBuilder调试基座,并且微信QQ登录授权/高德地图SDK都是使用官方调试基座的.

> 2. 目前后端还未完成,所以暂时使用了[模拟JSON数据](https://github.com/pjqdyd/UniApp-SLife/tree/master/mockJson), 因为这款App我打算是以安卓为主, 所以多是在安卓上测试开发, H5和小程序也能运行,但在安卓上有更完善的功能和体验. 
>
> 3. 当前Master分支的版本会一直作为模拟Json数据的测试版本, **后期联调后端的版本会push到dev分支**. 
>
> 4. 因为目前Master分支的项目代码只是初期完成测试的第一版本, 代码中仍有许多TODO,和需要优化的地方,在联调后端的分支dev将会完善这些TODO.  
>
> 5. 本项目的代码可能存在一些设计不合理的地方,一部分原因是uniapp多端兼容问题,以及uniapp的api调用, 页面路由跳转上的一些小问题, 这让你不得不去绕路妥协这些问题,另外我也只是一个小白,个人开发确实很难,看这个项目的代码质量算是很真实吧(⊙ˍ⊙), 所以我在项目中整合使用了一些比较好的官方/个人贡献者的组件(官方的插件市场可以搜到).
>
> 6. 另外本项目只是我根据自己提的[简介需求](https://github.com/pjqdyd/UniApp-SLife/blob/master/appInfo/introduction/slife.md)来完成的,只是作为练手项目和学校的作品赛之类的,并不会作为线上产品.

#### 页面截图:
    
  (页面截图来自安卓机型: 小米6 (其他机型暂未测试,各位可以自行测试一下), 项目引用的图片都来自网络, 图标icon来自阿里iconfont)
 
       
  --演示1--
   ![演示图片1](https://github.com/pjqdyd/UniApp-SLife/blob/master/appInfo/demoPhoto/slife1.jpg)
   
  --演示2--
  ![演示图片2](https://github.com/pjqdyd/UniApp-SLife/blob/master/appInfo/demoPhoto/slife2.jpg)
  
  --演示3--
  ![演示图片3](https://github.com/pjqdyd/UniApp-SLife/blob/master/appInfo/demoPhoto/slife3.jpg)
  
  --演示4--
  ![演示图片4](https://github.com/pjqdyd/UniApp-SLife/blob/master/appInfo/demoPhoto/slife4.jpg)


#### 总结:
     
   1. uniapp这个框架还不是很成熟, 虽然可以实现一次开发,编译到多端运行, 但是运行在各个端时有时会有点小问题, 如果你是只适配一个端,那就比较轻松, 所以建议在入坑前一定要仔细了解一下官方文档,可以避免不少坑, 而且uniapp编译运行到安卓端,视图层是运行在WebView容器上的,性能不如原生安卓组件,不过你也可以使用原生Weex(nvue)组件代替vue组件,可以提升性能,但在nvue和vue页面间数据通信又不方便,且nvue的模板较少,所以要根据实际情况选用.
   
   2. 如果要说优点,那就是uniapp是一个跨多端的框架,而且有不错的贡献者和热度以及组件插件模板.
   
   3. 不要一个人开发.
   
   
   (文档持续更新中...)
   
   
   
 #### 补充:
 
   当前项目如果发现可优化,欢迎大家提issue改进.
 
   后端目前正在开发中: [生活街App后端](https://github.com/pjqdyd/SLife-Dev).

   
   
   
