// pages/WeekWeather/WeekWeather.js
// 七日天气详情页

Page({
  data: {
    scrollHeight: 0,
    weekWeather: null,
    location:'[]'
  },

  onLoad(options) {
    this.weekWeather = JSON.parse(options.weekWeather)
    this.setData({
      weekWeather: this.weekWeather,
      location: getApp().globalData.location
    })
  },
  
  cal_scrollHeight(){
    let that = this;
    let query = wx.createSelectorQuery().in(this);
    query.select('.top').boundingClientRect(function(res){
      let topHeight = res.height;
      let screenHeight = wx.getSystemInfoSync().windowHeight;
      let scrollHeight =  screenHeight - topHeight - 70;
      that.setData({
        scrollHeight: scrollHeight
      })
    }).exec();
  },
})