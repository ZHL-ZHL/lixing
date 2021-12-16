// pages/carIndex/carIndex.js


import {
  cartList,
  orderConfirm
} from "../../api/order.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice: 0,
    lengthList: true,
    showAccurateSearch: false,
    showBttom: false,
    nav: ['好物优选'],
    currentindex: 0,
    current: 1,
    size: 10,
    orderList: [],
    checkedAll: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    cartList().then(res => {
      this.setData({
        orderList: res.data.valid
      })
    })
  },
  toSubmit(e) {
    // console.log(e.currentTarget.id)
    let arr = []
    let cartIdarr = []
    this.data.orderList.forEach(item => {
      item.products.forEach(item1 => {
        if (item1.checked) {
          item1.productInfo.cartNum = item1.cartNum
          arr.push(item1.productInfo)
          cartIdarr.push(item1.id)
        }
      });
    });
    let info = {
      list: arr,
      orderlistType: 'goods',
      totalPrice: this.data.totalPrice,
      // totalPriceDiscount: this.data.totalPriceDiscount ,
    }

    orderConfirm({
      cartId: cartIdarr.join(',')
    }).then(res => {
      wx.navigateTo({
        url: '/pages/eatListPay/eatListPay?info=' + JSON.stringify(info) + '&orderKey=' + res.data.orderKey + '&addressInfo=' + JSON.stringify(res.data.addressInfo),
      })
    })
  },
  onChangeitemin(event) {
    let indexall = event.currentTarget.dataset.indexall
    let index = event.currentTarget.dataset.index 
    this.data.orderList[indexall].products[index].checked = event.detail 
    if (!event.detail) {
      this.setData({
        checkedAll: event.detail
      })
      this.data.orderList[indexall].checkItem = event.detail
    }else{
      this.getCheckFlag()
    }
    this.setData({
      orderList: this.data.orderList
    })
    this.getTotalPrice()
  },
  getCheckFlag() {
    let flag = true  
    this.data.orderList.forEach((item) => {
      let flagItem = true 
      item.products.forEach(item1 => { 
        if (!item1.checked) { 
          flagItem = false
        }
      });
      if(flagItem){
        item.checkItem = true
      }
      if (!item.checkItem) {
        flag = false
      }
    });
    this.setData({
      orderList: this.data.orderList
    })
    if (flag) {
      this.setData({
        checkedAll: true
      })
    }

  },
  getTotalPrice() {
    let totalPrice = 0
    this.data.orderList.forEach(item => {
      item.products.forEach(item1 => {
        if (item1.checked) {
          // console.log(item1.cartNum * item1.productInfo.otPrice)
          totalPrice += item1.productInfo.otPrice ? (item1.cartNum * item1.productInfo.price) : (item1.cartNum * item1.productInfo.otPrice)
        }
      });
    });
    this.setData({
      totalPrice: totalPrice
    })
  },
  onChangeitem(event) {
    event.currentTarget.dataset.item.checkItem = event.detail
    event.currentTarget.dataset.item.products.forEach(item => {
      item.checked = event.detail
    });
    let index = event.currentTarget.dataset.index
    this.data.orderList[index] = event.currentTarget.dataset.item
    this.setData({
      orderList: this.data.orderList
    })
    if (!event.detail) {
      this.setData({
        checkedAll: event.detail
      })
    } else {
      this.getCheckFlag()
    }
    this.getTotalPrice()
  },
  onChangeall(event) {
    this.data.orderList.forEach(item => {
      item.checkItem = event.detail
      item.products.forEach(item1 => {
        item1.checked = event.detail
      });
    });
    this.setData({
      checkedAll: event.detail,
      orderList: this.data.orderList
    });
    this.getTotalPrice()
  },
  selNav: function (e) {
    let index = e.target.dataset.idx;
    this.setData({
      currentindex: index,
      current: 1,
      // list: []
    })
    if (this.data.currentindex == 1) {
      // this.getvisitorsList()
    }
  },
  onClose() {
    this.setData({
      showAccurateSearch: false
    })
  },
  openBottom() {
    this.setData({
      showAccurateSearch: true
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