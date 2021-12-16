// pages/contactUs/contactUs.js
import {
  feedback
} from "../../api/my"
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goBack() {
    wx.navigateBack({
      delta: 1,
    })
  },

  freeTell: function () {
    wx.makePhoneCall({
      phoneNumber: '0354-8668008',
    })
  },
  formSubmit(e) {
    let value = e.detail.value
    if (value.name.length == 0) {
      wx.showToast({
        title: '请输入姓名',
        icon: "none"
      })
      return false
    } else if (value.phone.length == 0) {
      wx.showToast({
        title: '请输入联系方式',
        icon: "none"
      })
      return false
    } else if (value.message.length == 0) {
      wx.showToast({
        title: '请输入问题或意见',
        icon: "none"
      })
      return false

    } else {
      value.type = 1
      feedback(value).then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: '提交成功',
            success: function () {
              wx.navigateBack({
                delta: 1,
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