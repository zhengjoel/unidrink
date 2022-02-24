import Vue from 'vue'
import App from './App'
import util from './common/util'
import store from './store'
import uView from "uview-ui";


Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store
Vue.prototype.$util = util

const app = new Vue({
	store,
    ...App
})

Vue.use(uView);

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

app.$mount()
