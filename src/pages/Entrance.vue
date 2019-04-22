<template>
    <div class="entrance">
        <section class="enter" v-show="!showToggle">
            <span class="icon-arrow" ref="arrow" v-if="!boomKey" :style="`background-image: url(${require('@imgs/arrow_static.png')})`"></span>
            <span class="icon-arrow" v-else :style="`background-image: url(${boomArrowBg})`"></span>
        </section>
        <article class="title-box" v-show="showToggle">
            <div class="title1"></div>
            <div class="title2"></div>
        </article>

        <div class="texture" v-show="showToggle"></div>
        <div class="btn-box" @touchend="jump" :style="`background-image: url(${btnBg})`" v-if="btnToggle"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showToggle: false,
                btnToggle: false,
                boomKey: false,
                boomArrowBg: null,
                btnBg: null
            }
        },
        created() {
            this.boomArrowBg = require('@imgs/arrow_particle.gif');
            window.baidu({
                type: 'page',
                tip1: 'entrance',
                tip2: '寻找1%的入口展示页'
            })
        },
        mounted() {
            this.btnBg = require('@imgs/btn_challenge.gif');
            setTimeout(() => {
                this.initAnime();
            }, 900)
        },
        methods: {
            initAnime() {
                this._initDomPosition();
                anime({
                    targets: this.$refs.arrow,
                    top: '80%',
                    duration: 500,
                    easing: 'easeInQuad',
                    complete: () => {
                        setTimeout(() => {
                            this.boomKey = true;
                            setTimeout(() => {
                                this.boomArrowBg = null;
                                this.showToggle = true;
                                this._nextSceneAnime();
                            }, 600)
                        }, 100);
                    }
                })
            },
            _initDomPosition() {
                anime.set('.title2', {
                    scale: 0.2
                })
                anime.set('.title1', {
                    scale: 0.8
                })
                anime.set('.texture', {
                    translateY: '100vh'
                })

            },
            _nextSceneAnime() {
                let title2Duration = 400;
                anime({
                    targets: '.title2',
                    duration: title2Duration,
                    scale: 1,
                    opacity: 1,
                    easing: 'linear',
                    delay: 100,

                })
                anime({
                    targets: '.texture',
                    duration: 800,
                    translateY: 0,
                    delay: 100,
                    easing: 'easeOutBack'
                })
                anime({
                    targets: '.title1',
                    duration: 800,
                    delay: title2Duration,
                    opacity: 1,
                    scale: 1,
                    easing: 'linear',
                    complete: () => {
                        this.btnToggle = true;
                        // 按钮GIF播放完时间
                        setTimeout(() => {
                            this.$bus.jumpKey = true;
                        }, 400);
                    }
                })

            },
            jump() {
                this.btnBg = null;
                this.$nextTick(() => {
                    this.$router.replace('introduce');
                    window.baidu({
                        type: 'btn',
                        tip1: 'entrance-btn',
                        tip2: '跳转到戈壁介绍页'
                    })
                })
            }
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less">
.entrance {
    .page();
    background-color: #000;
    color: #fff;

    .enter {
        .icon-arrow {
            display: inline-block;
            .pf();
            // .b(-100vh);
            @s: 0.8rem;
            .t(-@s);
            left: 50%;
            width: @s;
            height: @s;
            transform: translate3d(-50%, 0, 0);
            // .bg-contain('arrow_static')
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 50%;
        }
    }

    .title1 {
        bottom: 0 !important;
        opacity: 0;
    }
    .title2 {
        top: 0.6rem !important;
        opacity: 0;
    }

    .texture {
        .mt(0.9);
        .bg-cover('entrance_texture');

    }

    .btn-box {
        .pf();
        .b(2);
        .l(0);
        .r(0);
        .mA();
        // width: 3.9rem;
        // height: 1.55rem;
        // .bg-cover('btn_challenge', 'gif');
        width: 4.64rem;
        height: 2.02rem;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
    }
}

</style>
