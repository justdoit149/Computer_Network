// 工具类。

module.exports = {
  getNowWeather: getNowWeather, //获取实时天气
  getDayWeather: getDayWeather, //获取当日天气
  getWeekWeather: getWeekWeather, //获取七日天气
  getAirQuality: getAirQuality, //获取空气质量
  getWeatherIndices: getWeatherIndices, //获取天气指数
  getUserLocation: getUserLocation, //获取当前位置信息
  syncRequest: syncRequest //syncRequest()是wx.request()封装后的异步函数，参数和返回值与wx.request一样
}

const key = 'e6bb50558fb74844bf2ad50794cb0f95'

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
