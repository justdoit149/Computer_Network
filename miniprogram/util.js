// 工具类。

module.exports = {
  getNowWeather: getNowWeather, //获取实时天气
  getDayWeather: getDayWeather, //获取当日天气
  getWeekWeather: getWeekWeather, //获取七日天气
  getAirQuality: getAirQuality, //获取空气质量
  getWeatherIndices: getWeatherIndices, //获取天气指数
  getUserLocation: getUserLocation, //获取当前位置信息
  syncRequest: syncRequest, //syncRequest()是wx.request()封装后的异步函数，参数和返回值与wx.request一样
  getUserData: getUserData, //对getUserData云函数的封装，异步地获取用户的收藏列表
  isStarred: isStarred, //检查地点是否被收藏，以location的id为关键字
  locationEncapsulation: locationEncapsulation
}

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
  try {
    res2 = await syncRequest({
      url: 'https://geoapi.qweather.com/v2/city/lookup',
      data: {
        key: key,
        location: res.longitude + ',' + res.latitude
      },
    })
  } catch (err) {
    console.log('位置请求失败',err)
    return null
  }
  // console.log(res2.data.location[0].name,res2.data.location[0].adm1,res2.data.location[0].adm2)
  return res2.data
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
    locationID: app.globalData.location.location[0].id,
    name: app.globalData.location.location[0].name,
    adm2: app.globalData.location.location[0].adm2,
    adm1: app.globalData.location.location[0].adm1,
    country: app.globalData.location.location[0].country
  }
  return location
}