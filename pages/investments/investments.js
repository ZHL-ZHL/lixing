// pages/investments/investments.js

import {
  investments,
  getdDictionary
} from "../../api/zodiac"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [],
    currentindex: 0,
    current: 1,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getList(){
    investments({
      current: 1,
      size: 10000,
      stype:this.data.currentindex
    }).then(res => {
      this.setData({
        list: res.data.records
      })
    })
  },
  onLoad: function (options) {
    getdDictionary().then(res=>{
      this.setData({
        nav:res.data
      }) 
      this.getList()
    })
  },
  selNav: function (e) {
    let index = e.target.dataset.idx;
    this.setData({
      currentindex: index,
      current: 1,
    })
    this.getList()
  },
  callPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id,
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