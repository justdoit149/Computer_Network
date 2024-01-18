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
            // console.log(res.result); //状态信息
          },
        })
        wx.cloud.callFunction({
          name: "getUserData",
          data: {
            id: app.globalData.UserID,
          },
          success: function (res) {
            // console.log(res.result); //输出数组
            app.globalData.UserData = res.result
          },
        })
        app.globalData.location = await Util.getUserLocation()
        if (app.globalData.location != null) {
          wx.switchTab({
            url: '../Weather/Weather',
          })
        } 
      } 
    })
  },
});



  