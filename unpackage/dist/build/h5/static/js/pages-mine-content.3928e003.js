(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-content"],{"77f4":function(t,e,n){"use strict";n.r(e);var r=n("7917"),u=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=u.a},7917:function(t,e,n){"use strict";var r=n("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var u=r(n("c964")),i={data:function(){return{content:""}},onLoad:function(t){t.name&&uni.setNavigationBarTitle({title:t.name}),t.id&&this.getContent(t.id)},methods:{getContent:function(t){var e=this;return(0,u.default)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$api.request("/mine/serviceContent?id="+t);case 2:r=n.sent,r&&(e.content=r.content);case 4:case"end":return n.stop()}}),n)})))()}}};e.default=i},"9bde":function(t,e,n){"use strict";n.r(e);var r=n("d0ee"),u=n("77f4");for(var i in u)"default"!==i&&function(t){n.d(e,t,(function(){return u[t]}))}(i);var a,c=n("f0c5"),o=Object(c["a"])(u["default"],r["b"],r["c"],!1,null,"0ea32640",null,!1,r["a"],a);e["default"]=o.exports},d0ee:function(t,e,n){"use strict";var r,u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-rich-text",{attrs:{nodes:t.content}})],1)},i=[];n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}))}}]);