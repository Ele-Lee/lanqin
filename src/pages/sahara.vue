<template>
    <section class="sahara">
        <div class="mask-layer">
            <article class="title" ref="titleList">
                <p>坚毅前行，</p><p>寻找理想的那片绿洲。</p>
            </article>
            <hr class="gradient-line line--p" ref="line">

            <article class="desc-box" ref="descBox">
                <dot-mark class="dot--p"></dot-mark>
                <h6 class="desc-place">
                    <span class="f-c">撒哈拉沙漠</span>&nbsp;&nbsp;<span class="f-e">Sahara Desert</span>
                </h6>
                <p class="desc-info f-c">地球最不适合生物生存的地方，曾记录最高气温57.7℃，晚上最低气温可接近0℃，每年不足1000人成功穿越。</p>
            </article>

        </div>
        <icon-pulldown routerName="fridge"></icon-pulldown>
    </section>
</template>

<script>
    import textAnime from '@common/textAnime.js';
    export default {
        mixins: [textAnime],
        created() {
            window.baidu({
                type: 'page',
                tip1: 'sahara',
                tip2: '沙漠的展示页'
            })
        },
        mounted(){
            this.mixinAnime();
        }
    }
</script>

<style lang="less">
.sahara {
    .page();
    .bg-contain('sahara', 'jpg');

    .desc-info {
        width: 4.6rem !important;
    }
}

</style>
