// pages/eatListPay/eatListPay.js 
import {
  paySave
} from "../../api/eat.js"
import {
  createOrder,
  toPayOrder
} from "../../api/order.js"

import {
  payMoneys
} from "../../api/carMang.js"
import {
  couponuserList
} from "../../api/my.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPriceCount: 0,
    showActiveP: 0,
    showActiveT: '',
    showActive: '',
    couponuserList: [],
    showAccurateSearch: false,
    isStaff: wx.getStorageSync("isStaff"),
    index: 3,
    info: "",
    address: "",
    orderType: 4, //1.自取，2.配送，3预定 4堂食
    orderTypeList: [{
      id: 1,
      dictName: "自取"
    }, {
      id: 2,
      dictName: "配送"
    }, {
      id: 3,
      dictName: "预定"
    }, {
      id: 4,
      dictName: "堂食"
    }, ]
  },
  showAc(e) {
    console.log(e)
    this.setData({
      showActive: e.currentTarget.id,
      showActiveP: e.currentTarget.dataset.item.couponPrice,
      showActiveT: e.currentTarget.dataset.item.couponType
    })
    if (this.data.showActiveP) {
      if (!this.data.orderlistType) {
        this.data.totalPriceCount = this.data.showActiveT == 0 ? this.data.info.total - this.data.showActiveP : this.data.info.total * this.data.showActiveP / 10
      } else {
        this.data.totalPriceCount = this.data.showActiveT == 0 ? this.data.infoGoods.totalPrice - this.data.showActiveP : this.data.infoGoods.totalPrice * this.data.showActiveP / 10
      }
      this.setData({
        totalPriceCount: this.toDecimal(this.data.totalPriceCount)
      })
    }
  },
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.data.info.total = this.toDecimal(this.data.info.totalPriceDiscount)
    this.data.info.totalisStaff = this.toDecimal(this.data.info.total * 0.8)
    this.setData({
      info: this.data.info
    })
  },
  subcoupon() {
    this.setData({
      showAccurateSearch: false
    })
  },
  onClose() {
    this.setData({
      showAccurateSearch: false
    })
  },
  openBottom() {
    this.setData({
      showAccurateSearch: true,
    })
    couponuserList({
      type: this.data.orderlistType ? 3 : 2
    }).then(res => {
      this.setData({
        couponuserList: res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  toDecimal(x) {
    var val = Number(x)
    if (!isNaN(parseFloat(val))) {
      val = val.toFixed(2);
    }
    return val;
  },
  onLoad: function (options) {
    console.log(options)
    let info = JSON.parse(options.info)

    if (info.orderlistType == 'goods') {
      console.log(info, info)
      let orderKey = options.orderKey
      let addressInfo = JSON.parse(options.addressInfo)
      info.totalPrice = info.totalPrice ? Number(info.totalPrice) : 0
      this.setData({
        infoGoods: info,
        orderlistType: info.orderlistType,
        orderKey: orderKey,
        address: addressInfo
      })
    } else {
      info.peiSf = info.peiSf ? Number(info.peiSf) : 0
      info.totalPriceDiscount = info.totalPriceDiscount ? Number(info.totalPriceDiscount) : 0
      info.totalPrice = info.totalPrice ? Number(info.totalPrice) : 0
      info.total = this.toDecimal(info.totalPriceDiscount)
      info.totalisStaff = this.toDecimal(info.total * 0.8)
      this.setData({
        info: info,
        index: info.type == 3 ? 2 : 3,
        orderType: info.type == 3 ? 3 : 4
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  payMoney(orderNum) {
    payMoneys({
      orderType: 'foodOrder',
      orderNum: orderNum
    }).then(res => {
      let pay_info = res.data.result.jsConfig
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
        fail: function () {
          wx.reLaunch({
            url: '/pages/myOrder/myOrder',
          })
        }
      })
    })

  },
  tjOrder(e) {
    if (this.data.address.length == 0) {
      wx.showToast({
        title: '请选择联系人',
        icon: "none"
      })
    } else {
      if (this.data.orderlistType) {
        createOrder({
          key: this.data.orderKey,
          obj: {
            from: 'routine',
            payType: 'weixin',
            addressId: this.data.address.id
          }
        }).then(res => {
          console.log(this.data.infoGoods)
          toPayOrder({
            key: this.data.orderKey,
            obj: {
              from: 'routine',
              payType: 'weixin',
              addressId: this.data.address.id,
              payPrice: this.data.totalPriceCount > 0 ? this.data.totalPriceCount : this.data.infoGoods.totalPrice,
              orderId: res.data.result.orderId,
            }
          }).then(res => {
            let pay_info = res.data.result.jsConfig
            // console.log(pay_info,'111111111111')
            wx.requestPayment({
              'timeStamp': pay_info.timeStamp,
              'nonceStr': pay_info.nonceStr,
              'package': pay_info.package,
              'signType': pay_info.signType,
              'paySign': pay_info.paySign,
              'success': function (res) {
                console.log(222)
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
              fail: function (res1) {
                console.log(111)
                wx.reLaunch({
                  url: '/pages/myOrder/myOrder',
                })
              }
            })

          })
        })
      } else {
        let orderData = {};
        orderData.shopId = '1298522833797799937'
        orderData.userAddress = this.data.address.address
        orderData.userName = this.data.address.name
        orderData.userPhone = this.data.address.phone
        orderData.remark = this.data.remark
        orderData.orderType = this.data.orderTypeList[this.data.index].id
        orderData.originalPrice = this.data.info.totalPrice
        orderData.discountPrice = this.data.info.totalPrice - this.data.totalPriceCount
        orderData.amountPayable = this.data.totalPriceCount > 0 ? this.data.totalPriceCount : this.data.info.total;
        let arr = []
        this.data.info.list.forEach(item => {
          if (item.type == 1 && item.specificationList) {
            let obj = {
              id: item.id,
              num: item.num,
              showPice: item.showPice,
              price: item.price,
              name: item.name,
              dateTime: item.dateTime,
              specificationList: item.specificationList[0].specificationList
            }
            arr.push(obj)
          } else {
            let obj = {
              id: item.id,
              num: item.num,
              dateTime: item.dateTime,
              showPice: item.showPice,
              price: item.price,
              name: item.name
            }
            arr.push(obj)
          }

        });
        orderData.orderInfo = JSON.stringify(arr)
        orderData.userCouponId = this.data.showActive ? this.data.showActive : ''
        // console.log(orderData)
        paySave(orderData).then(res => {
          if (res.code == 200) {
            this.payMoney(res.data)
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

      }

    }

  },
  content(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.address)
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