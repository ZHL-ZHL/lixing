//index.js
//获取应用实例

import URL from "../../utils/host.js"
import { indexList } from "../../api/getDate.js";

const app = getApp()

Page({
  data: {
    leaseStatus:1,
    hotListData:[],
    referrals:2,
    getMore:true,
    pageSize:10,
    currPage:0,
    totalPage:0,
    baseUrl: URL.host,
    indexListData:[],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    indicatorDots: true,  //小点
    indicatorColor: "white",
    autoplay: true,  //是否自动轮播
    interval: 3000,  //间隔时间
    duration: 500,  //滑动时间
    indicatorActiveColor: "#1890FF",
    banner: [],
    inputVal: "",
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShareAppMessage: function () {
    if (res.from === 'button') {
    }
    return {
      title: ' 中鲁智慧园区',
      path: '/pages/index/index',
      success: function (res) {

      }
    }
  },
  onLoad: function () {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取附近推荐list
    this.getList()
    this.hotGetList();
    this.foirstGetList();
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onTapdetail: function (event){
    var detailId = event.currentTarget.id   //获取传递的值
    console.log(event);
    wx.navigateTo({
      url: '../../pages/detail/detail?detailId=' + detailId  //跳转详情页  切记配置app.json文件
    })
  },
  // 获取附近推荐list
  getList(){
    var that = this;
    indexList({
      limit:this.data.pageSize,
      page:0,
      referrals: this.data.referrals
    }).then(res => {
      if (res.code == 0) {
        console.log(res)
        this.setData({
          indexListData:res.page.list,
          totalPage: res.page.totalPage
        })
        let num = this.data.currPage += 1
        if (num > this.data.totalPage) {
          this.setData({
            getMore: false
          })
        }
      }
    })
  },
  // 查看更多
  setLoading(){
    this.setData({
      pageSize: this.data.pageSize+10
    })
    this.getList();
  },
  // 热门推荐list
  hotGetList(){
    var that = this;
    indexList({
      referrals: this.data.referrals
    }).then(res => {
      if (res.code == 0) {
        console.log(res)
        this.setData({
          hotListData: res.page.list
        })
      }
    })
  },
  // 首推list
  foirstGetList() {
    var that = this;
    indexList({
      leaseStatus: this.data.leaseStatus
    }).then(res => {
      if (res.code == 0) {
        console.log(res)
        this.setData({
          banner: res.page.list
        })
      }
    })
  }

})
