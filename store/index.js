import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

const store = new Vuex.Store({
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
			// token: "1feaa770-3038-4395-a37c-f43a8706fe1f",
			// username: "游客"
		},
		order: {},
		lang: 'zh-cn',
		cookieKey:'PHPSESSID=e4dk4o2utr3c0n95tp42p745ai',
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
		SET_ORDER(state, order) {
			state.order = order
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
		async getStore({commit}) {
			const store = await api('store')
			commit('SET_STORE', store)
		}
	}
})

export default store