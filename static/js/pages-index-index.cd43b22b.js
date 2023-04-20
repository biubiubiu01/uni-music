(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"0573":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-scroll-view",{staticClass:"music-list-wrapper"},[i("v-uni-swiper",{staticClass:"swiper-list",attrs:{"next-margin":"30px"}},t._l(t.songList,(function(e,n){return i("v-uni-swiper-item",{key:n,staticClass:"music-swiper-item"},t._l(e,(function(e,n){return i("v-uni-view",{key:e.id,staticClass:"song-item flex align-center",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.addPlayed(e)}}},[i("v-uni-image",{staticClass:"music-song-item-image",attrs:{src:t.getImgUrl(e),mode:"scaleToFill"}}),i("v-uni-view",{staticClass:"music-text",class:{active:e.id==t.playInfo.id}},[i("v-uni-text",{staticClass:"music-song-item-name"},[t._v(t._s(e.name))]),i("v-uni-text",{staticClass:"music-song-item-author"},[t._v("- "+t._s(t.getAuthor(e)))])],1),i("v-uni-text",{staticClass:"iconfont startIcon",class:t.paused||t.playInfo.id!=e.id?"icon-kaishi3":"icon-stop"})],1)})),1)})),1)],1)},a=[]},"0997":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.music-list-wrapper[data-v-1b746d33]{width:100%;white-space:nowrap}.music-list-wrapper .singer-list-item[data-v-1b746d33]{width:20%;margin:0 6px;display:inline-block;overflow:hidden;position:relative;border-radius:7px;text-align:center}.music-list-wrapper .singer-list-item .music-singer-item-image[data-v-1b746d33]{width:70px;height:70px;border-radius:50%}.music-list-wrapper .singer-list-item .music-singer-item-text[data-v-1b746d33]{font-size:14px;color:#000;margin-top:3px}',""]),t.exports=e},"1a9a":function(t,e,i){var n=i("4682");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("38001ede",n,!0,{sourceMap:!1,shadowMode:!1})},"22c0":function(t,e,i){"use strict";var n=i("d525"),a=i.n(n);a.a},2948:function(t,e,i){"use strict";i.r(e);var n=i("f371"),a=i("8ebb");for(var r in a)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("22c0");var s=i("f0c5"),c=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"1b746d33",null,!1,n["a"],void 0);e["default"]=c.exports},"340b":function(t,e,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("14d9"),i("fb6a");var a=n(i("c7eb")),r=n(i("1da1")),s=n(i("5530")),c=i("b202"),o=i("26cb"),u={props:{currentList:{type:Array}},data:function(){return{}},computed:(0,s.default)({songList:function(){for(var t=[],e=0;e<this.currentList.length;e+=3){var i=e+3;i>this.currentList.length&&(i=this.currentList.length),t.push(this.currentList.slice(e,i))}return t}},(0,o.mapState)({playInfo:function(t){return t.playInfo},paused:function(t){return t.paused}})),methods:{getImgUrl:function(t){return(0,c.getImage)(t)},getAuthor:function(t){return(0,c.getName)(t)},addPlayed:function(t){var e=this;return(0,r.default)((0,a.default)().mark((function i(){return(0,a.default)().wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(e.playInfo.id!=t.id){i.next=3;break}return uni.navigateTo({url:"../play/index"}),i.abrupt("return");case 3:e.$store.dispatch("playMusic",{src:"",title:t.name,singer:e.getAuthor(t),coverImgUrl:e.getImgUrl(t),id:t.id});case 4:case"end":return i.stop()}}),i)})))()}}};e.default=u},3607:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-scroll-view",{staticClass:"music-list-wrapper",attrs:{"scroll-x":!0,"scroll-with-animation":!0}},t._l(t.currentList,(function(e){return i("v-uni-view",{key:e.id,staticClass:"list-item"},[e.playCount>0||e.playcount>0?i("v-uni-view",{staticClass:"hotCount"},[i("v-uni-text",{staticClass:"iconfont icon-kaishi",staticStyle:{"margin-right":"3.5px"}}),i("v-uni-text",[t._v(t._s(t.playCount(e.playCount||e.playcount)))])],1):t._e(),i("v-uni-view",{staticClass:"bg-img flex align-end list-item-image",style:"background-image:url("+(e.picUrl||e.coverImgUrl)+"?param=230y230)",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toPlayListDetail(e)}}},[t.type?i("v-uni-view",{staticClass:"bg-shadeBottom padding-top-xl radioName"},[t._v(t._s(e.name))]):t._e()],1),i("v-uni-view",{staticClass:"list-item-text"},[t._v(t._s(t.type?e.rcmdtext:e.name))])],1)})),1)},a=[]},"37c0":function(t,e,i){"use strict";i.r(e);var n=i("ea15"),a=i("a7c4");for(var r in a)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("54ab");var s=i("f0c5"),c=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"5de9530e",null,!1,n["a"],void 0);e["default"]=c.exports},3959:function(t,e,i){"use strict";i.r(e);var n=i("3607"),a=i("dc3a");for(var r in a)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("aaf0");var s=i("f0c5"),c=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"47382f72",null,!1,n["a"],void 0);e["default"]=c.exports},"3a72":function(t,e,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("c7eb")),r=n(i("1da1"));i("d81d"),i("fb6a");var s=n(i("3959")),c=n(i("8b02")),o=n(i("2948")),u=i("b202"),l={data:function(){return{swiperList:[],recommendList:[],dayRecommendList:[],dayRecommendMusicList:[],newSongList:[],hotSingerList:[],selectData:[],listOption:[{name:"每日推荐",ico:"xihuan",url:"../dayRecommend/index"},{name:"推荐歌单",ico:"remen",url:"../songList/index"},{name:"排行榜",ico:"paihang",url:"../rankList/index"},{name:"热门歌手",ico:"maikefeng",url:"../singer/index"}]}},components:{songList:s.default,musicList:c.default,singerList:o.default},computed:{cookie:function(){return this.$store.state.cookie},height:function(){var t=this.CustomBar/(uni.upx2px(this.CustomBar)/this.CustomBar)+220;return"calc(100%  - ".concat(t,"rpx)")}},onShow:function(){this.getDayRecommendData(),this.getDayRecommendMusicData()},created:function(){this.getData()},onPullDownRefresh:function(){this.getData(),setTimeout((function(){uni.stopPullDownRefresh()}),1e3)},methods:{getData:function(){this.getBannerData(),this.getRecommendData(),this.getNewSongData(),this.getSelectionData(),this.getHotSingerData()},handlePlay:function(t){var e=this[t].map((function(t){return{src:"",title:t.name,singer:(0,u.getName)(t),coverImgUrl:(0,u.getImage)(t),id:t.id}}));this.$store.dispatch("playAllMUsic",e)},handleNative:function(t){uni.navigateTo({url:t})},getBannerData:function(){var t=this;return(0,r.default)((0,a.default)().mark((function e(){var i;return(0,a.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.getBanner();case 2:i=e.sent,t.swiperList=i.banners||[];case 4:case"end":return e.stop()}}),e)})))()},getRecommendData:function(){var t=this;return(0,r.default)((0,a.default)().mark((function e(){var i;return(0,a.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.getRecommendList();case 2:i=e.sent,t.recommendList=i.result.slice(0,8);case 4:case"end":return e.stop()}}),e)})))()},getDayRecommendData:function(){var t=this;return(0,r.default)((0,a.default)().mark((function e(){var i,n;return(0,a.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.getDayRecommendList();case 2:i=e.sent,n=i.data,t.dayRecommendList=n.dailySongs;case 5:case"end":return e.stop()}}),e)})))()},getDayRecommendMusicData:function(){var t=this;return(0,r.default)((0,a.default)().mark((function e(){var i;return(0,a.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.getDayRecommendMusicList();case 2:i=e.sent,t.dayRecommendMusicList=i.recommend||[];case 4:case"end":return e.stop()}}),e)})))()},getNewSongData:function(){var t=this;return(0,r.default)((0,a.default)().mark((function e(){var i;return(0,a.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.getNewSongList();case 2:i=e.sent,t.newSongList=i.result.slice(0,9);case 4:case"end":return e.stop()}}),e)})))()},getSelectionData:function(){var t=this;return(0,r.default)((0,a.default)().mark((function e(){var i;return(0,a.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.getSelectionData();case 2:i=e.sent,t.selectData=i.playlists||[];case 4:case"end":return e.stop()}}),e)})))()},getHotSingerData:function(){var t=this;return(0,r.default)((0,a.default)().mark((function e(){var i;return(0,a.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.getHotSingerList();case 2:i=e.sent,t.hotSingerList=(i.artists||[]).slice(0,10);case 4:case"end":return e.stop()}}),e)})))()},toSearch:function(){uni.navigateTo({url:"../search/index"})}}};e.default=l},"3e29":function(t,e,i){var n=i("94a6");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("1c06ca3c",n,!0,{sourceMap:!1,shadowMode:!1})},4682:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.music-list-wrapper[data-v-47382f72]{white-space:nowrap;margin-top:10px}.music-list-wrapper .list-item[data-v-47382f72]{width:27.5%;margin:0 6px;display:inline-block;overflow:hidden;position:relative}.music-list-wrapper .list-item .hotCount[data-v-47382f72]{position:absolute;width:100%;height:40px;padding:3px 6px 0 0;text-align:right;color:#fff;z-index:10;font-size:12px;background-image:linear-gradient(rgba(0,0,0,.45),transparent);border-radius:6px}.music-list-wrapper .list-item .list-item-image[data-v-47382f72]{height:115px;border-radius:6px}.music-list-wrapper .list-item .list-item-text[data-v-47382f72]{height:36px;width:100%;padding-top:4px;white-space:normal;color:rgba(0,0,0,.5);font-size:12px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}.music-list-wrapper .list-item .radioName[data-v-47382f72]{width:100%;color:#fff;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 0 8px 8px}',""]),t.exports=e},"54ab":function(t,e,i){"use strict";var n=i("c5e3"),a=i.n(n);a.a},"54cb":function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i("b202"),a={props:{currentList:{type:Array},type:{type:String,default:""}},methods:{playCount:function(t){return(0,n.filterPlayCount)(t)},toPlayListDetail:function(t){uni.navigateTo({url:"../songDetail/index?id="+t.id})}}};e.default=a},"8b02":function(t,e,i){"use strict";i.r(e);var n=i("0573"),a=i("dad3");for(var r in a)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("cc74");var s=i("f0c5"),c=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"71bfb778",null,!1,n["a"],void 0);e["default"]=c.exports},"8ebb":function(t,e,i){"use strict";i.r(e);var n=i("9295"),a=i.n(n);for(var r in n)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},9295:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{currentList:{type:Array}},methods:{searchDetailSinger:function(t){uni.navigateTo({url:"../singerPlayList/index?id="+t})}}};e.default=n},"94a6":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.music-list-wrapper[data-v-71bfb778]{margin-top:6px;width:100%}.music-list-wrapper .swiper-list[data-v-71bfb778]{margin-top:4px;height:190px}.music-list-wrapper .swiper-list .music-swiper-item[data-v-71bfb778]{padding-left:5px;box-sizing:border-box}.music-list-wrapper .swiper-list .music-swiper-item .song-item[data-v-71bfb778]{width:100%}.music-list-wrapper .swiper-list .music-swiper-item .song-item .music-song-item-image[data-v-71bfb778]{width:53px;height:53px;border-radius:7px;margin:7px 10px 0 0}.music-list-wrapper .swiper-list .music-swiper-item .song-item .music-text[data-v-71bfb778]{width:calc(100% - 120px);display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.music-list-wrapper .swiper-list .music-swiper-item .song-item .music-text.active .music-song-item-name[data-v-71bfb778]{color:#f84e51}.music-list-wrapper .swiper-list .music-swiper-item .song-item .music-text.active .music-song-item-author[data-v-71bfb778]{color:#f84e51}.music-list-wrapper .swiper-list .music-swiper-item .song-item .music-text .music-song-item-name[data-v-71bfb778]{color:#000;font-size:%?30?%;margin-right:5px}.music-list-wrapper .swiper-list .music-swiper-item .song-item .music-text .music-song-item-author[data-v-71bfb778]{font-size:12px;color:rgba(0,0,0,.5)}.music-list-wrapper .swiper-list .music-swiper-item .song-item .startIcon[data-v-71bfb778]{margin-left:15px;font-size:%?40?%;color:#f84e51}',""]),t.exports=e},a7c4:function(t,e,i){"use strict";i.r(e);var n=i("3a72"),a=i.n(n);for(var r in n)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},aaf0:function(t,e,i){"use strict";var n=i("1a9a"),a=i.n(n);a.a},b202:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.debounce=function(t,e,i){var n,a,r,s,c,o=function o(){var u=+new Date-s;u<e&&u>0?n=setTimeout(o,e-u):(n=null,i||(c=t.apply(r,a),n||(r=a=null)))};return function(){for(var a=arguments.length,u=new Array(a),l=0;l<a;l++)u[l]=arguments[l];r=this,s=+new Date;var d=i&&!n;return n||(n=setTimeout(o,e)),d&&(c=t.apply(r,u),r=u=null),c}},e.filterPlayCount=function(t){if(!t||t<=0)return 0;if(t<1e3)return t;if(t>=1e3&&t<1e4)return Math.ceil(t/1e3)+"千";if(t>=1e4&&t<1e8)return Math.ceil(t/1e4)+"万";return Math.ceil(t/1e8)+"亿"},e.getImage=function(t){var e="";t.picUrl?e=t.picUrl:t.album?e=t.album.picUrl:t.al&&(e=t.al.picUrl);return e?e+"?param=300y300":null},e.getName=function(t){if(t.song)return t.song.artists[0].name;if(t.artists)return t.artists[0].name;if(t.ar)return t.ar[0].name}},c5e3:function(t,e,i){var n=i("db3f");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("0fca015d",n,!0,{sourceMap:!1,shadowMode:!1})},cc74:function(t,e,i){"use strict";var n=i("3e29"),a=i.n(n);a.a},d525:function(t,e,i){var n=i("0997");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("59e4397a",n,!0,{sourceMap:!1,shadowMode:!1})},dad3:function(t,e,i){"use strict";i.r(e);var n=i("340b"),a=i.n(n);for(var r in n)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},db3f:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.recommend-container[data-v-5de9530e]{position:relative;height:100%}.recommend-container .main-container[data-v-5de9530e]{position:relative}.recommend-container .main-container .banner-wrapper[data-v-5de9530e]{box-sizing:border-box;padding:10px}.recommend-container .main-container .banner-wrapper .banner-img[data-v-5de9530e]{height:158px;border-radius:6px}.recommend-container .main-container .list-wrapper[data-v-5de9530e]{margin-top:8px;padding-bottom:12px}.recommend-container .main-container .list-wrapper .list-item[data-v-5de9530e]{text-align:center;font-size:%?24?%}.recommend-container .main-container .list-wrapper .list-ico[data-v-5de9530e]{font-size:%?72?%;margin-bottom:6px}.recommend-container .main-container .list-wrapper .list-title[data-v-5de9530e]{font-size:%?28?%}.recommend-container .main-container .music-wrapper[data-v-5de9530e]{margin-top:5px;background:#fff;box-sizing:border-box;padding:10px}.recommend-container .main-container .music-wrapper[data-v-5de9530e]:last-of-type{margin-bottom:0}',""]),t.exports=e},dc3a:function(t,e,i){"use strict";i.r(e);var n=i("54cb"),a=i.n(n);for(var r in n)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},ea15:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"recommend-container page-background"},[i("v-uni-view",{staticClass:"bg-white"},[i("cu-custom",{attrs:{bgColor:"#fff"}},[i("v-uni-view",{staticStyle:{color:"#000"},attrs:{slot:"content"},slot:"content"},[t._v("Homic 音乐")])],1),i("v-uni-view",{staticClass:"cu-bar search"},[i("v-uni-view",{staticClass:"search-form round"},[i("v-uni-text",{staticClass:"cuIcon-search"}),i("v-uni-input",{attrs:{type:"text",placeholder:"搜索音乐 / 歌词","confirm-type":"search"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toSearch.apply(void 0,arguments)}}})],1)],1)],1),i("v-uni-scroll-view",{staticClass:"main-container",style:{height:t.height},attrs:{"scroll-y":!0}},[i("v-uni-view",{staticClass:"bg-white"},[i("v-uni-view",{staticClass:"banner-wrapper"},[i("v-uni-swiper",{staticClass:"screen-swiper square-dot",staticStyle:{"min-height":"317upx"},attrs:{"indicator-dots":!0,circular:!0,autoplay:!0,interval:"5000",duration:"500"}},t._l(t.swiperList,(function(t){return i("v-uni-swiper-item",{key:t.bannerId},[i("v-uni-image",{staticClass:"banner-img",attrs:{src:t.pic||t.imageUrl,mode:"scaleToFill"}})],1)})),1)],1),i("v-uni-view",{staticClass:"list-wrapper flex"},t._l(t.listOption,(function(e,n){return i("v-uni-view",{key:e.ico,staticClass:"cu-item flex-sub list-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.handleNative(e.url)}}},[i("v-uni-view",{class:"iconfont list-ico basic-icon-color icon-"+e.ico}),i("v-uni-text",{staticClass:"list-title basic-weight-color"},[t._v(t._s(e.name))])],1)})),1)],1),t.dayRecommendList.length>0?i("v-uni-view",{staticClass:"music-wrapper"},[i("box-title",{attrs:{title:"猜你喜欢",buttonName:"播放全部",iconName:"kaishi2"},on:{handlePlay:function(e){arguments[0]=e=t.$handleEvent(e),t.handlePlay("dayRecommendList")}}}),i("music-list",{attrs:{currentList:t.dayRecommendList}})],1):t._e(),t.dayRecommendMusicList.length>0?i("v-uni-view",{staticClass:"music-wrapper"},[i("box-title",{attrs:{title:"智能生成歌单",buttonName:"查看更多",iconName:"right"},on:{handlePlay:function(e){arguments[0]=e=t.$handleEvent(e),t.handleNative("../songList/index")}}}),i("song-list",{attrs:{currentList:t.dayRecommendMusicList}})],1):t._e(),t.recommendList.length>0?i("v-uni-view",{staticClass:"music-wrapper"},[i("box-title",{attrs:{title:"热门歌单",buttonName:"查看更多",iconName:"right"},on:{handlePlay:function(e){arguments[0]=e=t.$handleEvent(e),t.handleNative("../songList/index")}}}),i("song-list",{attrs:{currentList:t.recommendList}})],1):t._e(),t.hotSingerList.length>0?i("v-uni-view",{staticClass:"music-wrapper"},[i("box-title",{attrs:{title:"热门歌手",buttonName:"查看更多",iconName:"kaishi2",right:!0},on:{handlePlay:function(e){arguments[0]=e=t.$handleEvent(e),t.handleNative("../singer/index")}}}),i("singer-list",{attrs:{currentList:t.hotSingerList}})],1):t._e(),t.newSongList.length>0?i("v-uni-view",{staticClass:"music-wrapper"},[i("box-title",{attrs:{title:"新歌速递",buttonName:"播放全部",iconName:"kaishi2"},on:{handlePlay:function(e){arguments[0]=e=t.$handleEvent(e),t.handlePlay("newSongList")}}}),i("music-list",{attrs:{currentList:t.newSongList}})],1):t._e(),t.selectData.length>0?i("v-uni-view",{staticClass:"music-wrapper"},[i("box-title",{attrs:{title:"网友精选歌单",buttonName:"查看更多",iconName:"right"},on:{handlePlay:function(e){arguments[0]=e=t.$handleEvent(e),t.handleNative("../songList/index")}}}),i("song-list",{attrs:{currentList:t.selectData}})],1):t._e()],1),i("tab-bar",{attrs:{currentPage:"home"}})],1)},a=[]},f371:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"flex flex-direction",staticStyle:{"margin-top":"10px"}},[i("v-uni-scroll-view",{staticClass:"music-list-wrapper",attrs:{"scroll-x":!0,"scroll-with-animation":!0}},t._l(t.currentList,(function(e){return i("v-uni-view",{key:e.id,staticClass:"singer-list-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.searchDetailSinger(e.id)}}},[i("v-uni-image",{staticClass:"music-singer-item-image",attrs:{src:e.picUrl+"?param=100y100",mode:"scaleToFill"}}),i("v-uni-view",{staticClass:"music-singer-item-text"},[t._v(t._s(e.name))])],1)})),1)],1)},a=[]}}]);