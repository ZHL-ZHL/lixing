// pages/carDetail/carDetail.js
import Url from "../../utils/host.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brandName: "",
    plateCar: "",
    carType: "",
    insurance: "",
    engineNo: "",
    chassis: "",
    id: "",
    carPicUrl:'',
    onLine: Url.imghost,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      carPicUrl: options.carPicUrl,
      id: options.id,
      brandName: options.brandName,
      plateCar: options.plateCar,
      carType: options.carType,
      insurance: options.insurance,
      engineNo: options.engineNo,
      chassis: options.chassis,
    })
  },
  goUseCar() {
    wx.navigateTo({
      url: '/pages/carApply/carApply?type=' + 1 + '&id=' + this.data.id + '&brandName=' + this.data.brandName + '&plateCar=' + this.data.plateCar + '&carType=' + this.data.carType,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  freeTell: function() {
    wx.makePhoneCall({
      phoneNumber: '18634393815',
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