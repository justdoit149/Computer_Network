// pages/Search/Search.js
// 搜索页，下一阶段再做（应该这里加一个当前位置）

const util = require("../../util")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchInput: String, //搜索框输入的数据
  },

  //搜索框bindinput
  inputChange: function (e) {
    this.setData({
      searchInput: e.detail.value
    })
  },

  //搜索按钮bindtap
  search: function () {
    let that = this
    console.log('搜索内容:', that.data.searchInput)
    //调用和风geoAPI进行模糊搜索
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup?',
      data: {
        key: util.key,
        location: that.data.searchInput
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        switch (res.data.code) {
          case "200": // 请求成功
            app.globalData.location = res.data
            wx.showToast({
              title: '请求成功，即将跳转',
              icon: 'none'
            });
            if (app.globalData.location != null) {
              wx.switchTab({
                url: '../Weather/Weather',
              })
            }
            break;

          case "204": //请求成功，但查询的地区暂时没有数据。
            wx.showToast({
              title: '抱歉，暂时没有你查询的地区的天气信息',
              icon: 'none'
            });
            break;

          case "404": //查询地区不存在。
            wx.showToast({
              title: '查询的地区不存在，请规范输入后重试',
              icon: 'none'
            });
            break;

          case "500": //无响应或超时
            wx.showToast({
              title: '访问超时，请稍后重试',
              icon: 'none'
            });
            break;

          default:
            console.log(res.data.code, "请求错误")
        }
      },
      fail(err) {
        console.log('搜索错误', error)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})