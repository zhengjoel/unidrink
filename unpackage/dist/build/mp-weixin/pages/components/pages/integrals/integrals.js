(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/components/pages/integrals/integrals"],{"0d15":function(e,n,t){"use strict";t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return c})),t.d(n,"a",(function(){return o}));var o={uniSteps:function(){return t.e("components/uni-steps/uni-steps").then(t.bind(null,"cdc9"))},modal:function(){return t.e("components/modal/modal").then(t.bind(null,"cb3d"))},jyfParser:function(){return Promise.all([t.e("common/vendor"),t.e("components/jyf-parser/jyf-parser")]).then(t.bind(null,"37e2"))},uToast:function(){return t.e("node-modules/uview-ui/components/u-toast/u-toast").then(t.bind(null,"f243"))}},r=function(){var e=this,n=e.$createElement,t=(e._self._c,e.__map(e.pointsMall,(function(n,t){var o=e.__get_orig(n),r=n.value>0?parseFloat(n.value):null,c=e.remains(n.distribute,n.receive);return{$orig:o,m0:r,m1:c}}))),o=e.typeInfo(e.coupon.type);e.$mp.data=Object.assign({},{$root:{l0:t,m2:o}})},c=[]},"31f2":function(e,n,t){"use strict";var o=t("656b"),r=t.n(o);r.a},"624b":function(e,n,t){"use strict";t.r(n);var o=t("0d15"),r=t("ca9d");for(var c in r)"default"!==c&&function(e){t.d(n,e,(function(){return r[e]}))}(c);t("31f2");var i,a=t("f0c5"),u=Object(a["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);n["default"]=u.exports},"656b":function(e,n,t){},"693e":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=c(t("a34a")),r=t("2f62");function c(e){return e&&e.__esModule?e:{default:e}}function i(e,n,t,o,r,c,i){try{var a=e[c](i),u=a.value}catch(s){return void t(s)}a.done?n(u):Promise.resolve(u).then(o,r)}function a(e){return function(){var n=this,t=arguments;return new Promise((function(o,r){var c=e.apply(n,t);function a(e){i(c,o,r,a,u,"next",e)}function u(e){i(c,o,r,a,u,"throw",e)}a(void 0)}))}}function u(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?u(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var f=function(){t.e("components/navbar-back-button").then(function(){return resolve(t("1afd"))}.bind(null,t)).catch(t.oe)},p=function(){t.e("components/uni-steps/uni-steps").then(function(){return resolve(t("cdc9"))}.bind(null,t)).catch(t.oe)},d=function(){t.e("components/modal/modal").then(function(){return resolve(t("cb3d"))}.bind(null,t)).catch(t.oe)},m=function(){Promise.all([t.e("common/vendor"),t.e("components/jyf-parser/jyf-parser")]).then(function(){return resolve(t("37e2"))}.bind(null,t)).catch(t.oe)},v={components:{navbarBackButton:f,uniSteps:p,modal:d,jyfParser:m},data:function(){return{stepsOption:[],activeDay:-1,pointsMall:[],scoreInfo:{},couponIndex:0,coupon:{},detailModalVisible:!1}},computed:s({},(0,r.mapState)(["member"])),onLoad:function(){},onShow:function(){this.getScore(),this.getPointsMall()},methods:s(s({},(0,r.mapMutations)(["SET_MEMBER"])),{},{typeInfo:function(e){return 0==e?"外卖和自取":1==e?"自取":2==e?"外卖":void 0},getScore:function(){var e=this;return a(o.default.mark((function n(){var t;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$api.request("/score/index");case 2:t=n.sent,t&&(e.scoreInfo=t,t.successions>7&&(e.activeDay=7),t.signinscore.forEach((function(n,o){t.successions-1==o&&(e.activeDay=o),o==t.signinscore.length-1&&(n.circle="/static/images/integrals/goal.png",n.circleStyle="width: 47rpx; height: 39rpx;")})),e.stepsOption=t.signinscore);case 4:case"end":return n.stop()}}),n)})))()},signin:function(){var e=this;return a(o.default.mark((function n(){var t;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$api.request("/score/dosign","POST");case 2:t=n.sent,t&&(e.member.score=parseInt(e.member.score)+parseInt(e.scoreInfo.score),e.activeDay<7&&e.activeDay++);case 4:case"end":return n.stop()}}),n)})))()},getPointsMall:function(){var e=this;return a(o.default.mark((function n(){var t;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$api.request("/coupon/index","POST",{score:1,pagesize:6});case 2:return t=n.sent,t&&(e.pointsMall=t),n.abrupt("return");case 7:e.pointsMall=n.sent;case 8:case"end":return n.stop()}}),n)})))()},attendance:function(){e.navigateTo({url:"/pages/components/pages/attendance/attendance"})},flow:function(){e.navigateTo({url:"/pages/components/pages/integrals/flow"})},goCoupon:function(){e.navigateTo({url:"/pages/components/pages/coupons/coupons"})},detail:function(e,n){this.couponIndex=n,this.coupon=e,this.$refs["couponExplain"].setContent(this.coupon.instructions||""),this.detailModalVisible=!0},remains:function(e,n){var t=e-n;return t>0?t:0},closeDetailModal:function(){this.detailModalVisible=!1,this.coupon={}},receive:function(e,n){var t=this;return a(o.default.mark((function r(){var c,i,a;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,t.$api.request("/coupon/receive","POST",{id:e.id});case 2:c=o.sent,c&&(t.$refs.uToast.show({title:"领取成功",type:"success"}),i=t.pointsMall[n],i.my_receive++,i.limit==i.my_receive&&t.pointsMall.splice(n,1),i.score>0&&(a=t.member,a.score=a.score-i.score,t.SET_MEMBER(a)));case 4:case"end":return o.stop()}}),r)})))()},useCoupon:function(){e.switchTab({url:"/pages/menu/menu"})}})};n.default=v}).call(this,t("543d")["default"])},"88fe":function(e,n,t){"use strict";(function(e){t("2e6e");o(t("66fd"));var n=o(t("624b"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},ca9d:function(e,n,t){"use strict";t.r(n);var o=t("693e"),r=t.n(o);for(var c in o)"default"!==c&&function(e){t.d(n,e,(function(){return o[e]}))}(c);n["default"]=r.a}},[["88fe","common/runtime","common/vendor"]]]);