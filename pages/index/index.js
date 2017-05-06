Page({
  onLoad:function(){
    var that = this;
    this.setData({
      movieList:that.appData.globalData.dianying.slice(0,6),
      musicList:that.appData.globalData.musicList
    })

  },
  data: {
    movieList:[],
    musicList:[],
    musicId:'',
    imgUrls: [
      'http://xyongheng.online/yule/index/l1.jpg',
      'http://xyongheng.online/yule/index/l2.jpg',
      'http://xyongheng.online/yule/index/l3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  playMusic:function(event){ //点击跳转播放音乐
    var that = this;
    var music_Id = event.target.dataset.idx;
    this.setData({
      musicId:music_Id
    })
    wx.switchTab({
      url: '/pages/audio/audio?id='+music_Id
    })
    this.appData.globalData.musicId = this.data.musicId;
    console.log(this.appData.globalData.musicId);
  },
  showMovie:function(event){  //点击跳转电影详情
    var that = this;
    var movie_Id = event.target.dataset.id;
    wx.navigateTo({
      url: '/pages/movieDetail/movieDetail?id='+movie_Id
    })
  },
  appData:getApp(),
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  }
})