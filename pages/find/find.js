// pages/find/find.js
import { discoveryBanner, discoveryPage} from "../../api/banner.js"
import { findAdv } from "../../api/adv.js"
import Url from "../../utils/host.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetingRoom: [],
    zlinfo:"",
    // onLine: Url.imghost,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFind()
    this.getadv()
    this.getdiscoveryPage()
  },
  getFind(){
    discoveryBanner().then(res => {
      if (res.code == 0) {
        this.setData({
          zlinfo: res.data[0]
        })
      } else {

      }
    }).catch(res => {

    })
  },
  goDetail:function(e){ 
    wx.navigateTo({
      url: e.currentTarget.id,
    })
  },
  toAdvDeatil() {
    let item = JSON.stringify(this.data.zlinfo)
    wx.navigateTo({
      url: '/pages/advDetail/advDetail?info=' + item,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getdiscoveryPage(){
    discoveryPage().then(res => {
      if (res.code == 0) {
        this.setData({
          meetingRoom: res.data
        })
      } else {

      }
    }).catch(res => {

    })
  },
  getadv(){
    findAdv().then(res=>{

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
    this.getFind()
    this.getadv()
    this.getdiscoveryPage()
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