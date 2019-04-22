<template>
    <section class="signup">
        <!-- <div class="bg__left-arrow"></div>
        <div class="bg__right-arrow"></div> -->
        <arrow-gif ref="arrowGifDom"></arrow-gif>
        <transition name="bounce">
            <div class="from-box" v-if="!showQrcodeKey">
                <header class="title"></header>
                <ul class="form" ref="form">
                    <li class="form__item" id="nameInput">
                        <label class="label f-c">参赛人:</label>
                        <input class="input input--1" v-model="name" @focus="focus" @blur="blur" placeholder="请输入姓名"/>
                    </li>
                    <li class="form__item" id="phoneInput">
                        <label class="label f-c">联系方式:</label>
                        <input class="input input--2" pattern="\d*" maxlength="11" @focus="focus" @blur="blur" v-model="phone" placeholder="请输入手机号码"/>
                    </li>
                    <li class="form__item" id="submit">
                        <button class="f-c btn-submit" @touchend="sendForm">确认提交</button>
                    </li>
                    <li class="form__item">
                        <div class="more" ref="more" v-show="showMoreKey" @touchend="showQrcode">

                            <div class="map-box" @click="getLocation">
                                <span class="go-map"></span>
                                <p class="f-c">探索<span class="icon--logo p1"></span>全球体验中心（上海白玉广场店）</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

        </transition>
        <transition name="bounce">
            <section class="qrcode-box" v-if="showQrcodeKey">
                <button class="back" @click="toBack"></button>
                <div class="qrcode-box__main">
                    <h5>报名结果将以随机抽取的形式</h5><h5>于2019年4月11日在公众号公布</h5><h5>敬请关注</h5>
                    <!-- <h5>请长按识别图中二维码</h5><h5>关注公众号查询报名结果</h5> -->
                    <img class="qrcode" src="@imgs/qrcode.jpg" alt="">
                    <!-- <h5>最终将抽取幸运挑战者</h5><h5>加入<i class="icon--logo p2"></i>品牌战队共赴戈壁</h5><h5>（结果将于2019年4月11日公布）</h5> -->
                </div>
                <footer class="footer fc">本次活动最终解释权归<span class="f-e">COLMO</span>品牌所有</footer>
            </section>
        </transition>
        <transition name="fade">
            <section class="mask" v-show="signupSucKey">
                <figure class="mask__hint">
                    <button class="mask__close" @click="closeMask"></button>
                </figure>
            </section>
        </transition>
    </section>
</template>

