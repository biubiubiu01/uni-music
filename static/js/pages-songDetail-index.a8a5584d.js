(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-songDetail-index"],{"01da":function(t,i,e){"use strict";var a;e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return r})),e.d(i,"a",(function(){return a}));var n=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",{staticClass:"song-detail-container"},[a("v-uni-view",{staticClass:"vague-wrapper  flex align-center"},[a("v-uni-image",{staticClass:"background-img",attrs:{src:e("516f")}}),a("v-uni-view",{staticClass:"absolve-wrapper"},[a("cu-custom",{staticClass:"head-title",attrs:{isBack:!0,bgColor:"unset"}},[a("template",{attrs:{slot:"content"},slot:"content"},[t._v("歌单详情")])],2),a("v-uni-view",{staticClass:"day-recommend-info",style:{"padding-top":t.CustomBar+"px"}},[a("v-uni-image",{staticClass:"bgImg",attrs:{src:t.bgImg,mode:"widthFix"}}),a("v-uni-view",{staticClass:"song-info"},[a("v-uni-view",{staticClass:"name text-overflow"},[t._v(t._s(t.currentPlayList.name))]),t.currentPlayList.creator?a("v-uni-view",{staticClass:"content"},[a("v-uni-image",{staticClass:"avatar",attrs:{src:t.currentPlayList.creator.avatarUrl+"?param45y45",mode:""}}),t._v(t._s(t.currentPlayList.creator.nickname))],1):t._e(),t.currentPlayList.description?a("v-uni-view",{staticClass:"description"},[t._v("简介："+t._s(t.currentPlayList.description))]):t._e()],1)],1)],1)],1),a("v-uni-view",{staticClass:"recommend-main",class:{hasPlayInfo:t.playInfo.id}},[a("v-uni-view",{staticClass:"recommend-list"},[a("v-uni-view",{staticClass:"music-title",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.handlePlayAllMusic.apply(void 0,arguments)}}},[a("v-uni-text",{staticClass:"iconfont icon-kaishi3 basic-icon-color playIcon"}),t._v("全部播放"),a("v-uni-text",{staticClass:"light-text"},[t._v("(共"+t._s(t.musicList.length)+"首)")])],1),a("v-uni-scroll-view",{staticStyle:{height:"calc(100% - 55px)"},attrs:{"scroll-y":!0,"scroll-with-animation":!0}},t._l(t.musicList,(function(i,e){return a("v-uni-view",{key:i.id,staticClass:"music-item flex",class:{active:i.id==t.playInfo.id},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.handlePlayMusic(i)}}},[a("v-uni-image",{staticClass:"music-img",attrs:{src:i.al.picUrl+"?param=60y60",mode:"widthFix"}}),a("v-uni-view",{staticClass:"music-info"},[a("v-uni-view",{staticClass:"music-name text-overflow"},[t._v(t._s(i.name))]),a("v-uni-view",{staticClass:"music-singer text-overflow flex"},[a("span",{staticClass:"small-icon"},[t._v(t._s(i.id%2==0?"SQ":"HD"))]),t._v(t._s(i.ar?i.ar.map((function(t){return t.name})).join("/"):""))])],1)],1)})),1)],1)],1),t.playInfo.id?a("music-control"):t._e()],1)},r=[]},"0fc5":function(t,i,e){"use strict";e.r(i);var a=e("b2e9"),n=e.n(a);for(var r in a)"default"!==r&&function(t){e.d(i,t,(function(){return a[t]}))}(r);i["default"]=n.a},"31f9":function(t,i,e){"use strict";var a=e("e25a"),n=e.n(a);n.a},"38d1":function(t,i,e){"use strict";e.r(i);var a=e("01da"),n=e("0fc5");for(var r in n)"default"!==r&&function(t){e.d(i,t,(function(){return n[t]}))}(r);e("31f9");var o,c=e("f0c5"),s=Object(c["a"])(n["default"],a["b"],a["c"],!1,null,"3f9a1c4c",null,!1,a["a"],o);i["default"]=s.exports},4557:function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.song-detail-container[data-v-3f9a1c4c]{width:100%;height:100%}.song-detail-container .vague-wrapper[data-v-3f9a1c4c]{height:30%;width:100%;position:relative}.song-detail-container .vague-wrapper .background-img[data-v-3f9a1c4c]{width:100%;height:100%}.song-detail-container .vague-wrapper .absolve-wrapper[data-v-3f9a1c4c]{position:absolute;left:0;right:0;bottom:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,.5)}.song-detail-container .vague-wrapper .head-title[data-v-3f9a1c4c]{color:#fff;position:absolute;top:0;width:100%;z-index:9999}.song-detail-container .vague-wrapper .day-recommend-info[data-v-3f9a1c4c]{-webkit-box-sizing:border-box;box-sizing:border-box;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:100%}.song-detail-container .vague-wrapper .day-recommend-info .bgImg[data-v-3f9a1c4c]{width:%?200?%;-webkit-border-radius:8px;border-radius:8px;margin-right:20px}.song-detail-container .vague-wrapper .day-recommend-info .song-info[data-v-3f9a1c4c]{margin-bottom:%?12?%;color:#fff;max-width:calc(100% - 175px)}.song-detail-container .vague-wrapper .day-recommend-info .song-info .name[data-v-3f9a1c4c]{font-size:%?32?%}.song-detail-container .vague-wrapper .day-recommend-info .song-info .content[data-v-3f9a1c4c]{margin:%?15?% 0;color:#fff}.song-detail-container .vague-wrapper .day-recommend-info .song-info .content .avatar[data-v-3f9a1c4c]{width:25px;height:25px;-webkit-border-radius:50%;border-radius:50%;display:inline-block;vertical-align:middle;margin-right:6px}.song-detail-container .vague-wrapper .day-recommend-info .song-info .description[data-v-3f9a1c4c]{font-size:%?24?%;color:#e1d7f0;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:18px}.song-detail-container .recommend-main[data-v-3f9a1c4c]{height:70%;width:100%;position:relative}.song-detail-container .recommend-main.hasPlayInfo[data-v-3f9a1c4c]{height:calc(70% - %?110?%)}.song-detail-container .recommend-main .recommend-list[data-v-3f9a1c4c]{position:absolute;top:-5%;left:0;right:0;bottom:0;background:#fff;-webkit-border-top-left-radius:26px;border-top-left-radius:26px;-webkit-border-top-right-radius:26px;border-top-right-radius:26px}.song-detail-container .recommend-main .recommend-list .music-title[data-v-3f9a1c4c]{padding-left:20px;margin:15px 0;-webkit-box-sizing:border-box;box-sizing:border-box;color:#000;font-size:%?32?%;font-weight:600}.song-detail-container .recommend-main .recommend-list .music-title .playIcon[data-v-3f9a1c4c]{margin-right:8px;font-size:%?40?%}.song-detail-container .recommend-main .recommend-list .music-title .light-text[data-v-3f9a1c4c]{font-size:%?24?%;margin-left:6px;color:rgba(0,0,0,.5)}.song-detail-container .recommend-main .recommend-list .music-item[data-v-3f9a1c4c]{height:70px;-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 20px;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-bottom:10px;width:100%}.song-detail-container .recommend-main .recommend-list .music-item[data-v-3f9a1c4c]:last-of-type{margin-bottom:0}.song-detail-container .recommend-main .recommend-list .music-item.active[data-v-3f9a1c4c]{background-image:-webkit-gradient(linear,left top,right top,from(rgba(247,73,79,.1)),to(rgba(247,73,79,.05)));background-image:-webkit-linear-gradient(left,rgba(247,73,79,.1),rgba(247,73,79,.05));background-image:linear-gradient(90deg,rgba(247,73,79,.1),rgba(247,73,79,.05))}.song-detail-container .recommend-main .recommend-list .music-item.active .music-info .music-name[data-v-3f9a1c4c],\r\n.song-detail-container .recommend-main .recommend-list .music-item.active .music-info .small-icon[data-v-3f9a1c4c],\r\n.song-detail-container .recommend-main .recommend-list .music-item.active .music-info .music-singer[data-v-3f9a1c4c]{color:#f84e51!important}.song-detail-container .recommend-main .recommend-list .music-item.active .music-info[data-v-3f9a1c4c]::before{content:"";width:4px;height:65px;background-image:-webkit-gradient(linear,left top,left bottom,from(#fd7566),to(#f7494f));background-image:-webkit-linear-gradient(top,#fd7566,#f7494f);background-image:linear-gradient(180deg,#fd7566,#f7494f);position:absolute;left:0;top:3px}.song-detail-container .recommend-main .recommend-list .music-item .music-img[data-v-3f9a1c4c]{width:58px;-webkit-border-radius:6px;border-radius:6px}.song-detail-container .recommend-main .recommend-list .music-item .music-info[data-v-3f9a1c4c]{margin-left:15px;max-width:calc(100% - 75px)}.song-detail-container .recommend-main .recommend-list .music-item .music-info .music-name[data-v-3f9a1c4c]{font-size:%?30?%;margin-bottom:7px;color:#000}.song-detail-container .recommend-main .recommend-list .music-item .music-info .music-singer[data-v-3f9a1c4c]{color:rgba(0,0,0,.5);font-size:%?24?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.song-detail-container .recommend-main .recommend-list .music-item .music-info .music-singer .small-icon[data-v-3f9a1c4c]{margin-right:6px;-webkit-transform:scale(.9);transform:scale(.9);color:rgba(0,0,0,.5);font-size:12px;padding:1px 3px;border:1px solid rgba(0,0,0,.2);-webkit-border-radius:4px;border-radius:4px}',""]),t.exports=i},"516f":function(t,i,e){t.exports=e.p+"static/img/background.01d212c7.png"},b2e9:function(t,i,e){"use strict";var a=e("4ea4");e("a15b"),e("d81d"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,e("96cf");var n=a(e("1da1")),r=e("df46"),o=e("2f62"),c={data:function(){return{currentPlayList:{},musicList:[],bgImg:"",CustomBar:this.CustomBar-15}},onLoad:function(t){this.getPlayDetail(t.id)},computed:(0,o.mapState)({playInfo:function(t){return t.playInfo}}),methods:{getPlayDetail:function(t){var i=this;return(0,n.default)(regeneratorRuntime.mark((function e(){var a,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({title:"加载中..."}),e.next=3,i.$api.getPlayListData({id:t});case 3:return a=e.sent,i.currentPlayList=a.playlist||[],i.bgImg=i.currentPlayList.coverImgUrl+"param?300y300",n=a.playlist.trackIds.map((function(t){return t.id})).join(","),e.next=9,i.$api.getPlayDetail({ids:n});case 9:r=e.sent,i.musicList=r.songs||[],uni.hideLoading();case 12:case"end":return e.stop()}}),e)})))()},handlePlayMusic:function(t){this.playInfo.id!=t.id?this.$store.dispatch("playMusic",{src:"",title:t.name,singer:(0,r.getName)(t),coverImgUrl:(0,r.getImage)(t),id:t.id}):uni.navigateTo({url:"../play/index"})},handlePlayAllMusic:function(){var t=this.musicList.map((function(t){return{src:"",title:t.name,singer:(0,r.getName)(t),coverImgUrl:(0,r.getImage)(t),id:t.id}}));this.$store.dispatch("playAllMUsic",t)}}};i.default=c},df46:function(t,i,e){"use strict";function a(t,i,e){var a,n,r,o,c,s=function s(){var l=+new Date-o;l<i&&l>0?a=setTimeout(s,i-l):(a=null,e||(c=t.apply(r,n),a||(r=n=null)))};return function(){for(var n=arguments.length,l=new Array(n),d=0;d<n;d++)l[d]=arguments[d];r=this,o=+new Date;var m=e&&!a;return a||(a=setTimeout(s,i)),m&&(c=t.apply(r,l),r=l=null),c}}function n(t){return!t||t<=0?0:t<1e3?t:t>=1e3&&t<1e4?Math.ceil(t/1e3)+"千":t>=1e4&&t<1e8?Math.ceil(t/1e4)+"万":Math.ceil(t/1e8)+"亿"}function r(t){var i="";return t.picUrl?i=t.picUrl:t.album?i=t.album.picUrl:t.al&&(i=t.al.picUrl),i?i+"?param=300y300":null}function o(t){return t.song?t.song.artists[0].name:t.artists?t.artists[0].name:t.ar?t.ar[0].name:void 0}Object.defineProperty(i,"__esModule",{value:!0}),i.debounce=a,i.filterPlayCount=n,i.getImage=r,i.getName=o},e25a:function(t,i,e){var a=e("4557");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("44b06362",a,!0,{sourceMap:!1,shadowMode:!1})}}]);