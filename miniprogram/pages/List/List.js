// pages/List/List.js
// 列表页，包括CityItem组件

const Util = require("../../util")
const app = getApp()

Page({
  data: {
    UserData: Array
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
  }
})