// pages/myCoupons/myCoupons.js
import {
  couponuserList
} from "../../api/my.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: ['租赁服务','我要吃饭', '好物优选'],
    currentindex: 0,
    current: 1,
    list: [],
    showActive:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getcouponuserList()
  },
  getcouponuserList() {
    couponuserList({
      type: this.data.currentindex + 1
    }).then(res => {
      this.setData({
        list: res.data
      })
    })
  },
  onlineCall() {
      if(this.data.currentindex==0){
        wx.navigateTo({
          url: '/pages/meetingRoom/meetingRoom',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }else if(this.data.currentindex==1){
        wx.navigateTo({
          url: '/pages/eat/eat',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }else{
        wx.navigateTo({
          url: '/pages/goodsList/goodsList',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
  },

  selNav: function (e) {
    let index = e.target.dataset.idx;
    this.setData({
      currentindex: index,
      current: 1,
      list:[],
      showActive:''
    })
    this.getcouponuserList()
  },
  showAc(e){ 
     this.setData({
       showActive:e.currentTarget.id
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