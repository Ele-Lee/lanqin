import Axios from 'axios';
import Qs from 'qs'
import { isWeixinBrowser, isProdENV } from '@common/util'

//默认请求头
const DEFAULT_HEADER = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
}

const API_ROOT = 'https://custom.24haowan.com'
const API_ROOT_DEV = 'http://192.168.0.91:3000/'

const API_HOST = ()=> (process.env.NODE_ENV === 'production' ? API_ROOT : API_ROOT_DEV)

class Api {
    constructor(vue) {
        this.vue = vue
        this.axios = null
        this._initAxios()
    }

    _initAxios() {
        this.axios = Axios.create({
            baseURL: API_HOST(),
            headers: DEFAULT_HEADER
        })

        this.axios.interceptors.request.use((config)=> {
            // 配置公共header
            // let entrance = this._getCookie('entrance')
            // let jwt = this._getCookie(`_entry_${entrance}_sid`)
            // if (jwt) {
            //     config.headers.Authorization = `Bearer ${jwt}`
            // }
            return config
        }, (error)=> {
            return Promise.reject(error)
        })

        this.axios.interceptors.response.use((response)=> {
            if (response.data.code == 0) {
                return response.data.payload || response.data
            }
            return Promise.reject('请求失败', response)
        }, (error)=> {
            return Promise.reject(error)
        })
    }

    _getCookie(name) {
        console.log(name)
        let reg=new RegExp("(^| )" + name + "=([^;]*)(;|$)")

        let arr = null
        if(arr = document.cookie.match(reg)) {
            return unescape(arr[2])
        }
        return null
    }

    /**
     *  获取微信jssdk配置
     * @param {*} url
     */
    getWxSignPackage(url = window.location.href.split('#')[0]) {
        if (!isWeixinBrowser() || !isProdENV) {
            console.error('非微信浏览器，且非production，不能调用该接口: getWxSignPackage of api.js')
            return Promise.resolve('微信签名配置失败')
        }
        return this.axios
                    .get('https://custom.24haowan.com/public/wechat/sdk-config', {params: {url: url}})
                    .then(data=> {
                        // 传入的data需要看看接口返回的数据是否包多一层payload等等
                        console.log(data)
                        return this.vue.prototype.$wxsdk.configWx(data)
                    })
    }

    /**
     * 获取用户信息
     */
    getWxUserInfo() {
        return this.axios.get('/userInfo')
    }

    sendForm(params) {
        return this.axios.post('/colmo/info', Qs.stringify(params))
    }
    // testPost(params = {}) {
    //     return axios.post('', Qs.stringify(params))
    // }
}

export default {
    install: function install(Vue) {
        Vue.prototype.$api = new Api(Vue)
    }
}
