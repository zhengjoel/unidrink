(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/address/address"],{"0121":function(e,t,n){"use strict";n.r(t);var r=n("cfe9"),o=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=o.a},2512:function(e,t,n){"use strict";n.r(t);var r=n("30d6"),o=n("0121");for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);n("9641");var a,u=n("f0c5"),c=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,"2c547760",null,!1,r["a"],a);t["default"]=c.exports},"30d6":function(e,t,n){"use strict";var r={uniSwipeAction:function(){return n.e("components/uni-swipe-action/uni-swipe-action").then(n.bind(null,"c673"))},uniSwipeActionItem:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-swipe-action-item/uni-swipe-action-item")]).then(n.bind(null,"7a9d"))}},o=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return r}))},"4df3":function(e,t,n){},5228:function(e,t,n){"use strict";(function(e){n("2e6e");r(n("66fd"));var t=r(n("2512"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},9641:function(e,t,n){"use strict";var r=n("4df3"),o=n.n(r);o.a},cfe9:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(n("4795")),o=n("2f62");function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){return f(e)||l(e,t)||c(e,t)||u()}function u(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(e,t){if(e){if("string"===typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function l(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done);r=!0)if(n.push(a.value),t&&n.length===t)break}catch(c){o=!0,i=c}finally{try{r||null==u["return"]||u["return"]()}finally{if(o)throw i}}return n}}function f(e){if(Array.isArray(e))return e}function d(e,t,n,r,o,i,a){try{var u=e[i](a),c=u.value}catch(s){return void n(s)}u.done?t(c):Promise.resolve(c).then(r,o)}function p(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function a(e){d(i,r,o,a,u,"next",e)}function u(e){d(i,r,o,a,u,"throw",e)}a(void 0)}))}}function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h=function(){n.e("components/uni-swipe-action/uni-swipe-action").then(function(){return resolve(n("c673"))}.bind(null,n)).catch(n.oe)},S=function(){Promise.all([n.e("common/vendor"),n.e("components/uni-swipe-action-item/uni-swipe-action-item")]).then(function(){return resolve(n("7a9d"))}.bind(null,n)).catch(n.oe)},w={components:{uniSwipeAction:h,uniSwipeActionItem:S},data:function(){return{scene:"menu",is_choose:!1,swipeOption:[{text:"删除",style:{backgroundColor:"#D12E32"}}]}},computed:v({},(0,o.mapState)(["addresses","store"])),onLoad:function(e){var t=this;return p(r.default.mark((function n(){var o,i;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:o=e.is_choose,i=e.scene,t.is_choose=o||!1,t.scene=i||"menu",t.init();case 4:case"end":return n.stop()}}),n)})))()},methods:v({},(0,o.mapMutations)(["SET_ADDRESS","SET_ADDRESSES","SET_ORDER_TYPE","SET_STORE","SET_LOCATION"]),{init:function(){var e=this;return p(r.default.mark((function t(){var n;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$api.request("/address/all");case 2:n=t.sent,n&&e.SET_ADDRESSES(n);case 4:case"end":return t.stop()}}),t)})))()},add:function(){e.navigateTo({url:"/pages/address/add"})},edit:function(t){e.navigateTo({url:"/pages/address/add?id="+t})},handleSwipeClick:function(t){var n=this;return p(r.default.mark((function o(){var i,u,c,s,l,f;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.showModal({title:"提示",content:"确定要删除？"});case 2:if(i=r.sent,u=a(i,2),u[0],c=u[1],!c||!c.confirm){r.next=11;break}return r.next=9,n.$api.request("/address/delete","POST",{id:t});case 9:s=r.sent,s&&(l=n.addresses.findIndex((function(e){return e.id==t})),f=JSON.parse(JSON.stringify(n.addresses)),f.splice(l,1),n.SET_ADDRESSES(f),e.showToast({title:"删除成功！",icon:"success"}));case 11:case"end":return r.stop()}}),o)})))()},chooseAddress:function(t){var n=this;return p(r.default.mark((function o(){var i;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(n.is_choose){r.next=2;break}return r.abrupt("return");case 2:if(console.log("已选中的店铺"),console.log(n.store),"menu"!=n.scene){r.next=22;break}return r.next=7,n.$api.request("/shop/getDistanceFromLocation","POST",{lat:t.lat,lng:t.lng,lat2:n.store.lat,lng2:n.store.lng});case 7:if(i=r.sent,i){r.next=10;break}return r.abrupt("return");case 10:if(!(i>n.store.distance)){r.next=13;break}return n.$api.msg("不在配送范围"),r.abrupt("return");case 13:n.SET_ADDRESS(t),n.SET_ORDER_TYPE("takeout"),n.store.far=i,n.store.far_text=i+"km",n.SET_STORE(n.store),n.SET_LOCATION({latitude:t.lat,longitude:t.lng}),e.switchTab({url:"/pages/menu/menu"}),r.next=23;break;case 22:"pay"==n.scene&&(n.SET_ADDRESS(t),n.SET_ORDER_TYPE("takeout"),e.navigateTo({url:"/pages/pay/pay"}));case 23:case"end":return r.stop()}}),o)})))()}})};t.default=w}).call(this,n("543d")["default"])}},[["5228","common/runtime","common/vendor"]]]);