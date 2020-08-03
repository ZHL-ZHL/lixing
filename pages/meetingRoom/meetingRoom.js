// pages/meetingRoom/meetingRoom.js
import {
  meetingList
} from "../../api/meeting.js";
import {
  leaseBanner
} from "../../api/banner.js";
import Url from "../../utils/host.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    showdate:false,
    searchvalue: "",
    showMain: true,
    showAccurateSearch: false,
    hot: [],
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
    banner: [],
    low: 1500,
    heigh:2500,
    low1: 0,
    heigh1: 100,
    low2: 0,
    heigh2: 500,
  },

  lowValueChangeAction: function (e) {
    this.setData({
      low: e.detail.lowValue
    })
  },

  heighValueChangeAction: function (e) {
    this.setData({
      heigh: e.detail.heighValue
    })
  },

  lowValueChangeAction1: function (e) {
    this.setData({
      low1: e.detail.lowValue
    })
  },

  heighValueChangeAction1: function (e) {
    this.setData({
      heigh1: e.detail.heighValue
    })
  },
  lowValueChangeAction1: function (e) {
    this.setData({
      low2: e.detail.lowValue
    })
  },

  heighValueChangeAction1: function (e) {
    this.setData({
      heigh2: e.detail.heighValue
    })
  },

  // hideSlider: function (e) {
  //   this.selectComponent("#zy-slider").hide()
  //   this.selectComponent("#zy-slider1").hide()
  // },

  // showSlider: function (e){
  //   this.selectComponent("#zy-slider").show()
  //   this.selectComponent("#zy-slider1").show()
  // },

  // resetSlider: function (e){
  //   this.selectComponent("#zy-slider").reset()
  //   this.selectComponent("#zy-slider1").reset()
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    this.getBanner()
    this.getleaseAdv()
  },
  showAccurateSearchBtn() {
    this.setData({
      showAccurateSearch: true
    })
  },
  showdateBtn(){
    this.setData({
      showdate: true
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    const [start, end] = event.detail;
    this.setData({
      show: false,
      date: `${this.formatDate(start)} - ${this.formatDate(end)}`,
    });
  },
  ondateClose(){
    this.setData({
      showdate: false
    });
  },
  onClickShow() {
    console.log(2122)
    this.setData({
      showMain: false
    });
  }, 
  onSearch() {
    this.setData({
      showMain: true,
      searchvalue: ""
    });
  },
  onCancel() {
    this.setData({
      showMain: true,
      searchvalue: ""
    });
  },
  onClose() {
    this.setData({
      showAccurateSearch: false
    })
  },
  getleaseAdv() {
    meetingList({
      referrals: 0,
      current: 1,
      size: 5
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          hot: res.data.records
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
        this.setData({
          banner: res.data.records
        })
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
    //   if (res.code == 0) {
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