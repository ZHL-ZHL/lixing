// pages/eatOrder/eatOrder.js
import { eatOrder, eatcancelOrder, eatPayOrder } from "../../api/eat.js"
import URL from "../../utils/host.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activetab: 0,
    navBar: [
      { name: "待付款" },
      { name: "待收货" },
      { name: "已完成" },
      { name: "已取消" },
    ],
    page: 1,
    list: [],
    load: false,
    ylink: URL.imgURL,
  },
  getList() {
    eatOrder({ pageNum: this.data.page, pageSize: 15 }).then(res => {
      if (res.code == 200) {
        let totalPage;
        let last_page = parseInt((res.page.total / 15));
        parseInt((res.page.total % 15)) ? totalPage = last_page + 1 : totalPage = last_page;
        let list;
        this.data.page == 1 ? list = res.page.data : list = this.data.list.concat(res.page.data);
        if (this.data.page < totalPage) {
          this.setData({
            load: true
          })
        } else {
          this.setData({
            load: false
          })
        }
        this.setData({
          list: list
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: "none"
      })
    })
  },
  toCencel(e) {
    let id = e.currentTarget.dataset.id;
    let data = {}
    data.orderId = id;

    wx.showModal({
      title: '提示',
      content: '您确定要取消吗？',
      showCancel: true,
      cancelText: '我再想想',
      confirmText: '确定',
      confirmColor: '',
      success: res=> {
        if(res.confirm){
          eatcancelOrder(data).then(res => {
            if (res.code == 200) {
              this.getList()
            } else {
              wx.showToast({
                title: res.msg,
                icon: "none"
              })
            }
          }).catch(res => {
            wx.showToast({
              title: res.msg,
              icon: "none"
            })
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toPay(e) {
    let id = e.currentTarget.dataset.id;
    let data = {}
    data.orderId = id;

    eatPayOrder(data).then(res => {
      if (res.code == 200) {
        let data = JSON.parse(res.data)
        console.log(data)
        let pay_info = JSON.parse(data.pay_info)
        console.log(pay_info)

        wx.requestPayment({
          // 'appId': data,
          'timeStamp': pay_info.timeStamp,
          'nonceStr': pay_info.nonceStr,
          'package': pay_info.package,
          'signType': pay_info.signType,
          'paySign': pay_info.paySign,
          'success': res=> {
            console.log(res)
            this.setData({
              page:1
            })
            this.getList()
          },
          fail: function (res1) {
            console.log(res1)
            wx.navigateTo({
              url: '/pages/eatOrder/eatOrder',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
        })

      } else {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: "none"
      })
    })
  },
  toLook(e) {
    let id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: '/pages/eatQueryState/eatQueryState?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  toEvaluate(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/evaluate/evaluate?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      page:1
    })
    this.getList()
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
    console.log(2)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      page: 1
    })
    this.getList()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.load) {

      this.setData({
        page: this.data.page + 1
      })
      console.log(this.data.page)
      this.getList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})