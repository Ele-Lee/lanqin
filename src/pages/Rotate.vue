<template>
    <div class="rotate">
        <figure class="rotate__main" ref="image"></figure>
    </div>
</template>

<script>
    export default {
        created() {
            window.baidu({
                type: 'page',
                tip1: 'rotate',
                tip2: '转动冰箱的展示页'
            })
        },
        mounted() {
            this.initAnime();
        },
        methods: {
            initAnime() {
                anime.set(this.$refs.image, {
                    rotate: '80deg'
                })
                anime({
                    targets: this.$refs.image,
                    rotate: '0',
                    duration: 1400,
                    easing: 'linear',
                    complete: () => {
                        this.$router.replace('video')
                    }
                })
            }
        },
    }
</script>

<style lang="less">
.rotate {
    .page();
    // margin-left: -50vh;
    .b-c;
    .rotate__main {
        .pr;
        left: -4.6rem;
        // top: -2rem;
        top: -12vh;
        @imgS: 16.81rem;
        // @imgS: 14.96rem;
        width: @imgS;
        height: @imgS;
        .bg-cover('fridge_rotating', 'jpg', true);
    }
}
</style>
