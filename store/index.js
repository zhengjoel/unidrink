import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
	plugins: [  
	    // 可以有多个持久化实例  
	    createPersistedState({  
	      key: 'app_config_data',  // 状态保存到本地的 key   
	      paths: ['member', 'cookieKey'],  // 要持久化的状态，在state里面取，如果有嵌套，可以  a.b.c   
	      storage: {  // 存储方式定义  
	        getItem: (key) => uni.getStorageSync(key), // 获取  
	        setItem: (key, value) => uni.setStorageSync(key, value), // 存储  
	        removeItem: (key) => uni.removeStorageSync(key) // 删除  
	      }  
	    })  
	],  
	state: {
		store: {},
		cart: [],
		orderType: 'takein',
		address: {},
		addresses: {},
		member: {
			// avatar: "http://cdn.shop.weivee.com/shop/20200408/6162b21922f336ae9b320bc06582ab7f.png",
			// birthday: null,
			// couponNum: 0,
			// currentValue: "1.00",
			// gender: 0,
			// id: 2,
			// level: 1,
			// mobile: "15975073045",
			// money: "4789.20",
			// openid: "oEY7Y5XYukLQySoKA7sPGWSDtktA",
			// score: 0,
			// token: "87cecec2-6071-431d-afc1-825650711e5a",
			// username: "游客"
		},
		lang: 'zh-cn',
		cookieKey:'PHPSESSID=e4dk4o2utr3c0n95tp42p745ai',
		// 默认地为你为北京地址
		location: {}
	},
	getters: {
		isLogin: state => Object.keys(state.member).length > 0	//是否登录
	},
	mutations: {
		SET_ORDER_TYPE(state, type) {
			state.orderType = type
		},
		SET_MEMBER(state, member) {
			state.member = member
		},
		SET_ADDRESS(state, address) {
			state.address = address
		},
		SET_ADDRESSES(state, addresses) {
			state.addresses = addresses
		},
		SET_STORE(state, store) {
			state.store = store
		},
		SET_CART(state, cart) {
			state.cart = cart
		},
		REMOVE_CART(state) {
			state.cart = []
		},
		setCookie(state, provider) {
			state.cookie = provider;
			uni.setStorage({
				key: 'cookieKey',
				data: provider
			});
		},
		SET_LOCATION(state, location) {
			state.location = location;
		}
	},
	actions: {
		
	}
})

export default store