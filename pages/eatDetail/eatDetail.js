// pages/eatDetail/eatDetail.js
var WxParse = require('../../wxParse/wxParse.js');
import {
  rtfoodDetail
} from "../../api/eat.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showGG: false,
    info: {},
    eatList: [],
    showTime: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    let info = JSON.parse(options.info)
    this.setData({
      type: options.type,
      shopInfoMsg: JSON.parse(options.shopInfoMsg),
      showBtnGoCar: options.showBtnGoCar
    })
    rtfoodDetail({
      id: info.id
    }).then(res => {
      info.detail = res.data.detail
      this.setData({
        info: info
      })
      WxParse.wxParse('content', 'html', info.detail, that, 0);
    })
  },  
  goodsDel(e) {
    if (this.data.info.num && this.data.info.num > 0) {
      this.data.info.num--
    } else {
      this.data.info.num = 0;
    }
    this.setData({
      info: this.data.info
    })
  },
  goodsAdd(e) {
    if (this.data.info.num) {
      if (this.data.info.residueCount == 0) {
        wx.showToast({
          title: '菜品不足！',
        })
        return false
      } else {
        if (this.data.info.residueCount > this.data.info.num) {
          this.data.info.num += 1
        } else {
          wx.showToast({
            title: '菜品不足！',
          })
          return false
        }
      }
    } else {
      this.data.info.num = 1;
    }
    this.setData({
      info: this.data.info
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
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log(this.data.info)
    this.data.info.num = this.data.info.num ? this.data.info.num : 0
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      detailObj: this.data.info,
    })
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