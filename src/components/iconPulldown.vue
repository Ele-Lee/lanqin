<template>
    <div class="icon--pulldown" ref="icon">
        <p class="hint f-c" v-if="hint">加入<span class="icon--logo"></span>战队</p>
    </div>
</template>

<script>
    export default {
        props: ['routerName', 'hint'],
        mounted() {
            this.$nextTick(() => {
                this.initAnime();
            });
        },
        methods: {
            initAnime() {
                let delay = 1000;
                let duration = 900;
                anime({
                    targets: this.$refs.icon,
                    bottom: '-0.1rem',
                    duration,
                    opacity: 1,
                    delay
                })
                !!this.hint && anime({
                    targets: '.hint',
                    top: '-0.2rem',
                    duration,
                    opacity: 1,
                    delay
                })
            },
            jump(fn) {
                this.routerName && this.$router.replace({name: this.routerName});
            },
        }
    }
</script>

<style lang="less">

.icon--pulldown {
    position: fixed;
    // bottom: -0.3rem;
    bottom: -1rem;
    left: 0;
    right: 0;
    margin: auto;
    opacity: 0;
    .bg-contain('icon_pulldown2', 'gif');
    transform: scale(0.8);

    .hint {
        .pa();
        // .t(0);
        top: -1.8rem;
        .l(-2rem + 0.65rem);
        width: 4rem;
        color: #fff;
        .fs(0.3);
        text-align: center;
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}


</style>
