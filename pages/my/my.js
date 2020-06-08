// pages/my/my.js

import { loginInfo } from "../../api/getDate.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogShow:false,
    loginName:'',
    buttons: [{ text: '登录' }],
    formData:{
      mobile:''
    },
    rules: [{ // 多个规则
      name: 'mobile',
      rules: [{ required: true, message: 'mobile必填' }, { mobile: true, message: 'mobile格式不对' }],
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let statusInfo = wx.getStorageSync('user_info') || '';
    console.log(statusInfo)
    if (statusInfo){
      this.getInfo();
      this.setData({
        dialogShow: false
      })
    }else{
      this.setData({
        dialogShow:true
      })
    }
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

  },

  // 登录获取信息
  tapDialogButton(e) {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        wx.showModal({
          title: '错误',
          content: '手机号格式不正确',
          showCancel: false
        })
      } else {
        this.getInfo()
      }
    })
    
  },
  getInfo(){
    loginInfo({
      loginNo: this.data.formData.mobile
    }).then(res => {
      if (res.code == 0) {
        wx.setStorageSync("user_info", this.data.formData.mobile);
        if (res.page.list.length > 0) {
          this.setData({
            loginName: res.page.list[0].loginName
          })
        }
        this.setData({
          dialogShow: false,
          showOneButtonDialog: false
        })
      }
    })
  },
  formInputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  onTapOrder(){
    wx.navigateTo({
      url: '../../pages/order/order?loginNo=' + wx.getStorageSync('user_info')
    })
  },
  onTapOrdering() {
    wx.navigateTo({
      url: '../../pages/order/order?status=2&loginNo=' + wx.getStorageSync('user_info')
    })
  },
  onTapOrdered() {
    wx.navigateTo({
      url: '../../pages/order/order?status=3&loginNo=' + wx.getStorageSync('user_info')
    })
  },
  onTapChangeUser(){
    this.setData({
      dialogShow: true,
      formData:{
        mobile:''
      }
    })
  }
})