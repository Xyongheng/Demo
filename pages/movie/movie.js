// pages/movie/movie.js
Page({
  
  data:{
    scrollHeight:0,
    movieList:[]
  },
  appMovie:getApp(),
  showdetail:function(event){
    var id= event.target.dataset.id;
    wx.navigateTo({
      url: '/pages/movieDetail/movieDetail?id='+id
    })
  },
  upper:function(){
    console.log('aaaa');
  },
  onLoad:function(){
    var that = this;
    this.setData({
      movieList:that.appMovie.globalData.dianying
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight 
        })
      }
    })

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