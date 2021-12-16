// pages/groupBuy/groupBuy.js  
import {
  getDetail,
  addGoods
} from "../../api/goods.js"

import {
  orderConfirm
} from "../../api/order.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {}
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    getDetail({
      id: options.id
    }).then(res => {
      console.log(res)
      this.setData({
        detailData: res.data
      })
    })
  },
  callPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber:"0354-8668008",
    })
  },
  addGoodsBtn() {
    addGoods({
      cartNum: 1,
      productId: this.data.detailData.id
    }).then(res => {
      wx.showToast({
        title: "已经添加在购物车！",
        icon: 'none'
      })
    })
  },
  toSubmit() {
    addGoods({
      cartNum: 1,
      productId: this.data.detailData.id,
      isNew: 1
    }).then(res => {
      this.data.detailData.cartNum = 1  
      let info = {
        list: [this.data.detailData],
        orderlistType: 'goods',
        totalPrice: this.data.detailData.price,
      } 
      console.log(info)
      orderConfirm({
        cartId: res.data.cartId
      }).then(res => {
        wx.navigateTo({
          url: '/pages/eatListPay/eatListPay?info=' + JSON.stringify(info) + '&orderKey=' + res.data.orderKey + '&addressInfo=' + JSON.stringify(res.data.addressInfo),
        })
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
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

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