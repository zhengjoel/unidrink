(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/menu/menu"],{"63d5":function(t,e,n){"use strict";n.r(e);var o=n("d2e6"),r=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=r.a},"68ff":function(t,e,n){"use strict";var o=n("d086"),r=n.n(o);r.a},"97c1":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var o={uniNoticeBar:function(){return n.e("components/uni-notice-bar/uni-notice-bar").then(n.bind(null,"2061"))},modal:function(){return n.e("components/modal/modal").then(n.bind(null,"cb3d"))},popupLayer:function(){return n.e("components/popup-layer/popup-layer").then(n.bind(null,"294e"))}},r=function(){var t=this,e=t.$createElement,n=(t._self._c,!t.loading&&t.goods.length?t.__map(t.goods,(function(e,n){var o=t.__get_orig(e),r=t.menuCartNum(e.id),i=t.menuCartNum(e.id);return{$orig:o,m0:r,m1:i}})):null),o=!t.loading&&t.goods.length?t.__map(t.goods,(function(e,n){var o=t.__get_orig(e),r=t.__map(e.goods_list,(function(e,n){var o=t.__get_orig(e),r=e.use_spec&&e.stock>0?t.goodCartNum(e.id):null,i=e.use_spec&&e.stock>0?t.goodCartNum(e.id):null,a=!e.use_spec&&e.stock>0?t.goodCartNum(e.id):null,s=!e.use_spec&&e.stock>0?t.goodCartNum(e.id):null,c=!e.use_spec&&e.stock>0?t.goodCartNum(e.id):null;return{$orig:o,m2:r,m3:i,m4:a,m5:s,m6:c}}));return{$orig:o,l1:r}})):null,r=t.loading?null:t.getGoodSelectedProps(t.good),i=!t.loading&&r?t.getGoodSelectedProps(t.good):null,a=!t.loading&&"takeout"==t.orderType&&t.store.packing_fee?parseFloat(t.store.packing_fee):null;t.$mp.data=Object.assign({},{$root:{l0:n,l2:o,m7:r,m8:i,m9:a}})},i=[]},d086:function(t,e,n){},d0be:function(t,e,n){"use strict";n.r(e);var o=n("97c1"),r=n("63d5");for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n("68ff");var a,s=n("f0c5"),c=Object(s["a"])(r["default"],o["b"],o["c"],!1,null,"11d6f1d9",null,!1,o["a"],a);e["default"]=c.exports},d2e6:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("a34a")),r=n("2f62");function i(t){return t&&t.__esModule?t:{default:t}}function a(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=u(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var o=0,r=function(){};return{s:r,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return a=t.done,t},e:function(t){s=!0,i=t},f:function(){try{a||null==n.return||n.return()}finally{if(s)throw i}}}}function s(t,e){return f(t)||l(t,e)||u(t,e)||c()}function c(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t,e){if(t){if("string"===typeof t)return d(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(t,e):void 0}}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function l(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var n=[],o=!0,r=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(o=(a=s.next()).done);o=!0)if(n.push(a.value),e&&n.length===e)break}catch(c){r=!0,i=c}finally{try{o||null==s["return"]||s["return"]()}finally{if(r)throw i}}return n}}function f(t){if(Array.isArray(t))return t}function p(t,e,n,o,r,i,a){try{var s=t[i](a),c=s.value}catch(u){return void n(u)}s.done?e(c):Promise.resolve(c).then(o,r)}function h(t){return function(){var e=this,n=arguments;return new Promise((function(o,r){var i=t.apply(e,n);function a(t){p(i,o,r,a,s,"next",t)}function s(t){p(i,o,r,a,s,"throw",t)}a(void 0)}))}}function g(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function m(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?g(Object(n),!0).forEach((function(e){b(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function b(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var y=function(){n.e("components/modal/modal").then(function(){return resolve(n("cb3d"))}.bind(null,n)).catch(n.oe)},v=function(){n.e("components/popup-layer/popup-layer").then(function(){return resolve(n("294e"))}.bind(null,n)).catch(n.oe)},S=function(){n.e("components/uni-notice-bar/uni-notice-bar").then(function(){return resolve(n("2061"))}.bind(null,n)).catch(n.oe)},_=function(){n.e("components/our-loading/our-loading").then(function(){return resolve(n("4650"))}.bind(null,n)).catch(n.oe)},O={components:{modal:y,popupLayer:v,uniNoticeBar:S,ourLoading:_},data:function(){return{goods:[],ads:[],loading:!0,currentCateId:6905,cateScrollTop:0,menuScrollIntoView:"",cart:[],goodDetailModalVisible:!1,good:{},category:{},cartPopupVisible:!1,sizeCalcState:!1}},onPullDownRefresh:function(){this.init()},onShow:function(){this.init()},computed:m(m(m({},(0,r.mapState)(["orderType","address","store","location"])),(0,r.mapGetters)(["isLogin"])),{},{goodCartNum:function(){var t=this;return function(e){return t.cart.reduce((function(t,n){return n.id===e?t+n.number:t}),0)}},menuCartNum:function(){var t=this;return function(e){return t.cart.reduce((function(t,n){return n.cate_id===e?t+n.number:t}),0)}},getCartGoodsNumber:function(){return this.cart.reduce((function(t,e){return t+e.number}),0)},getCartGoodsPrice:function(){var t=this.cart.reduce((function(t,e){return t+e.number*e.sales_price}),0);return parseFloat(t).toFixed(2)},disabledPay:function(){return"takeout"==this.orderType&&this.getCartGoodsPrice<parseFloat(this.store.min_price)},spread:function(){if("takeout"==this.orderType)return parseFloat((this.store.min_price-this.getCartGoodsPrice).toFixed(2))}}),methods:m(m(m({},(0,r.mapMutations)(["SET_ORDER_TYPE","SET_STORE","SET_LOCATION"])),(0,r.mapActions)(["getStore"])),{},{in_array:function(t,e){for(var n in e)if(e[n]==t)return!0;return!1},selectShop:function(){t.navigateTo({url:"/pages/components/pages/shop/shop"})},init:function(){var e=this;return h(o.default.mark((function n(){var r,i,a,c,u,d,l,f,p,h,g,m;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e.loading=!0,r={},i=e.location,e.location.hasOwnProperty("latitude")){n.next=10;break}return n.next=5,t.getLocation({type:"wgs84"});case 5:a=n.sent,c=s(a,2),r=c[0],i=c[1],r&&(t.showModal({title:"获取位置失败",content:JSON.stringify(r)}),i={latitude:39.91999,longitude:116.45627});case 10:if(!i){n.next=29;break}return console.log("当前位置的经度："+i.longitude),console.log("当前位置的纬度："+i.latitude),e.SET_LOCATION(i),u=0,e.store.id&&(u=e.store.id),n.next=18,e.$api.request("/shop/nearby","POST",{lat:i.latitude,lng:i.longitude,shop_id:u});case 18:if(d=n.sent,!d){n.next=29;break}return e.getAds(d.id),d.notice=1==d.status?d.notice:"店铺营业时间为:"+d.bussines_time+"，不在营业时间内无法下单",e.SET_STORE(d),n.next=25,e.$api.request("/menu/goods","POST",{shop_id:d.id});case 25:if(l=n.sent,l&&(e.goods=l,e.cart=[],f=t.getStorageSync("cart")||[],p=[],f)){for(h in f)for(g in l)for(m in l[g].goods_list)f[h].id==l[g].goods_list[m].id&&p.push(f[h]);e.cart=p,e.cartPopupVisible=!1}e.loading=!1,t.stopPullDownRefresh();case 29:case"end":return n.stop()}}),n)})))()},getAds:function(t){var e=this;return h(o.default.mark((function n(){var r;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$api.request("/menu/ads","POST",{shop_id:t});case 2:r=n.sent,r&&(e.ads=r);case 4:case"end":return n.stop()}}),n)})))()},takout:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];"takeout"==this.orderType&&0==e||(this.isLogin?this.address.hasOwnProperty("address")&&1!=e?this.SET_ORDER_TYPE("takeout"):t.navigateTo({url:"/pages/components/pages/address/address?is_choose=true"}):t.navigateTo({url:"/pages/components/pages/login/login"}))},handleMenuTap:function(t){var e=this;this.sizeCalcState||this.calcSize(),this.currentCateId=t,this.$nextTick((function(){return e.cateScrollTop=e.goods.find((function(e){return e.id==t})).top}))},handleGoodsScroll:function(t){var e=t.detail;this.sizeCalcState||this.calcSize();var n=e.scrollTop,o=this.goods.filter((function(t){return t.top<=n})).reverse();o.length>0&&(this.currentCateId=o[0].id)},calcSize:function(){var e=10,n=t.createSelectorQuery().select("#ads");n.fields({size:!0},(function(t){e+=Math.floor(t.height)})).exec(),this.goods.forEach((function(n){var o=t.createSelectorQuery().select("#cate-".concat(n.id));o.fields({size:!0},(function(t){n.top=e,e+=t.height,n.bottom=e})).exec()})),this.sizeCalcState=!0},handleAddToCart:function(e,n,o){var r=this,i=this.cart.findIndex((function(t){return n.use_spec?t.id===n.id&&t.props_text===r.getGoodSelectedProps(n):t.id===n.id}));i>-1?this.cart[i].number+=o:this.cart.push({id:n.id,cate_id:e.id,name:n.name,sales_price:n.sales_price,number:o,image:n.image,use_property:n.use_spec,props_text:n.use_spec?this.getGoodSelectedProps(n):""}),t.setStorageSync("cart",JSON.parse(JSON.stringify(this.cart)))},handleReduceFromCart:function(e,n){var o=this.cart.findIndex((function(t){return t.id===n.id}));this.cart[o].number-=1,this.cart[o].number<=0&&this.cart.splice(o,1),t.setStorageSync("cart",JSON.parse(JSON.stringify(this.cart)))},showGoodDetailModal:function(t,e){this.good=JSON.parse(JSON.stringify(m(m({},e),{},{number:1}))),this.category=JSON.parse(JSON.stringify(t)),this.goodDetailModalVisible=!0,this.changePropertyDefault(0,0)},closeGoodDetailModal:function(){this.goodDetailModalVisible=!1,this.category={},this.good={}},changePropertyDefault:function(t,e){if(this.good.specList[t]&&this.good.specList[t].child[e]){this.good.specList[t].default=this.good.specList[t].child[e],this.good.number=1;var n,o=[],r=a(this.good.specList);try{for(r.s();!(n=r.n()).done;){var i=n.value;""!=i.default&&o.push(i.default)}}catch(d){r.e(d)}finally{r.f()}var s,c=a(this.good.specTableList);try{for(c.s();!(s=c.n()).done;){var u=s.value;u.value.join(" ")==o.join(" ")&&(this.good.market_price=parseFloat(u.market_price).toFixed(2),this.good.sales_price=parseFloat(u.sales_price).toFixed(2),this.good.stock=u.stock,this.good.image=u.image?u.image:this.good.image)}}catch(d){c.e(d)}finally{c.f()}}},getGoodSelectedProps:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"text";if(t.use_spec){var n=[];return t.specList.forEach((function(t){"text"===e&&n.push(t.default)})),"text"===e?n.join(","):n}return""},handlePropertyAdd:function(){this.good.number+=1},handlePropertyReduce:function(){1!==this.good.number&&(this.good.number-=1)},handleAddToCartInModal:function(){this.good.stock<=0?this.$api.msg("商品库存不足"):(this.handleAddToCart(this.category,this.good,this.good.number),this.closeGoodDetailModal())},openCartPopup:function(){this.cartPopupVisible=!this.cartPopupVisible},handleCartClear:function(){var e=this;t.showModal({title:"提示",content:"确定清空购物车么",success:function(n){var o=n.confirm;o&&(e.cartPopupVisible=!1,e.cart=[],t.setStorageSync("cart",JSON.parse(JSON.stringify(e.cart))))}})},handleCartItemAdd:function(e){this.cart[e].number+=1,t.setStorageSync("cart",JSON.parse(JSON.stringify(this.cart)))},handleCartItemReduce:function(e){1===this.cart[e].number?this.cart.splice(e,1):this.cart[e].number-=1,this.cart.length||(this.cartPopupVisible=!1),t.setStorageSync("cart",JSON.parse(JSON.stringify(this.cart)))},toPay:function(){this.isLogin?0!=this.store.status?"takeout"==this.orderType&&this.store.distance<this.store.far?this.$api.msg("选中的地址不在配送范围"):(t.showLoading({title:"加载中"}),t.setStorageSync("cart",JSON.parse(JSON.stringify(this.cart))),t.navigateTo({url:"/pages/components/pages/pay/pay"}),t.hideLoading()):this.$api.msg("不在店铺营业时间内"):t.navigateTo({url:"/pages/components/pages/login/login"})}})};e.default=O}).call(this,n("543d")["default"])},dbbd:function(t,e,n){"use strict";(function(t){n("2e6e");o(n("66fd"));var e=o(n("d0be"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["dbbd","common/runtime","common/vendor"]]]);