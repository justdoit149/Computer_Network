// pages/Search/Search.js

const Util = require("../../util")
const app = getApp()

Page({
  data: {
    searchInput: String, //搜索框输入的数据
    popularLocations: Array
  },

  onLoad(options){
    this.popularLocations = ["当前位置","北京市","上海市","广州市","深圳市","杭州市","南京市","成都市","重庆市","武汉市","苏州市","天津市"]
    this.setData({
      popularLocations: ["当前位置","北京市","上海市","广州市","深圳市","杭州市","南京市","成都市","重庆市","武汉市","苏州市","天津市"]
    })
  },

  //搜索框bindinput
  inputChange: function (e) {
    this.setData({
      searchInput: e.detail.value
    })
  },

  //搜索按钮bindtap
  search: async function () {
    //调用和风geoAPI进行模糊搜索
    var tempLocation = await Util.getLocation(this.data.searchInput)
    switch (tempLocation.code) {
      case "200": // 请求成功
        app.globalData.location = tempLocation
        wx.showToast({
          title: '请求成功，即将跳转',
          icon: 'none'
        });
        if (app.globalData.location != null) {
          wx.reLaunch({
            url: '../Weather/Weather',
          })
        }
        break;
      case "204": //请求成功，但查询的地区暂时没有数据。
        wx.showToast({
          title: '抱歉，暂时没有你查询的地区的天气信息',
          icon: 'none'
        });
        break;
      case "404": //查询地区不存在。
        wx.showToast({
          title: '查询的地区不存在，请规范输入后重试',
          icon: 'none'
        });
        break;
      case "500": //无响应或超时
        wx.showToast({
          title: '访问超时，请稍后重试',
          icon: 'none'
        });
        break;
      default:
        wx.showToast({
          title: '请求错误',
          icon: 'none'
        });
        break;
    }
  },

  userLocation: async function(event){
    const index = event.currentTarget.dataset.index
    app.globalData.location = (index == 0 ? await Util.getUserLocation() : await Util.getLocation(this.popularLocations[index]))
    if (app.globalData.location != null) {
      wx.reLaunch({
        url: '../Weather/Weather',
      })
    } else{
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      });
    }
  }
})