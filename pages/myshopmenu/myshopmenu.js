// pages/eat/eat.js
import {  shopInfo,eatgroupshopList, eatrecommend, eatShelf, eatrecommendCencel} from "../../api/eat.js"
import URL from "../../utils/host.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    totalPrice: 0,
    totalNum: 0,
    menuList: [],
    current: 0,
    rtShop: "",
    page: 1,
    foodGroupId: "",
    bzTotalPrice: "",
    peiSf: "",
    pingjiaList: [],
    addid: "",
    item: "",
    show: false,
    ids: [],
    ylink: URL.imgURL,
  },
  selNav(e) {
    let idx = e.currentTarget.dataset.idx;
    let id = e.currentTarget.dataset.id;
    this.setData({
      current: idx,
      page: 1,
    })
  },
  toRecommend(e){
    let id=e.currentTarget.dataset.id;
    eatrecommend({ recommendShopId: 1, recommendFoodId:id}).then(res=>{
      if(res.code==0){
        this.getgroupList()
      }else{
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    }).catch(res=>{
      wx.showToast({
        title: res.msg,
        icon:none
      })
    })
  },
  toRecommendCencel(e){
    let id = e.currentTarget.dataset.id;
    eatrecommendCencel({foodId: id }).then(res => {
      if (res.code == 0) {
        this.getgroupList()
      } else {
        wx.showToast({
          title: res.msg,
          icon: none
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: none
      })
    })
  },
  toShelf(e){
    let id = e.currentTarget.dataset.id;
    let shelf = e.currentTarget.dataset.shelf;
    eatShelf({ foodShelf: !shelf, id:id}).then(res=>{
      if(res.code==0){
        this.getgroupList()
      }else{
        wx.showToast({
          title: res.msg,
          icon: none
        })
      }
    }).catch(res=>{
      wx.showToast({
        title: res.msg,
        icon:none
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getgroupList()
    this.getInfo()

  },
  getgroupList() {
    eatgroupshopList({ shopId: 1 }).then(res => {
      if (res.code == 0) {
        this.setData({
          groupList: res.list
        })
        // this.selectFoods()
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

  getInfo() {
    shopInfo({ id: 1 }).then(res => {
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