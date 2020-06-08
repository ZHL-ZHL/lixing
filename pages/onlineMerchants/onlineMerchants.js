// pages/onlineMerchants/onlineMerchants.js
// pages/visitors/visitors.js
var dateTimePicker = require('../../utils/datapicker.js');
import {
  companyOnlineSave
} from "../../api/company.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: "0",
    result: ['仓储'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  formSubmit(e) {

    let value = e.detail.value

    delete value['仓储']
    delete value['办公']
    delete value['配送']
    if (value.name.length == 0) {
      wx.showToast({
        title: '请填写名字',
        icon: "none"
      })
    } else if (value.phone.length == 0 || value.phone.length != 11) {
      wx.showToast({
        title: '手机号不正确',
        icon: "none"
      })
    } else {
      value.purpose = value.purpose.join(',')
      console.log(value)
      companyOnlineSave(value).then(res => {
        if (res.code == 0) {
          wx.showToast({
            title: '提交成功',
            success: res => {
              wx.navigateBack({
                delta: 1,
              })
            }
          })
        } else {
          wx.showToast({
            title: res.desc,
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
  cencelAdd() {
    this.setData({
      show: true
    })
  },
  onChange(event) {
    this.setData({
      result: event.detail
    });
  },
  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  sfnumInput(e) {
    this.setData({
      idCode: e.detail.value
    })
  },
  okAdd() {
    if (this.data.name.length == 0) {
      wx.showToast({
        title: '请输入姓名',
        icon: "none"
      })
    } else {
      let peer = {}
      peer.companionName = this.data.name;
      if (this.data.idCode.length != 0) {
        peer.companionIdentity = this.data.idCode;
      }

      let peerList = this.data.peerList
      peerList.push(peer)
      this.setData({
        peerList: peerList,
        show: true,
        name: "",
        idCode: ""
      })
      console.log(this.data.peerList)
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