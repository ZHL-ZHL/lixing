// pages/meetingRoom/meetingRoom.js
import { meetingList } from "../../api/meeting.js";
import { leaseBanner } from "../../api/banner.js";
import { leaseAdv } from "../../api/adv.js";
import Url from "../../utils/host.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hot:[],
    meetingRoom:[],
    indicatorDots: true,  //小点
    indicatorColor: "white",
    autoplay: true,  //是否自动轮播
    interval: 3000,  //间隔时间
    duration: 500,  //滑动时间
    indicatorActiveColor: "#4D7AD2",
    onLine: Url.imghost,
    pageNum:1,
    load:false,
    banner:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    this.getBanner()
    this.getleaseAdv()
  },
  getleaseAdv(){
    leaseAdv().then(res => {
      if (res.code == 0) {
        this.setData({
          hot: res.data
        })
      } else {

      }
    }).catch(res => {
      wx.showToast({
        title: res,
        icon: "none"
      })
    })
  },
  getBanner(){
    leaseBanner().then(res=>{
       if(res.code==0){
          this.setData({
            banner:res.data
          })
       }else{

       }
    }).catch(res=>{
        wx.showToast({
          title:res,
          icon:"none"
        })
    })
  },
  toAdvDeatil(e) {
    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/advDetail/advDetail?info=' + item,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getList(){
    meetingList({ page: this.data.pageNum}).then(res=>{
      if(res.code==0){
        let list;
        this.data.pageNum == 1 ? list = res.page.list : list = this.data.meetingRoom.concat(res.page.list)
        let loadMore;
        this.data.pageNum < res.page.totalPage ? loadMore = true : loadMore=false;
        this.setData({
          load: loadMore,
          meetingRoom:list
        })
      }else{

      }
    }).catch(res=>{
        wx.showToast({
          title: res,
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
    this.setData({
      pageNum: 1
    })
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     if(this.data.load){
       this.setData({
         pageNum:this.data.pageNum+1
       })
       this.getList()
     }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})