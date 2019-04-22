<template>
    <div class="introduce">
        <header class="top"></header>
        <section class="text-bg"></section>
        <article class="text-main" ref="textList">
            <p>2019年</p>
            <p><i class="icon--logo"></i>作为官方合作伙伴</p>
            <p>助力第十四届“玄奘之路”商学院戈壁挑战赛</p>
            <p>陪同“戈友”们沿着玄奘法师的足迹重踏苍茫之路</p>
            <p>再赴敦煌瓜洲</p>
            <div class="arrow" v-if="arrowLock" :style="`background-image: url(${arrowBg})`"></div>
        </article>
        <icon-pulldown :hint="true"></icon-pulldown>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                arrowLock: false,
                arrowBg: null
            }
        },
        created() {
            window.baidu({
                type: 'page',
                tip1: 'introduce',
                tip2: '介绍戈壁的展示页'
            })
        },
        mounted() {
            this.arrowBg = require('@imgs/arrow_turn-in.gif');
            this.initAnime();
        },
        methods: {
            // jump() {
            //     this.$nextTick(() => {
            //         this.$router.replace('entrance');
            //     })
            // },
            initAnime() {
                this._initMountPosition();
                this._initTopAnime();
            },
            _initTopAnime() {
                const domTop = '.top';
                const duration = 400;
                anime.set(domTop, {
                    translateY: '-4rem'
                });
                anime({
                    targets: domTop,
                    opacity: 1,
                    translateY: '0',
                    duration,
                    easing: 'easeOutQuad',
                    complete: () => {
                        this._initMountAnime();
                    }
                })
            },
            _initMountPosition() {
                const domMount = '.text-bg';
                anime.set(domMount, {
                    translateY: '100%'
                })
                // setTimeout(() => {
                //     alert(this.arrowBg)
                //     anime.set('.arrow', {
                //         backgroundImage: `url(${this.arrowBg})`,
                //     })

                // }, 1000);
            },
            _initMountAnime() {
                const domMount = '.text-bg';
                const duration = 600;
                anime({
                    targets: domMount,
                    translateY: 0,
                    duration,
                    easing: 'easeOutCirc',
                    complete: () => {
                        this._initTextAnime();

                    }
                })
            },
            _initTextAnime() {
                const domList = this.$refs.textList.children;
                const duration = 700;
                const len = 5;
                for(let i = 0; i < len; i++) {
                    anime.set(domList[i],{
                        translateX: '-60px'
                    });
                }
                for(let i = 0; i < len; i++) {
                    let delay = i * 100;
                    anime({
                        targets: domList[i],
                        opacity: 1,
                        translateX: '0px',
                        duration,
                        autoplay: true,
                        easing: 'easeOutQuad',
                        delay,
                        complete: () => {
                            if(i === len - 1) {
                                this.$bus.jumpKey = true;
                            }
                        },
                        update: ({progress}) => {
                            if(i === len - 1 && !this.arrowLock && progress > 50) {
                                // fixed？这里的箭头动画太快
                                this.arrowLock = true;
                                setTimeout(() => {
                                    this.arrowBg = null;
                                }, 500)
                            }
                        }
                    });
                }
            }
        },
        beforeDestroy() {
            // TODO 如果从下一个路由回到当前，这个制空要想办法生效
        }
    }
</script>

<style lang="less">
.introduce {
    .page();
    background-color: #000;
    .top {
        .bg-cover('introduce_top');
        opacity: 0;
    }

    .text-bg {
        .mt(-1.2);
        .bg-contain('entrance_texture');
        opacity: 0.7;
    }

    .text-main {
        .pf();
        .t(4.6);
        .l(0);
        .r(0);
        .mA();
        color: #fff;
        .fs(0.3, 0.9);
        .f-c;
        text-align: center;
        p {
            opacity: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .arrow {
            .mt(-0.5rem);
            .mA();
            width: 2.38rem;
            height: .72rem;
            transform: translateX(0.06rem);
            // .bg-contain('arrow_turn-in', 'gif');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: 50%;
        }
    }
}
</style>
