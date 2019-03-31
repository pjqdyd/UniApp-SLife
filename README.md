# _![app](https://github.com/pjqdyd/UniApp-SLife/blob/dev/appInfo/appIcon/icon40.png)_ UniApp-SLife  生活街(Street Life App)

### 简介: 
>生活街(Street Life)是一款O2O(online to offline)模式的,以附近线上实体商店预览交互,线下交易选购的生活服务类APP .<br>[简介详情](https://github.com/pjqdyd/UniApp-SLife/blob/master/appInfo/introduction/slife.md)

#### 项目目录:
```
 ├─appInfo               应用的一些介绍信息,演示,截图等
 ├─components            公用组件目录
 ├─mockJson              测试的模拟json数据文件
 ├─common                存放全局的一些js变量配置, /style下存放icon字体图标样式
 ├─pages                 业务页面文件存放的目录
 ├─static                存放应用引用静态资源（如图片等）的地方，注意：静态资源只能存放于此
 ├─main.js               Vue初始化入口文件
 ├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
 ├─manifest.json         配置应用名称、appid、logo、启动图、版本等打包信息
 ├─pages.json            配置页面路由、导航条、选项卡等页面类信息
 └─uni.scss              uni-app内置的常用scss样式变量
```

项目使用的是DCloud旗下的[uniapp](https://uniapp.dcloud.io/)框架开发的移动端的app (开发中,文档后续更新...)

项目需要使用DCloud自家的编辑器[HBuilder X](https://www.dcloud.io/hbuilderx.html)打开运行到真机/微信小程序/或运行到浏览器

由于非原生组件在安卓不流畅,所以主页使用了weex(nvue)原生组件,在H5和小程序使用vue组件,兼容了移动端, H5和小程序

目前后端还未写,所以暂时使用了Mock JSON数据, 因为这款App我打算是以安卓为主, 所以多是在安卓上测试开发, H5和小程序也能运行,但在安卓上有更完善的功能和体验
