// pages/Weather/Weather.js
// 天气页，包括NowPart、DayPart、WeekPart、WeatherIndices组件

var Util = require('../../util');

Page({
  data: {
    location: null,
    nowWeather: null,
    dayWeather: null,
    weekWeather: null,
    airQuality: null,
    weatherIndices: null
  },

  //搜索、列表等页面直接切到该城市时，url里也要有Location字段参数！
  //url传对象参数，需要用JSON.stringify()转成字符串，再用JSON.parse()转回对象！
  async onLoad(options) {
    //Promise.all()接受一个异步函数数组，它们之间可并行，全部完成后返回结果数组再向下进行！！！
    var location = getApp().globalData.location
    const results = await Promise.all([
      Util.getNowWeather(location.location[0].id),
      Util.getDayWeather(location.location[0].id),
      Util.getWeekWeather(location.location[0].id),
      Util.getAirQuality(location.location[0].id),
      Util.getWeatherIndices(location.location[0].id)
    ])
    this.location = location
    this.nowWeather = results[0]
    this.dayWeather = results[1]
    this.weekWeather = results[2]
    this.airQuality = results[3]
    this.weatherIndices = results[4]
    this.setData({
      location: location,
      nowWeather: results[0],
      dayWeather: results[1],
      weekWeather: results[2],
      airQuality: results[3],
      weatherIndices: results[4]
    })
  },

  onClickNowPart: function(){
    wx.navigateTo({
      url: '../../pages/NowWeather/NowWeather?nowWeather='+JSON.stringify(this.nowWeather)+'&airQuality='+JSON.stringify(this.airQuality)
    })
  },

  onClickDayPart: function(){
    wx.navigateTo({
      url: '../../pages/DayWeather/DayWeather?dayWeather='+JSON.stringify(this.dayWeather)
    })
  },

  onClickWeekPart: function(){
    wx.navigateTo({
      url: '../../pages/WeekWeather/WeekWeather?weekWeather='+JSON.stringify(this.weekWeather)
    })
  }
})