// pages/myOrderXq/myOrderXq.js
import {
  orderDetail,
  userorderRefund
} from "../../api/order.js"
import Url from "../../utils/host.js"

import {
  payMoneys
} from "../../api/carMang.js"
var interval;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reason: "",
    showNoMoney: false,
    orderNum: "",
    info: "",
    online: Url.imghost,
    // 总时间
    remainTime: 0,
    remainTimeNew: '',
    // countDownNum:60,
  },
  getNoMoney() {
    this.setData({
      showNoMoney: true
    })
  },
  changeReason(e) {
    this.setData({
      reason: e.detail.value
    })
  },
  saveNoMoney(e) {
    // if (!this.data.reason) {
    //   wx.showToast({
    //     title: '请填写退款理由',
    //     icon: "none"
    //   })
    //   return false
    // }
    userorderRefund({
      orderNum: this.data.orderNum,
      reason: this.data.reason,
      orderType: "foodOrder"
    }).then(res => {
      if (res.code == 200) {
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
  payMoney(e) {
    console.log(e)
    let orderType = ""
    if (e.currentTarget.dataset.item.itemType == 1) {
      orderType = "leaseOrder"
    } else if (e.currentTarget.dataset.item.itemType == 2) {
      orderType = "foodOrder"
    }
    payMoneys({
      orderType: orderType,
      orderNum: this.data.orderNum
    }).then(res => {
      let pay_info = JSON.parse(res.data.pay_info)
      wx.requestPayment({
        // 'appId': data,
        'timeStamp': pay_info.timeStamp,
        'nonceStr': pay_info.nonceStr,
        'package': pay_info.package,
        'signType': pay_info.signType,
        'paySign': pay_info.paySign,
        'success': function (res) {
          console.log(res)
          wx.showToast({
            title: "支付成功",
            icon: 'success',
            duration: 2000,
            success: function () {
              wx.navigateTo({
                url: '/pages/paySuccess/paySuccess?type=1',
                success: function (res) {},
                fail: function (res) {},
                complete: function (res) {},
              })
            }
          })
        },
        fail: function (res1) {}
      })
    })

  },
  freeTell: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.item.shopPhone,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderNum: options.orderNum,
      orderType: options.itemType == 1 ? 'leaseOrder' : 'foodOrder'
    })
    // this.countDown()
    this.getDetail()
  },

  // 剩余时间(毫秒)处理转换时间
  transformRemainTime(time) {
    var min = Math.floor(time % 3600);
    this.setData({
      remainTimeNew: Math.floor(min / 60) + "分" + time % 60 + "秒"
    })
  },
  // 开始倒计时
  startCountdown: function () {
    var that = this
    interval = setInterval(function () {
      var time = that.data.remainTime - 1;
      if (time > 0) {
        that.setData({
          remainTime: time
        });
        that.transformRemainTime(that.data.remainTime);
      } else {
        clearInterval(interval);
        this.getDetail()
      }
    }, 1000);
  },
  // 倒计时效果
  // countDown: function () {
  //   let that = this;
  //   let countDownNum = that.data.countDownNum; //获取倒计时初始值 
  //   that.setData({
  //     timer: setInterval(function () {  
  //       countDownNum--; 
  //       that.setData({
  //         countDownNum: countDownNum
  //       }) 
  //       if (countDownNum == 0) { 
  //         clearInterval(that.data.timer); 
  //       }
  //     }, 1000)
  //   })
  // },
  getDetail() {
    orderDetail({
      orderNum: this.data.orderNum,
      orderType: this.data.orderType
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          info: res.data,
          remainTime: Math.floor(res.data.remainingTime / 1000)
        })
        if (this.data.remainTime > 0) {
          this.startCountdown()
        }
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
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(interval);
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

  }
})