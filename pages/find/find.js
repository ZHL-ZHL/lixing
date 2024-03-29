// pages/find/find.js 

import {
  shopBanner
} from "../../api/banner.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner1: [{
      picture: "/images/banner/banner.png"
    },{
      picture: "/images/banner/banner.png"
    }],
    indicatorDots: true, //小点
    indicatorColor: "white",
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 500, //滑动时间
    indicatorActiveColor: "#FFE400",
    current: 0,
    swiperIndex: 0
  },
  toAdv(e) {
    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/groupBuy/groupBuy' ,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    shopBanner().then(res => {
      if (res.code == 200) { 
        this.setData({
          banner1: res.data.records
        })
      }
    }).catch(res => {

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})