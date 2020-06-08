// pages/shop/shop.js

import { getCheckList } from "../../api/contract";
import Time from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: ['待审核', '已审核'],
    current: 0,
    auditStatus: 2,
    pageNum: 1,
    load: false,
    list: [],
    type: '',
    noContent: true
  },
  toDetail(e) {
    let item = e.currentTarget.dataset.item;
    console.log(item)
    wx.navigateTo({
      url: '/pages/contractDetail/contractDetail?type=' + this.data.current + '&info=' + JSON.stringify(item) + '&contractType=2' ,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
    this.getList()
  },
  selNav: function (e) {
    let index = e.target.dataset.idx;
    let auditStatus;
    if (index == 0) {
      auditStatus = 2
    } else {
      auditStatus = 1
    }
    this.setData({
      current: index,
      auditStatus: auditStatus,
      pageNum: 0,
      list: []
    })
    this.getList()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getList() {
    let data = {};
    this.setData({
      noContent: true
    })
    data.auditStatus = this.data.auditStatus;
    data.pageSize = 10;
    data.pageNum = this.data.pageNum;
    data.contractType = 2
    getCheckList(data).then(res => {
      if (res.code == 0) {
        if (res.total == 0) {
          this.setData({
            noContent: false
          })
        }
        var list = res.data.map(v => {
          v.createTime = Time.formatDuring(v.createTime, 'Y-M-D h:m:s')
          return v
        });
        this.setData({
          list: list
        })


        console.log(list)
      } else {
        wx.showToast({
          title: res.desc,
          icon: 'none'
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res,
        icon: "none"
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList()
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