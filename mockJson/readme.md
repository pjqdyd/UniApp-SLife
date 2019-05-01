
#### 生活街测试版使用在线模拟json数据

---使用的在线模拟数据工具: [Easy Mock](https://www.easy-mock.com), 你也可以自己在线创建模拟json数据接口,然后在项目目录的common/config.js中修改全局连接服务数据的serverUrl为模拟接口的Base URL, 最后在每个页面的uni.request方法中拼接完整的url来获取模拟json数据.

(注意目前的数据只是完成展示, 具体的动态请求后端数据展示,等后端写了再修改页面数据的请求逻辑)

目前使用的各个的链接json数据:<br>

 >1. [动态列表newsdata.json](https://www.easy-mock.com/mock/5c8dd97d6fe7c7611499c703/test/newsdata)<br>
 >2. [附近商铺列表locallist.json](https://www.easy-mock.com/mock/5c8dd97d6fe7c7611499c703/test/locallist)<br>
 >3. [用户信息userinfo.json](https://www.easy-mock.com/mock/5c8dd97d6fe7c7611499c703/test/userinfo)<br>
 >4. [店铺详情信息shopinfo.json](https://www.easy-mock.com/mock/5c8dd97d6fe7c7611499c703/test/shopinfo)<br>
 >5. [店铺评论信息comment.json](https://www.easy-mock.com/mock/5c8dd97d6fe7c7611499c703/test/commentlist)<br>

