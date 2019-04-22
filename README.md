非标组外包项目开发模板

## 说明

下载到本地后

`yarn` 安装依赖

`yarn run dev`本地调试

注意调试时候，需要把`config/index.js`中的host修改为本机内网IP，否则报错。

## 更新

看UPDATE.md文件，每次更新添加在开头，不要添加结尾，毕竟要看的还是新更新的

## 使用说明

看USE.md文件

## 线上发布

如果需要发布版本到线上，流程如下：

#### 1. 修改文件夹名字：

把文件夹的名字修改如下

game\_template =>  name\_id(示例：weimishou\_161)

其中的`name`是本项目的名字，无特别要求。`id`是本项目的唯一`id`，不可重复，在平台现有模板`id`基础上递增，假设现在模板ID已经使用到了161，那么本次新项目的模板ID是162。如果无法确定最新ID，那就咨询强子。

#### 2. 迁移文件夹：

文件夹修改完毕后，需要迁移到[24haowan\_game\_tpl](https://github.com/GuangZhouShanyouGame/24haowan_game_tpl)中。

拉取了game\_tpl仓库到本地后，新建分支，如:`git checkout -b custom_新增维密瘦活动`

然后把整个`weimishou_161`文件夹放到`24haowan_game_tpl`仓库下。

#### 3. 打包代码并更新

通过`yarn run build`完成打包，然后把分支推送到Github上

#### 4. 构建代码

打开[构建地址](http://test.24haowan.com/switch/)，选中`24haowan_game_tpl`，点击同步远端分支。此时构建工具会自动把仓库的分支拉取到本地。同步远端分支结束后，点击下拉框，选中自己新创建的分支，选中，并且点击下方的构建并同步代码，此时构建工具会自动更新代码到测试环境。

#### 5. 创建测试活动

构建之后通过

`http://test.24haowan.com/webCustom/addCustomGame/tpl_id/id`

`id`修改为自己的游戏`id`，比如`http://test.24haowan.com/webCustom/addCustomGame/tpl_id/161`，便可以创建对应的活动。点击发布后，可拿到游戏链接，这就是线上的访问地址。

## Q&A

#### 1. 线上版本的入口文件在哪里

本地版本的入口文件是`index.html`，线上版本的入口文件是`index.php`。如果需要增加无法打包到Webpack的资源文件，除了在本地新增，在php文件中也要新增。

#### 2. 版本管理

打包出来的文件，放在`static_resource`文件夹中，可以看到里面的`css js`文件都没有带上`chunkhash`，是因为我们已经在php文件中已经加上了版本管理，所以就不在webpack中重复加上了。

在`index.php`中的

```
<script type=text/javascript src="/static_resource/dist/static/js/app.js?v=<?php echo Yii::app()->params['version']; ?>"></script>
```

其中的`?v=<?php echo Yii::app()->params['version']; ?>`便是版本管理，每次构建代码，都会刷新后面的版本号。所以每次推送代码时，构建完毕后，php作为入口文件已经刷新了版本号，会重新请求`js css`文件，实现更新的效果且不会受到设备本地缓存的影响。

#### 3. 更方便的更新方式

老实说，每次更改代码后，都需要推送分支，然后点击构建才能够更新代码。有时候网络不好，或者Github被墙的情况下，点击构建工具更新代码十分缓慢，有没有更好的更新方式？

答案是有的，可以参考`24haowan_game_tpl`仓库中的`weimishou_161`项目。

首先，为什么我们要把项目上到平台？假设是纯静态的项目，我们可以直接部署到CDN上，缺陷在于更新代码时比较麻烦，因为缺少像php这样的服务端输出的入口文件作为版本管理。但是对于小项目，不失为一种不错的方式。

之所以有部分项目必须上平台，是因为需要借助平台的接口，比如获取用户的微信头像昵称以及更改授权的公众号等功能。但是其实对比，可以发现即使是上到了平台创建活动，对于静态资源比如`js css`也是放在CDN上的

```
<script type=text/javascript src="/static_resource/dist/static/js/app.js?v=<?php echo Yii::app()->params['version']; ?>"></script>
```

所以，我们可以把资源文件上传到定制组的CDN上，然后把`index.php`中的资源文件更改为指定CDN的资源。更新代码时，替换CDN上的文件即可。如果需要更新版本号，那么重新构建一次代码便行。每次构建都会更新版本号。

另外需要注意，如果采取这种方式，那么每次替换了定制组的CDN文件后，需要手动刷新CDN缓存，[刷新工具](http://tools.i.24haowan.com/)

## 技术栈

vue2 + vue-router

可根据需要引入`axios`以及`vuex`

此开发模板修改了`webpack`的部分配置，方便我们把项目发布到平台上。

## eslint配置说明

为了提升非标组项目内部的协同开发效率，同时也是为了约束大家的代码规范，故引入Airbnb规范约束大家的代码风格。目前处于测试阶段，故需要大家共同维护相关的eslint配置。

eslint的配置也比较简单，在`vs-code`中下载`ESLint`插件即可，这样便可以对我们的js文件进行检测了。但是因为我们还需要约束Vue里面的js代码，所以还需要打开设置(可以通过`Command+,`直接打开，或者在左上角中自己手动打开)，加入以下配置。

```
"eslint.validate": [
    "javascript",
    "javascriptreact",
    {
        "language": "html",
        "autoFix": true
    },
    {
        "language": "vue",
        "autoFix": true
    }
],
"eslint.autoFixOnSave": true
```

上面的配置分别是指开启Vue的检查，同时也能实现在保存的时候自动的去修复一部分的错误。

平时开发时如果遇到eslint的错误，可以在`https://eslint.org/docs/rules/`网站上搜索详细的错误说明。

脚手架中已经集成了部分eslint的配置，写在`.eslintrc.js`中。这也是eslint的配置文件，可以看到在配置文件中我们写了`extends: 'airbnb-base'`，这也是表明我们的这份eslint配置是基于Airbnb规范的。

如果开发过程中遇到了不赞同的eslint约束，可以通过修改`.eslintrc.js`文件去掉相关约束。另外，因为我已经去掉了webpack中的eslint检查，所以就算在vscode中存在eslint的报错，还是可以正常打包预览的，甚至直接应用于生产环境。但是项目正式上线的时候，还是尽量的解决掉相关的错误。



## 已删除的，用作记录
1. main.js内部

```
// import hwlever from 'hwlever';
// hwlever 文档详见 https://github.com/HelloWorld20/hwLever
// hwlever.config({
// 	cdn: '//24haowan-cdn.shanyougame.com/public/js/vconsole.min.js',
// 	entry: 'EasterEgg',
// 	vueObj: Vue,
// 	debug: process.env.NODE_ENV === 'development',
// 	ravenId: '//56d67d26f9854c21a1f8e7b83854fecd@sentry.24haowan.com/12',
// 	// extraConf: {
// 	// 	tags: {
// 	// 		from: 'hwlever online demo'
// 	// 	}
// 	// },
// 	// type: ['touch', 'click', 'swipe', 'shake']
// });
```
