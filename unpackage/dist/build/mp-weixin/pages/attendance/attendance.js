(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/attendance/attendance"],{"0a54":function(e,t,n){"use strict";n.r(t);var r=n("31e0"),a=n("2820");for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("33e8");var c,u=n("f0c5"),i=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,"8d5e5e72",null,!1,r["a"],c);t["default"]=i.exports},2820:function(e,t,n){"use strict";n.r(t);var r=n("62bb"),a=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=a.a},"31e0":function(e,t,n){"use strict";var r={modal:function(){return n.e("components/modal/modal").then(n.bind(null,"cb3d"))}},a=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.attendanceModalVisible=!1})},o=[];n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return r}))},"33e8":function(e,t,n){"use strict";var r=n("65d1"),a=n.n(r);a.a},"62bb":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n("4795")),a=n("2f62");function o(e){return e&&e.__esModule?e:{default:e}}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t,n,r,a,o,c){try{var u=e[o](c),i=u.value}catch(s){return void n(s)}u.done?t(i):Promise.resolve(i).then(r,a)}function d(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function c(e){s(o,r,a,c,u,"next",e)}function u(e){s(o,r,a,c,u,"throw",e)}c(void 0)}))}}var f=function(){n.e("components/navbar-back-button").then(function(){return resolve(n("1afd"))}.bind(null,n)).catch(n.oe)},l=function(){Promise.all([n.e("common/vendor"),n.e("pages/attendance/uni-calendar/uni-calendar")]).then(function(){return resolve(n("02f7"))}.bind(null,n)).catch(n.oe)},p=function(){n.e("components/modal/modal").then(function(){return resolve(n("cb3d"))}.bind(null,n)).catch(n.oe)},b={components:{navbarBackButton:f,uniCalendar:l,modal:p},data:function(){return{attendanceModalVisible:!1,attendanceList:[],atendanceMsg:"签到成功",activeDay:0,stepsOption:[],scoreInfo:{},date:""}},onLoad:function(){var e=this;return d(r.default.mark((function t(){var n;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=(new Date).getTime(),e.date=e.$u.timeFormat(n,"yyyy-mm-dd"),e.getScore(e.date),t.next=5,e.$api("attendanceList");case 5:e.attendanceList=t.sent,console.log("attendanceList"),console.log(e.attendanceList);case 8:case"end":return t.stop()}}),t)})))()},computed:u({},(0,a.mapState)(["member"])),methods:{getScore:function(e){var t=this;return d(r.default.mark((function n(){var a;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$api.request("/score/index","POST",{date:e});case 2:a=n.sent,a&&(t.scoreInfo=a,a.successions>7&&(t.activeDay=7),t.stepsOption=a.signinscore,t.attendanceList=a.list);case 4:case"end":return n.stop()}}),n)})))()},signin:function(){var e=this;return d(r.default.mark((function t(){var n;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$api.request("/score/dosign","POST");case 2:n=t.sent,n&&(e.atendanceMsg=n.msg,e.attendanceList.push({date:n.date}),e.attendanceModalVisible=!0,e.scoreInfo.successions++,e.member.score=parseInt(e.member.score)+parseInt(e.scoreInfo.score));case 4:case"end":return t.stop()}}),t)})))()},monthSwitch:function(e){var t=e.year+"-"+e.month+"-01";this.getScore(t)}}};t.default=b},"65d1":function(e,t,n){},"6a3d":function(e,t,n){"use strict";(function(e){n("2e6e");r(n("66fd"));var t=r(n("0a54"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["6a3d","common/runtime","common/vendor"]]]);