(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/integrals/flow"],{"2dc6":function(e,t,n){},"862e":function(e,t,n){"use strict";n.r(t);var o=n("9bcc"),r=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=r.a},"8f8e":function(e,t,n){"use strict";var o={listCell:function(){return n.e("components/list-cell/list-cell").then(n.bind(null,"23e6"))},uLoadmore:function(){return n.e("node-modules/uview-ui/components/u-loadmore/u-loadmore").then(n.bind(null,"7589"))}},r=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return o}))},"9bcc":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("4795"));function r(e){return e&&e.__esModule?e:{default:e}}function u(e,t,n,o,r,u,a){try{var c=e[u](a),i=c.value}catch(s){return void n(s)}c.done?t(i):Promise.resolve(i).then(o,r)}function a(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var a=e.apply(t,n);function c(e){u(a,o,r,c,i,"next",e)}function i(e){u(a,o,r,c,i,"throw",e)}c(void 0)}))}}var c=function(){n.e("components/list-cell/list-cell").then(function(){return resolve(n("23e6"))}.bind(null,n)).catch(n.oe)},i={components:{listCell:c},data:function(){return{pointNum:0,pointsFlow:[],page:1,pagesize:20,status:"loadmore"}},onLoad:function(){var e=this.$store.state.member;this.pointNum=e.score,this.getScoreLog()},onReachBottom:function(){this.getScoreLog()},methods:{getScoreLog:function(){var e=this;return a(o.default.mark((function t(){var n,r;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if("nomore"!=e.status){t.next=2;break}return t.abrupt("return");case 2:return e.status="loading",t.next=5,e.$api.request("/score/log","POST",{page:e.page,pagesize:e.pagesize});case 5:if(n=t.sent,n){for(r in n)e.pointsFlow.push(n[r]);n.length>0?(e.page++,e.status="loadmore"):e.status="nomore"}else e.status="nomore";case 7:case"end":return t.stop()}}),t)})))()}}};t.default=i},cd0a:function(e,t,n){"use strict";(function(e){n("2e6e");o(n("66fd"));var t=o(n("e8ee"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},e8ee:function(e,t,n){"use strict";n.r(t);var o=n("8f8e"),r=n("862e");for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);n("fca2");var a,c=n("f0c5"),i=Object(c["a"])(r["default"],o["b"],o["c"],!1,null,"4ca31ba8",null,!1,o["a"],a);t["default"]=i.exports},fca2:function(e,t,n){"use strict";var o=n("2dc6"),r=n.n(o);r.a}},[["cd0a","common/runtime","common/vendor"]]]);