(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pay/pay"],{1436:function(e,t,n){"use strict";(function(e){n("2e6e");r(n("66fd"));var t=r(n("e4b3"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"24d0":function(e,t,n){"use strict";var r={listCell:function(){return n.e("components/list-cell/list-cell").then(n.bind(null,"23e6"))},uSwitch:function(){return n.e("node-modules/uview-ui/components/u-switch/u-switch").then(n.bind(null,"df44"))},uPicker:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-picker/u-picker")]).then(n.bind(null,"9c70"))},modal:function(){return n.e("components/modal/modal").then(n.bind(null,"cb3d"))}},o=function(){var e=this,t=e.$createElement,n=(e._self._c,"takeout"==e.orderType&&e.store.packing_fee>0?parseFloat(e.store.packing_fee):null),r="takeout"==e.orderType&&e.store.delivery_cost>0?parseFloat(e.store.delivery_cost):null;e._isMounted||(e.e0=function(t){e.takeinTIme=!e.takeinTIme},e.e1=function(t){e.ensureAddressModalVisible=!1}),e.$mp.data=Object.assign({},{$root:{m0:n,m1:r}})},a=[];n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}))},3002:function(e,t,n){"use strict";n.r(t);var r=n("d033"),o=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=o.a},a9b8:function(e,t,n){},aae7:function(e,t,n){"use strict";var r=n("a9b8"),o=n.n(r);o.a},d033:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("4795")),o=n("2f62");a(n("8d60"));function a(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,r,o,a,i){try{var u=e[a](i),s=u.value}catch(c){return void n(c)}u.done?t(s):Promise.resolve(s).then(r,o)}function u(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function u(e){i(a,r,o,u,s,"next",e)}function s(e){i(a,r,o,u,s,"throw",e)}u(void 0)}))}}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){p(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d=function(){n.e("components/list-cell/list-cell").then(function(){return resolve(n("23e6"))}.bind(null,n)).catch(n.oe)},l=function(){n.e("components/modal/modal").then(function(){return resolve(n("cb3d"))}.bind(null,n)).catch(n.oe)},f={components:{listCell:d,modal:l},data:function(){return{cart:[],form:{remark:""},ensureAddressModalVisible:!1,takeoutTIme:!1,paramsTime:{year:!1,month:!1,day:!1,hour:!0,minute:!0,second:!1},defaultTime:"00:00",takeinTIme:!1,takeinRange:[{name:"立即用餐",value:0},{name:"10分钟后",value:10},{name:"20分钟后",value:20},{name:"30分钟后",value:30},{name:"40分钟后",value:40},{name:"50分钟后",value:50}],defaultSelector:[0],payType:2,coupons:[],coupon:{}}},computed:c({},(0,o.mapState)(["orderType","address","store","member"]),{total:function(){return this.cart.reduce((function(e,t){return e+t.number*t.sales_price}),0)},amount:function(){var e=this.cart.reduce((function(e,t){return e+t.number*t.sales_price}),0);return this.store.distance>0&&"takeout"==this.orderType&&(e+=parseFloat(this.store.delivery_price)),this.coupon.hasOwnProperty("id")&&(e-=parseFloat(this.coupon.value)),e.toFixed(2)}}),onShow:function(){var e=new Date((new Date).getTime()+36e5),t=e.getHours(),n=e.getMinutes();t<10&&(t="0"+t),n<10&&(n="0"+n),this.defaultTime=t+":"+n},onLoad:function(t){var n=t.remark;this.cart=e.getStorageSync("cart"),n&&this.$set(this.form,"remark",n),this.getCoupons()},methods:c({},(0,o.mapMutations)(["SET_ORDER_TYPE","SET_MEMBER"]),{},(0,o.mapGetters)(["isLogin"]),{setPayType:function(e){this.payType=0,this.payType=e},getCoupons:function(){var e=this;return u(r.default.mark((function t(){var n,o;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n="takein"==e.orderType?1:2,t.next=3,e.$api.request("/coupon/mine","POST",{page:1,pagesize:999,shop_id:e.store.id,type:n});case 3:o=t.sent,o&&(e.coupons=o);case 5:case"end":return t.stop()}}),t)})))()},choiceTime:function(e){var t=e.hour,n=e.minute,r=new Date((new Date).getTime()+36e5),o=r.getHours(),a=r.getMinutes();1e3*(60*t*60+60*n)-36e5<1e3*(60*o*60+60*a)?this.$api.msg("请至少选择一个小时之后"):(t<10&&(t="0"+t),n<10&&(n="0"+n),this.defaultTime=t+":"+n,this.takeoutTIme=!1)},cancelTime:function(e){this.takeoutTIme=!1},takeinCancelTime:function(e){this.takeinTIme=!1},takeinConfirmTime:function(e){this.defaultSelector=e},takout:function(e){var t="takeout";1==e&&(t="takein"),this.SET_ORDER_TYPE(t),this.coupon.hasOwnProperty("type")&&0!=this.coupon.type&&(1==this.coupon.type&&"takeout"==this.orderType&&(this.coupon={}),2==this.coupon.type&&"takeint"==this.orderType&&(this.coupon={})),this.coupons=[],this.getCoupons()},goToRemark:function(){e.navigateTo({url:"/pages/remark/remark?remark="+this.form.remark})},chooseAddress:function(){e.navigateTo({url:"/pages/address/address?is_choose=true&scene=pay"})},goToPackages:function(){var t=this.amount,n=this.coupon.id?this.coupon.id:0;e.navigateTo({url:"/pages/packages/index?amount="+t+"&coupon_id="+n})},goToShop:function(){e.navigateTo({url:"/pages/shop/shop"})},submit:function(){if("takeout"==this.orderType){if("undefined"==typeof this.address.id)return void this.$api.msg("请选择收货地址");this.ensureAddressModalVisible=!0}else this.pay()},pay:function(){var t=this;return u(r.default.mark((function n(){var o,a;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.showLoading({title:"加载中"}),t,o={type:"takeout"==t.orderType?2:1,address_id:"takeout"==t.orderType?t.address.id:0,shop_id:t.store.id,mobile:t.member.mobile,gettime:t.takeinRange[t.defaultSelector[0]].value,pay_type:t.payType,remark:t.form.remark,product_id:[],spec:[],number:[],coupon_id:t.coupon.id?t.coupon.id:0},t.cart.forEach((function(e,t){o.product_id.push(e.id),o.spec.push(e.props_text.replace(/,/g,"|")),o.number.push(e.number)})),n.next=6,t.$api.request("/order/submit","POST",o);case 6:if(a=n.sent,a){n.next=10;break}return e.hideLoading(),n.abrupt("return");case 10:return e.showModal({title:"提示",content:JSON.stringify(a)}),2==t.payType?t.weixinPay(a):5==t.payType?t.balancePay(a):4==t.payType&&t.aliPay(a),e.hideLoading(),n.abrupt("return");case 14:case"end":return n.stop()}}),n)})))()},balancePay:function(t){var n=this;return u(r.default.mark((function o(){var a;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,n.$api.request("/pay/balance?out_trade_no="+t.out_trade_no);case 2:if(a=r.sent,e.hideLoading(),a){r.next=6;break}return r.abrupt("return");case 6:n.member.money-=amount,n.SET_MEMBER(n.member),e.removeStorageSync("cart"),e.switchTab({url:"/pages/take-foods/take-foods",fail:function(e){console.log(e)}});case 10:case"end":return r.stop()}}),o)})))()},weixinPay:function(t){var n=this;return u(r.default.mark((function o(){var a;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,n.$api.request("/pay/unify?out_trade_no="+t.out_trade_no);case 2:if(a=r.sent,a){r.next=6;break}return e.hideLoading(),r.abrupt("return");case 6:"MWEB"==a.trade_type||("JSAPI"==a.trade_type?e.requestPayment({provider:"wxpay",timeStamp:a.timeStamp,nonceStr:a.nonce_str,package:"prepay_id="+a.prepay_id,signType:"MD5",paySign:a.paySign,success:function(t){e.removeStorageSync("cart"),e.switchTab({url:"/pages/take-foods/take-foods"})},fail:function(e){that.$api.msg("支付失败")}}):"APP"==a.trade_type&&e.requestPayment({provider:"wxpay",orderInfo:a.orderInfo,success:function(t){e.removeStorageSync("cart"),e.switchTab({url:"/pages/take-foods/take-foods"})},fail:function(e){that.$api.msg("支付失败")}}));case 7:case"end":return r.stop()}}),o)})))()},alipay:function(){return u(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()}})};t.default=f}).call(this,n("543d")["default"])},e4b3:function(e,t,n){"use strict";n.r(t);var r=n("24d0"),o=n("3002");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("aae7");var i,u=n("f0c5"),s=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,"bfc0bc80",null,!1,r["a"],i);t["default"]=s.exports}},[["1436","common/runtime","common/vendor"]]]);