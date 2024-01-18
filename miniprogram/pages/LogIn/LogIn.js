// pages/LogIn/LogIn.js
// 登录页，登陆成功后根据当前位置跳转至Weather页

var Util = require('../../util');
Page({

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    //这里还需要登录
    getApp().globalData.location = await Util.getUserLocation();
    if (getApp().globalData.location != null) {
      wx.switchTab({
        url: '../Weather/Weather',
      })
    } else {
      // wx.switchTab({
      //   url: '../Me/Me?Location='+JSON.
      //   stringify(Location),
      // })
    }
  },


});



  