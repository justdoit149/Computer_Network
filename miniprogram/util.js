module.exports = {
  getUserLocation: getUserLocation, // 获取当前位置信息
  syncRequest: syncRequest, // syncRequest()是wx.request()封装后的异步函数，参数和返回值与wx.request一样
  getNowWeather: getNowWeather
}

const key = '6b286c0f26f041c9863ccffd6921cbf4'

function getNowWeather(locationID){
   var res = null
   res = syncRequest({
    url: 'https://devapi.qweather.com/v7/weather/now',
    data: {
      key: key,
      location: locationID
    },
  })
  return res
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
    console.log(res2)
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