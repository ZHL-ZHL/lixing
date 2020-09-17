// pages/eatListPay/eatListPay.js 
import {
  paySave
} from "../../api/eat.js"

import {
  payMoneys
} from "../../api/carMang.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.info))
    this.setData({
      info: JSON.parse(options.info),
      index:JSON.parse(options.info).type==3?2:3,
      orderType:JSON.parse(options.info).type==3?3:4
    })
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
      let pay_info = JSON.parse(res.data.pay_info)
      console.log(pay_info, '2222222222')
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
  tjOrder(e) {
    console.log(e)
    if (this.data.address.length == 0) {
      wx.showToast({
        title: '请选择联系人',
        icon: "none"
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
      orderData.packagePrice = this.data.info.bzTotalPrice ? this.data.info.bzTotalPrice : 0
      orderData.discountPrice = this.data.info.totalPriceDiscount
      orderData.deliverPrice = this.data.info.peiSf ? this.data.info.peiSf : 0
      orderData.amountPayable = Number(orderData.deliverPrice) +  Number(orderData.discountPrice) +  Number(orderData.packagePrice)
      let arr = []
      this.data.info.list.forEach(item => {
        
        if(item.type==1){
          let obj = {
            id: item.id,
            num: item.num,
            showPice: item.showPice,
            price: item.price,
            name: item.name,       
            specificationList:item.specificationList[0].specificationList
          }
          arr.push(obj)
        }else{
          let obj = {
            id: item.id,
            num: item.num,
            showPice: item.showPice,
            price: item.price,
            name: item.name
          }
          arr.push(obj)
        }
        
      });
      orderData.orderInfo = JSON.stringify(arr)
      console.log(orderData)
      paySave(orderData).then(res => {
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