<template>
    <div class="locate">
        <button class="back" @touchend="back2signup"></button>
        <div class="container" id="container"></div>
        <div @click="jumpGaoDe" class="get-GaoDe" target="self">
            <button class="turnOn">点击调起高德地图</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                map: undefined,
                marker: undefined
            }
        },
        mounted() {
            this.init();
            this.$nextTick(() => {
                this.clearDefaultJump();
            })
        },
        methods: {
            jumpGaoDe() {
                this.$cache.save('noBaiTiao', 'no');
                this.marker.markOnAMAP({
                    name: '上海白兰玉广场商场L1楼(02-03)商铺',
                    zoom: 18,
                    position: this.map.getCenter()
                })
                // location.href = 'https://m.amap.com/share/index/__q=31.24916,121.49773600000003,%E4%B8%8A%E6%B5%B7%E7%99%BD%E5%85%B0%E7%8E%89%E5%B9%BF%E5%9C%BA%E5%95%86%E5%9C%BAL1%E6%A5%BC(02-03)%E5%95%86%E9%93%BA&src=jsapi&callnative=1&callapp=0&lnglat=121.49773600000003,31.24916&name=%E4%B8%8A%E6%B5%B7%E7%99%BD%E5%85%B0%E7%8E%89%E5%B9%BF%E5%9C%BA%E5%95%86%E5%9C%BAL1%E6%A5%BC(02-03)%E5%95%86%E9%93%BA'
            },
            clearDefaultJump() {
                var stopDefault = function(e) {
                    if (e && e.preventDefault){
                        e.preventDefault();
                    } else {
                        window.event.returnValue = false;
                    }
                }
                const aDom = document.querySelector('.amap-logo');
                aDom.onclick = stopDefault;
            },
            back2signup() {
                this.$router.replace('signup');
                 window.baidu({
                    type: 'btn',
                    tip1: 'back2singup',
                    tip2: '回到报名页'
                })
            },
            init() {
                //初始化地图
                this.map = new AMap.Map('container', {
                    resizeEnable: true, //是否监控地图容器尺寸变化
                    zoom: 18, //初始地图级别
                    center: [121.497736,31.24916], //初始地图中心点
                });

                this.addMarker();

            },
            addMarker() {
                this.marker = new AMap.Marker({
                    icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                    position: this.map.getCenter(),
                    offset: new AMap.Pixel(0, 0)
                });
                this.marker.setLabel({
                    //修改label相对于maker的位置
                    offset: new AMap.Pixel(0, 0),
                    content: "<div class='info'>上海市虹口区长治路588号<br>上海白兰玉广场商场L1楼(02-03)商铺</div>"
                });
                this.marker.setMap(this.map);
            }
        },
    }
</script>

<style lang="less">
.locate {
    .page();

    .back {
        .pf;
        @d: 0.5rem;
        left: @d;
        top: @d;
        @s: 0.6rem;
        width: @s;
        height: @s;
        border-radius: 50%;
        .bg-contain('location_back', 'png', true);
        box-shadow: 0 0 50px 10px rgba(0, 0, 0, 0.7);
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 999;
    }

    .get-GaoDe {
        display: block;
        .pf;
        .r(0);
        .l;
        .b(0.6);
        .mA;
        background-color: rgba(0, 0, 0, 0.8);
        width: 2.8rem;
        @h: 0.6rem;
        height: @h;
        line-height: @h;
        .tac;
        border-radius: @h / 2;
        border: 0.02rem solid #fff;
        box-shadow: 0 0 50px 10px rgba(255, 255, 255, 0.7);

        .turnOn {
            .c-w;

        }
    }
     #container {
      width: 100%;
      height: 100%;
    }

    #map-zoom, #map-center {
      color: #0288d1;
    }
    .amap-marker-label{
            border: 0;
            background-color: transparent;
        }

    .info{
        padding: .35rem 0.65rem;
        margin-bottom: 1rem;
        border-radius: .25rem;
        position: fixed;
        top: 1rem;
        background-color: white;
        width: auto;
        min-width: 22rem;
        border-width: 0;
        right: 1rem;
        box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
        position: relative;
        top: 0;
        right: 0;
        min-width: 0;
        -webkit-transform: translate(-45%, -120%);
    }
    .amap-icon img {
        width: 25px;
        height: 34px;
    }

}
</style>
