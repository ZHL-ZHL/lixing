// pages/goodsList/goodsList.js
import {
  productList,
  productMenuList
} from "../../api/goods.js"
import {
  homeBanner
} from "../../api/banner.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav:[],
    banner1: [],
    activeKey: 0,
    list: [],
    groupId: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    homeBanner(3).then(res => { 
      this.setData({
        banner1: res.data.records
      })
    })
  },
  onChange(event) { 

    this.setData({
      activeKey:event.detail
    })
    if(event.detail==0){
      this.getlist("")
    }else{
      this.getlist(this.data.nav[event.detail-1].id)
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
    productMenuList().then(res => { 
      this.setData({
        nav:res.data
      })
      this.getlist("")
    })
  },
  getlist(id) {
    productList({
      groupId: id
    }).then(res => { 
      this.setData({
        list: res.data
      })
    })
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