// pages/repair/repair.js
import { repairList} from "../../api/repair.js"
import { maintenanceBanner } from "../../api/banner.js"
import Url from "../../utils/host.js"
import {
  xdLogin,
} from "../../utils/login"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    indicatorDots: true, //小点
    indicatorColor: "white",
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 500, //滑动时间
    indicatorActiveColor: "#4D7AD2",
    pageNum:1,
    load:false,
    repairList:"",
    onLine: Url.imghost,
    userInfo:""
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    this.getBanner()
    this.setData({
      userInfo:wx.getStorageSync("userInfo")
    })
  },
  getList(){
    repairList({ page: this.data.pageNum}).then(res=>{
      if(res.code==0){
        let list;
        this.data.pageNum ==1?list=res.data.list:list=this.data.repairList.concat(res.data.list)

        let loadMore;
        this.data.pageNum < res.data.totalCount ? loadMore = true : loadMore=false
        this.setData({
          repairList:list,
          load:loadMore
        })
      }else{
        wx.showToast({
          title: res.desc,
          icon: 'none'
        })
      }
    }).catch(res=>{
      wx.showToast({
        title: res,
        icon:'none'
      })
    })
  },
  getBanner(){
    maintenanceBanner().then(res=>{
      if(res.code==0){
         this.setData({
           banner: res.data
         })
      }else{

      }
    }).catch(res => {
      wx.showToast({
        title: res,
        icon: 'none'
      })
    })
  },
  toAdvDeatil(e){
    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/advDetail/advDetail?info=' + item,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  toCar(e){
    if (this.data.userInfo){
      wx.navigateTo({
        url: '/pages/car/car',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }else{
      xdLogin(e).then(res => {
        this.setData({
          userInfo: res
        })
        wx.navigateTo({
          url: '/pages/car/car',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })

      }).catch(res => {
        console.log(res)
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