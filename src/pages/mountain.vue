<template>
    <section class="mountain">
        <section class="mountain__main">
            <div class="mask-layer">
                <article class="title" ref="titleList">
                    <p>攀登不止，</p>
                    <p>世界上只有1%的人，</p>
                    <p>可以站在世界之巅，</p>
                    <p>纵览浮云遮望眼的无限风光。</p>
                </article>
                <hr class="gradient-line line--p" ref="line">

                <article class="desc-box" ref="descBox">
                    <dot-mark class="dot--p"></dot-mark>
                    <h6 class="desc-place">
                        <span class="f-c">勃朗峰</span>&nbsp;&nbsp;<span class="f-e">Mont Blanc</span>
                    </h6>
                    <p class="desc-info f-c">欧洲最高峰，海拔4810米，体感温度可低至-30℃，<i class="icon--logo p1"></i>登顶首发。</p>
                </article>

            </div>
            <icon-pulldown routerName="trench"></icon-pulldown>
        </section>

        <div class="black-mask black-mask--1"></div>
        <div class="black-mask black-mask--2"></div>
        <span class="dot"></span>
        <!-- <div class="letter-c" v-show="letterToggle"></div> -->
    </section>
</template>

<script>
    import textAnime from '@common/textAnime.js';

    export default {
        name: 'mountain',
        data() {
            return {
                letterToggle: true,
                letterDuration: 400,
                animeLock: [false, false]
            }
        },
        mixins: [textAnime],
        created(){
            window.baidu({
                type: 'page',
                tip1: 'mountain',
                tip2: '山的展示页'
            })
        },
        mounted() {
            this.initAnime();
        },
        methods: {
            initAnime() {
                const dom1 = '.dot';
                const dom2 = '.letter-c';
                const dom3 = '.mountain__main';
                // anime.set(dom2, {
                //     scaleY: 0,
                // })
                anime({
                    targets: dom1,
                    top: {
                        value: '60%',
                        duration: 1500,
                        easing: 'easeInOutElastic',
                    },
                    opacity: {
                        value: 0,
                        duration: 100,
                        delay: 900,
                        easing: 'linear'
                    },
                    update: ({progress}) => {
                        if(progress > 70 && !this.animeLock[0]) {
                            // 防止多次触发
                            // !this.animeLock[0] && anime({
                            //     targets: dom2,
                            //     scaleY: 1,
                            //     opacity: 0.6,
                            //     duration: 480,
                            //     autoplay: true,
                            //     easing: 'easeOutCubic',
                            //     complete: (anim) => {
                            //         // 延迟的做法是为了效果好看，比较难调，所以用settimeout这种折中方法
                            //         // setTimeout(() => {
                            //             this.letterToggle = false;
                            //         // }, this.letterDuration)
                            //     },
                            //     update: ({progress}) => {
                            //         if(progress > 70 && !this.animeLock[1]) {
                            //             // 防止多次触发
                            //             !this.animeLock[1] && this._initCurtainAnime();
                            //             !this.animeLock[1] && (this.animeLock[1] = true);
                            //         }
                            //     }
                            // });
                            // !this.animeLock[0] && (this.animeLock[0] = true);

                            if(!this.animeLock[0]) {
                                this.animeLock[0] = true;
                                this._initCurtainAnime()
                            }
                        }
                    },
                })
            },
            _initCurtainAnime() {
                const _top = '.black-mask--1';
                const _bottom = '.black-mask--2';
                const duration = this.letterDuration;
                const easing = 'easeOutCubic';
                const placeChange = '-300%';
                anime({
                    targets: _top,
                    top: placeChange,
                    duration,
                    autoplay: true,
                    easing
                });
                anime({
                    targets: _bottom,
                    bottom: placeChange,
                    duration,
                    autoplay: true,
                    easing,
                    complete: () => {
                        this.mixinAnime();
                    }
                });
            }
        },

    }
</script>

<style lang="less">
.mountain {
    .page();
    font-size: 0;

    .p1 {
        margin-right: -0.25rem;
        margin-left: -0.35rem;
        margin-top: -0.4rem;
        transform: scale(0.7) translateY(0.23rem);
    }

    .dot {
        @size: 0.16rem;
        .pa();
        left: 0;
        right: 0;
        top: -@size;
        .mA();
        display: inline-block;
        width: @size;
        height: @size;
        border-radius: 50%;
        background-color: #fff;
        z-index: 10;
    }
    .black-mask {
        width: 100vw;
        height: 300vh;
        .pa();
        .l(0);
        &--1 {
            top: 0;
            background: linear-gradient(to bottom, #000 , transparent);
        }
        &--2 {
            bottom: 0;
            background: linear-gradient(to top, #000 , transparent);
        }
    }
    .letter-c {
        .bg-contain('letter_c');
        .pa();
        left: 0;
        right: 0;
        top: 2.95rem;
        .mA();
        opacity: 1;
        transform-origin: bottom;
        transform: scaleY(0);
        z-index: 10;
    }

    .mountain__main {
        .pr;
        .bg-cover('mountain', 'jpg');
        // .bg-contain('ixbg', 'jpg');
        // opacity: 0;

    }
}
</style>
