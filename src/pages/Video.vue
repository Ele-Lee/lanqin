<template>
    <section class="video">
        <!-- <arrow-gif class="footer" :isStatic="true"></arrow-gif> -->
<!-- https://static.cdn.24haowan.com/jsfm/9927074631551862887154746.mp4?x-oss-process=video/snapshot,t_9000,f_jpg,m_fast -->
        <video class="video__main"
            ref="video"
            :playsinline="true"
            :x5-playsinline="true"
            :webkit-playsinline="true"
            :preload="true"
            :controls="true"
            style="object-fit: cover;"
            src="http://res.cdn.24haowan.com/dingzhi/langqin_colmo/video/colmo_small.mp4"></video>
        <div class="video-box" v-show="!isPlaying" @click="play">
            <img src="@imgs/video_cover.png" class="video__img" alt="">
            <div class="video__mask">
                <div class="icon-play"></div>
            </div>
        </div>
        <!-- <article class="text--static"></article> -->
        <!-- <article class="text--gif" v-show="!hideGifKey"></article> -->
        <div class="video__left-arrow"></div>
        <div class="video__right-arrow"></div>
        <article class="text-box" ref="textBox">
            <p>AI科技融入家电</p>
            <p>革新从现在开始</p>
            <p><i class="icon--logo p1"></i></p>
            <p>用AI科技做看得见的家电</p>
        </article>

        <icon-pulldown routerName="rotate"></icon-pulldown>

    </section>
</template>

<script>

    export default {
        data() {
            return {
                // hideGifKey: false,
                isPlaying: false,
                duration: 600
            }
        },
        created() {
            window.baidu({
                type: 'page',
                tip1: 'video',
                tip2: '视频的展示页'
            })
        },
        mounted() {
            this.initVideoEvents();
            this.iniAnime();
            setTimeout(() => {
                this.$bus.jumpKey = true;
                // this.hideGifKey = true;
            }, this.duration * 2)
        },
        methods: {
            iniAnime() {
                const domList = this.$refs.textBox.children;
                let duration = this.duration;
                let len = domList.length;
                for(let i = 0; i < len; i++) {
                    anime.set(domList[i],{
                        translateY: '-60px',
                    });
                }
                for(let i = 0; i < len; i++) {
                    let delay = i * 200;

                    anime({
                        targets: domList[i],
                        translateY: 0,
                        opacity: 1,
                        duration,
                        delay,
                        easing: 'linear'
                    })

                }
            },
            play() {
                this.isPlaying = true;

                this.$audio.pause('bgm');
                this.$refs.video.play();
                window.baidu({
                    type: 'btn',
                    tip1: 'playVideo',
                    tip2: '视频的播放'
                })
            },
            initVideoEvents() {

                this.$refs.video.addEventListener("timeupdate", e => {
                    const playing = !!(
                        this.$refs.video.currentTime >= 0 &&
                        !this.$refs.video.paused &&
                        !this.$refs.video.ended &&
                        this.$refs.video.readyState > 2
                    );
                    if (!playing) {
                        this.exitVideo()
                    } else {
                        this.$audio.mute(true)
                    }
                });
            },
            exitVideo() {
                !this.$bus.muted && this.$audio.mute(false);
            }
        },
        beforeDestroy() {
            this.exitVideo()
        }
    }
</script>

<style lang="less">
.video {
    .page();
    .b-c;

    @videoH: 4.4rem;

    .p1 {
        transform: scale(1.1);
    }

    .video-box {
        width: 100vw;
        height: @videoH;
        .pa;
        .l;
        .t;

        .video__img {
            .pa;
            .l;
            .t;
            width: 100%;
            height: auto;
        }

        .video__mask {
            .pa;
            .l;
            .t;
            // .bg-cover('video_mask');
            // background-color: rgba(0, 0, 0, 0.3);
            width: 100%;
            height: 100%;
            .icon-play {
                .p-c;
                .bg-contain('video_play');
                // transform: scale(1.4);
            }
        }
    }
    .video__main {
        .pa;
        .t;
        .l;
        width: 100vw;
        height: @videoH;
        // z-index: 300;
    }
    // .footer {
    //     .pr;
    //     .t(4.4);
    // }

    .video__left-arrow {
        .pa();
        .l(0);
        .t(0 + @videoH);
        .bg-cover('arrow_left_static');
    }

    .video__right-arrow {
        .pa();
        .r(0);
        .t(1.6 + @videoH);
        .bg-cover('arrow_right_static');
    }

    .text--static, .text--gif, .text-box {
        .pa;
        .t(6);
        .l;
        .r;
        .mA;
        p {
            height: 0.7rem;
            padding: 0.1rem 0;
            .f-c;
            .c-w;
            .fs(0.34);
            .tac;
            opacity: 0;
            .df;
        }
    }
    // .text--static {
    //     .bg-cover('video_text');
    // }
    // .text--gif {
    //     .bg-cover('video_text', 'gif');
    // }
}

</style>
