// pages/shapAgree/shapAgree.js
import { shopInfo, boundWeChatUser} from "../../api/eat.js"
import URL from "../../utils/host.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopId:"",
    rtShop:"",
    ylink: URL.imgURL,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopId: options.scene 
      // shopId: 1
    })
    this.getInfo()
  },
  getInfo() {
    shopInfo({ id: this.data.shopId}).then(res => {
      if (res.code == 0) {
        this.setData({
          rtShop: res.rtShop
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: "none"
      })
    })
  },
  toAgree(){
    wx.requestSubscribeMessage({
      tmplIds: ['bt9asUd8TPrd1mPclDlZt3fHaIO0uTENEMFwX9JntpI', 'qWlMXWyWsB5Bix_NQVTLY5G_H_cukczg88vqFUy_nEU',
      'bt9asUd8TPrd1mPclDlZt3fHaIO0uTENEMFwX9JntpI'],
      success:res=> {
        boundWeChatUser({ shopId: this.data.shopId }).then(res => {
          if (res.code == 0) {
            wx.clearStorage()
            wx.switchTab({
              url: '/pages/my/my',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none',
            })
          }
        }).catch(res => {
          wx.showToast({
            title: res.msg,
            icon: 'none',
          })
        })
      },
      fail: res => {
        console.log(res)
      }
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