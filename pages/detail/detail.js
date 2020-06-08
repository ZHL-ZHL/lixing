// pages/detail/detail.js

import URL from "../../utils/host.js"
import { getDetial, orderMsg} from "../../api/getDate.js";

var WxParse = require('../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogShow: false,
    loginNo: '',
    loginName: '',
    phone: '',
    company: '',
    appTimestart: '',
    appTimeend: '',
    appDay:'',
    remark: '',
    detailData:{},
    baseUrl: URL.host ,
    date:'',
    detailId:'',
    setorder:true,
    indicatorDots: false,  //小点
    indicatorColor: "white",
    autoplay: false,  //是否自动轮播
    indicatorActiveColor: "#1890FF",
    current:1,
    banner: [
      { content: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568093721029&di=78b19e15f6044ce4930b127803259b36&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01af3257e63fad0000018c1b2691b0.png%402o.jpg" }, { content: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568093721029&di=78b19e15f6044ce4930b127803259b36&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01af3257e63fad0000018c1b2691b0.png%402o.jpg" }, { content: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568093721029&di=78b19e15f6044ce4930b127803259b36&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01af3257e63fad0000018c1b2691b0.png%402o.jpg" }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      detailId: options.detailId
    })
    this.getDetialMsg();
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

  },
  swiperChange: function(e){
    this.setData({
      current: e.detail.current+1
    })
  },
  showorder:function(){
    var that = this;
    that.setData({
      setorder: (!that.data.setorder),
      loginNo: '',
      loginName: '',
      phone: '',
      company: '',
      appTimestart: '',
      appTimeend: '',
      appDay: '',
      remark: '',
    })
  },



  loginNo: function(e) {
    this.setData({
      loginNo: e.detail.value
    })
  },
  loginName: function (e) {
    this.setData({
      loginName: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  company: function (e) {
    this.setData({
      company: e.detail.value
    })
  },
  appTimestart: function (e) {
    this.setData({
      appTimestart: e.detail.value
    })
  },
  appTimeend: function (e) {
    this.setData({
      appTimeend: e.detail.value
    })
  },
  remark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },
  bindDateChangestart:function(e){
    this.setData({
       appTimestart:e.detail.value
    })
  },
  bindDateChangeend: function (e) {
    this.setData({
      appTimeend: e.detail.value
    })
  },
  bindDateDayChange: function (e) {
    this.setData({
      appDay: e.detail.value
    })
  },


  // 获取详情信息
  getDetialMsg(){
    var that = this;
    getDetial(this.data.detailId).then(res => {
      if (res.code == 0) {
        console.log(res)
        this.setData({
          detailData: res.leaseDetail
        })

        /**
        * WxParse.wxParse(bindName , type, data, target,imagePadding)
        * 1.bindName绑定的数据名(必填)
        * 2.type可以为html或者md(必填)
        * 3.data为传入的具体数据(必填)
        * 4.target为Page对象,一般为this(必填)
        * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
        */
        let leaseDetail = res.leaseDetail.leaseDetail
        WxParse.wxParse('leaseDetail', 'html', leaseDetail, that, 5);
      }
    })
  },
  // 立即提交
  formSubmit(){
    if (this.data.detailId && this.data.loginNo && this.data.loginName && this.data.phone && this.data.company && this.data.appDay && this.data.appTimestart && this.data.appTimeend && this.data.remark){
      let obj = {
        leaseId: this.data.detailId,
        loginNo: this.data.loginNo,
        loginName: this.data.loginName,
        phone: this.data.phone,
        company: this.data.company,
        appTime: this.data.appDay + ';' + this.data.appTimestart + ':00' + ',' + this.data.appTimeend + ':00',
        remark: this.data.remark,
      }
      console.log(obj)
      let that = this;
      orderMsg(obj).then(res => {
        if (res.code == 0) {
          console.log(res)
          that.setData({
            setorder: (!that.data.setorder)
          })
        }
      })
    }else{
      wx.showModal({
        title: '错误',
        content: '信息填写不完整',
        showCancel: false
      })
    }
    
  }
})