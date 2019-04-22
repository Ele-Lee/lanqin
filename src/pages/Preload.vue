<template>
    <div class='loading'>
        <article class="title-box">
            <div class="title1"></div>
            <div class="title2"></div>
        </article>
        <section class="main">
            <div class="loading-effect"></div>
            <h5 class="percentum">{{width}}</h5>
        </section>
        <footer class="logo"></footer>
    </div>
</template>
<script>
import Preload from '@common/preload'

export default {
    name: 'Loading',
    data() {
        return {
            width: '0%',
            limitTime: 1500
        };
    },
    created() {
        window.baidu({
            type: 'page',
            tip1: 'loading',
            tip2: '加载页'
        })
    },
    beforeMount() {
        this.initWxShare();
        this.$cache.save('noBaiTiao', 'yes');
    },
    async mounted() {
        new Preload(this)
            .onProgress(this.onPreloadProgress)
            .onComplete(this.onPreloadComplete)
            .start();
        this.initAni();
    },
    methods: {
        /**
         * 微信分享相关
         * */
        initWxShare() {
            let params = {
                debug: {
                    ignore: true, // 忽略，即该字段不进行base64编码
                    value: true
                }
            }
            // 分享文案
            let opts = {
                title: '与COLMO一起挑战戈壁',
                desc: '加入COLMO戈壁挑战队，攀登不止，做科技时代的探索者',
                link: window.location.href.split('#')[0].split('?')[0] + this.$wxsdk.makeLinkParams(params),
                imgUrl: require('@imgs/share_icon.png')
            }
            this.$wxsdk.share(opts)
        },
        onPreloadProgress(progress) {
            progress = parseInt(Math.min(100, Math.max(0, progress)));
            this.width = `${progress}%`
        },
        onPreloadComplete() {
            this.width = '100%'
            this.$bus.ready = true
            setTimeout(()=> {
                // 等300毫秒再跳转，因为进度条动画是300毫秒
                this.$router.replace('home')
            }, this.limitTime)
        },
        initAni() {
            const dom1 = '.title-box .title1';
            const dom2 = '.title-box .title2';
            const dom3 = '.logo';
            const delay = 200;
            anime.set(dom1, {
                bottom: 0,
                translateY: '0.6rem',
                opacity: 0
            })
            anime.set(dom2, {
                top: '0.6rem',
                opacity: 0,
                translateY: '-0.6rem'
            })
            anime.set(dom3, {
                opacity: '0',
                scaleY: 0
            })
            anime({
                targets: dom1,
                // bottom: 0,
                translateY: 0,
                opacity: 1,
                duration: 1500,
                autoplay: true,
                easing: 'easeOutCubic',
                delay,
            })
            anime({
                targets: dom2,
                // top: '0.6rem',
                translateY: 0,
                duration: 1500,
                opacity: 1,
                autoplay: true,
                easing: 'easeOutCubic',
                delay,
            })
            anime({
                targets: dom3,
                opacity: 1,
                scaleY: 0.99,
                easing: 'linear',
                duration: this.limitTime,
                autoplay: true,
                delay,
            })
        }
    },
}
</script>
<style lang="less">
.loading {
    .page();
    background-color: #080605;
    overflow: hidden;


    .main{
        .pr;
        .mt(0.5);
        .bg-contain('loading_texture');
        @t: 1.6rem;
        @h: 1.06rem;
        @w: 1.96rem;
        .loading-effect {
            .pa;
            top: @t;
            left: 50%;
            margin-left: @w / -2;
            width: @w;
            height: @h;
            .bg-cover('loading_effect', 'gif', true);
            &:after {
                .pa();
                width: 100%;
                height: 0.04rem;
                top: @h + 0.26rem;
                display: inline-block;
                background-color: #535254;
                content: '';
            }
        }
        .percentum {
            .pa;
            width: 100%;
            text-align: center;
            top: @t + @h + 0.6rem;
            font-size: 0.28rem;
            color: #fff;
        }
    }

    .logo {
        .pf;
        .b(0.55);
        .l(3.5);
        // .t-t(-40%);
        margin-left: 1.64rem * -0.4;
        .bg-contain('loading_logo');
    }

}
</style>