<script>
    import {isIos, getOneURLQuery} from '@common/util.js';
    import arrowGif from '@c/arrowGif';

    export default {
        data() {
            return {
                name: '',
                phone: '',
                showQrcodeKey: false,
                showMoreKey: true,
                inputLock: false,
                signupSucKey: false,
            }
        },
        created() {
            this._androidLisInput();
            window.baidu({
                type: 'page',
                tip1: 'signup',
                tip2: '报名页'
            })
        },
        mounted() {
            this.initAnime();
            this.setScalePosition();

        },
        methods: {
            setScalePosition() {
                const temp = (/HUAWEI/i.test(navigator.userAgent) && window.matchMedia('(min-aspect-ratio: 375/667)').matches)
                    || (/iPhone/i.test(navigator.userAgent));
                if(temp && this.$cache.load('noBaiTiao') === 'no') {
                    this.$refs.more.style.bottom = '-1.6rem'
                }

            },
            getLocation() {
                this.$router.replace('locate');
                window.baidu({
                    type: 'btn',
                    tip1: 'goLocation',
                    tip2: '去获取定位'
                })
            },
            toBack() {
                this.showQrcodeKey = !this.showQrcodeKey;
                // anime.set('.from-box .title', {
                //     duration: titleDur
                // })
                this.$nextTick(() => {
                    this.initAnime();
                    window.baidu({
                        type: 'btn',
                        tip1: 'back-btn',
                        tip2: '二维码回到报名'
                    })
                })
            },
            closeMask() {
                this.signupSucKey = false;
                window.baidu({
                    type: 'btn',
                    tip1: 'close-mask-btn',
                    tip2: '报名成功关掉遮罩'
                })
            },
            sendForm() {
                if(this.name === '' || (!/^\d{11}$/.test(this.phone))) {
                    this.$bus.$emit('alert', '请输入正确名字或手机', 'big');
                    return
                }
                this.$api.sendForm({
                    name: this.name,
                    phone: this.phone
                }).then(() => {
                    window.baidu({
                        type: 'btn',
                        tip1: 'sumbit-btn',
                        tip2: '成功提交_' + this.name + '_' + this.phone
                    })
                    this.signupSucKey = true;
                })
            },
            initAnime() {
                let titleDur = 1800;
                anime.set('#phoneInput', {
                    translateX: '7.5rem'
                })
                anime.set('#nameInput', {
                    translateX: '7.5rem'
                })
                anime.set('#submit', {
                    // translateY: '6rem',
                    opacity: 0
                })

                anime({
                    targets: '.from-box .title',
                    top: '1.2rem',
                    duration: titleDur
                })

                // const cl = this.$refs.form.children;
                // for(let i = 0; i < 2; i++) {
                //     anime({
                //         targets: cl[i],
                //         top: '1.2rem',
                //         duration: 1800,
                //         delay: titleDur
                //     })
                // }

                let easing = 'easeInOutCubic', duration = 1000;
                anime({
                    targets: '#nameInput',
                    translateX: 0,
                    duration,
                    delay: titleDur / 10,
                    easing
                })
                anime({
                    targets: '#phoneInput',
                    translateX: 0,
                    duration,
                    delay: titleDur / 6,
                    easing
                })
                anime({
                    targets: '#submit',
                    // translateY: 0,
                    opacity: 1,
                    duration: titleDur - 400,
                    // delay: titleDur / 6,
                    easing: 'easeInQuart'
                })
                anime({
                    targets: '.map-box',
                    opacity: 1,
                    duration: titleDur - 400,
                    // delay: titleDur / 6,
                    easing: 'easeInQuart'
                })


            },
            showQrcode() {
                // this.$refs.arrowGifDom.clearVal().then(() => {
                //         this.$refs.arrowGifDom.setVal()
                // });
                // TODO 箭头动画
                this.showQrcodeKey = true;
                window.baidu({
                    type: 'btn',
                    tip1: 'qrcode-btn',
                    tip2: '显示二维码'
                })
            },
            blur(){
                if (isIos()) {
                    this.inputLock = false;
                    setTimeout(() => {
                        !this.inputLock && window.scrollTo(0, document.body.clientHeight);
                    }, 500);

                } else {
                    setTimeout(() => {
                        this.showMoreKey = true
                    }, 200)
                }
            },
            focus(){
                if (isIos()) {
                    this.inputLock = true;
                } else {
                    // this.showMoreKey = !this.showMoreKey;

                }
            },
            _androidLisInput() {
                window.addEventListener('resize', () => {
                    if(document.activeElement.tagName === 'INPUT'){
                        this.showMoreKey = !this.showMoreKey;
                    }
                })
            }
        },
        components: { arrowGif }
    }
</script>

