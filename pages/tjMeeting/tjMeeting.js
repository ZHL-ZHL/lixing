// pages/tjMeeting/tjMeeting.js
import {
  orderTj
} from "../../api/order.js"
var dateTimePicker = require('../../utils/datapicker.js');
import Url from "../../utils/host.js"
import getNowTime from "../../utils/util";
import {
  tjCar
} from "../../api/repair.js"

import { 
  payMoneys
} from "../../api/carMang.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: "",
    address: "",
    date: '',
    date1: "",
    startYear: "",
    endYear: "",
    wechatUserId: "",
    orderType: "",
    online: Url.imghost,
    today: "",
    date2: "",
    rentType: "",
    time: "00:00",
    time2: "00:00",
    isCart: "",
    dateTimeArray: null,
    dateTime: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj.dateTimeArray.pop();
    var lastTime = obj.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
    });
    this.setData({
      info: JSON.parse(options.info),
      orderType: options.orderType,
      wechatUserId: wx.getStorageSync("userInfo").wechatUserId,
      rentType: options.rentType,
      isCart: options.isCart
    })
    console.log(this.data)
    this.getDaday()
  },
  getDaday() {
    let taday = getNowTime.getNowTime();
    // console.log(taday)
    this.setData({
      date: taday,
      date1: taday,
      date2: taday,
      today: taday
    })
  },
  bindDateChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date2: e.detail.value
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date1: e.detail.value
    })
  },
  bindTimeChange2(e) {
    this.setData({
      time2: e.detail.value
    })
  },
  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  changeDateTime(e) {
    this.setData({
      dateTime: e.detail.value
    });

  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime,
      dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr

    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  payMoney(orderNum) {
    payMoneys({
      orderType:'leaseOrder',
      orderNum:orderNum
    }).then(res => {
      let pay_info = JSON.parse(res.data.pay_info)
      console.log(pay_info,'2222222222')
      wx.requestPayment({
        // 'appId': data,
        'timeStamp': pay_info.timeStamp,
        'nonceStr': pay_info.nonceStr,
        'package': pay_info.package,
        'signType': pay_info.signType,
        'paySign': pay_info.paySign,
        'success': function(res) {
          console.log(res)
          wx.showToast({
            title: "支付成功",
            icon: 'success',
            duration: 2000,
            success: function() {
              wx.navigateTo({
                url: '/pages/paySuccess/paySuccess?type=1',
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
            }
          })
        },
        fail: function(res1) {}
      })
    })

  },
  tjOrder() {
    if (this.data.address.length == 0) {
      wx.showToast({
        title: '请选择联系人',
        icon: "none"
      })
    } else {
      console.log(this.data)
      let orderData = {};
      let dateTimeArray = this.data.dateTimeArray
      let dateTime = this.data.dateTime

      let dateTimeArray1 = this.data.dateTimeArray1
      let dateTime1 = this.data.dateTime1

      console.log(this.data.dateTimeArray, this.data.dateTime)
      orderData.itemType = this.data.orderType

      orderData.orderName = this.data.address.name
      orderData.orderPhone = this.data.address.phone
      orderData.startTime = this.data.date + " 00:00:00"
      if (this.data.orderType == 1) {
        if (this.data.rentType == 1) {
          orderData.startTime = this.data.date + " " + this.data.time + ":00"
          orderData.endTime = this.data.date + " " + this.data.time2 + ":00"
        } else {
          orderData.startTime = this.data.date + " 00:00:00"
          orderData.endTime = this.data.date1 + " 23:59:59"
        }

        orderData.itemId = this.data.info.id
        orderData.rentType = this.data.rentType
      } else if (this.data.orderType == 2) {
        orderData.orderAddress = this.data.address.provinces + this.data.address.address
        orderData.itemId = this.data.info.maintenanceId
      }
      // console.log(123)

      orderData.remark = this.data.remark
      orderData.wechatUserId = this.data.wechatUserId
      orderData.orderType = "leaseOrder"
      console.log(orderData)
      orderTj(orderData).then(res => {
        if (res.code == 200) {
          this.payMoney(res.data)
          // wx.navigateBack({
          //   delta: 1,
          // })
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

  },
  tjCarOrder() {
    if (this.data.address.length == 0) {
      wx.showToast({
        title: '请选择联系人',
        icon: "none"
      })
    } else {
      console.log(this.data)
      let orderData = {};
      let carArray = []
      let dateTimeArray = this.data.dateTimeArray
      let dateTime = this.data.dateTime
      for (let i = 0; i < this.data.info.length; i++) {
        carArray.push(this.data.info[i].id)
      }
      console.log(this.data.dateTimeArray, this.data.dateTime)
      orderData.itemType = this.data.orderType

      orderData.orderName = this.data.address.name
      orderData.orderPhone = this.data.address.phone
      orderData.orderAddress = this.data.address.provinces + this.data.address.address

      orderData.startTime = dateTimeArray[0][dateTime[0]] + '-' + dateTimeArray[1][dateTime[1]] + '-' + dateTimeArray[2][dateTime[2]] + ' ' + dateTimeArray[3][dateTime[3]] + ':' + dateTimeArray[4][dateTime[4]] + ':00'


      orderData.remark = this.data.remark
      orderData.wechatUserId = this.data.wechatUserId
      orderData.shoppingList = carArray
      console.log(orderData)
      tjCar(orderData).then(res => {
        if (res.code == 200) {
          wx.navigateBack({
            delta: 1,
          })
        } else {
          wx.showToast({
            title: res.desc,
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