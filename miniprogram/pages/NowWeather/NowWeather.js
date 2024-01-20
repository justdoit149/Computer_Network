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
  },
})