<style lang="less">
.signup {
    .page();
    background-color: #000;

    .p2 {
        margin: 0 -0.2rem;
        transform: scale(0.8);
        // width: 1rem;
        // height: 0.24rem;
    }

    .p1 {
        // transform: scale(0.8);
        margin-right: -0.2rem;
        margin-left: -0.24rem;
        // margin-top: 0.04rem;
        transform: translateY(0.14rem) scale(0.8);
    }

    .title {
        .pa();
        // .t(1.2);
        .t(-1.8);
        .l;
        .r;
        .mA;
        .bg-contain('singup_title');
    }

    .bg__left-arrow {
        .pa();
        .l(0);
        .t(0);
        .bg-cover('arrow_left', 'gif');
    }

    .bg__right-arrow {
        .pf();
        .r(0);
        .t(3);
        .bg-cover('arrow_right', 'gif');
    }


    .form {
        width: 7.5rem;
        .pf();
        top: 4rem;
        .c-w;
        .mA();
        @pl: 1.3rem;
        .form__item {
            .fs(0.42);
            padding-left: @pl;
            margin: 0.66rem auto;
            .label {
                display: inline-block;
                width: 2rem;
                font-weight: 300 !important;
                text-align:justify;
                text-align-last:justify;
            }
            .input {
                margin-left: 0.2rem;
                height: 0.46rem;
                width: 2.6rem;
                text-indent: 0.16rem;
                .fs(0.28);
                border: 0.04rem solid #fff;
                background-color: #9b9999;
                border-radius: 0;
            }
            // .input--1 {
            // }
            // .input--2 {
            //     width: 2.4rem;
            // }
        }
        .btn-submit {
            display: inline-block;
            margin-top: 0.7rem;
            // .b-b;
            // .mA();
            @btn-w: 2.34rem;
            margin-left: 7.5rem / 2 - @pl - @btn-w / 2;
            display: block;
            width: @btn-w;
            height: 0.54rem;
            .fs(0.28);
            border: 0.02rem solid #f1f1f1;
            background: rgba(90, 90, 90, 0.8);
            text-shadow: 0 0rem 2rem rgba(255, 255, 255, 1);
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.7) inset;
            .c-w;

            .pr;
            overflow: hidden;
            &:after {
                .pa;
                @l: 4rem;
                // .test;
                left: -@l;
                top: 0;
                width: 170%;
                height: 180%;
                // background: linear-gradient(45deg, transparent, #fff , transparent);
                .bg-cover('moving_flash2', 'png', true);
                content: '';
                animation: movingFlash 3.5s infinite;
                @keyframes movingFlash {
                    0% {
                        left: -@l;
                    }
                    100% {
                        left: @l;
                    }
                }
            }
        }
        .more {
            .pa();
            // .b(-2.4);
            .l;
            .r;
            .mA();
            .bg-cover('btn_more', 'gif');
            z-index: 100;
        }
    }

    .map-box {
        .pa;
        .b(-1.2);
        .r(-1.4);
        .c-w;
        opacity: 0;

        .go-map {
            .pa;
            .l(-0.8);
            .t(-0.55);
            display: inline-block;
            .bg-contain('icon_location', 'gif');
            z-index: -1;
        }

        p {
            .fs(0.24);
        }
    }


    .qrcode-box {
        .pr();
        .page();
        .back {
            @d: 0.3rem;
            margin-left: @d;
            margin-top: -@d;
            // .bg-contain('signup_back');
            .bg-contain('icon_pulldown2', 'gif');
            transform: rotate(90deg);
        }

        &__main {
            .p-c;
            transform: translateY(-0.6rem);
            @s: 2.68rem;
            width: 100%;
            height: @s + 2rem;
            .tac;
            .qrcode {
                width: @s;
            }
            h5 {
                @dd: 0.06rem;
                // margin-bottom: -@dd;
                // margin-top: @dd;
                .fs(0.24, .42);
                .f-c;
                .c-w;
                .tac;
                .df;
            }
        }

        .footer {
            width: 100vw;
            .pf;
            .b(0.4);
            .fs(0.24, 0);
            .tac;
            color: #858180;
        }
    }

    .mask {
        .page();
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 101;
        .mask__hint {
            .p-c();
            .t(-10%);
            .bg-contain('signup_suc');
        }

        .mask__close {
            .p-b(-1rem);
            .l;
            .r;
            .mA;
            .bg-contain('btn_close_mask');
        }
    }
}
</style>
