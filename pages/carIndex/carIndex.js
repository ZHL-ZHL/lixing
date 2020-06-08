// pages/carIndex/carIndex.js
// pages/outbreak/outbreak.js

import {
  selectUserGet
} from "../../api/baiducard.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [

    ],
  },
  routerTo(e) {
    if (e.currentTarget.dataset.name == '私车公用' || e.currentTarget.dataset.name == '公司用车') {
      selectUserGet().then(res => {
        if (res.code == 0) {
          wx.navigateTo({
            url: e.currentTarget.dataset.url,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            image: '',
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      })
    } else {
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      nav: [
        [{
            icon: "/images/icon/grxx.png",
            name: "个人信息",
            url: "/pages/management/management",
            show: true,
          }, {
            icon: "/images/icon/gsyc.png",
            name: "公司用车",
            url: "/pages/carList/carList",
            show: true,
          }, {
            icon: "/images/icon/scgy.png",
            name: "私车公用",
            url: "/pages/carApply/carApply?type=2",
            show: true,
          }, {
            icon: "/images/icon/ycsq.png",
            name: "用车申请",
            url: "/pages/carPersonnel/carPersonnel",
            show: true,
          },
          {
            icon: "/images/icon/clsp.png",
            name: "用车审批",
            url: "/pages/approvalCar/approvalCar",
            show: wx.getStorageSync("role").indexOf('1') != -1 || wx.getStorageSync("role").indexOf('9') != -1 ? true : false,
          }
        ],
      ]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})