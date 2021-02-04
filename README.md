
  <a href="https://github.com/biubiubiu01/uni-music/">
   <h1 align="left"> Uni Music</h1>
  </a>

## 前言
平时喜欢听歌，但是经常遇到需要vip的歌曲和音乐版权的问题，有时候为了一首音乐还会去下一个APP，所以就突发奇想，想做一个音乐播放器玩玩，实现vip歌曲播放和跨平台歌曲播放，然后就直接开始干，由于打算发布多个平台，而且平时也是使用的vue，所以决定使用uniapp进行开发。

## 简介

[Uni Music](https://github.com/biubiubiu01/uni-music/) 基于uniapp+colorUI 开发的音乐播放器，目前只支持微信小程序，后续会逐渐兼容发布成H5,APP等，<b>已实现网易云音乐歌曲(非vip)</b>和 <b>qq音乐歌曲(vip)</b> 跨端播放...

## 开发准备

* 页面UI设计(千图网等)
* uniapp一些基础使用和项目搭建
* colorUI基础组件
* iconfont图标库
* 接口请求封装
* 自定义头部
* 网易云音乐Api,感谢大佬提供的node服务： <a href="https://github.com/Binaryify/NeteaseCloudMusicApi">NeteaseCloudMusicApi</a>
* qq音乐Api,感谢大佬提供的服务： <a href="https://github.com/jsososo/QQMusicApi">QQMusicApi</a>

## 实现功能
1. 用户登录
1. 搜索
1. 搜索建议和搜索历史记录
1. 跨端搜索播放(qq和网易云音乐)
1. 每日推荐
1. 排行榜
1. 热门歌手和歌手所有歌曲
1. 推荐歌单和歌单详情
1. 点击播放和播放全部
1. 播放列表
1. 背景音频播放
1. 歌词查看
1. 歌曲切换
1. 歌曲进度条切换
1. 添加喜欢音乐
1. 播放历史记录
1. 我喜欢的音乐

## 文件目录说明
```

├── api                              ---接口  
├── colorui                          --- colorUI  
├── common                           ---全局样式和阿里图标 
├── components                       ---公共组件  
├── pages                            ---页面文件 
│  ├── dayRecommend                  ---每日推荐    
│  ├── index                         ---首页
│  ├── login                         ---登录页
│  ├── my                            ---我的
│  ├── play                          ---歌曲详情页（歌词和进度条）
│  ├── rankList                      ---排行榜
│  ├── search                        ---搜索
│  ├── searchList                    ---搜索结果
│  ├── singer                        ---歌手列表
│  ├── singerPlayList                ---歌手详情
│  ├── songDetail                    ---歌单详情
│  ├── songList                      ---歌单列表
├── plugins                          --- pinyin.js
├── static                           ---静态图片
├── store                            ---vuex
├── utils                            ---公共方法
├── App.vue
├── main.js
├── manifest.json
├── pages.json         
├── README.md
├── uni.scss            


```

## 使用说明
> 由于个人用户无法获取到微信小程序的手机号，所以这里用户登录的账号是在login里面写死，为了安全，已经将其注释掉，使用前请先将login.vue的账号密码修改为自己的网易云账号密码


```
# 克隆项目
git clone https://github.com/biubiubiu01/uni-music.git
# 使用 HBuilder X 导入项目
# 修改login页面用户名密码
# 运行到微信小程序
```


## 项目截图

![登录页](http://qny35rvpf.hn-bkt.clouddn.com/imagelogin.jpg)
![首页](http://qny35rvpf.hn-bkt.clouddn.com/imageindex.jpg)
![歌单](http://qny35rvpf.hn-bkt.clouddn.com/imagemusic.jpg)
![歌单详情](http://qny35rvpf.hn-bkt.clouddn.com/imagesongDetail.jpg)
![排行榜](http://qny35rvpf.hn-bkt.clouddn.com/imagesong.jpg)
![歌手](http://qny35rvpf.hn-bkt.clouddn.com/imagesinger.jpg)
![搜索](http://qny35rvpf.hn-bkt.clouddn.com/imagesearch.jpg)
![音乐播放](http://qny35rvpf.hn-bkt.clouddn.com/imageplay.jpg)
![我的](http://qny35rvpf.hn-bkt.clouddn.com/imagemy.jpg)





