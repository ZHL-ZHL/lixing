// pages/meetingRoom/meetingRoom.js
import {
  meetingList, 
} from "../../api/meeting.js"; 
import {
  leaseBanner
} from "../../api/banner.js"; 
import util from "../../utils/util";
import Url from "../../utils/host.js" 
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    nav: ['会议室','茶室','办公家居'],
    currentindex: 0,
    current: 1,  
    date: '', 
    list: [],
    meetingRoom: [],
    indicatorDots: true, //小点
    indicatorColor: "white",
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 500, //滑动时间
    indicatorActiveColor: "#4D7AD2",
    onLine: Url.imghost,
    pageNum: 1,
    load: false,
    banner: [{
      picture:"/images/meet/banner.jpg",
      titleimg1:"/images/meet/btitle1.png",
      titleimg2:"/images/meet/btitle2.png"
    }], 
  },
  selNav: function (e) {
    let index = e.target.dataset.idx;
    this.setData({
      currentindex: index,
      current: 1,
      list: []
    }) 
    this.getleaseAdv()
  },
  goBack() {
    wx.navigateBack({
      delta: 1,
    })
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    this.setData({
      startDate: new Date().format("yyyy年MM月dd日 EEE").substr(5),
      endDate: new Date(util.getDateStr(new Date(),1)).format("yyyy年MM月dd日 EEE").substr(5),
      startDate1: new Date().format("yyyy年MM月dd日"),
      endDate1: new Date(util.getDateStr(new Date(),1)).format("yyyy年MM月dd日"),
    })
    // this.getList()
    // this.getBanner()
    this.getleaseAdv()
  },  
  getleaseAdv() {
    meetingList({ 
      current: 1,
      size: 10,
      type:this.data.currentindex+1
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          list: res.data.records
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res,
        icon: "none"
      })
    })
  },
  getBanner() {
    leaseBanner({
      bannerType: 2,
      current: 1,
      size: 5,
      isDeleted: 0,
      notBanner: 0
    }).then(res => {
      if (res.code == 200) {
        // this.setData({
        //   banner: res.data.records
        // })
      }
    }).catch(res => {
      wx.showToast({
        title: res,
        icon: "none"
      })
    })
  },
  toAdvDeatil(e) {
    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/advDetail/advDetail?info=' + item,
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  goDetail() {
    wx.navigateTo({
      url: '/pages/meetDetailList/meetDetailList?startDate=' + this.data.startDate1 + '&endDate=' + this.data.endDate1 + '&keyword=' + this.data.keyword + '&allSearchCount=' + this.data.allSearchCount + '&startTime=' + this.data.startTime + '&endTime=' + this.data.endTime,
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  getList() {
    meetingList({
      referrals: 1,
      current: 1,
      size: 5
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          meetingRoom: res.data.records
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res,
        icon: "none"
      })
    })

    // meetingList({
    //   page: this.data.pageNum
    // }).then(res => {
    //   if (res.code == 200) {
    //     let list;
    //     this.data.pageNum == 1 ? list = res.page.list : list = this.data.meetingRoom.concat(res.page.list)
    //     let loadMore;
    //     this.data.pageNum < res.page.totalPage ? loadMore = true : loadMore = false;
    //     this.setData({
    //       load: loadMore,
    //       meetingRoom: list
    //     })
    //     console.log(this.data.meetingRoom)
    //   } 
    // }).catch(res => {
    //   wx.showToast({
    //     title: res,
    //   })
    // })
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
    if (this.data.load) {
      this.setData({
        pageNum: this.data.pageNum + 1
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