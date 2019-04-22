<!--
    @touchstart.prevent 是防止点击穿透，插槽内所有点击缓存touchend,不能滑动！！！
 -->
<template>
    <div class="masking" @touchstart.prevent :style="`background: ${rgba}`">
        <main class="masking__frame" :class="`frame--${size}`">
            <slot></slot>
        </main>
    </div>
</template>

<script>
    export default {
        name: 'masking',
        props: {
            maskColor: {
                type: String,
                default: '#000000'
            },
            maskAlpha: {
                type: String,
                default: '0.8'
            },
            size: {
                type: String,
                default: 'small'
            }
        },
        data() {
            return {
                rgba: '(0,0,0,0.8)'
            };
        },
        methods: {
            closeMask() {
                this.$emit('closeMask');
            },
            hexToRgba(hex, opacity) {
                let _hex = hex.substr(1);
                if (_hex.length == 3) {
                    let temp = [];
                    let _hexArr = _hex.split('');
                    for (let i in _hexArr) {
                        temp[i] = _hexArr[i] + _hexArr[i];
                    }
                    _hex = temp.join('');
                }
                return (
                    'rgba(' +
                    parseInt('0x' + _hex.slice(0, 2)) +
                    ',' +
                    parseInt('0x' + _hex.slice(2, 4)) +
                    ',' +
                    parseInt('0x' + _hex.slice(4, 6)) +
                    ',' +
                    opacity +
                    ')'
                );
            }
        },
        created() {
            this.rgba = this.hexToRgba(this.maskColor, this.maskAlpha);
        }
    };
</script>

<style lang="scss">
    .masking {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 300;
        content: ' ';
        .frame {
            &--small {
                @media screen and (min-aspect-ratio: 375/667) {
                    /* 非IX等畸形屏样式 */
                    top: 5rem;
                }
                top: 6.3rem;
                width: 6.3rem;
                height: 5.94rem;
                @include contain-bg('~@imgs/mask/mask_frame.png');
                header {
                    margin: 0.48rem auto 0;
                }
            }
            &--big {
                @media screen and (min-aspect-ratio: 375/667) {
                    /* 非IX等畸形屏样式 */
                    top: 5.8rem;
                }
                top: 6.6rem;
                width: 6.3rem;
                height: 9.16rem;
                @include contain-bg('~@imgs/mask/big_frame.png');
            }
        }
        .masking__frame {
            @extend .c;
            .masking__close {
                position: absolute;
                right: 0;
                top: 0;
                display: inline-block;
                width: 0.77rem;
                height: 0.77rem;
                @include contain-bg('~@imgs/mask/close_btn.png');
                transform: translate3d(40%, -40%, 0px);
                z-index: 10;
            }
            ol,
            ul {
                width: 5.1rem;
                padding-top: 0.36rem;
                padding-left: 0.78rem;
                word-break: break-all;
            }
            button {
                position: absolute;
                bottom: 0;
                left: 50%;
                height: 0.84rem;
                line-height: 0.84rem;
                width: 3rem;
                font-size: 0.4rem;
                border-radius: 0.15rem;
                background: linear-gradient(53deg, #fc67dc 30%, #432bf5 70%);
                transform: translate3d(-50%, 42%, 0);
            }
        }
    }
</style>
