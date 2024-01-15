// index.js

Page({
  data: {
    
  },
  
  onLoad: function(){
    //调用wx.getLocation(Object object)，获取用户定位信息（经纬度）
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        console.log(latitude,longitude);
      }
     })
  },
  
})
