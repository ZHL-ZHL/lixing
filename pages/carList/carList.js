// pages/carList/carList.js
import Url from "../../utils/host.js"
import {
  carList,
} from "../../api/carMang"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: [],
    onLine: Url.imghost,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCarList()
  },
  getCarList() {
    carList({
      pageNum: 1,
      pageSize: 10,
      type: 1,
      plateCar: ""
    }).then(res => {
      if (res.code == 0) {
        this.setData({
          carList: res.data
        })
      }
    })
  },
  goUseCar(e) {
    console.log(e.target.dataset)
    wx.navigateTo({
      url: '/pages/carApply/carApply?type=' + 1 + '&id=' + e.currentTarget.dataset.carinfo.carId + '&brandName=' + e.currentTarget.dataset.carinfo.brandName + '&plateCar=' + e.currentTarget.dataset.carinfo.plateCar + '&carType=' + e.currentTarget.dataset.carinfo.dictName,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  goCarDetail(e) {
    console.log(e) 
    wx.navigateTo({
      url: '/pages/carDetail/carDetail?type=' + 1 + '&id=' + e.currentTarget.dataset.carinfo.carId + '&brandName=' + e.currentTarget.dataset.carinfo.brandName + '&plateCar=' + e.currentTarget.dataset.carinfo.plateCar + '&carType=' + e.currentTarget.dataset.carinfo.dictName + '&insurance=' + e.currentTarget.dataset.carinfo.insurance + '&engineNo=' + e.currentTarget.dataset.carinfo.engineNo + '&chassis=' + e.currentTarget.dataset.carinfo.chassis + '&carPicUrl=' + e.currentTarget.dataset.carinfo.carPicUrl,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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

  }
})