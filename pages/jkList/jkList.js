// pages/jkList/jkList.js 

import {
  homeBanner
} from "../../api/banner.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    homeBanner(7).then(res => {
      console.log(res.data.records)
      this.setData({
        nav: res.data.records
      })
    })
    // this.setData({
    //   nav: [
    //     [{
    //       icon: "/images/online/banner-(1).jpg",
    //       name: "金坤介绍和特色服务",
    //       url: "/pages/investment/investment",
    //       show: true,
    //     }, {
    //       icon: "/images/online/banner-(2).jpg",
    //       name: "内部商户黄页",
    //       url: "/pages/investmenti/investmenti",
    //       show: true,
    //     }, {
    //       icon: "/images/online/banner-(3).jpg",
    //       name: "第三方服务机构黄页",
    //       url: "/pages/investments/investments",
    //       show: true,
    //     }],
    //   ]
    // })
  },
  routerTo(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
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
  onPullDownRefresh: function () {

  },

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