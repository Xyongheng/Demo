Page({
  onLoad:function(){
    var that = this;
    that.setData({
      musicList:that.appAudio.globalData.musicList
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight - 140,
          music: that.data.musicList[that.appAudio.globalData.musicId] || that.data.musicList[0]
        })
      }
    })
    var musicLrc = that.parseLyric(that.data.music.lrc);
    that.setData({
      lyric:musicLrc
    })
    console.log(musicLrc)

  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {
    show:'',
    lyric:{},
    music: {},
    musicList:[],
    flag:false,
    bofang:'../../public/image/icon/paly.png',
    jindu:0,
    nowTime:0
  },
  appAudio:getApp(),
  parseLyric:function(lrc) {    //将lrc歌词转成数组
    var lyrics = lrc.split("\n");
    var lrcObj = {};
    for(var i=0;i<lyrics.length;i++){
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if(!timeRegExpArr)continue;
        var clause = lyric.replace(timeReg,'');
        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj[time] = clause;
        }
    }
    return lrcObj;
  },
  audioPlay: function () {  //播放/暂停
    var that = this
    if(!that.data.flag){
      that.audioCtx.play()
      that.setData({
        flag:true,
        bofang:'../../public/image/icon/pause.png'
      })
    }else{
      that.audioCtx.pause()
      that.setData({
        flag:false,
        bofang:'../../public/image/icon/paly.png'
      })
    }
    
  },
  pro:function(event){  //进度条与显示歌词
    var that=this;
    var bili = (event.detail.currentTime/event.detail.duration)*100;
    var xiabiao = parseInt(event.detail.currentTime);
    this.setData({
      jindu:bili,
      nowTime:event.detail.currentTime,
      show:that.data.lyric[xiabiao] || that.data.show
    })
  },
  kaishi:function(){ //开始播放
    this.setData({
        flag:true,
        bofang:'../../public/image/icon/pause.png'
    })
  },
  zanting:function(){   //暂停播放
     this.setData({
        flag:false,
        bofang:'../../public/image/icon/paly.png'
      })
  },
  onShow:function(){
    // 页面显示
    this.setData({
      music: that.data.musicList[that.appAudio.globalData.musicId] || that.data.musicList[0]
    })
  },
  playMusic:function(event){    //点击图片，播放歌曲
    var idx = event.target.dataset.idx;
    var that = this;
    console.log(idx);
    this.play1(this,idx);
   

      
  },
  nextSong:function(){  //下一曲
    var that = this;
    var next = 0;
    if(this.data.music.id<this.data.musicList.length-1){
      next = this.data.music.id+1;
    }
    this.play1(this,next);
  },
  inASong:function(){   //上一曲
    var that = this;
    var next = this.data.musicList.length-1;
    if(this.data.music.id>0){
      next = this.data.music.id-1;
    }
    this.play1(this,next);
  },
  kuaijin:function(event){  //快进
    
    this.audioCtx.seek(Math.ceil(this.data.nowTime+10))
  },
  play1:function(that,idx){   
    that.setData({
      music: that.data.musicList[idx],
      bofang:'../../public/image/icon/pause.png',
      flag:true,
    })
    setTimeout(function(){
      that.audioCtx.play()
    },600)
    var musicLrc = that.parseLyric(that.data.music.lrc);
    that.setData({
      lyric:musicLrc
    })
  }
})

