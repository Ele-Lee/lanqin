<template>
    <div class="home">
        <transition name="bounce">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>

export default {
    name: 'home',
    data() {
        return {
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
    },
};
</script>

<style lang="less">
.home {
    .page();
    overflow: hidden;
    background-color: #000;

    .disappear {
        .animation('gradient_opacity', 2s, 1);
        .animation-over();
    }

}

</style>
