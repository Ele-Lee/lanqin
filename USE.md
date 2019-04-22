# 使用文档

## api.js
> 网络请求
使用：
this.$api.xxx()

1. 获取微信jssdk配置

    **getWxSignPackage(url = window.location.href.split('#')[0])**

2. 获取用户信息

    **getWxUserInfo()**

其他新增api直接添加在api.js中，
**get请求直接使用this.axios.get('xxxx')**
**post等用this.axios.post('xxx', Qs.stringify(params))**

## audioUtil.js
> 音频管理
使用：
this.$audio.xxx()

1. 添加音频加载进度监听

    **addLoadListener(listener)**

2. 加载音频列表

    **load(list = {})**

    list为音频列表，具体看config.js文件中的audioList

3. 设置是否静音

    **mute(muted = false)**

    name为播放的音乐的名称

4. 播放音频

    **play(name)**

5. 暂停播放音频

    **pause(name)**

    name为播放的音乐的名称

6. 暂停所有音乐

    **pauseAll()**

7. 停止播放音乐

    **stop(name)**

    name为播放的音乐的名称

8. 停止播放所有音乐

    **stopAll()**

## cache.js
> 本地存储管理
使用：
this.$cache.xxx()

说明：
* 文件中**keyPrefix**要改为自己的项目名称
* version需要根据自己的项目修改

1. 保存数据

    **save (key, value, exp = 0, type = 'localStorage')**

    key为存储的数据对应的键，后面取数据、删数据都是通过这个

    value为存储的数据

    exp为有效期，单位为s，0位不限，默认0

    type为使用的存储类型localStorage、sessionStorage

2. 取数据

    **load (key, defaultValue = null, type = 'localStorage')**

    key为存储的数据对应的键

    defaultValue为默认值，取不到会返回该值

    type为使用的存储类型localStorage、sessionStorage

3. 删数据

    **delete (key, type = 'localStorage')**

    key为存储的数据对应的键

    type为使用的存储类型localStorage、sessionStorage

## preload.js
> 加载图片、音频
默认在Preload.vue中使用了

## util.js
> 工具类

1. 获取当前URL某个参数，传URL就获取url内某个

    getOneURLQuery = (key, url)

    key为参数对应的键

    不传url默认获取当前网址

2. 获取某URL所有参数，集成一个对象

    getAllUrlQuery = (url)

    不传url默认获取当前网址

3. base64解码

    base64Decode = (str)

4. base64编码

    base64Encode = (str)

5. 判断是不是ios

    isIos()

6. 判断是不是微信打开

    isWeixinBrowser()

7. 判断是不是生产环境

    isProdENV

## wxsdk.js
> 微信sdk

1. 配置微信签名

    configWx(wxSignPackage)

2. 获取微信签名信息（走平台的项目才调用改接口）

    getWxSignPackage()

3. 获取微信用户信（走平台的项目才调用改接口）

    getWxUserInfo()

4. 设置微信分享参数

    share(opt = {})

5. 根据传入的参数，返回可用于微信分享参数的字符串

    对单个参数设置ignore为true，可以忽略base64编码

    makeLinkParams(params = {})