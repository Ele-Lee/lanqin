<template>
    <div class="arrow-bg">
        <div class="bg__left-arrow" ref="a" :style="`background-image: url(${isStatic ? leftArrowStatic : leftArrow})`"></div>
        <div class="bg__right-arrow" :style="`background-image: url(${isStatic ? rightArrowStatic :rightArrow})`"></div>
    </div>
</template>

<script>
    export default {
        props: ['isStatic'],
        data() {
            return {
                leftArrow: undefined,
                rightArrow: undefined,
                leftArrowStatic: require('@imgs/arrow_left_static.png'),
                rightArrowStatic: require('@imgs/arrow_right_static.png')
            }
        },
        mounted() {
            if(!this.isStatic) {
                this.setVal();
            }
        },
        methods: {
            clearVal() {
                if(this.isStatic) {
                    return;
                }
                return new Promise((resovle) => {
                    this.rightArrow = null;
                    this.leftArrow = null;
                    this.$nextTick(() => {
                        resovle();
                    })
                })
            },
            setVal() {
                this.leftArrow = require('@imgs/arrow_left.gif');
                this.rightArrow = require('@imgs/arrow_right.gif');
            }
        },
        beforeDestory() {

        }
    }
</script>

<style lang="less">

</style>
