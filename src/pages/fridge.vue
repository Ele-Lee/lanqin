<template>
    <section class="fridge">
        <div class="arrow-vertical"></div>
        <article class="title f-c title--1">极致美景心中神往</article>
        <article class="title f-c title--2">非凡生活心之所向</article>
        <icon-pulldown/>

    </section>
</template>

<script>
    import { isIos } from '@common/util';
    export default {
        created() {
            window.baidu({
                type: 'page',
                tip1: 'fridge',
                tip2: '打开冰箱的展示页'
            })
        },
        mounted() {
            let _d = isIos() ? '0.06rem' : '-0.06rem';
            anime.set('.title', {
                letterSpacing: _d
            });
            setTimeout(() => {
                this.initAnime();
            }, 400);
        },
        methods: {
            initAnime() {
                const arrow = '.arrow-vertical';
                const title1 = '.title--1';
                const title2 = '.title--2';
                const domList = [arrow, title1, title2];
                let duration = this.$bus.textDuration;
                domList.forEach((dom, index) => {
                    anime.set(dom, {
                        translateY: '60%',
                    });
                })
                domList.forEach((dom, index) => {
                    anime({
                        targets: dom,
                        opacity: 1,
                        translateY: '0px',
                        duration,
                        autoplay: true,
                        easing: 'easeOutCubic',
                        delay: (index) * 300,
                        complete: () => {
                            if(index === 2){
                                this.$bus.jumpKey = true;
                            }
                        }
                    });
                })
            }
        }
    }
</script>

<style lang="less">
.fridge {
    .page();
    .bg-cover('interlude_fridge', 'jpg', true);
    .origin-offset() {
        opacity: 0;
        // transform: translateY(60%);
    }
    @db2: 4.8;
    @dl2: 0.65;
    .arrow-vertical {
        .pf();
        .l(@dl2);
        .b(@db2);
        .bg-contain('arrow_vertical');
        .origin-offset();
    }
    .title {
        .pf();
        .fs(0.44, 0.64);
        color: #fff;
        writing-mode: vertical-lr;
        text-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.5);

        &--1 {
            .l(@dl2 + 0.39);
            // text-indent: -0.78rem;
            .b(@db2 - 2.14);
            .origin-offset();
        }
        &--2 {
            .l(@dl2 + 0.99);
            .b(@db2 - 2.92);
            .origin-offset();
        }
    }
}

</style>


