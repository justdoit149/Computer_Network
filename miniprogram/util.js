// 工具类。

module.exports = {
  getNowWeather: getNowWeather, //获取实时天气
  getDayWeather: getDayWeather, //获取当日天气
  getWeekWeather: getWeekWeather, //获取七日天气
  getAirQuality: getAirQuality, //获取空气质量
  getWeatherIndices: getWeatherIndices, //获取天气指数
  getUserLocation: getUserLocation, //获取当前位置信息
  getLocation: getLocation, //获取位置信息
  syncRequest: syncRequest, //syncRequest()是wx.request()封装后的异步函数，参数和返回值与wx.request一样
  getUserData: getUserData, //对getUserData云函数的封装，异步地获取用户的收藏列表
  isStarred: isStarred, //检查地点是否被收藏，以location的id为关键字
  locationEncapsulation: locationEncapsulation
}

// 备用key列表：
// a3a945ae9c4f41a998e7902055b5ed09
// e6bb50558fb74844bf2ad50794cb0f95
// 6b286c0f26f041c9863ccffd6921cbf4

const key = 'e6bb50558fb74844bf2ad50794cb0f95'
const app = getApp()

async function getNowWeather(locationID){
   var res = await syncRequest({
    url: 'https://devapi.qweather.com/v7/weather/now',
    data: {
      key: key,
      location: locationID
    },
  })
  return res.data
}

async function getDayWeather(locationID){
  var res = await syncRequest({
    url: 'https://devapi.qweather.com/v7/weather/24h',
    data: {
      key: key,
      location: locationID
    },
  })
  return res.data
}

async function getWeekWeather(locationID){
  var res = await syncRequest({
    url: 'https://devapi.qweather.com/v7/weather/7d',
    data: {
      key: key,
      location: locationID
    },
  })
  return res.data
}

async function getAirQuality(locationID){
  var res = await syncRequest({
    url: 'https://devapi.qweather.com/v7/air/now',
    data: {
      key: key,
      location: locationID
    },
  })
  return res.data
}

async function getWeatherIndices(locationID){
  var res = await syncRequest({
    url: 'https://devapi.qweather.com/v7/indices/1d',
    data: {
      key: key,
      location: locationID,
      type: 0
    },
  })
  return res.data
}

async function getUserLocation(){
  var res = null, res2 = null
  try {
    res = await wx.getLocation({
     type: 'wgs84',
    }) 
  } catch (err) {
    console.log('经纬度请求失败',err)
    return null
  }
  res2 = getLocation(res.longitude + ',' + res.latitude)
  return res2
}

async function getLocation(location){
  var res = null
  try {
    res = await syncRequest({
      url: 'https://geoapi.qweather.com/v2/city/lookup',
      data: {
        key: key,
        location: location
      },
    })
  } catch (err) {
    console.log('位置请求失败',err)
    return null
  }
  return res.data
}

//这段代码以后大概还能用得上
function syncRequest(options) {  
  return new Promise((resolve, reject) => {  
    wx.request({  
      url: options.url,  
      method: options.method || 'GET',  
      data: options.data,  
      success(res) {  
        resolve(res)
      },  
      fail(err) {  
        reject(err)
      }  
    })
  })
}

function getUserData(){
  wx.cloud.callFunction({
    name: "getUserData",
    data: {
      id: app.globalData.UserID,
    },
    success: function (res) {
      app.globalData.UserData = res.result
    },
  })
}

function isStarred(){
  const locationString = JSON.stringify(locationEncapsulation())
  const lists = app.globalData.UserData
  for (let i = 0; i < lists.length; i++) {
    if(JSON.stringify(lists[i]) == locationString){
      return true
    }
  }
  return false
}

function locationEncapsulation(){
  var location = {
    adm1: app.globalData.location.location[0].adm1,
    adm2: app.globalData.location.location[0].adm2,
    country: app.globalData.location.location[0].country,
    locationID: app.globalData.location.location[0].id,
    name: app.globalData.location.location[0].name
  }
  return location
}