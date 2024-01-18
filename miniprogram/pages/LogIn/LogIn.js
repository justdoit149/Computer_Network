// pages/LogIn/LogIn.js
// 登录页，登陆成功后根据当前位置跳转至Weather页

var Util = require('../../util');
Page({
  async onLoad(options) {
    wx.cloud.callFunction({
      name: "getUserID",
      success: async function(res){
        getApp().globalData.UserID = res.result
        getApp().globalData.location = await Util.getUserLocation();
        if (getApp().globalData.location != null) {
          wx.switchTab({
            url: '../Weather/Weather',
          })
        } 
      }
      
    })
    
  },


});



  