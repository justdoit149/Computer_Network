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
        } else {
          wx.setNavigationBarTitle({
            title: '登录失败',
          })
          wx.showToast({
            title: '登录失败，请在屏幕右上“设置”中开启定位权限后，下拉刷新重新登录',
            icon: 'none',
            duration: 5000
          });
        } 
      } 
    })
  },

  onPullDownRefresh(){
    wx.reLaunch({
      url: '../LogIn/LogIn',
    })
  }
});