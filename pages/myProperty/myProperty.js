// pages/myProperty/myProperty.js

import {
  applyrepairList
} from "../../api/order.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTop: false,
    showBottom: false,
    currentIndex: 0,
    indexId:0,
    type: ['全部订单','报修工单', '加班申请', '搬家申请', '工具借用'],
    typeIdx: "",
    list:[],
  },

  showTap() {
    this.setData({
      showTop: true
    })
  },
  onClickTop(e) {
    this.setData({
      indexId: e.currentTarget.id,
      showTop: false,
      page: 1,
      orderList: [],
    })
    this.getList()
  },
  oncloseTop() {
    this.setData({
      showTop: false
    })
  },
  titleClick: function (e) {
    this.setData({
      //拿到当前索引并动态改变
      currentIndex: e.currentTarget.dataset.idx,
      page: 1,
      list: [],
    })
    this.getList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  getList() {
    applyrepairList({
      type:this.data.indexId==0?'':this.data.indexId-1,
      status:  Number(this.data.currentIndex)+1, 
    }).then(res => {
      this.setData({
        list: res.data.records
      })
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