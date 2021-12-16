//index.js
//获取应用实例
const app = getApp()
import {
  homeBanner,
  listForMiniapp,
  couponList,
  couponuserGain
} from "../../api/banner.js"
import {
  eatgroupList
} from "../../api/eat.js"
import {
  meetingList,
} from "../../api/meeting.js";
// import imageUrl from "../../utils/host.js"
var bmap = require('../../utils/bmap-wx.min.js')
Page({
  data: {
    imageItem: '',
    showImage: false,
    couponList: [],
    meetingList: [],
    shopList: [],
    eatList: [],
    banner: [],
    banner1: [],
    cityName: "",
    nav: [],
    indicatorDots: true, //小点
    indicatorColor: "white",
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 500, //滑动时间
    indicatorActiveColor: "#FFE400",
    current: 0,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },
  scan() {
    wx.scanCode({
      success(res) {
        console.log(res)
        wx.navigateTo({
          url: '/' + res.path,
          success: function (res) {},
          fail: function (res) {},
          complete: function (res) {},
        })
      }
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  openSet() {
    wx.openSetting({

    })
  },
  getCoupon(e) {
    couponuserGain({
      couponId: e.currentTarget.id
    }).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: "领取成功",
          icon: 'success',
        })
        // this.couponListGet()
      }
    }).catch(res => {
      console.log(res)
      wx.showToast({
        title: res,
        icon: "none"
      })
    })
  },
  couponListGet() {
    couponList().then(res => {
      if (res.code == 200) {
        this.setData({
          couponList: res.data.records
        })
      }

    })
  },
  onLoad: function () {
    console.log(app.globalData.CustomBar)
    this.couponListGet()
    homeBanner(1).then(res => {
      if (res.code == 200) {
        this.setData({
          banner1: res.data.records
        })
      }
    }).catch(res => {

    })
    homeBanner(5).then(res => {
      if (res.code == 200) {
        this.setData({
          banner: res.data.records
        })
      }
    }).catch(res => {

    })
    homeBanner(6).then(res => {
      if (res.code == 200) {
        this.setData({
          shopList: res.data.records
        })
      }
    }).catch(res => {

    })
    wx.getImageInfo({
      src: '/images/bottom.png',
      success: res => {
        console.log(res)
        this.setData({
          imgWidth: res.width,
          imgHeight: res.height,
        })
      }
    })

  },
  showBigImage(e) { 
    wx.previewImage({
      urls: [e.currentTarget.id],
      current: [e.currentTarget.id]
    })
  },
  // showBigImage(e) { 
  //   this.setData({
  //     showImage: true,
  //     imageItem: e.currentTarget.id
  //   })
  // },
  onClickHide() {
    this.setData({
      showImage: false
    });
  },
  toPark() {
    wx.navigateToMiniProgram({
      appId: 'wx54e676273869baa6',
      path: 'pages/index/index',
      extraData: {},
      envVersion: 'release',
      success(res) {
        console.log(res)
      }
    })
  },
  routerTo(e) {
    if (e.currentTarget.dataset.name == "好物优选") {
      wx.switchTab({
        url: '/pages/goodsList/goodsList',
      })
    } else {
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      })
    }
  },
  swiperChange(e) {

    this.setData({
      current: e.detail.current
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function (res) {
    console.log()
    if (res.from === 'button') {}
    return {
      title: '金坤智慧管家',
      path: '/pages/index/index',
      success: function (res) {

      }
    }
  },
  onShow() {
    listForMiniapp().then(res => {
      if (res.code == 200) {
        this.setData({
          nav: res.data
        })
      }
    }).catch(res => {
      wx.showToast({
        title: '未登录，请登录',
        icon: 'none',
        image: '',
        mask: true,
        success: function (res) {
          wx.clearStorage()
          wx.switchTab({
            url: '/pages/my/my',
          })
          wx.hideLoading();

        },
        fail: function (res) {},
        complete: function (res) {},
      })
      return
    })
    eatgroupList().then(res => {
      if (res.code == 200 && res.data.length > 0) {
        this.setData({
          eatList: res.data[0].coodVo
        })
      }
    })
    meetingList({
      current: 1,
      size: 5
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          meetingList: res.data.records
        })
      }
    })
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
      }
    })
    var BMap = new bmap.BMapWX({
      ak: '2pMuQoHqw4hRCCLyATVQIqPyiM2xIqE1'
    });
    var fail = function (data) {
      console.log('fail!!!!')
    };
    var success = function (data) {
      console.log(data);
      that.setData({
        cityName: data.currentWeather[0].currentCity
      });
    }
    BMap.weather({
      fail: fail,
      success: success
    });
    if (wx.getStorageSync("role")) {
      let role = wx.getStorageSync("role");
      let roleArray = role.split(",")
      let nav = this.data.nav
      let nav1 = nav[1]
      if (roleArray.includes("15")) {
        for (let i = 0; i < nav1.length; i++) {
          if (nav1[i].name == "司机") {
            nav1[i].show = true
          }
        }
        nav[1] = nav1
        this.setData({
          nav
        })
      }
      if (roleArray.includes("16")) {
        for (let i = 0; i < nav1.length; i++) {
          if (nav1[i].name == "物业") {
            nav1[i].show = true
          }
        }
        nav[1] = nav1
        this.setData({
          nav
        })
      }
    }

  }
})