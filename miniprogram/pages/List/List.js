// pages/List/List.js
// 列表页，包括CityItem组件

const app = getApp()

Page({
  data: {
    UserData: Array
  },

  onLoad(options) {
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

  onClickToWeather: function(){

  }
})