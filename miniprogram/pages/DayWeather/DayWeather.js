// pages/DayWeather/DayWeather.js
// 24小时天气详情页

Page({
  data: {
    dayWeather: null
  },

  onLoad(options) {
    this.dayWeather = JSON.parse(options.dayWeather)
    this.setData({
      dayWeather: this.dayWeather
    })
  },
})