(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/components/pages/attendance/attendance"],{"0be7":function(e,n,t){"use strict";var r=t("49a0"),a=t.n(r);a.a},"13e0":function(e,n,t){"use strict";t.r(n);var r=t("49ed"),a=t.n(r);for(var o in r)"default"!==o&&function(e){t.d(n,e,(function(){return r[e]}))}(o);n["default"]=a.a},"49a0":function(e,n,t){},"49ed":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=o(t("a34a")),a=t("2f62");function o(e){return e&&e.__esModule?e:{default:e}}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function u(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n,t,r,a,o,c){try{var u=e[o](c),i=u.value}catch(s){return void t(s)}u.done?n(i):Promise.resolve(i).then(r,a)}function d(e){return function(){var n=this,t=arguments;return new Promise((function(r,a){var o=e.apply(n,t);function c(e){s(o,r,a,c,u,"next",e)}function u(e){s(o,r,a,c,u,"throw",e)}c(void 0)}))}}var f=function(){t.e("components/navbar-back-button").then(function(){return resolve(t("1afd"))}.bind(null,t)).catch(t.oe)},l=function(){Promise.all([t.e("common/vendor"),t.e("pages/components/pages/attendance/uni-calendar/uni-calendar")]).then(function(){return resolve(t("bda6"))}.bind(null,t)).catch(t.oe)},p=function(){t.e("components/modal/modal").then(function(){return resolve(t("cb3d"))}.bind(null,t)).catch(t.oe)},m={components:{navbarBackButton:f,uniCalendar:l,modal:p},data:function(){return{attendanceModalVisible:!1,attendanceList:[],atendanceMsg:"签到成功",activeDay:0,stepsOption:[],scoreInfo:{},date:""}},onLoad:function(){var e=this;return d(r.default.mark((function n(){var t;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t=(new Date).getTime(),e.date=e.$u.timeFormat(t,"yyyy-mm-dd"),e.getScore(e.date),n.next=5,e.$api("attendanceList");case 5:e.attendanceList=n.sent,console.log("attendanceList"),console.log(e.attendanceList);case 8:case"end":return n.stop()}}),n)})))()},computed:u({},(0,a.mapState)(["member"])),methods:{getScore:function(e){var n=this;return d(r.default.mark((function t(){var a;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.$api.request("/score/index","POST",{date:e});case 2:a=t.sent,a&&(n.scoreInfo=a,a.successions>7&&(n.activeDay=7),n.stepsOption=a.signinscore,n.attendanceList=a.list);case 4:case"end":return t.stop()}}),t)})))()},signin:function(){var e=this;return d(r.default.mark((function n(){var t;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$api.request("/score/dosign","POST");case 2:t=n.sent,t&&(e.atendanceMsg=t.msg,e.attendanceList.push({date:t.date}),e.attendanceModalVisible=!0,e.scoreInfo.successions++,e.member.score=parseInt(e.member.score)+parseInt(e.scoreInfo.score));case 4:case"end":return n.stop()}}),n)})))()},monthSwitch:function(e){var n=e.year+"-"+e.month+"-01";this.getScore(n)}}};n.default=m},"8ad5":function(e,n,t){"use strict";t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return o})),t.d(n,"a",(function(){return r}));var r={modal:function(){return t.e("components/modal/modal").then(t.bind(null,"cb3d"))}},a=function(){var e=this,n=e.$createElement;e._self._c;e._isMounted||(e.e0=function(n){e.attendanceModalVisible=!1})},o=[]},cd75:function(e,n,t){"use strict";t.r(n);var r=t("8ad5"),a=t("13e0");for(var o in a)"default"!==o&&function(e){t.d(n,e,(function(){return a[e]}))}(o);t("0be7");var c,u=t("f0c5"),i=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,"91b3d656",null,!1,r["a"],c);n["default"]=i.exports},e344:function(e,n,t){"use strict";(function(e){t("2e6e");r(t("66fd"));var n=r(t("cd75"));function r(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])}},[["e344","common/runtime","common/vendor"]]]);