// pages/NowWeather/NowWeather.js
// 当前天气详情页

Page({
  data: {
    nowWeather: null,
    obsTime: null,
    airQuality: null,
    location: '[]'
  },

  onLoad(options) {
    this.nowWeather = JSON.parse(options.nowWeather)
    this.airQuality = JSON.parse(options.airQuality)
    this.setData({
      location: getApp().globalData.location,
      nowWeather: this.nowWeather,
      airQuality: this.airQuality
    })
    this.setData({
      obsTime: this.nowWeather.now.obsTime.substring(0, 10) + " " +
        this.nowWeather.now.obsTime.substring(11, 16)
    })
    console.log(this.location)
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
  onShareAppMessage() {

  }
})