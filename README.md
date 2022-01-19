
  <a href="https://github.com/biubiubiu01/uni-music/">
   <h1 align="left"> Uni Music</h1>
  </a>

## 前言
> 2.0版本，播放功能优化，页面颜色主题改版，修复1.0存在的bug，实现多端发布。

## 简介

[Uni Music](https://github.com/biubiubiu01/uni-music/) 基于uniapp+colorUI 开发的音乐播放器，支持多端发布

## 开发准备

* 页面UI设计(千图网等)
* uniapp一些基础使用和项目搭建
* colorUI基础组件
* iconfont图标库
* 接口请求封装
* 自定义头部
* 自定义tabbar
* 网易云音乐Api,感谢大佬提供的node服务： <a href="https://github.com/Binaryify/NeteaseCloudMusicApi">NeteaseCloudMusicApi</a>


## 实现功能
1. 用户登录
1. 搜索
1. 搜索建议和搜索历史记录
1. 搜索播放
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
# 克隆项目

> 新版本是2.0分支，默认分支是以前的版本，切记！！！

- git clone https://github.com/biubiubiu01/uni-music.git 
- 使用 HBuilder X 导入项目
- 修改login页面用户名密码(默认测试账号)
- 运行项目


# 项目预览


![输入图片说明](preview/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220117173118.png)
![输入图片说明](preview/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220117174715.png)

![输入图片说明](preview/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220117173402.png)
![输入图片说明](preview/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220117173412.png)

![输入图片说明](preview/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220117173428.png)
![输入图片说明](preview/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220117173448.png)

![输入图片说明](preview/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220117173510.png)
![输入图片说明](preview/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220117173526.png)

![输入图片说明](preview/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220117173539.png)