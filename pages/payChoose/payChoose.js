// pages/payChoose/payChoose.js
import {
  myYe
} from "../../api/discount.js"
import {
  payMoneys
} from "../../api/carMang.js"
import {
  balancePay
} from "../../api/eat.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '1',
    orderNum: "",
    orderMoney: 0,
    state: '',
    show: false,
    yue: 0,
  },
  getYuE() {
    let data = {}
    data.appId = "wx2ee980985f11541a"
    data.openId = wx.getStorageSync('openId')
    myYe(data).then(res => {
      if (res.code == 200) {
        this.setData({
          state: res.data.state, //0不可用 1可用 2申请退款 3退款成功
          show: res.data.state == 1 ? false : true,
          radio: res.data.state == 1 ? '1' : '2',
          yue: Number(res.data.balance)
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    }).catch(res => {

    })
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  tjOrder() {
    console.log(this.data.radio,Number(this.data.yue),Number(this.data.orderMoney))
    if (this.data.radio == 1 && (Number(this.data.yue) > Number(this.data.orderMoney))) {
      let obj = {
        outTradeNo:this.data.orderNum,
        totalFee:Number(this.data.orderMoney)*100
      }
      balancePay(obj).then(res => {
        if (res.code == 200) {
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
        }
      })
    } else {
      this.payMoney()
    }
  },
  payMoney() {
    payMoneys({
      orderType: this.data.orderType,
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
  onClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderMoney: options.orderMoney,
      orderNum: options.orderNum,
      orderType: options.orderType
    })
    this.getYuE()
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

  }
})