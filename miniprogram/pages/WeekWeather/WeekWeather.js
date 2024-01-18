// pages/WeekWeather/WeekWeather.js
// 七日天气详情页

Page({
  data: {
    weekWeather: null
  },

  onLoad(options) {
    this.weekWeather = JSON.parse(options.weekWeather)
    this.setData({
      weekWeather: this.weekWeather
    })
  },
})