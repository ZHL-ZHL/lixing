// pages/investment/investment.js
import {
  homeBanner
} from "../../api/banner.js"
import {
  feedback
} from "../../api/my"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
  },
  submitMessage() {
    if (this.data.name.length == 0) {
      wx.showToast({
        title: '请输入姓名',
        icon: "none"
      })
      return false
    } else if (this.data.idPhone.length != 11) {
      wx.showToast({
        title: '请输入正确的联系方式',
        icon: "none"
      })
      return false
    } else if (this.data.messageL.length == 0) {
      wx.showToast({
        title: '请输入问题或意见',
        icon: "none"
      })
      return false
    } else {
      let that = this
      feedback({
        type: 2,
        name: this.data.name,
        phone: this.data.idPhone,
        message: this.data.messageL
      }).then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: '提交成功',
            success: function () {
              that.setData({
                show: true
              })
            }
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: "none"
          })
        }
      }).catch(res => {
        wx.showToast({
          title: res,
          icon: "none"
        })
      })
    }
  },
  addperson() { 
    this.setData({
      show: false
    })
  },

  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  sfnumInput(e) {
    this.setData({
      idPhone: e.detail.value
    })
  },
  msgInput(e) {
    this.setData({
      messageL: e.detail.value
    })
  },
  cencelAdd() {
    this.setData({
      show: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    homeBanner(8).then(res => {
      this.setData({
        listImage: res.data.records
      })
    })
    homeBanner(9).then(res => {
      this.setData({
        listImage1: res.data.records
      })
    })
    homeBanner(10).then(res => {
      this.setData({
        listImage2: res.data.records
      })
    })
  },

  freeTell: function () {
    wx.makePhoneCall({
      phoneNumber: '0354-8668008',
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