// pages/Weather/Weather.js
// 天气页，包括LocationInformation、Star、NowPart、DayPart、WeekPart、WeatherIndices、BottomNavigation组件

var Util = require('../../util');

Page({
  data: {
    location: Object,
    nowWeather: Object,
    dayWeather: Object,
    weekWeather: Object,
    airQuality: Object,
    weatherIndices: Object
  },

  async onLoad(options) {
    //搜索、列表等页面直接切到该城市时，url里也要有Location字段参数！
    //url传对象参数，需要用JSON.stringify()转成字符串，再用JSON.parse()转回对象！
    this.location = JSON.parse(options.Location)
    //Promise.all()接受一个异步函数数组，它们之间可并行，全部完成后返回结果数组再向下进行！！！
    const results = await Promise.all([
      Util.getNowWeather(this.location.location[0].id),
      Util.getDayWeather(this.location.location[0].id),
      Util.getWeekWeather(this.location.location[0].id),
      Util.getAirQuality(this.location.location[0].id),
      Util.getWeatherIndices(this.location.location[0].id)
    ])
    this.nowWeather = results[0]
    this.dayWeather = results[1]
    this.weekWeather = results[2]
    this.airQuality = results[3]
    this.weatherIndices = results[4]

    
    // console.log(this.location)
    // console.log(this.nowWeather)
    // console.log(this.dayWeather)
    // console.log(this.weekWeather)
    // console.log(this.airQuality)
    // console.log(this.weatherIndices)
  },

  onClickNowPart: function(){
    wx.navigateTo({
      url: '../../pages/NowWeather/NowWeather'
    })
  },

  onClickDayPart: function(){
    wx.navigateTo({
      url: '../../pages/DayWeather/DayWeather?dayWeather='+JSON.stringify(this.dayWeather)
    })
  },

  onClickWeekPart: function(){
    wx.navigateTo({
      url: '../../pages/WeekWeather/WeekWeather'
    })
  }
})