(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/components/pages/mine/member-code"],{1434:function(e,t,n){"use strict";var r=n("bb81"),o=n.n(r);o.a},3094:function(e,t,n){"use strict";(function(e){n("2e6e");r(n("66fd"));var t=r(n("8ce5"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},3381:function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return r}));var o=function(){var e=this,t=e.$createElement;e._self._c},c=[]},"478a":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("a34a")),o=n("2f62"),c=a(n("c94f"));function a(e){return e&&e.__esModule?e:{default:e}}function u(e,t,n,r,o,c,a){try{var u=e[c](a),i=u.value}catch(f){return void n(f)}u.done?t(i):Promise.resolve(i).then(r,o)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var c=e.apply(t,n);function a(e){u(c,r,o,a,i,"next",e)}function i(e){u(c,r,o,a,i,"throw",e)}a(void 0)}))}}function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d={data:function(){return{}},onShow:function(){var e=this,t=1;this.makeMemberCode(t),setInterval((function(){t++,e.makeMemberCode(t)}),3e4)},computed:s({},(0,o.mapState)(["member"])),methods:{getMemberCode:function(){var e=this;return i(r.default.mark((function t(){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$api.request("/user/memberCode");case 2:t.sent;case 4:case"end":return t.stop()}}),t)})))()},makeMemberCode:function(t){c.default.make({canvasId:"memberCode",componentInstance:this,text:"memberCode".concat(t),size:e.upx2px(350),margin:20,backgroundColor:"#ffffff",foregroundColor:"#000000",fileType:"jpg",correctLevel:c.default.defaults.correctLevel,success:function(e){console.log(e)}})},integrals:function(){e.navigateTo({url:"/pages/components/pages/integrals/integrals"})},balance:function(){e.navigateTo({url:"/pages/components/pages/balance/balance"})},coupons:function(){e.navigateTo({url:"/pages/components/pages/coupons/coupons"})}}};t.default=d}).call(this,n("543d")["default"])},"8ce5":function(e,t,n){"use strict";n.r(t);var r=n("3381"),o=n("cd32");for(var c in o)"default"!==c&&function(e){n.d(t,e,(function(){return o[e]}))}(c);n("1434");var a,u=n("f0c5"),i=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,"9b8222fe",null,!1,r["a"],a);t["default"]=i.exports},bb81:function(e,t,n){},cd32:function(e,t,n){"use strict";n.r(t);var r=n("478a"),o=n.n(r);for(var c in r)"default"!==c&&function(e){n.d(t,e,(function(){return r[e]}))}(c);t["default"]=o.a}},[["3094","common/runtime","common/vendor"]]]);