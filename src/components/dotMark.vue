<template>
    <div class="dot-mark--out">
        <div class="dot-mark--inner"></div>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.initAnime();
        },
        methods: {
            initAnime() {
                const dom1 = '.dot-mark--out';
                const dom2 = '.dot-mark--inner';
                const duration = 1000;
                anime({
                    targets: dom1,
                    scale: 1.3,
                    backgroundColor: 'rgba(153, 152, 152, 0.3)',
                    duration,
                    direction: 'alternate',
                    easing: 'linear',
                    autoplay: true,
                    loop: true
                })
                anime({
                    targets: dom2,
                    scale: 0.4,
                    duration,
                    direction: 'alternate',
                    easing: 'linear',
                    autoplay: true,
                    // delay: 800,
                    loop: true
                })
            }
        }
    }
</script>

<style lang="less">

.dot-mark--out {
    position: relative;
    box-sizing:border-box;
    display: inline-block;
    @s: 16px;
    width: @s;
    height: @s;
    background-color: #999898;
    border-radius: 50%;
    transform: scale(0.8);
    .dot-mark--inner {
        position: absolute;
        left: 50%;
        top: 50%;
        display: inline-block;
        width: @s / 2;
        height: @s / 2;
        margin-left: -@s / 4;
        margin-top: -@s / 4;
        background-color: #fff;
        border-radius: 50%;
        // transform: translate3d(-50%, -50%, 0);
    }
}
</style>
