import Vue from 'vue'
import App from './App'

import util from './common/util'
import store from './store'

Vue.config.productionTip = false

App.mpType = 'app'


import uView from "uview-ui";
Vue.use(uView);

Vue.prototype.$store = store
Vue.prototype.$api = {}
Vue.prototype.$util = util

// 后端api地址
Vue.prototype.$unishow = "http://drink/addons/unidrink";
//Vue.prototype.$unishow = "https://demo.shop.weivee.com//addons/unidrink";


// 为了方便每次上传的时候忘记修改上面的参数
uni.getSystemInfo({
	success(res) {
		//console.log(res)
		if (res.platform != "devtools") {
			//Vue.prototype.$unishow = "https://shop.weivee.com/addons/unidrink";
		}
	}
});

// 平台号
// #ifdef APP-PLUS
Vue.prototype.$platform = 'APP-PLUS';
// #endif
// #ifdef H5
Vue.prototype.$platform = 'H5';
// #endif
// #ifdef MP-WEIXIN
Vue.prototype.$platform = 'MP-WEIXIN';
// #endif
// #ifdef MP-ALIPAY
Vue.prototype.$platform = 'MP-ALIPAY';
// #endif
// #ifdef MP-BAIDU
Vue.prototype.$platform = 'MP-BAIDU';
// #endif
// #ifdef MP-TOUTIAO
Vue.prototype.$platform = 'MP-TOUTIAO';
// #endif

// 同步网络请求
const request = async (url, method = 'GET', data = {}, showMsg = true, domain = Vue.prototype.$unishow) => {
	let header = {
		'content-type': 'application/x-www-form-urlencoded',
		'lang': Vue.prototype.$store.state.lang,
		'platform': Vue.prototype.$platform
	};
	if (Vue.prototype.$store.state.member.token) {
		header.token = Vue.prototype.$store.state.member.token;
	}
	if (Vue.prototype.$store.state.cookie) {
		header.cookie = Vue.prototype.$store.state.cookie;
	}
	var [error, res] = await uni.request({
		url: domain + url,
		method: method,
		header: header,
		data: data,
		timeout: 5000
	});                    

	return new Promise(function(revolve){
		if (error) {
			showMsg && msg(JSON.stringify(res));
			revolve(false);
		}
		
		if (res) {
			if (res.header.hasOwnProperty('Set-Cookie')) {
				let cookie = res.header['Set-Cookie'].replace("; path=/", "");
				Vue.prototype.$store.commit('setCookie', cookie);
			}
			if (res.hasOwnProperty('data')) {
				if (res.data.hasOwnProperty('code') && res.data.code == 401) {
					// 未登录 或 登录失效
					Vue.prototype.$store.commit('SET_MEMBER', {});
				}
				if (res.data.hasOwnProperty('code') && res.data.code == 1) {
					if (res.data.msg) {
						showMsg && msg(res.data.msg);
					} else {
						uni.hideToast();
					}
					
					revolve(res.data.data);
				} else {
					if (res.data.hasOwnProperty('msg')) {
						showMsg && msg(res.data.msg);
					} else {
						showMsg && msg('返回参数错误');
					}
					revolve(false);
				}
			} else {
				showMsg && msg('不能识别数据');
				revolve(false);
			}
		}
	});
	
}
Vue.prototype.$api.request = request;


// 提示
const msg = (title, duration = 3000, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
	setTimeout(function() {
		uni.hideToast();
	}, duration)
}
Vue.prototype.$api.msg = msg;

// #ifdef MP-WEIXIN
// 微信小程序
const wechatMiniLogin = async () => {
	msg('登录中');
	let [error, loginRes] = await uni.login({
		provider: 'weixin'
	});
	if (loginRes.hasOwnProperty('code')) {
		let data = await request('/user/authSession', 'GET', {
			code: loginRes.code
		});
		if (data) {
			if (data.hasOwnProperty('userInfo') && data.userInfo.token && data.userInfo.token != '') {
				Vue.prototype.$store.commit('SET_MEMBER', data.userInfo);
			}
		}
		return true;
	} else {
		msg('登录失败'); 
		return false;
	}
};
Vue.prototype.$wechatMiniLogin = wechatMiniLogin;
// #endif


// 返回上一页
const prePage = (page = null) => {
	let pages = getCurrentPages();
	console.log(pages);
	let prePage = pages[pages.length - 2];
	if (page !== null) {
		prePage = pages[page];
	}
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}
Vue.prototype.$api.prePage = prePage;



const app = new Vue({
	store,
    ...App
})
app.$mount()
