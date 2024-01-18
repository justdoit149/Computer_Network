// pages/WeekWeather/WeekWeather.js
// 七日天气详情页


Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,  //滚动区域的高度
    location: 'loading', //当前位置
    iconDay:'9998',  //天气图标
    temperature: 'N/A', //温度（最低~最高）
    weatherArray: [], //七日温度信息
    time:'loading'  //今日日期
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.cal_scrollHeight();
    let that = this;
    //获取定位
      wx.getLocation({
        type: 'wgs84',
        success (res) {
          const latitude = res.latitude
          const longitude = res.longitude
          //和风天气api查看本地的中文位置
          wx.request({
            url: 'https://geoapi.qweather.com/v2/city/lookup?',
            data: {
              key: '9b08631830ca43faa1f88a8fc1537c01',
              location: longitude + ',' + latitude
            },
            header: {
              'content-type': 'application/json' 
            },
            success (res) {
              that.setData({
                location: res.data.location[0].name
              });
              //查看本地七天的天气情况
              wx.request({
                url: 'https://devapi.qweather.com/v7/weather/7d?',
                data: {
                  key: '9b08631830ca43faa1f88a8fc1537c01',
                  location: longitude + ',' + latitude
                },
                header: {
                  'content-type': 'application/json' 
                },
                success (res) {
                  console.log(res)
                  that.setData({
                    weatherArray: res.data.daily.slice(1),
                    iconDay:res.data.daily[0].iconDay,
                    time:res.data.daily[0].fxDate,
                    temperature:res.data.daily[0].tempMin + '~' + res.data.daily[0].tempMax,
                  })
                },
              })
            },
          })
        },
     })
  },

  /**
   * 计算滚动高度函数--根据机型计算滚动区域的高度
   */
  cal_scrollHeight(){ 
    let that = this;
    let query = wx.createSelectorQuery().in(this);
    query.select('.top').boundingClientRect(function(res){
      let topHeight = res.height;
      let screenHeight = wx.getSystemInfoSync().windowHeight;
      let scrollHeight =  screenHeight - topHeight - 70;
      that.setData({
        scrollHeight: scrollHeight
      })
    }).exec();
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