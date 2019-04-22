import Vue from 'vue'
import Router from 'vue-router'
import { isProdENV } from '@common/util.js'

// const Preload = r => require.ensure([], () => r(require('@pages/Preload.vue')))
// const Home = r => require.ensure([], () => r(require('@pages/Home.vue')))
import Preload from '@pages/Preload.vue'
import Home from '@pages/Home.vue'
import mountain from '@pages/mountain.vue'
import trench from '@pages/trench.vue'
import antarctic from '@pages/antarctic.vue'
import sahara from '@pages/sahara.vue'
import fridge from '@pages/fridge.vue'
import Entrance from '@pages/Entrance.vue'
import Introduce from '@pages/Introduce.vue'
import Signup from '@pages/Signup.vue'
import Video from '@pages/Video.vue'
import Rotate from '@pages/Rotate.vue'
import Locate from '@pages/Locate.vue'

export default () => {
    Vue.use(Router);
    const router = new Router({
        routes: [{
            path: '/',
            name: 'preload',
            component: Preload
        }, {
            path: '/home',
            name: 'home',
            component: Home,
            children: [
                {
                    path: '/mountain',
                    name: 'mountain',
                    component: mountain
                },
                {
                    path: '/trench',
                    name: 'trench',
                    component: trench
                },
                {
                    path: '/antarctic',
                    name: 'antarctic',
                    component: antarctic
                },
                {
                    path: '/sahara',
                    name: 'sahara',
                    component: sahara
                },
                {
                    path: '/fridge',
                    name: 'fridge',
                    component: fridge
                }
            ],
            redirect: '/mountain'
        }, {
            path: '/entrance',
            name: 'entrance',
            component: Entrance
        }, {
            path: '/introduce',
            name: 'introduce',
            component: Introduce
        }, {
            path: '/signup',
            name: 'signup',
            component: Signup
        }, {
            path: '/video',
            name: 'video',
            component: Video
        }, {
            path: '/rotate',
            name: 'rotate',
            component: Rotate
        }, {
            path: '/locate',
            name: 'locate',
            component: Locate
        }]
    })

    if (isProdENV) {
        // 禁止越过loading页
        router.beforeEach((to, from, next) => {
            if (to.meta !== 'noGuard' && to.name !== 'preload' && !Vue.prototype.$bus.ready) {
                next({ path: '/', replace: true })
            }
            next()
        })
    }

    return router
};
