### 更新日志

### 2018.11.29更新 --- CodeBear
1. 添加百度统计
2. 调整音乐播放

### 2018.11.28更新 --- CodeBear
1. 删除雪碧图相关（因为很多项目都不需要用到，不集到这里面来了）
2. 修改vconsole.js的加载，没有debug参数不加载，减少js请求
3. 路由懒加载

### 2018.11.20更新 --- CodeBear
1. 添加雪碧图处理spriteGroup.js
2. 添加Loading.vue加载组件
3. 调整preload音频加载和图片加载，改到js文件中
4. 添加雪碧图生成脚本

### 2018.11.16更新 --- CodeBear
1. 移除hwlever
2. 合并http.js和api.js
3. 调整预加载，把音乐加载进度也加进去
4. App.vue中加入页面显示隐藏的监听
5. 暂时移除toast、mask组件

### 2018.10.25更新 --- CodeBear
1. 修改cache.js

### 2018.10.22更新 --- CodeBear
1. 原来的音频管理类有点问题，换成howler.js库(在static/js目录下)
2. 修复wxsdk分享参数编码问题

#### 2018.10.16更新 --- CodeBear
1. 修改http.js和wxsdk.js中使用axios冲突的问题
2. 调整http请求写法

#### 2018.10.12更新 --- CodeBear
1. 添加本地缓存工具

#### 2018.9.26更新 --- CodeBear
1. 修复wxsdk.js的bug，判断非微信打开时返回Promise而不是直接return
2. 修改获取链接附带参数的方法
3. 添加vconsole，链接附带参数debug=true时才会显示
4. wxsdk.js添加生成分享参数的方法
5. util.js添加base64编码解码方法（微信分享参数有中文时需要用到）

#### 2018.9.25更新 --- CodeBear
1. 更新wxsdk.js，修改参数bug，改为Promise方式

#### 2018.9.18更新 ---- CodeBear
1. 遍历图片目录，不用手动写进数组里面，加上判断设备是否是ios
2. build压缩html文件
---- Ele_Lee
1. 修正postcssrc.js，使得打包自动加入兼容前缀，禁止flex-wrap使用和，flex容器盒子的子元素必须写全项目属性，如：flex:1 是不够兼容的写法，要flex: 1 0 auto（这段记得不太确定）。必要时候需要拆开写。

#### 2018.9.7更新 ---- Ele_Lee
1. 删除window下的事件BUS，删除rem.js文件
2. 加入Toast组件，util.js加入些获取URL参数的函数
3. webpack加入部分polyfill的浏览器兼容处理，array.inlcudes ,string.inlcudes, array.from，具体看webpack.base.conf.js
4. 加入遍历assets/img文件名的js，需要单独运行getFilesPath(node getFilesPath.js)，然后复制到config.js内
5. 修改http.js和api.js的运用，以及对付路径 '/' 的存在与否处理
6. 修正Loading.vue里面百分比的进度条
7. 加入vue transition标签相关动画scss
8. 修改SDK的请求，去掉zepto.js，改成axios
9. 更改目录结构，common里面是些JS，SCSS是样式文件
10. musicManager.js的完善，删掉Preload.vue内的initMusic，音乐的使用可看start.vue

#### 2018.8.23更新 ---- Ele_Lee

1. 全局scss将放入index.scss引入，不再每个vue文件Import这些scss文件，增加compatibility文件，专门用来流传移动端兼容的css
2. 给路由加上 meta: 'noGuard'，将不会进入路由守卫，新版meta后面是接对象，不知道会不会生效
3. 更正些命名和配置，统一编辑器配置文件和eslint的配置，（现在是空格缩进），增设.prettierrc格式配置文件
4. webpack优化dev构建
5. 加入遮罩层组件，这个有待观察，默认设置了防点击穿透，内部插槽的点击要用touchend

#### 2018.8.22更新

1. 修改wxjssdk，打包到Webpack中
2. 调整Preload组件写法
3. 新增api.js/io.js/bus.js
4. 增加路由守卫，防止跳过Loading的加载页面进入游戏

#### 2018.8.20更新

1. 修改Webpack配置，支持es6/es7写法。
2. 删除无用代码
3. 更新READMD.md，增加详细更新说明

#### 2017.11.22更新

1. 添加了Preload子组件。用于图片、音乐预加载。
2. 添加了配置文件。存放前端代码中一切需要配置的东西如预加载图片、微信分享文案等。
3. 添加了微信分享设置

#### 2017.11.14更新

添加了hwlever。具体文档见：[https://github.com/HelloWorld20/hwLever](https://github.com/HelloWorld20/hwLever)

#### 2017.11.11更新

删除了无用依赖，关闭了webpack图片自动转换为base64。

新引进了eslint规范，使用的是airbnb规范，相关的eslint配置可以参考下面的文档。