(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/coupons/coupons"],{"06e7":function(e,n,t){"use strict";var o=t("e050"),a=t.n(o);a.a},"7e0c":function(e,n,t){"use strict";t.r(n);var o=t("d873"),a=t("bb33");for(var u in a)"default"!==u&&function(e){t.d(n,e,(function(){return a[e]}))}(u);t("06e7");var s,i=t("f0c5"),c=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,"f046345a",null,!1,o["a"],s);n["default"]=c.exports},9080:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(t("4795"));function a(e){return e&&e.__esModule?e:{default:e}}function u(e,n,t,o,a,u,s){try{var i=e[u](s),c=i.value}catch(r){return void t(r)}i.done?n(c):Promise.resolve(c).then(o,a)}function s(e){return function(){var n=this,t=arguments;return new Promise((function(o,a){var s=e.apply(n,t);function i(e){u(s,o,a,i,c,"next",e)}function c(e){u(s,o,a,i,c,"throw",e)}i(void 0)}))}}var i=function(){t.e("components/modal/modal").then(function(){return resolve(t("cb3d"))}.bind(null,t)).catch(t.oe)},c=function(){Promise.all([t.e("common/vendor"),t.e("components/jyf-parser/jyf-parser")]).then(function(){return resolve(t("37e2"))}.bind(null,t)).catch(t.oe)},r={components:{modal:i,jyfParser:c},data:function(){return{tabs:[{title:"我的优惠券",page:1,pagesize:10,coupons:[]},{title:"未领优惠券",page:1,pagesize:10,coupons:[]},{title:"兑换记录",page:1,pagesize:10,coupons:[]}],activeTabIndex:"",detailModalVisible:!1,coupon:{},couponIndex:0,exchange_code:""}},onShow:function(){this.activeTabIndex=0},onLoad:function(){},onPullDownRefresh:function(){this.tabs[this.activeTabIndex].coupons=[],this.tabs[this.activeTabIndex].page=1,this.getCoupons(this.activeTabIndex)},watch:{activeTabIndex:function(){var e=s(o.default.mark((function e(){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.getCoupons(this.activeTabIndex);case 2:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}()},methods:{exchange:function(){var e=this;return s(o.default.mark((function n(){var t;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$api.request("/coupon/receive","POST",{code:e.exchange_code});case 2:t=n.sent,t&&(e.$refs.uToast.show({title:"兑换成功",type:"success"}),e.tabs[0].coupons=[],e.tabs[0].page=1,e.getCoupons(0),e.tabs[1].coupons=[],e.tabs[1].page=1,e.getCoupons(1));case 4:case"end":return n.stop()}}),n)})))()},typeInfo:function(e){return 0==e?"外卖和自取":1==e?"自取":2==e?"外卖":void 0},handleTab:function(e){this.activeTabIndex=e},getCoupons:function(n){var t=this;return s(o.default.mark((function a(){var u,s,i,c;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:if(u=t.tabs[n].page,s=t.tabs[n].pagesize,i=!1,"0"!=n){o.next=7;break}return o.next=6,t.$api.request("/coupon/mine","POST",{page:u,pagesize:s});case 6:i=o.sent;case 7:if("1"!=n){o.next=11;break}return o.next=10,t.$api.request("/coupon/index","POST",{page:u,pagesize:s});case 10:i=o.sent;case 11:if("2"!=n){o.next=15;break}return o.next=14,t.$api.request("/coupon/exchangeLog","POST",{page:u,pagesize:s});case 14:i=o.sent;case 15:if(e.stopPullDownRefresh(),i&&0!=i.length){o.next=18;break}return o.abrupt("return");case 18:if(1==u)t.tabs[n].coupons=i;else for(c in i)t.tabs[n].coupons.push(i[c]);t.tabs[n].page++;case 20:case"end":return o.stop()}}),a)})))()},openDetailModal:function(e,n){this.couponIndex=n,this.coupon=e,this.$refs["couponExplain"].setContent(this.coupon.instructions||""),this.detailModalVisible=!0},useCouponWith:function(e){this.coupon=e,this.useCoupon()},closeDetailModal:function(){this.detailModalVisible=!1,this.coupon={}},useCoupon:function(){e.switchTab({url:"/pages/menu/menu"})},showTip1:function(){e.showToast({title:"您暂时还没有赠送中卡券哦~",icon:"none"})},showTip2:function(){e.showToast({title:"您暂时还没有券码哦~",icon:"none"})},receive:function(e,n){var t=this;return s(o.default.mark((function a(){var u,s;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,t.$api.request("/coupon/receive","POST",{id:e.id});case 2:u=o.sent,u&&(t.$refs.uToast.show({title:"领取成功",type:"success"}),s=t.tabs[t.activeTabIndex].coupons[n],s.my_receive++,s.limit==s.my_receive&&t.tabs[t.activeTabIndex].coupons.splice(n,1));case 4:case"end":return o.stop()}}),a)})))()}}};n.default=r}).call(this,t("543d")["default"])},b393:function(e,n,t){"use strict";(function(e){t("2e6e");o(t("66fd"));var n=o(t("7e0c"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},bb33:function(e,n,t){"use strict";t.r(n);var o=t("9080"),a=t.n(o);for(var u in o)"default"!==u&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=a.a},d873:function(e,n,t){"use strict";var o={modal:function(){return t.e("components/modal/modal").then(t.bind(null,"cb3d"))},jyfParser:function(){return Promise.all([t.e("common/vendor"),t.e("components/jyf-parser/jyf-parser")]).then(t.bind(null,"37e2"))},uToast:function(){return t.e("node-modules/uview-ui/components/u-toast/u-toast").then(t.bind(null,"f243"))}},a=function(){var e=this,n=e.$createElement,t=(e._self._c,e.typeInfo(e.coupon.type));e.$mp.data=Object.assign({},{$root:{m0:t}})},u=[];t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return u})),t.d(n,"a",(function(){return o}))},e050:function(e,n,t){}},[["b393","common/runtime","common/vendor"]]]);