// pages/List/List.js
// 列表页，包括CityItem组件

const app = getApp()

Page({
  data: {

  },

  onLoad(options) {

  },

  onClickToSearch: function(){
    wx.navigateTo({
      url: '../../pages/Search/Search',
    })
  }
})