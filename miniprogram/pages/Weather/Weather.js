// pages/Weather/Weather.js
// 天气页，包括NowPart、DayPart、WeekPart、WeatherIndices组件

var Util = require('../../util');
const app = getApp()

Page({
  data: {
    isStarred: false,
    location: null,
    nowWeather: null,
    dayWeather: null,
    weekWeather: null,
    airQuality: null,
    weatherIndices: null
  },

  //url传对象参数，需要用JSON.stringify()转成字符串，再用JSON.parse()转回对象！
  //Promise.all()接受一个异步函数数组，它们之间可并行，全部完成后返回结果数组再向下进行！！！
  async onLoad(options) {
    var location = getApp().globalData.location
    const results = await Promise.all([
      Util.getNowWeather(location.location[0].id),
      Util.getDayWeather(location.location[0].id),
      Util.getWeekWeather(location.location[0].id),
      Util.getAirQuality(location.location[0].id),
      Util.getWeatherIndices(location.location[0].id)
    ])
    this.isStarred = Util.isStarred()
    this.location = location
    this.nowWeather = results[0]
    this.dayWeather = results[1]
    this.weekWeather = results[2]
    this.airQuality = results[3]
    this.weatherIndices = results[4]
    this.setData({
      isStarred: this.isStarred,
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
  },

  onClickToSearch: function(){
    wx.navigateTo({
      url: '../../pages/Search/Search',
    })
  },

  onClickToStar: function(){
    let that = this
    if(that.isStarred){
      wx.cloud.callFunction({
        name: "delete",
        data: {
          id: app.globalData.UserID,
          geo: Util.locationEncapsulation()
        },
        success: function (res) {
          that.isStarred = false
          that.setData({
            isStarred: false
          })
          Util.getUserData()
          wx.showToast({
            title: '已取消收藏',
            icon: 'none'
          });
        }
      })
    }else{
      wx.cloud.callFunction({
        name: "append",
        data: {
          id: app.globalData.UserID,
          geo: Util.locationEncapsulation()
        },
        success: function (res) {
          that.isStarred = true
          that.setData({
            isStarred: true
          })
          Util.getUserData()
          wx.showToast({
            title: '已收藏',
            icon: 'none'
          });
        }
      })
    }
  }
})