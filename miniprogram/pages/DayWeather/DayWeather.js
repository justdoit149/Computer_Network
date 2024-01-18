// pages/DayWeather/DayWeather.js
// 24小时天气详情页

Page({
  data: {
    dayWeather: null,
    hour:'[]',
    location:'[]'
  },

  onLoad(options) {
    this.dayWeather = JSON.parse(options.dayWeather)
    this.setData({
      dayWeather: this.dayWeather,
      location: getApp().globalData.location
    })
    let data = [];
    for(let i = 0;i < this.dayWeather.hourly.length;i ++){
        data.push(this.dayWeather.hourly[i].fxTime.substring(11,16))
    }
    this.setData({
      hour: data
    })
  },
})