// musicList:[
//       {
//         id:0,
//         poster:'http://xyongheng.online/yule/audio/image/1.jpg',
//         name:'下雨了',
//         author:'薛之谦',
//         src:'http://xyongheng.online/yule/audio/mp3/1.mp3',
//         lrc:`[00:01.52]下雨了
// [00:02.52]
// [00:03.31]作词：薛之谦
// [00:04.49]作曲：薛之谦
// [00:05.52]演唱：薛之谦
// [00:06.54]
// [00:19.68]偷偷的下雨的时候月亮偷偷的
// [00:30.42]慢慢的街上的人群慢慢安静了
// [00:41.48]我在想你可以不必掩饰了
// [00:51.52]那雨会停的就随你去了
// [01:00.11]
// [01:01.00]雨还在下像在说话
// [01:06.31]他敲我的窗叮叮当当
// [01:13.72]恋爱的季节勉强不如放下
// [01:20.60]
// [01:22.24]雨还在下你听得见吗
// [01:27.64]是我的思念滴滴答答
// [01:35.09]滴入你的心就会想起我
// [01:41.42]
// [01:42.87]雨还在下像在寻你
// [01:49.02]它敲我的窗说找不到你
// [01:56.23]这样的季节就会特别想你
// [02:04.00]
// [02:05.00]雨还在下你仔细听啊
// [02:10.31]是我的思念滴滴答答
// [02:17.77]滴入你的心告诉你我在想你
// [02:24.95]
// [02:45.72]远远的无关的人不经意逃避着
// [02:56.96]轻轻的像不像话题被谁提起了
// [03:06.64]怎么会没人记得是不是我疯了
// [03:18.22]那雨别停了能否算爱着
// [03:27.13]
// [03:27.69]雨还在下像在说话
// [03:32.99]他敲我的窗叮叮当当
// [03:40.44]恋爱的季节勉强不如放下
// [03:47.69]
// [03:48.91]雨还在下你听得见吗
// [03:54.31]是我的思念滴滴答答
// [04:01.68]滴入你的心就会想起我
// [04:08.58]
// [04:10.02]雨还在下像在寻你
// [04:15.71]它敲我的窗说找不到你
// [04:23.06]这样的季节就会特别想你
// [04:31.04]
// [04:31.64]雨还在下你仔细听啊
// [04:37.07]是我的思念滴滴答答
// [04:44.05]还能去屋檐下等你吗`  
//       },
//       {
//         id:1,
//         poster:'http://xyongheng.online/yule/audio/image/2.jpg',
//          name:'Wonderful U - Demo Version',
//         author:'AGA',
//         src:'http://xyongheng.online/yule/audio/mp3/2.mp3',
//         lrc:'[00:01.00]暂无歌词'  
//       },
//       {
//         id:2,
//         poster:'http://xyongheng.online/yule/audio/image/3.jpg',
//         name:'Trip',
//         author:'Axero',
//         src:'http://xyongheng.online/yule/audio/mp3/3.mp3',
//         lrc:'[00:01.00]暂无歌词'  
//       },
//       {
//         id:3,
//         poster:'http://xyongheng.online/yule/audio/image/4.jpg',
//         name:'太陽と向日葵',
//         author:'FLOWER',
//         src:'http://xyongheng.online/yule/audio/mp3/4.mp3',
//         lrc:'[00:01.00]暂无歌词'  
//       },
//       {
//         id:4,
//         poster:'http://xyongheng.online/yule/audio/image/5.jpg',
//         name:'别找我麻烦',
//         author:'蔡健雅',
//         src:'http://xyongheng.online/yule/audio/mp3/5.mp3',
//         lrc:`[00:02.69]别找我麻烦 - 蔡健雅
// [00:03.52]作词 蔡健雅 作曲 蔡健雅
// [00:10.03]是故意的吗
// [00:12.76]是我得罪谁了吗
// [00:15.36]这一天竟然每件事情都失算
// [00:20.59]只想转个弯
// [00:23.24]却绕到了飞机场
// [00:25.93]发现没钱在身上啊
// [00:32.04]乌云乌云快走开
// [00:34.53]你可知道我不常带把伞带把伞哦
// [00:42.71]乌云乌云快走开
// [00:45.20]感觉你在挑战我的乐观的乐观哦
// [00:53.18]你还想怎么样
// [00:55.77]搞得我快抓狂
// [00:58.77]求你帮个忙
// [01:01.36]乌云乌云别找我麻烦
// [01:14.16]是注定的吗
// [01:16.70]我穿上了白衬衫
// [01:19.24]拿一杯咖啡偏在我身上倒翻
// [01:24.38]不如跑一趟
// [01:27.27]商店它却刚打烊
// [01:29.97]妙不可言的下场啊
// [01:36.03]乌云乌云快走开
// [01:38.47]你可知道我不常带把伞带把伞哦
// [01:46.75]乌云乌云快走开
// [01:49.19]感觉你在挑战我的乐观的乐观哦
// [01:57.23]你还想怎么样
// [01:59.82]搞得我快抓狂
// [02:02.68]求你帮个忙
// [02:05.32]乌云乌云别找我麻烦
// [02:29.54]乌云乌云快走开
// [02:31.77]你可知道我不常带把伞带把伞哦
// [02:39.95]乌云乌云快走开
// [02:42.45]感觉你在挑战我的乐观的乐观哦
// [02:50.58]你还想怎么样
// [02:53.22]搞得我快抓狂
// [02:56.02]求你帮个忙
// [02:58.46]乌云乌云别找我麻烦
// [03:04.12]乌云乌云快走开
// [03:06.56]你可知道我不常带把伞带把伞啊
// [03:14.64]乌云乌云快走开
// [03:17.08]感觉你在挑战我的乐观的乐观哦
// [03:25.21]你还想怎么样
// [03:27.81]搞得我快抓狂
// [03:30.86]求你帮个忙
// [03:33.36]乌云乌云别找我麻烦
// [03:38.10]no no no no no no…
// [03:45.48]别找我麻烦
// [03:48.83]no no no no no no…
// [03:55.86]别找我麻烦`
//       }
//     ]