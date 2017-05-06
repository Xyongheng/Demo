// pages/movieDetail/movieDetail.js
Page({
  data:{
    movieDetail:{}
  },
  appDetail:getApp(),
  onLoad:function(options){
    //var appDetail = getApp();
    console.log(options.id)
    var thatDetail = this.appDetail.globalData.dianying[options.id];
    this.setData({
      movieDetail:thatDetail
    })
  },
  guankan:function(){
    var that = this;
    wx.navigateTo({
      url: '/pages/video/video?videoUrl='+that.data.movieDetail.url
    })
    this.appDetail.globalData.movieUrl = this.data.movieDetail.url;
    console.log(this.appDetail.globalData.movieUrl);
  },

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})