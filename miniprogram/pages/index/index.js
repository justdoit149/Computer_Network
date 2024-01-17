// index.js

const key = '6b286c0f26f041c9863ccffd6921cbf4'

Page({
  data: {
    msg: "测试信息"
  },

  onLoad: function(){//初始化
    this.getUserLocation();
  },

  //获取用户的位置信息
  getUserLocation: function(){
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        const longitude = res.longitude;
        const latitude = res.latitude;
        console.log(longitude);
        // wx.request({
        //   url: 'https://geoapi.qweather.com/v2/city/lookup',
        //   data: {
        //     key: key,
        //     location: longitude + ',' + latitude
        //   },
        //   success: function (res) {
        //     console.log(res.data.location[0].name,res.data.location[0].adm1,res.data.location[0].adm2)
        //   },
        //   fail: function (err) {
        //     console.log('获取地理位置失败',err)
        //   }
        // })
      },
      fail (err) {
        console.log('获取地理位置失败',err);
      }
     }) 

  },
  onClick: function(){
    this.setData({
      msg: "新信息"
    })
  }

})
