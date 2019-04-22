export default {
    data() {
        return {
        }
    },
    created() {
        this._textDuration = this.$bus.textDuration;
    },
    methods: {
        mixinAnime() {
            setTimeout(() => {
                this._mixinAnimeOfTitle();
                this._mixinAnimeOfLine();
                this._mixinAnimeOfDesc();
            },  this.$route.name === 'mountain' ? 300 : 900); // 进场动画花了700
        },
        _mixinAnimeOfTitle() {
            const domList = this.$refs.titleList.children;
            for(let i = 0; i < domList.length; i++) {
                let delay = i * 200;
                anime({
                    targets: domList[i],
                    opacity: 1,
                    translateY: '0',
                    duration: this._textDuration,
                    autoplay: true,
                    easing: 'easeOutQuad',
                    delay
                });
            }
        },
        _mixinAnimeOfLine() {
            anime({
                targets: '.line--p',
                width: '5.6rem',
                duration: this._textDuration,
                autoplay: true,
                easing: 'easeOutQuad'
            });
        },
        _mixinAnimeOfDesc() {
            anime({
                targets: '.desc-box',
                opacity: 1,
                duration: this._textDuration,
                autoplay: true,
                easing: 'easeOutQuad',
                complete: () => {
                    this.$bus.jumpKey = true;
                }
            });
        },
        exitAnime() {
            anime({
                targets: [ this.$refs.line, this.$refs.descBox, ...this.$refs.titleList.children],
                opacity: 0,
                translateX: -900,
                duration: 1400,
                easing: 'easeInQuart',
            });
        }
    },
    beforeDestroy() {
        this.exitAnime();
    }
}
