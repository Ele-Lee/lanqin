<template>
    <div id="app">
        <transition name="bounce">
            <router-view></router-view>
        </transition>
        <loading v-show="$bus.showLoading"/>
        <button class="music-btn" v-show="soundBtnKey" @click="musicBtnFn" :style="musicBtnBg"></button>
        <toast></toast>
    </div>
</template>

<script>
import Loading from '@components/Loading'
import eventLis from '@common/eventLis';
import Toast from '@c/Toast';

export default {
    watch: {
        $route(to, from) {
            this.soundBtnSwitcher(to.name);
            this.initEventLis();
        }
    },
    data() {
        return {
            // muted: false,
            soundBtnKey: false
        }
    },
    created() {
        this.$bus.muted = this.$cache.load('muted', false)
        this.$audio.mute(this.$bus.muted)// 初始化是否静音

    },
    computed: {
        musicBtnBg() {
            return !this.$bus.muted ? '' : `background-image: url(${require('@imgs/btn_music_off.png')})`
        }
    },
    methods: {
        musicBtnFn() {
            this.$bus.muted = !this.$bus.muted;
            // this.$cache.load('muted', this.$bus.muted);
            // this.$audio.mute(this.muted);
            this.$bus.muted ? this.$audio.pause('bgm') : this.$audio.play('bgm');

            window.baidu({
                type: 'btn',
                tip1: 'music-btn',
                tip2: '点击音乐按钮_' + this.$bus.muted
            })
        },
        soundBtnSwitcher(name) {
            // 不会显示音乐按钮的路由名字
            const showList = ['preload', 'rotate', 'video', 'locate'];
            // const showList = ['mountain', 'trench', 'antarctic', 'sahara', 'fridge', 'rotate', 'video', 'locate'];
            this.soundBtnKey = !showList.includes(name);
        },
        initEventLis() {
            if(!this.$bus.eventLis) {
                this.$bus.eventLis = true;
                this._initRouterList();
                new eventLis().setup(document).listen({
                    onEnd: (dir)=> {
                        // console.log('%celelee test:', 'background:#000;color:#fff', dir, this.$bus.jumpKey);
                        let _t = 0 || this.$bus.jumpKey;
                        if(dir != 0 && _t && this.$route.name !== 'entrance') {
                            if(this.$route.name === 'mountain' && dir == 1) return;
                            let temp = this.$bus.routerListIndex - dir;
                            this.$bus.routerListIndex = Math.min(this.$bus.routerList.length - 1, Math.max(temp, 0));
                            this.$nextTick(() => {
                                window.baidu({
                                    type: 'scroll',
                                    tip1: this.$route.name,
                                    tip2: `${dir < 0 ? '下滑' : '上滑'}`
                                })
                                this.$router.replace({name: this.$bus.curRouter});
                                this.$bus.jumpKey = false;
                            })
                        }
                    }
                })
            }
        },
        _initRouterList() {
            const childrenList = this.$router.options.routes[1].children;
            this.$bus.routerList = childrenList.reduce(function(accumulator, currentValue, currentIndex, array){
                accumulator.push(currentValue.name);
                return accumulator
            }, []);
            this.$bus.routerList = this.$bus.routerList.concat(['rotate', 'entrance', 'signup']);
        }

    },
    components: {
        Loading, Toast
    }
};
</script>

<style lang="less">
    div,section {
        font-size: 0.28rem;
    }
    #app {
        position: relative;
        .music-btn {
            .pf;
            @d: 0.28;
            .r(@d);
            .t(@d);
            .bg-contain('btn_music');
        }
    }
</style>
