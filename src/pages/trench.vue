<template>
    <section class="trench">
        <div class="mask-layer">
            <article class="title" ref="titleList">
                <p>进入原始秘境，</p>
                <p>方能感受未知世界的奇妙梦幻。</p>
            </article>
            <hr class="gradient-line line--p" ref="line">

            <article class="desc-box" ref="descBox">
                <dot-mark class="dot--p"></dot-mark>
                <h6 class="desc-place">
                    <span class="f-c">马里亚纳海沟</span>&nbsp;&nbsp;<span class="f-e">Mariana Trench</span>
                </h6>
                <p class="desc-info f-c">世界神秘深渊，大部分水深达8000米以上，漆黑冰冷高压且地壳运动多变，全球抵达万米深海仅3人。</p>
            </article>

        </div>
        <icon-pulldown routerName="antarctic"></icon-pulldown>

    </section>
</template>

<script>
    import textAnime from '@common/textAnime.js';

    export default {
        mixins: [textAnime],
        created() {
            window.baidu({
                type: 'page',
                tip1: 'trench',
                tip2: '海沟的展示页'
            })
        },
        mounted(){
            this.mixinAnime();
        }
    }
</script>

<style lang="less">
.trench {
    .page();
    .bg-cover('trench', 'jpg', true);
    background-position-y: 80%;
}

</style>
