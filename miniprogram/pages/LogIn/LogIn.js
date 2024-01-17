// pages/LogIn/LogIn.js
// 登录页，登陆成功后根据当前位置跳转至Weather页

var Util = require('../../util');

Page({

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    //这里还需要登录
    var Location = await Util.getUserLocation();
    console.log(Location)
    if (Location != null) {
      wx.navigateTo({
        url: '../Weather/Weather?loc=114',
        
      })
    } else {
      console.log("?")
    }
  },


});



  