// pages/List/List.js
// 列表页，包括CityItem组件

const Util = require("../../util")
const app = getApp()

Page({
  data: {
    UserData: Array,
    scrollHeight: 0
  },

  onShow() {
    this.UserData = app.globalData.UserData
    this.setData({
      UserData: app.globalData.UserData
    })
  },

  onClickToSearch: function(){
    wx.navigateTo({
      url: '../../pages/Search/Search',
    })
  },

  onClickToWeather: async function(event){
    const index = event.currentTarget.dataset.index
    app.globalData.location = await Util.getLocation(this.UserData[index].locationID)
    wx.reLaunch({
      url: '../../pages/Weather/Weather'
    })
  },

  cal_scrollHeight: function(){
    let that = this;
    let query = wx.createSelectorQuery().in(this);
    query.select('.title').boundingClientRect(function(res){
      let topHeight = res.height;
      let screenHeight = wx.getSystemInfoSync().windowHeight;
      let scrollHeight =  screenHeight - topHeight - 70;
      that.setData({
        scrollHeight: scrollHeight
      })
    }).exec();
  },
})
