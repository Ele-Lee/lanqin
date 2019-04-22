import Vue from 'vue';
import { isWeixinBrowser } from './util';

export default {
    install: function install(vue) {
        let bus = new Vue({
            data: {
                userInfo: {
                    avatar: '',
                    name: '',
                    openId: ''
                },
                isWeixinBrowser: isWeixinBrowser,
                ready: false,
                showLoading: false,
                eventLis: null,
                routerList: [],
                routerListIndex: 0,
                jumpKey: false,
                textDuration: 600,
                muted: undefined
            },
            computed: {
                curRouter() {
                    return this.routerList[this.routerListIndex];
                }
            },
            methods: {
            },
        });

        vue.prototype.$bus = bus;
    }
};
