(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/navbar-back-button"],{"1afd":function(t,n,e){"use strict";e.r(n);var a=e("c7bb"),u=e("3a4f");for(var c in u)"default"!==c&&function(t){e.d(n,t,(function(){return u[t]}))}(c);var i,o=e("f0c5"),r=Object(o["a"])(u["default"],a["b"],a["c"],!1,null,"bb09215c",null,!1,a["a"],i);n["default"]=r.exports},"336a":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"navbarBackButton",data:function(){return{height:0,left:0,top:0}},created:function(){var n=t.getMenuButtonBoundingClientRect(),e=n.height,a=n.right,u=n.top,c=t.getSystemInfoSync(),i=c.windowWidth;this.top=u,this.left=i-a,this.height=e},methods:{click:function(){t.navigateBack()}}};n.default=e}).call(this,e("543d")["default"])},"3a4f":function(t,n,e){"use strict";e.r(n);var a=e("336a"),u=e.n(a);for(var c in a)"default"!==c&&function(t){e.d(n,t,(function(){return a[t]}))}(c);n["default"]=u.a},c7bb:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return a}));var u=function(){var t=this,n=t.$createElement;t._self._c},c=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/navbar-back-button-create-component',
    {
        'components/navbar-back-button-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("1afd"))
        })
    },
    [['components/navbar-back-button-create-component']]
]);
