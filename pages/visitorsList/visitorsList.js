// pages/visitorsList/visitorsList.js
import {
  feedback
} from "../../api/my"
var dateTimePicker = require('../../utils/datapicker.js');
import {
  applySave,
  timesList,
  managerList,
  repairreportSave
} from "../../api/property.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    result: [],
    result1: [],
    active: '',
    showCode: false,
    nav: ['报修工单', '加班申请', '搬家&上下货', '施工申请'],
    currentindex: 0,
    load: false,
    timesList: [],
    managerList: {},
    type: '',
    noContent: true,
    name: '',
    idPhone: "",
    messageL: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  freeTell: function () {
    wx.makePhoneCall({
      phoneNumber: '0354-8668008',
    })
  },
  onChange(event) {
    if (this.data.result.indexOf(event.currentTarget.id) == -1) {
      this.data.result.push(event.currentTarget.id)
    } else {
      this.data.result.splice(this.data.result.indexOf(event.currentTarget.id), 1)
    }
    this.setData({
      result: this.data.result
    })
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
  onChange1(event) {
    this.data.result1 = [event.currentTarget.id]
    this.setData({
      active: event.currentTarget.id,
      result1: this.data.result1
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  formSubmit(e) {
    let value = e.detail.value
    if (value.name.length == 0) {
      wx.showToast({
        title: '请填写名字',
        icon: "none"
      })
    } else if (value.phone.length == 0 || value.phone.length != 11) {
      wx.showToast({
        title: '联系方式格式错误',
        icon: "none"
      })
    } else if (value.address.length == 0) {
      wx.showToast({
        title: '请填写上门地址',
        icon: "none"
      })
    } else if (this.data.result.length == 0) {
      wx.showToast({
        title: '请选择报修内容',
        icon: "none"
      })
    } else {
      value.repairType = this.data.result.join(',')
      repairreportSave(value).then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: '申请成功',
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
  formSubmit1(e) {
    let value = e.detail.value
    if (value.name.length == 0) {
      wx.showToast({
        title: '请填写名字',
        icon: "none"
      })
    } else if (value.phone.length == 0 || value.phone.length != 11) {
      wx.showToast({
        title: '联系方式格式错误',
        icon: "none"
      })
    } else if (this.data.result1.length == 0) {
      wx.showToast({
        title: '请选择时间段',
        icon: "none"
      })
    } else {
      value.applyType = this.data.currentindex
      value.applyTime = this.data.result1.join(',')
      value.chargeName = this.data.managerList.managerName
      value.chargePhone = this.data.managerList.managerPhone
      applySave(value).then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: '申请成功',
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
  gettimesList(type) {
    timesList({
      type: type
    }).then(res => {
      this.setData({
        timesList: res.data
      })
    })
    managerList({
      type: type
    }).then(res => {
      this.setData({
        managerList: res.data
      })
    })
  },
  selNav: function (e) {
    let index = e.target.dataset.idx;
    this.setData({
      currentindex: index,
    })
    if (this.data.currentindex != 0) {
      this.gettimesList(e.target.dataset.idx)
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