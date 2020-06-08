//index.js


import URL from "../../utils/host.js"
import { indexList } from "../../api/getDate.js";

//获取应用实例

const app = getApp()

Page({
  data: {
    keyName:'',
    leaseArea:'',
    leaseAreaText: '面积', 
    leaseAddressName: '',
    leaseAddressNameText: '区域',
    referrals: "",
    pageSize: 10,
    currPage: 0,
    totalPage: 0,
    baseUrl: URL.host,
    indexListData: [],
    currentTab:-1,
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
    banner: [
      { content: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568093721029&di=78b19e15f6044ce4930b127803259b36&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01af3257e63fad0000018c1b2691b0.png%402o.jpg" }, { content: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568093721029&di=78b19e15f6044ce4930b127803259b36&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01af3257e63fad0000018c1b2691b0.png%402o.jpg" }, { content: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568093721029&di=78b19e15f6044ce4930b127803259b36&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01af3257e63fad0000018c1b2691b0.png%402o.jpg" }
    ],
    inputVal: "",
  },

  
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 页面到达底部刷新
  onReachBottom: function () {
    this.setData({
      pageSize: this.data.pageSize + 10
    })
    this.getList();
  },
  onLoad: function () {
   
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取附近推荐list
    this.getList()
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
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
      console.log(this.data.currentTab)
    }
  },
  // 清除搜索
  clearSearch(){
    var self = this;
    self.setData({
      keyName: ''
    })
    this.getList();
  },
  // 搜索
  selectResult: function (e) {
    if (e.detail.value){
      var self = this;
      self.setData({
        keyName: e.detail.value
      })
      this.getList();
    }
  },
  // 筛选区域   leaseAddressName
  changelistAddress: function(e){
    var self = this;
    self.setData({
      leaseAddressNameText: e.currentTarget.dataset.txt,
      currentTab: -1
    })
    console.log(this.data.leaseAddressNameText)
  },

  // 筛选面积 leaseAreaText
  changelistArea: function (e) {
    var self = this;
    self.setData({
      leaseAreaText: e.currentTarget.dataset.txt,
      currentTab:-1
    })
    console.log(this.data.leaseAreaText)
  },
  // 获取附近推荐list
  getList() {
    var that = this;
    indexList({
      limit: this.data.pageSize,
      page: 0,
      referrals: this.data.referrals,
      key: this.data.keyName
      // leaseAddressName: this.data.leaseAddressName,
      // leaseArea: this.data.leaseArea
    }).then(res => {
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
