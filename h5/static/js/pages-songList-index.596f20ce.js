(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-songList-index"],{"131c":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.playList-container[data-v-7507de90]{width:100%;height:100%}.playList-container .tower-swiper[data-v-7507de90]{height:%?400?%!important;overflow:unset}.playList-container .tower-swiper .tower-item[data-v-7507de90]{width:%?330?%;-webkit-transform:scale(calc(.5 + var(--index) / 10));transform:scale(calc(.5 + var(--index) / 10));margin-left:calc(var(--left) * %?100?% - %?150?%);z-index:var(--index)}.playList-container .tower-swiper .tower-item .swiper-item .swiper-item-img[data-v-7507de90]{-webkit-border-radius:6px;border-radius:6px}.playList-container .tower-swiper .tower-item .swiper-item .title[data-v-7507de90]{text-align:center;margin-top:10px;position:absolute;color:rgba(0,0,0,.5);font-size:14px}.playList-container .musicList[data-v-7507de90]{padding-left:15px;width:100%;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;margin-top:15px}.playList-container .musicList .list-item[data-v-7507de90]{width:calc(100% / 3 - 15px);margin-right:15px;margin-bottom:7px;display:inline-block;overflow:hidden;position:relative}.playList-container .musicList .list-item .hotCount[data-v-7507de90]{position:absolute;width:100%;height:50px;padding:3px 6px 0 0;text-align:right;color:#fff;z-index:10;font-size:12px;background-image:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.45)),to(transparent));background-image:-webkit-linear-gradient(rgba(0,0,0,.45),transparent);background-image:linear-gradient(rgba(0,0,0,.45),transparent);-webkit-border-radius:6px;border-radius:6px}.playList-container .musicList .list-item .list-item-image[data-v-7507de90]{height:115px;-webkit-border-radius:6px;border-radius:6px}.playList-container .musicList .list-item .list-item-text[data-v-7507de90]{height:35px;width:100%;padding-top:2px;white-space:normal;color:rgba(0,0,0,.5);font-size:12px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}.playList-container .musicList .list-item .radioName[data-v-7507de90]{width:100%;color:#fff;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 0 8px 8px}',""]),t.exports=e},"39d7":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"playList-container"},[i("cu-custom",{attrs:{bgColor:"#fff",isBack:!0}},[i("v-uni-view",{staticStyle:{color:"#000"},attrs:{slot:"content"},slot:"content"},[t._v("歌单")])],1),i("v-uni-scroll-view",{staticClass:"bg-white nav",attrs:{"scroll-x":!0,"scroll-with-animation":!0,"scroll-left":t.scrollLeft}},t._l(t.tagList,(function(e,n){return i("v-uni-view",{key:n,staticClass:"cu-item",class:e.name==t.currentName?"basic-icon-color cur":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.tabSelect(e,n)}}},[t._v(t._s(e.name))])})),1),i("v-uni-scroll-view",{style:{height:t.height,"margin-top":"20rpx"},attrs:{"scroll-y":!0,"scroll-with-animation":!0},on:{scrolltolower:function(e){arguments[0]=e=t.$handleEvent(e),t.reachBottom()}}},[i("box-title",{staticStyle:{"margin-top":"10px"},attrs:{title:"热门歌单"}}),i("v-uni-view",{staticClass:"tower-swiper",on:{touchmove:function(e){arguments[0]=e=t.$handleEvent(e),t.TowerMove.apply(void 0,arguments)},touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.TowerStart.apply(void 0,arguments)},touchend:function(e){arguments[0]=e=t.$handleEvent(e),t.TowerEnd.apply(void 0,arguments)}}},t._l(t.swiperList,(function(e,n){return i("v-uni-view",{key:n,staticClass:"tower-item",class:1==e.zIndex?"none":"",style:[{"--index":e.zIndex,"--left":e.mLeft}],attrs:{"data-direction":t.direction},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toPlayListDetail(e)}}},[i("v-uni-view",{staticClass:"swiper-item"},[i("v-uni-image",{staticClass:"swiper-item-img",attrs:{src:e.coverImgUrl+"?param=200y200",mode:"aspectFill"}}),0==e.mLeft?i("v-uni-view",{staticClass:"title"},[t._v(t._s(e.name))]):t._e()],1)],1)})),1),i("box-title",{staticStyle:{"margin-top":"30px"},attrs:{title:"歌单列表"}}),i("div",{staticClass:"musicList"},[t._l(t.recommendList,(function(e){return i("v-uni-view",{key:e.id,staticClass:"list-item"},[e.playCount>0||e.playcount>0?i("v-uni-view",{staticClass:"hotCount"},[i("v-uni-text",{staticClass:"iconfont icon-kaishi",staticStyle:{"margin-right":"3.5px"}}),i("v-uni-text",[t._v(t._s(t.playCount(e.playCount||e.playcount)))])],1):t._e(),i("v-uni-view",{staticClass:"bg-img flex align-end list-item-image",style:"background-image:url("+e.coverImgUrl+"?param=230y230)",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toPlayListDetail(e)}}},[i("v-uni-view",{staticClass:"bg-shadeBottom padding-top-xl radioName"},[t._v(t._s(e.name))])],1),i("v-uni-view",{staticClass:"list-item-text"},[t._v(t._s(e.name))])],1)})),"loading"==t.status||"notMore"==t.status?i("v-uni-view",{staticClass:"loading"},[t._v(t._s("notMore"==t.status?"没有更多了":"努力加载中..."))]):t._e()],2)],1),t.playInfo.id?i("music-control"):t._e()],1)},s=[]},"44ef":function(t,e,i){"use strict";i.r(e);var n=i("636c"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},"50e7":function(t,e,i){"use strict";var n=i("5378"),a=i.n(n);a.a},5378:function(t,e,i){var n=i("131c");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("6f5e5cae",n,!0,{sourceMap:!1,shadowMode:!1})},"636c":function(t,e,i){"use strict";var n=i("4ea4");i("99af"),i("4160"),i("fb6a"),i("e25e"),i("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("2909"));i("96cf");var s=n(i("1da1")),r=i("df46"),o={data:function(){return{recommendList:[],direction:"",swiperList:[],currentName:"全部",scrollLeft:0,tagList:[],status:null,total:0,offset:0}},created:function(){this.getSongTagList(),this.getRecommendData()},computed:{height:function(){var t=this.CustomBar/(uni.upx2px(this.CustomBar)/this.CustomBar);return this.playInfo.id&&(t+=110),"calc(100%  - ".concat(t,"rpx)")},playInfo:function(){return this.$store.state.playInfo}},methods:{getSongTagList:function(){var t=this;return(0,s.default)(regeneratorRuntime.mark((function e(){var i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.getSongTagList();case 2:i=e.sent,n=i.sub||[],n.length>0&&(n=n.slice(0,10)),t.tagList=[{name:"全部"}].concat((0,a.default)(n));case 6:case"end":return e.stop()}}),e)})))()},reachBottom:function(){this.status="loading",this.offset>=this.total?this.status="notMore":(this.offset+=30,this.offset>this.total&&(this.offset=this.total),this.getRecommendData(!0))},getRecommendData:function(t){var e=this;return(0,s.default)(regeneratorRuntime.mark((function i(){var n,s,r,o,l,c;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return n=e.currentName,s=e.offset,i.next=4,e.$api.getSongList({cat:n,offset:s,limit:30,order:"hot"});case 4:r=i.sent,e.total=r.total||0,o=r.playlists||[],t?((l=e.recommendList).push.apply(l,(0,a.default)(o)),e.status=null):(c=o.slice(0,6),c.forEach((function(t,e){t.zIndex=parseInt(c.length/2)+1-Math.abs(e-parseInt(c.length/2)),t.mLeft=e-parseInt(c.length/2)})),e.swiperList=c,e.recommendList=o.slice(6));case 8:case"end":return i.stop()}}),i)})))()},playCount:function(t){return(0,r.filterPlayCount)(t)},tabSelect:function(t,e){this.currentName=t.name,this.scrollLeft=60*(e-1),this.offset=0,this.total=0,this.swiperList=[],this.recommendList=[],this.getRecommendData()},TowerStart:function(t){this.towerStart=t.touches[0].pageX},TowerMove:function(t){this.direction=t.touches[0].pageX-this.towerStart>0?"right":"left"},TowerEnd:function(t){var e=this.direction,i=this.swiperList;if("right"==e){for(var n=i[0].mLeft,a=i[0].zIndex,s=1;s<this.swiperList.length;s++)this.swiperList[s-1].mLeft=this.swiperList[s].mLeft,this.swiperList[s-1].zIndex=this.swiperList[s].zIndex;this.swiperList[i.length-1].mLeft=n,this.swiperList[i.length-1].zIndex=a}else{for(var r=i[i.length-1].mLeft,o=i[i.length-1].zIndex,l=this.swiperList.length-1;l>0;l--)this.swiperList[l].mLeft=this.swiperList[l-1].mLeft,this.swiperList[l].zIndex=this.swiperList[l-1].zIndex;this.swiperList[0].mLeft=r,this.swiperList[0].zIndex=o}this.direction="",this.swiperList=this.swiperList},toPlayListDetail:function(t){uni.navigateTo({url:"../songDetail/index?id="+t.id})}}};e.default=o},a0c0:function(t,e,i){"use strict";i.r(e);var n=i("39d7"),a=i("44ef");for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("50e7");var r,o=i("f0c5"),l=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"7507de90",null,!1,n["a"],r);e["default"]=l.exports},df46:function(t,e,i){"use strict";function n(t,e,i){var n,a,s,r,o,l=function l(){var c=+new Date-r;c<e&&c>0?n=setTimeout(l,e-c):(n=null,i||(o=t.apply(s,a),n||(s=a=null)))};return function(){for(var a=arguments.length,c=new Array(a),u=0;u<a;u++)c[u]=arguments[u];s=this,r=+new Date;var d=i&&!n;return n||(n=setTimeout(l,e)),d&&(o=t.apply(s,c),s=c=null),o}}function a(t){return!t||t<=0?0:t<1e3?t:t>=1e3&&t<1e4?Math.ceil(t/1e3)+"千":t>=1e4&&t<1e8?Math.ceil(t/1e4)+"万":Math.ceil(t/1e8)+"亿"}function s(t){var e="";return t.picUrl?e=t.picUrl:t.album?e=t.album.picUrl:t.al&&(e=t.al.picUrl),e?e+"?param=300y300":null}function r(t){return t.song?t.song.artists[0].name:t.artists?t.artists[0].name:t.ar?t.ar[0].name:void 0}Object.defineProperty(e,"__esModule",{value:!0}),e.debounce=n,e.filterPlayCount=a,e.getImage=s,e.getName=r}}]);