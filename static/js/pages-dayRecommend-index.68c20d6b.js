(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-dayRecommend-index"],{"16cb":function(e,a,t){var n=t("ea73");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=t("4f06").default;i("35773e82",n,!0,{sourceMap:!1,shadowMode:!1})},"35cd":function(e,a,t){e.exports=t.p+"static/img/background.01d212c7.png"},"8e46":function(e,a,t){"use strict";t.d(a,"b",(function(){return n})),t.d(a,"c",(function(){return i})),t.d(a,"a",(function(){}));var n=function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("v-uni-view",{staticClass:"day-recommend-container"},[n("v-uni-view",{staticClass:"vague-wrapper flex align-center"},[n("v-uni-image",{staticClass:"background-img",attrs:{src:t("35cd")}}),n("v-uni-view",{staticClass:"absolve-wrapper"},[n("cu-custom",{staticClass:"head-title",attrs:{isBack:!0,bgColor:"unset"}},[n("template",{attrs:{slot:"content"},slot:"content"},[e._v("每日推荐")])],2),n("v-uni-view",{staticClass:"day-recommend-info",style:{"padding-top":e.CustomBar+"px"}},[n("v-uni-image",{staticClass:"bgImg",attrs:{src:e.bgImg,mode:"widthFix"}}),n("v-uni-view",{staticClass:"day-info"},[n("v-uni-text",{staticClass:"bold-text"},[e._v(e._s(e.day))]),n("v-uni-text",{staticClass:"small-text"},[e._v("/"+e._s(e.month))]),n("v-uni-view",{staticClass:"descript"},[e._v("生如蝼蚁当立鸿鹄之志,命薄似纸应有不屈之心,乾坤未定,你我皆是黑马")])],1)],1)],1)],1),n("v-uni-view",{staticClass:"recommend-main",class:{hasPlayInfo:e.playInfo.id}},[n("v-uni-view",{staticClass:"recommend-list"},[n("v-uni-view",{staticClass:"music-title",on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.handlePlayAllMusic.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"iconfont icon-kaishi3 basic-icon-color playIcon"}),e._v("全部播放"),n("v-uni-text",{staticClass:"light-text"},[e._v("(共"+e._s(e.dayRecommendList.length)+"首)")])],1),n("v-uni-scroll-view",{staticStyle:{height:"calc(100% - 55px)"},attrs:{"scroll-y":!0,"scroll-with-animation":!0}},e._l(e.dayRecommendList,(function(a,t){return n("v-uni-view",{key:a.id,staticClass:"music-item flex",class:{active:a.id==e.playInfo.id},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.handlePlayMusic(a)}}},[n("v-uni-image",{staticClass:"music-img",attrs:{src:a.al.picUrl+"?param=60y60",mode:"widthFix"}}),n("v-uni-view",{staticClass:"music-info"},[n("v-uni-view",{staticClass:"music-name text-overflow"},[e._v(e._s(a.name))]),n("v-uni-view",{staticClass:"music-singer text-overflow flex"},[n("span",{staticClass:"small-icon"},[e._v(e._s(a.id%2==0?"SQ":"HD"))]),e._v(e._s(a.ar?a.ar.map((function(e){return e.name})).join("/"):""))])],1)],1)})),1)],1)],1),e.playInfo.id?n("music-control"):e._e()],1)},i=[]},"910a":function(e,a,t){"use strict";t("7a82");var n=t("4ea4").default;Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,t("d81d");var i=n(t("c7eb")),r=n(t("1da1")),o=t("b202"),c=t("d254"),m=t("26cb"),s={data:function(){return{dayRecommendList:[],bgImg:"",day:(0,c.getDay)(),month:(0,c.getMonth)(),CustomBar:this.CustomBar-15}},computed:(0,m.mapState)({playInfo:function(e){return e.playInfo}}),created:function(){this.getDayRecommendData()},methods:{getDayRecommendData:function(){var e=this;return(0,r.default)((0,i.default)().mark((function a(){var t,n;return(0,i.default)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.$api.getDayRecommendList();case 2:t=a.sent,n=t.data,e.dayRecommendList=n.dailySongs||[],n.dailySongs.length>0&&(e.bgImg=e.dayRecommendList[0].al.picUrl+"param?300y300");case 6:case"end":return a.stop()}}),a)})))()},handlePlayMusic:function(e){this.playInfo.id!=e.id?this.$store.dispatch("playMusic",{src:"",title:e.name,singer:(0,o.getName)(e),coverImgUrl:(0,o.getImage)(e),id:e.id}):uni.navigateTo({url:"../play/index"})},handlePlayAllMusic:function(){var e=this.dayRecommendList.map((function(e){return{src:"",title:e.name,singer:(0,o.getName)(e),coverImgUrl:(0,o.getImage)(e),id:e.id}}));this.$store.dispatch("playAllMUsic",e)}}};a.default=s},a2a4:function(e,a,t){"use strict";var n=t("16cb"),i=t.n(n);i.a},a4c0:function(e,a,t){"use strict";t.r(a);var n=t("910a"),i=t.n(n);for(var r in n)["default"].indexOf(r)<0&&function(e){t.d(a,e,(function(){return n[e]}))}(r);a["default"]=i.a},b202:function(e,a,t){"use strict";t("7a82"),Object.defineProperty(a,"__esModule",{value:!0}),a.debounce=function(e,a,t){var n,i,r,o,c,m=function m(){var s=+new Date-o;s<a&&s>0?n=setTimeout(m,a-s):(n=null,t||(c=e.apply(r,i),n||(r=i=null)))};return function(){for(var i=arguments.length,s=new Array(i),d=0;d<i;d++)s[d]=arguments[d];r=this,o=+new Date;var l=t&&!n;return n||(n=setTimeout(m,a)),l&&(c=e.apply(r,s),r=s=null),c}},a.filterPlayCount=function(e){if(!e||e<=0)return 0;if(e<1e3)return e;if(e>=1e3&&e<1e4)return Math.ceil(e/1e3)+"千";if(e>=1e4&&e<1e8)return Math.ceil(e/1e4)+"万";return Math.ceil(e/1e8)+"亿"},a.getImage=function(e){var a="";e.picUrl?a=e.picUrl:e.album?a=e.album.picUrl:e.al&&(a=e.al.picUrl);return a?a+"?param=300y300":null},a.getName=function(e){if(e.song)return e.song.artists[0].name;if(e.artists)return e.artists[0].name;if(e.ar)return e.ar[0].name}},b8c3:function(e,a,t){"use strict";t.r(a);var n=t("8e46"),i=t("a4c0");for(var r in i)["default"].indexOf(r)<0&&function(e){t.d(a,e,(function(){return i[e]}))}(r);t("a2a4");var o=t("f0c5"),c=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,"233491a1",null,!1,n["a"],void 0);a["default"]=c.exports},d254:function(e,a,t){"use strict";t("7a82"),Object.defineProperty(a,"__esModule",{value:!0}),a.getYear=a.getMonth=a.getDay=void 0;a.getYear=function(){var e=new Date;return e.getFullYear()};a.getMonth=function(e){var a=new Date;return n(a.getMonth()+1)};a.getDay=function(e){var a=new Date;return n(a.getDate())};var n=function(e){return e>9?e:"0".concat(e)}},ea73:function(e,a,t){var n=t("24fb");a=n(!1),a.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.day-recommend-container[data-v-233491a1]{width:100%;height:100%}.day-recommend-container .vague-wrapper[data-v-233491a1]{height:30%;width:100%;position:relative}.day-recommend-container .vague-wrapper .background-img[data-v-233491a1]{width:100%;height:100%}.day-recommend-container .vague-wrapper .absolve-wrapper[data-v-233491a1]{position:absolute;left:0;right:0;bottom:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,.5)}.day-recommend-container .vague-wrapper .head-title[data-v-233491a1]{color:#fff;position:absolute;top:0;width:100%;z-index:9999}.day-recommend-container .vague-wrapper .day-recommend-info[data-v-233491a1]{box-sizing:border-box;height:100%;display:flex;align-items:center;justify-content:center;width:100%}.day-recommend-container .vague-wrapper .day-recommend-info .bgImg[data-v-233491a1]{width:%?200?%;border-radius:8px;margin-right:20px}.day-recommend-container .vague-wrapper .day-recommend-info .day-info[data-v-233491a1]{margin-bottom:%?12?%;color:#fff;max-width:calc(100% - 175px)}.day-recommend-container .vague-wrapper .day-recommend-info .day-info .small-text[data-v-233491a1]{font-size:%?42?%}.day-recommend-container .vague-wrapper .day-recommend-info .day-info .bold-text[data-v-233491a1]{font-size:%?60?%;font-weight:700;margin-right:3px}.day-recommend-container .vague-wrapper .day-recommend-info .day-info .descript[data-v-233491a1]{font-size:%?24?%;color:#e1d7f0;margin-top:%?17?%;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:18px}.day-recommend-container .recommend-main[data-v-233491a1]{height:70%;width:100%;position:relative}.day-recommend-container .recommend-main.hasPlayInfo[data-v-233491a1]{height:calc(70% - %?110?%)}.day-recommend-container .recommend-main .recommend-list[data-v-233491a1]{position:absolute;top:-5%;left:0;right:0;bottom:0;background:#fff;border-top-left-radius:26px;border-top-right-radius:26px}.day-recommend-container .recommend-main .recommend-list .music-title[data-v-233491a1]{padding-left:20px;margin:15px 0;box-sizing:border-box;color:#000;font-size:%?32?%;font-weight:600}.day-recommend-container .recommend-main .recommend-list .music-title .playIcon[data-v-233491a1]{margin-right:8px;font-size:%?40?%}.day-recommend-container .recommend-main .recommend-list .music-title .light-text[data-v-233491a1]{font-size:%?24?%;margin-left:6px;color:rgba(0,0,0,.5)}.day-recommend-container .recommend-main .recommend-list .music-item[data-v-233491a1]{height:70px;box-sizing:border-box;padding:0 20px;align-items:center;margin-bottom:10px;position:relative}.day-recommend-container .recommend-main .recommend-list .music-item[data-v-233491a1]:last-of-type{margin-bottom:0}.day-recommend-container .recommend-main .recommend-list .music-item.active[data-v-233491a1]{background-image:linear-gradient(90deg,rgba(247,73,79,.1),rgba(247,73,79,.05))}.day-recommend-container .recommend-main .recommend-list .music-item.active .music-info .music-name[data-v-233491a1],\r\n.day-recommend-container .recommend-main .recommend-list .music-item.active .music-info .small-icon[data-v-233491a1],\r\n.day-recommend-container .recommend-main .recommend-list .music-item.active .music-info .music-singer[data-v-233491a1]{color:#f84e51!important}.day-recommend-container .recommend-main .recommend-list .music-item.active .music-info[data-v-233491a1]::before{content:"";width:4px;height:65px;background-image:linear-gradient(180deg,#fd7566,#f7494f);position:absolute;left:0;top:3px}.day-recommend-container .recommend-main .recommend-list .music-item .music-img[data-v-233491a1]{width:58px;border-radius:6px}.day-recommend-container .recommend-main .recommend-list .music-item .music-info[data-v-233491a1]{margin-left:15px}.day-recommend-container .recommend-main .recommend-list .music-item .music-info .music-name[data-v-233491a1]{font-size:%?30?%;margin-bottom:7px;color:#000}.day-recommend-container .recommend-main .recommend-list .music-item .music-info .music-singer[data-v-233491a1]{color:rgba(0,0,0,.5);font-size:%?24?%;align-items:center}.day-recommend-container .recommend-main .recommend-list .music-item .music-info .music-singer .small-icon[data-v-233491a1]{margin-right:6px;-webkit-transform:scale(.9);transform:scale(.9);color:rgba(0,0,0,.5);font-size:12px;padding:1px 3px;border:1px solid rgba(0,0,0,.2);border-radius:4px}',""]),e.exports=a}}]);