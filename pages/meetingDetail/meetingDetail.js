// pages/meetingDetail/meetingDetail.js
var WxParse = require('../../wxParse/wxParse.js');
import {
  meetingDetail
} from "../../api/meeting.js"
import {
  collect
} from "../../api/collect.js"
import Url from "../../utils/host.js"
import {
  xdLogin,
} from "../../utils/login"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAccurateSearch: false,
    banner: [{
      content: "/images/timg.jpg"
    }, ],
    indicatorDots: true, //小点
    indicatorColor: "white",
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 500, //滑动时间
    indicatorActiveColor: "#4D7AD2",
    isCollect: false,
    meetingId: "",
    meetingDetail: "",
    onLine: Url.imghost,
    userInfo: "",
    listIcon: []
  },
  toCall() {
    wx.showActionSheet({
      itemList: ['拨打电话'],
      success(res) {
        // console.log(res.tapIndex)
        wx.makePhoneCall({
          phoneNumber: '15735183549' //仅为示例，并非真实的电话号码
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  onClose() {
    this.setData({
      showAccurateSearch: false
    })
  },
  callPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id,
    })
  },
  openMap() {
    // console.log(parseFloat(this.data.meetingDetail.leaseAddress.split('-')[0]))
    wx.openLocation({
      latitude: parseFloat(this.data.meetingDetail.leaseAddress.split('-')[1]),
      longitude: parseFloat(this.data.meetingDetail.leaseAddress.split('-')[0]),
      scale: 18,
      name: this.data.meetingDetail.leaseAddressName
    })
  },
  toCollect() {
    let data = {};
    data.wechatUserId = this.data.wechatUserId
    data.itemType = 1;
    data.itemId = this.data.meetingId;
    collect(data).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: res.msg,
        })
        this.setData({
          isCollect: !(this.data.isCollect)
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      meetingId: options.id,
      wechatUserId: wx.getStorageSync("userInfo").wechatUserId,
      userInfo: wx.getStorageSync("userInfo")
    })
    console.log(options.id)
    this.getDetail()
  },
  getDetail() {
    let that = this;
    meetingDetail({
      id: this.data.meetingId
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          meetingDetail: res.data,
          isCollect: res.data.leaseImage,
          listIcon: res.data.leaseFacilityList
        })
        WxParse.wxParse('content', 'html', this.data.meetingDetail.leaseDetail, that, 0);
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
  },
  getImageList(e) {
    console.log()
    wx.navigateTo({
      url: '/pages/meetingImage/meetingImage?imageList=' + e.currentTarget.dataset.item,
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  toAppoint(e) {
    // console.log(e)
    let meetingDetail = this.data.meetingDetail;
    delete(meetingDetail["leaseDetail"]);

    wx.navigateTo({
      url: '/pages/tjMeeting/tjMeeting?info=' + JSON.stringify(meetingDetail) + '&orderType=1&rentType=' + e.currentTarget.dataset.type,
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })

    // if (this.data.userInfo) { 
    //   wx.navigateTo({
    //     url: '/pages/tjMeeting/tjMeeting?info=' + JSON.stringify(meetingDetail) + '&orderType=1&rentType=' + e.currentTarget.dataset.type,
    //     success: function (res) {},
    //     fail: function (res) {},
    //     complete: function (res) {},
    //   })
    // } else {
    //   xdLogin(e).then(res => {
    //     this.setData({
    //       userInfo: res
    //     })
    //     wx.navigateTo({
    //       url: '/pages/tjMeeting/tjMeeting?info=' + JSON.stringify(meetingDetail) + '&orderType=1&rentType=' + e.currentTarget.dataset.type,
    //       success: function (res) {},
    //       fail: function (res) {},
    //       complete: function (res) {},
    //     }) 
    //   }).catch(res => {
    //     console.log(res)
    //   })
    // }

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
    this.getDetail()
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