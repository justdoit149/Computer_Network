// pages/LogIn/LogIn.js
// 登录页，登陆成功后根据当前位置跳转至Weather页

var Util = require('../../util');
const app = getApp()

Page({
  async onLoad(options) {
    wx.cloud.callFunction({
      name: "getUserID",
      success: async function(res){
        app.globalData.UserID = res.result
        wx.cloud.callFunction({
          name: "initUserData",
          data: {
            id: app.globalData.UserID,
          },
          success: function (res) {
            Util.getUserData()
          },
        })  
        app.globalData.location = await Util.getUserLocation()
        if (app.globalData.location != null) {
          wx.reLaunch({
            url: '../Weather/Weather',
          })
        } 
      } 
    })
  },
});



  