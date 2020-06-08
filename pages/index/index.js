//index.js
//获取应用实例
const app = getApp()
import {
  homeBanner
} from "../../api/banner.js"
import {
  indexAdv
} from "../../api/adv.js"
import {
  companyList
} from "../../api/company.js"

// import imageUrl from "../../utils/host.js"
var bmap = require('../../utils/bmap-wx.min.js')
Page({
  data: {
    banner: [],
    cityName: "",
    nav: [
      [{
          icon: "/images/icon/1.png",
          name: "智慧停车",
          // url: ""
          url: "/pages/carNumber/carNumber",
          show: true
        },
        {
          icon: "/images/icon/5.png",
          name: "我要吃饭",
          url: "/pages/eat/eat",
          show: true
        },
        {
          icon: "/images/icon/6.png",
          name: "在线招商",
          url: "/pages/investment/investment",
          show: true
        },
        {
          icon: "/images/icon/7.png",
          name: "维修服务",
          url: "/pages/repair/repair",
          show: true
        },
        {
          icon: "/images/icon/3.png",
          name: "会议室租赁",
          url: "/pages/meetingRoom/meetingRoom",
          show: true
        },
        {
          icon: "/images/icon/9.png",
          name: "配送订单",
          url: "/pages/distributionOrder/distributionOrder",
          show: true
        },
        {
          icon: "/images/icon/clgl.png",
          name: "车辆管理",
          url: "/pages/carIndex/carIndex",
          show: true
        }, {
          icon: "/images/bus.png",
          name: "班车服务",
          url: "/pages/bus/bus?type=1",
          show: true
        },

        // {
        //   icon: "/images/icon/6.png",
        //   name: "金融服务",
        //   url: "",
        //   show: true
        // },

        // {
        //   icon: "/images/icon/8.png",
        //   name: "企业培训",
        //   url: ""
        // },
      ],
      [

        {
          icon: "/images/icon/2.png",
          name: "访客预约",
          url: "/pages/visitors/visitors",
          show: true
        },
        {
          icon: "/images/icon/4.png",
          name: "物业",
          url: "/pages/property/property",
          show: false
        },
        {
          icon: "/images/driver.png",
          name: "司机",
          url: "/pages/bus/bus?type=2",
          show: false
        },
       
      ],
    ],
    indicatorDots: true, //小点
    indicatorColor: "white",
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 500, //滑动时间
    indicatorActiveColor: "#4D7AD2",
    current: 0,
    swiperIndex: 0
  },
  bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },
  scan() {
    wx.scanCode({
      success(res) {
        console.log(res)
        wx.navigateTo({
          url: '/' + res.path,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  openSet() {
    wx.openSetting({

    })
  },
  onLoad: function() {
    let that = this;
    homeBanner().then(res => {
      if (res.code == 0) {
        //  res.data.forEach(item => { 
        //    item.picture = imageUrl.imgURL + item.picture
        //  })
        console.log(res.data)
        this.setData({
          banner: res.data
        })
      }
    }).catch(res => {

    })
    let query = wx.createSelectorQuery()
    console.log(query)
    // indexAdv().then(res=>{

    // }).catch(res=>{

    // })

  },
  toAdv(e) {
    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/advDetail/advDetail?info=' + item,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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
    // if (e.currentTarget.dataset.name == "智慧停车") {
    //   companyList().then(res => { 
    //     if(res.code == 0){
    //       this.toPark()
    //     }
    //   }) 
    // } else 
    if (e.currentTarget.dataset.name == "配送订单") {
      if (wx.getStorageSync("userInfo").phone) {
        wx.navigateTo({
          url: e.currentTarget.dataset.url,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      } else {
        wx.showToast({
          title: '您还没有绑定手机号，请先绑定手机号！',
          icon: 'none',
          image: '',
          mask: true,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }

    } else if (e.currentTarget.dataset.name == "金融服务") {
      wx.showToast({
        title: '功能待开发，敬请期待！',
        icon: 'none',
      })
    } else if (e.currentTarget.dataset.name == "水电租赁") {
      wx.showToast({
        title: '功能待开发，敬请期待！',
        icon: 'none',
      })
    } else if (e.currentTarget.dataset.name == "企业培训") {

      wx.showToast({
        title: '功能待开发，敬请期待！',
        icon: 'none',
        image: '',
      })
    } else {
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  swiperChange(e) {

    this.setData({
      current: e.detail.current
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function(res) {
    console.log()
    if (res.from === 'button') {}
    return {
      title: ' 中鲁智慧园区',
      path: '/pages/index/index',
      success: function(res) {

      }
    }
  },
  onShow() {
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
    var fail = function(data) {
      console.log('fail!!!!')
    };
    var success = function(data) {
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