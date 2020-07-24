// pages/my/my.js
import {
  xdLogin,
} from "../../utils/login"
import {
  loginOut, getPhone
} from "../../api/my"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [{
        name: "待付款",
        icon: "/images/my/a-1.png",
        id: 1
      },
      {
        name: "已完成",
        icon: "/images/my/a-2.png",
        id: 3
      },
      {
        name: "退货/退款",
        icon: "/images/my/a-3.png",
        id: 4
      }
    ],
    navList: [{
        name: "我的卡包",
        icon: "/images/my/a-4.png",
        url: "/pages/mydiscount/mydiscount"
      },
      {
        name: "访客记录",
        icon: "/images/my/a-8.png",
        url: "/pages/myvisitors/myvisitors"
      },
      {
        name: "我的预约",
        icon: "/images/my/a-8.png",
        url: "/pages/myMeeting/myMeeting"
      },
      {
        name: "我的收藏",
        icon: "/images/my/a-9.png",
        url: "/pages/myCollect/myCollect"
      },
      {
        name: "帮助与反馈",
        icon: "/images/my/a-10.png",
        url: "/pages/feedback/feedback"
      },
      {
        name: "客服电话",
        icon: "/images/my/a-11.png",
        url: ""
      },
    ],
    userInfo: "",
    tan:false
  },
  GotUserInfo(e) {
    wx.showLoading({
      title: '登录中。。。',
    })
    xdLogin(e).then(res => {
      this.setData({
        userInfo: res
      })
      if(res.phone.length==0){
        this.setData({
          tan:true
        })
      }
      this.getRole()
    }).catch(res => {
      console.log(res)
    })
  },
  getPhoneNumber(e) {
    // console.log(e)
    // console.log(e.detail.errMsg)
    // console.log(e.detail.iv)
    // console.log(e.detail.encryptedData)
    let data={}
    data.iv = e.detail.iv
    data.encryptedData = e.detail.encryptedData
    getPhone(data).then(res=>{
      console.log(res)
      if(res.code==0){
        let userInfo=wx.getStorageSync("userInfo")
        userInfo.phone=res.data;

        this.setData({
          userInfo,
          tan: false
        })
        wx.setStorage({
          key: 'userInfo',
          data: userInfo,
        })
      }else{
        this.setData({
          tan: false
        })
      }
    }).catch(res=>{
      this.setData({
        tan: false
      })
    })
  },
  routeTo(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    // console.log(e)
    // let idx = e.currentTarget.dataset.index
    // let name = e.currentTarget.dataset.name
    // if(name=="客服电话"){
    //   wx.makePhoneCall({
    //     phoneNumber: '4008200202',
    //   })
    // }
    // if (this.data.userInfo) {
    //   wx.navigateTo({
    //     url: e.currentTarget.dataset.url,
    //     success: function (res) { },
    //     fail: function (res) { },
    //     complete: function (res) { },
    //   })
    // } else {
    //   xdLogin(e).then(res => {
    //     this.setData({
    //       userInfo: res
    //     })
    //     this.getRole()
    //     wx.navigateTo({
    //       url: e.currentTarget.dataset.url,
    //     })
    //   }).catch(res => {
    //     console.log(res)
    //   })
    // }


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
  loginOutBtn() {
    loginOut().then(res => {
      wx.clearStorage()
      this.setData({
        userInfo:""
      })
    }).catch(res => {
      console.log(res)
    })
  },
  toAllOrder(e) {
    if (this.data.userInfo) {
      wx.navigateTo({
        url: '/pages/myOrder/myOrder',
      })
    } else {
      xdLogin(e).then(res => {
        this.setData({
          userInfo: res
        })
        this.getRole()
        wx.navigateTo({
          url: '/pages/myOrder/myOrder',
        })
      }).catch(res => {
        console.log(res)
      })
    }
  },
  toAllOrderOne(e) {
    console.log(e)
    let idx = e.currentTarget.dataset.id;
    if (this.data.userInfo) {
      wx.navigateTo({
        url: '/pages/myOrder/myOrder?status=' + idx,
      })
    } else {
      xdLogin(e).then(res => {
        this.setData({
          userInfo: res
        })
        this.getRole()
        wx.navigateTo({
          url: '/pages/myOrder/myOrder?status=' + idx,
        })
      }).catch(res => {
        console.log(res)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    let userInfo;
    wx.getStorageSync("userInfo") ? userInfo = wx.getStorageSync("userInfo") : userInfo = "";
    console.log(userInfo)
    this.setData({
      userInfo: userInfo
    })
    this.getRole()
  },
  getRole(){
    let role = wx.getStorageSync("role");
    let roleArray = role.split(",")
    if (roleArray.includes("7")) {
      let data = {
        name: "我的餐厅",
        icon: "/images/my/a-4.png",
        url: "/pages/myshop/myshop"
      }
      let navList = this.data.navList;
      console.log(navList.includes(data))
      let json = JSON.stringify(navList)
      let jsonData=JSON.stringify(data)
      if (json.indexOf(jsonData)==-1){
        navList.unshift(data)
        this.setData({
          navList: navList
        })
      }else{
        
      }
      
      console.log(this.data.navList)
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})