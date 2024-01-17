// pages/Weather/Weather.js
// 天气页，包括Location、Star、NowPart、DayPart、WeekPart、WeatherIndices、BottomNavigation组件

var Util = require('../../util');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    Location: null,
    nowWeather: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //搜索、列表等页面直接切到该城市时，url里也要有Location字段参数！
    //url传对象参数，需要用JSON.stringify()转成字符串，再用JSON.parse()转回对象！
    this.Location = JSON.parse(options.Location),
    this.nowWeather = Util.getNowWeather(this.Location.location[0].id)
    
    console.log(this.nowWeather)
    
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