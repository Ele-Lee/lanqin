<template>
    <section class="antarctic">
        <div class="mask-layer">
            <article class="title" ref="titleList">
                <p>挑战极限，</p><p>领略冰寒浸骨的震撼。</p>
            </article>
            <hr class="gradient-line line--p" ref="line">

            <article class="desc-box" ref="descBox">
                <dot-mark class="dot--p"></dot-mark>
                <h6 class="desc-place">
                    <span class="f-c">南极洲</span>&nbsp;&nbsp;<span class="f-e">Antarctica</span>
                </h6>
                <p class="desc-info f-c">世界酷寒之地，风暴多风力大的陆地，气温曾低至-89.2℃，平均海拔2350米，全球仅不足800人长期驻扎于此。</p>
            </article>

        </div>
        <icon-pulldown routerName="sahara"></icon-pulldown>
    </section>
</template>

<script>
    import textAnime from '@common/textAnime.js';
    export default {
        mixins: [textAnime],
        created() {
            window.baidu({
                type: 'page',
                tip1: 'antarctic',
                tip2: '南极的展示页'
            })
        },
        mounted(){
            this.mixinAnime();
        }
    }
</script>

<style lang="less">
.antarctic {
    .page();
    .bg-cover('Antarctic', 'jpg', true);
    background-position-y: 80%;

    .desc-info {
        width: 4.8rem !important;
    }
}

</style>
