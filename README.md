# library for wechat
基于node koa和angular2开发的图书管理，server为服务端，使用KOA，web为前端，使用Angular2，打包压缩使用webpack，数据库使用mongodb。

##启动步骤：
1.打开env.js,修改MONGO参数为自身的地址，初始化数据脚本在web/README.md；

2.进入web目录（cd web）,执行npm install，拉取资源文件；

3.安装tsc命令，使用tsc命令将typescript编译成js；

4.进入server目录（cd ../server）,执行npm install，拉去资源文件；

5.执行node server.js；

6.访问localhost:8090/getUser  (借阅图书页面)；http://localhost:8090/manage/manage.html  (管理图书页面)；

7.由于wechat需要验证，如果本地测试，打开LibraryAPI.js,14行的方法注释。
