//index.js


import URL from "../../utils/host.js"
import { loginInfo } from "../../api/getDate.js";

//获取应用实例

const app = getApp()

Page({
  data: {
    referrals: 2,
    pageSize: 10,
    currPage: 0,
    totalPage: 0,
    baseUrl: URL.host,
    indexListData: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputVal: "",
    status:'',
  },
  // 页面到达底部刷新
  onReachBottom: function () {
    this.setData({
      pageSize: this.data.pageSize + 10
    })
    this.getList();
  },
  onLoad: function (options) {
    this.setData({
      status: options.status
    })
    // 获取附近推荐list
    this.getList()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
  // 获取附近推荐list
  getList() {
    console.log(this.data.status)
    var that = this;
    let obj = {}
    if (this.data.status){
      obj = {
        limit: this.data.pageSize,
        page: 0,
        loginNo: wx.getStorageSync('user_info'),
        status: this.data.status
      }
    }else{
      obj = {
        limit: this.data.pageSize,
        page: 0,
        loginNo: wx.getStorageSync('user_info')
      }
    }
    
    loginInfo(obj).then(res => {
      if (res.code == 0) {
        console.log(res)
        this.setData({
          indexListData: res.page.list,
          totalPage: res.page.totalPage
        })
      }
    })
  },
  // 跳转详情页
  onTapdetail: function (event) {
    var detailId = event.currentTarget.id   //获取传递的值
    console.log(event);
    wx.navigateTo({
      url: '../../pages/detail/detail?detailId=' + detailId  //跳转详情页  切记配置app.json文件
    })
  },
})
