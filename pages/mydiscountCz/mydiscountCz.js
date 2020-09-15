// pages/mydiscountCz/mydiscountCz.js
import {topay,chargeactivity} from "../../api/discount"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    cardNum:"",
    current:0
  },
  sel(e){
     this.setData({
       current:e.currentTarget.dataset.index
     })
  },
  getList(){
    chargeactivity({shopId:wx.getStorageSync('shopId')}).then(res=>{
       if(res.code==200){
         this.setData({
           list:res.data
         })
       }else{
        wx.showToast({
          title: res.msg,
          icon:"none"
        })
       }
    }).catch(res=>{
      wx.showToast({
        title: res,
        icon:"none"
      })
    })
  },
  toCz(){
    let index=this.data.current
    let money=this.data.list[index]
    let data={}
    data.appId="wxc35575f7a176ae3c"
    data.openId=wx.getStorageSync('openId')
    data.rechargeMoney=money.rechargeMoney
    data.cardNum=this.data.cardNum
    data.giveMoney=money.giveMoney
    topay(data).then(res=>{
      let pay_info=JSON.parse(res.data.pay_info)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
      cardNum:options.cardNum
     })
     this.getList()
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