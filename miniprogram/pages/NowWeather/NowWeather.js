// pages/NowWeather/NowWeather.js
// 当前天气详情页
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {
      location: 'loading',         // 替换为实际位置
      updateTime: 'loading',       //更新时间
      currentTemperature: null,      // 当前温度，初始为null
      currentCondition: 'Loading', // 当前天气状况，初始为'Loading...'
      windDirection: null,           // 风向
      windScale: null,                //风力等级
      windSpeed: null,               //风速
      precip: null,                   //当前小时累计降水量
      humidity: null,                // 湿度
      vis: null,              // 能见度
      apparentTemperature: null      // 体感温度
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    //获取定位
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        //和风天气api查看本地的中文位置
        wx.request({
          url: 'https://geoapi.qweather.com/v2/city/lookup?',
          data: {
            key: 'e6bb50558fb74844bf2ad50794cb0f95',
            location: longitude + ',' + latitude
          },
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            that.setData({
              location: res.data.location[0].name
            });
            console.log(res.data.location[0].name)
            //查看本地当前的天气情况
            wx.request({
              url: 'https://devapi.qweather.com/v7/weather/now?',
              data: {
                key: 'e6bb50558fb74844bf2ad50794cb0f95',
                location: longitude + ',' + latitude
              },
              header: {
                'content-type': 'application/json'
              },
              success(res) {
                console.log(res.data.now)
                that.setData({
                  updateTime: res.data.now.obsTime,           //最新的观测时间
                  currentTemperature: res.data.now.temp,      // 当前温度，初始为null
                  currentCondition: res.data.now.text, // 当前天气状况，初始为'Loading...'
                  windDirection: res.data.now.windDir,           // 风向
                  windScale: res.data.now.windScale,                //风力等级
                  windSpeed: res.data.now.windSpeed,               //风速
                  precip: res.data.now.precip,                   //当前小时累计降水量
                  humidity: res.data.now.humidity,                // 湿度
                  vis: res.data.now.vis,              // 能见度
                  apparentTemperature: res.data.now.feelsLike      // 体感温度
                })
              },
            })
          },
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})